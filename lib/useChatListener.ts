"use client"

import isValidToken from "@/lib/isValid-token"
import { TChatMessage } from "@/types"
import { useEffect, useRef, useState } from "react"
import { getEcho } from "./echo"

type ChatEventPayload = TChatMessage

type ChatChannel = {
  listen<TPayload>(event: string, callback: (payload: TPayload) => void): void
  stopListening(event: string): void
}

type ChatEcho = {
  private(channelName: string): ChatChannel
  leave(channelName: string): void
  disconnect(): void
}

export function useChatListener(
  channelNames: string | string[],
  onMessage: (message: ChatEventPayload) => void
) {
  const normalizedChannels = (
    Array.isArray(channelNames) ? channelNames : [channelNames]
  ).filter((name) => Boolean(name) && !name.endsWith(".")) // FIX: guard against empty/invalid channel names

  const channelKey = normalizedChannels.join("|")

  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === "undefined") return null
    const storedToken = localStorage.getItem("go_elite_token")
    return storedToken && isValidToken(storedToken) ? storedToken : null
  })

  const onMessageRef = useRef(onMessage)

  useEffect(() => {
    onMessageRef.current = onMessage
  }, [onMessage])

  useEffect(() => {
    const syncToken = () => {
      const storedToken = localStorage.getItem("go_elite_token")
      const good = storedToken && isValidToken(storedToken) ? storedToken : null
      setToken((prev) => (prev !== good ? good : prev)) // FIX: only update if actually changed
    }

    syncToken()

    // FIX: was 300ms — caused constant re-subscription loops on hosted servers
    const intervalId = window.setInterval(syncToken, 30_000)
    window.addEventListener("storage", syncToken)

    return () => {
      window.clearInterval(intervalId)
      window.removeEventListener("storage", syncToken)
    }
  }, [])

  useEffect(() => {
    if (normalizedChannels.length === 0 || !token) return

    let mounted = true
    const channels: Array<{ name: string; channel: ChatChannel }> = []
    let echoInstance: ChatEcho | null = null
    const eventName = "ChatEvent"

    ;(async () => {
      const e = (await getEcho(token)) as ChatEcho | null
      if (!e || !mounted) return
      echoInstance = e

      for (const name of normalizedChannels) {
        // FIX: double-check each name before subscribing
        if (!name || name.endsWith(".")) continue

        try {
          const channel = echoInstance.private(name)
          channels.push({ name, channel })

          const handleEvent = (event: ChatEventPayload) => {
            onMessageRef.current(event)
          }

          channel.listen<ChatEventPayload>(eventName, handleEvent)
          channel.listen<ChatEventPayload>(`.${eventName}`, handleEvent)
        } catch (err) {
          console.error(`Failed to subscribe to channel ${name}:`, err)
        }
      }
    })()

    return () => {
      mounted = false
      try {
        for (const { name, channel } of channels) {
          channel.stopListening(eventName)
          channel.stopListening(`.${eventName}`)
          echoInstance?.leave(name)
        }
      } catch {
        // ignore cleanup errors
      }
    }
  }, [token, channelKey])
}













// "use client"

// import isValidToken from "@/lib/isValid-token"
// import { TChatMessage } from "@/types"
// import { useEffect, useRef, useState } from "react"
// import { getEcho } from "./echo"

// type ChatEventPayload = TChatMessage

// type ChatChannel = {
//   listen<TPayload>(event: string, callback: (payload: TPayload) => void): void
//   stopListening(event: string): void
// }

// type ChatEcho = {
//   private(channelName: string): ChatChannel
//   leave(channelName: string): void
//   disconnect(): void
// }

// export function useChatListener(
//   channelNames: string | string[],
//   onMessage: (message: ChatEventPayload) => void
// ) {
//   const normalizedChannels = (
//     Array.isArray(channelNames) ? channelNames : [channelNames]
//   ).filter(Boolean)
//   const channelKey = normalizedChannels.join("|")

//   const [token, setToken] = useState<string | null>(() => {
//     if (typeof window === "undefined") return null

//     const storedToken = localStorage.getItem("go_elite_token")
//     return storedToken && isValidToken(storedToken) ? storedToken : null
//   })
//   const onMessageRef = useRef(onMessage) 

//   useEffect(() => {
//     onMessageRef.current = onMessage
//   }, [onMessage])

//   useEffect(() => {
//     const syncToken = () => {
//       const storedToken = localStorage.getItem("go_elite_token")
//       const good = storedToken && isValidToken(storedToken) ? storedToken : null
//       if (good !== token)  
//       setToken(good)
//     }

//     syncToken()

//     const intervalId = window.setInterval(syncToken, 300)
//     window.addEventListener("storage", syncToken)

//     return () => {
//       window.clearInterval(intervalId)
//       window.removeEventListener("storage", syncToken)
//     }
//   }, [])

//   useEffect(() => {
//     if (normalizedChannels.length === 0 || !token) return

//     let mounted = true
//     const channels: Array<{ name: string; channel: ChatChannel }> = []
//     let echoInstance: ChatEcho | null = null
//     const eventName = "ChatEvent"

//     ;(async () => {
//       const e = (await getEcho(token)) as ChatEcho | null
//       if (!e || !mounted) return
//       echoInstance = e

 

//       for (const name of normalizedChannels) {
//         try {
//           const channel = echoInstance.private(name)
//           channels.push({ name, channel })

//           const handleEvent = (event: ChatEventPayload) => { 
//             onMessageRef.current(event)
//           }

//           channel.listen<ChatEventPayload>(eventName, handleEvent)
//           channel.listen<ChatEventPayload>(`.${eventName}`, handleEvent)
//         } catch (err) {
//           console.error(`Failed to subscribe to channel ${name}:`, err)
//         }
//       }
//     })()

//     return () => {
//       mounted = false
//       try {
//         for (const { name, channel } of channels) {
//           channel.stopListening(eventName)
//           channel.stopListening(`.${eventName}`)
//           echoInstance?.leave(name)
//         }
//       } catch {
//         // ignore cleanup errors
//       }
//     }
//   }, [token, channelKey])
// }
