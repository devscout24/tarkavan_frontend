type EchoChannel = {
  listen<TPayload>(event: string, callback: (payload: TPayload) => void): void
  stopListening(event: string): void
}

type EchoClient = {
  private(channelName: string): EchoChannel
  leave(channelName: string): void
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
    headers: {
      Authorization: string
    }
  }
}

declare global {
  interface Window {
    Echo: EchoClient | null
    Pusher: unknown
  }
}

let echo: EchoClient | null = null

export async function getEcho(token?: string): Promise<EchoClient | null> {
  if (!token) return null

  if (!echo && typeof window !== "undefined") {
    const [{ default: Echo }, { default: Pusher }] = (await Promise.all([
      import("laravel-echo"),
      import("pusher-js"),
    ])) as [
      { default: new (config: EchoConfig) => EchoClient },
      { default: unknown },
    ]

    window.Pusher = Pusher

    const EchoConstructor = Echo

    echo = new EchoConstructor({
      broadcaster: "reverb",
      key: process.env.NEXT_PUBLIC_REVERB_APP_KEY as string,
      wsHost: process.env.NEXT_PUBLIC_REVERB_HOST,
      wsPort: 8083,
      wssPort: 443,
      forceTLS: true,
      enabledTransports: ["ws", "wss"],
      authEndpoint: `https://${process.env.NEXT_PUBLIC_SOCKET_ENDPOINT}`,
      auth: { headers: { Authorization: `Bearer ${token}` } },
    })

    window.Echo = echo
  }

  return echo
}
