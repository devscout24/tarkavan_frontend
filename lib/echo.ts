type EchoChannel = {
  listen<TPayload>(event: string, callback: (payload: TPayload) => void): void
  stopListening(event: string): void
}

type EchoClient = {
  private(channelName: string): EchoChannel
  leave(channelName: string): void
  disconnect(): void
  connector?: {
    options?: {
      auth?: {
        headers?: Record<string, string>
      }
    }
  }
}

type EchoConfig = {
  broadcaster: string
  key: string
  wsHost?: string
  wsPort: number
  wssPort: number
  forceTLS: boolean
  enabledTransports: string[]
  authEndpoint: string
  auth: {
    headers: Record<string, string>
  }
}

declare global {
  interface Window {
    Echo: EchoClient | null
    Pusher: unknown
  }
}

let echo: EchoClient | null = null
let currentToken: string | null = null

const setEchoAuthToken = (client: EchoClient, token: string) => {
  const authHeaders = client.connector?.options?.auth?.headers

  if (!authHeaders) return

  authHeaders.Authorization = `Bearer ${token}`
  authHeaders.authorization = `Bearer ${token}`
}

export async function getEcho(token?: string): Promise<EchoClient | null> {
  const normalizedToken = token?.trim()

  if (!normalizedToken) return null

  if (echo && currentToken !== normalizedToken) {
    try {
      echo.disconnect()
    } catch {
      // ignore
    }

    echo = null
    currentToken = null

    if (typeof window !== "undefined") {
      window.Echo = null
    }
  }

  if (echo) {
    setEchoAuthToken(echo, normalizedToken)
    currentToken = normalizedToken

    if (typeof window !== "undefined") {
      window.Echo = echo
    }

    return echo
  }

  if (typeof window === "undefined") return null

  const [{ default: Echo }, { default: Pusher }] = (await Promise.all([
    import("laravel-echo"),
    import("pusher-js"),
  ])) as [
    { default: new (config: EchoConfig) => EchoClient },
    { default: unknown },
  ]

  window.Pusher = Pusher

  echo = new Echo({
    broadcaster: "reverb",
    key: process.env.NEXT_PUBLIC_REVERB_APP_KEY as string,
    wsHost: process.env.NEXT_PUBLIC_REVERB_HOST,
    wsPort: 8082,
    wssPort: 443,
    forceTLS: false,
    enabledTransports: ["ws", "wss"],
    authEndpoint: `https://admin.goelitesport.com/api/broadcasting/auth`,
    auth: {
      headers: {
        Authorization: `Bearer ${normalizedToken}`,
        authorization: `Bearer ${normalizedToken}`,
      },
    },
  })

  setEchoAuthToken(echo, normalizedToken)
  currentToken = normalizedToken
  window.Echo = echo

  return echo
}
