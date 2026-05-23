"use client"

import { getEcho } from "@/lib/echo"
import { TChatMessage } from "@/types"
import { useEffect, useState, useRef } from "react"

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
  const [token, setToken] = useState<string | null>(null)
  const onMessageRef = useRef(onMessage)

  useEffect(() => {
    onMessageRef.current = onMessage
  }, [onMessage])

  useEffect(() => {
    const stored = localStorage.getItem("go_elite_token")
    if (stored) setToken(stored)
  }, [])

  useEffect(() => {
    const normalized = (
      Array.isArray(channelNames) ? channelNames : [channelNames]
    ).filter(Boolean)

    if (normalized.length === 0 || !token) return

    let mounted = true
    const channels: Array<{ name: string; channel: ChatChannel }> = []
    let echoInstance: ChatEcho | null = null
    const eventName = "ChatEvent"

    ;(async () => {
      // ✅ token pass করলে getEcho সবসময় fresh instance দেবে
      const e = (await getEcho(token)) as ChatEcho | null
      if (!e || !mounted) return
      echoInstance = e

      for (const name of normalized) {
        try {
          const channel = echoInstance.private(name)
          channels.push({ name, channel })
          console.log(`Listening to channel: ${name}`)

          const handleEvent = (event: ChatEventPayload) => {
            console.log("New event received:", event)
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
  }, [token])
}