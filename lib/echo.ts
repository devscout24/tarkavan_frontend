type EchoChannel = {
  listen<TPayload>(event: string, callback: (payload: TPayload) => void): void
  stopListening(event: string): void
}

type EchoClient = {
  private(channelName: string): EchoChannel
  leave(channelName: string): void
  disconnect(): void
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

export async function getEcho(token?: string): Promise<EchoClient | null> {
  if (!token) return null

 
  if (echo && currentToken !== token) {
    try {
      echo.disconnect()
    } catch {
      // ignore
    }
    echo = null
    currentToken = null
    if (typeof window !== "undefined") window.Echo = null
  }

  if (!echo && typeof window !== "undefined") {
    const [{ default: Echo }, { default: Pusher }] = (await Promise.all([
      import("laravel-echo"),
      import("pusher-js"),
    ])) as [
      { default: new (config: EchoConfig) => EchoClient },
      { default: unknown },
    ]

    window.Pusher = Pusher

    console.log("Initializing Echo with token:", token.substring(0, 20) + "...")

    echo = new Echo({
      broadcaster: "reverb",
      key: process.env.NEXT_PUBLIC_REVERB_APP_KEY as string,
      wsHost: process.env.NEXT_PUBLIC_REVERB_HOST,
      wsPort: 8083,
      wssPort: 443,
      forceTLS: true,
      enabledTransports: ["ws", "wss"],
      authEndpoint: `https://admin.goelitesport.com/broadcasting/auth`,
      auth: {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
      },
    })

    currentToken = token   
    window.Echo = echo
  }

  return echo
}