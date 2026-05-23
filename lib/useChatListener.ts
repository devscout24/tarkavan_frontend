"use client"

import { getEcho } from "@/lib/echo"
import { TMessage } from "@/types"
import { useEffect, useState, useRef } from "react"

type ChatEventPayload = TMessage

type ChatChannel = {
  listen<TPayload>(event: string, callback: (payload: TPayload) => void): void
  stopListening(event: string): void
}

type ChatEcho = {
  private(channelName: string): ChatChannel
  leave(channelName: string): void
}

export function useChatListener(
  chatId: number,
  onMessage: (message: ChatEventPayload) => void
) {
  const [token, setToken] = useState<string | null>(null)
  const onMessageRef = useRef(onMessage)

  useEffect(() => {
    onMessageRef.current = onMessage
  }, [onMessage])

  useEffect(() => {
    const token = localStorage.getItem("go_elite_token")
    if (token) setToken(token)
  }, [])

  useEffect(() => {
    if (!chatId || chatId === 0 || !token) return

    let mounted = true
    let channel: ChatChannel | null = null
    let echoInstance: ChatEcho | null = null
    const channelName = `chat-conversation.${chatId}`
    const eventName = "ChatEvent"

    ;(async () => {
      const e = (await getEcho(token)) as ChatEcho | null
      if (!e || !mounted) return
      echoInstance = e

      channel = echoInstance.private(channelName)
      console.log(`Listening to channel: ${channelName}`)

      channel.listen<ChatEventPayload>(eventName, (event) => {
        console.log("New event received:", event)
        onMessageRef.current(event)
      })
    })()

    return () => {
      mounted = false
      console.log(`Disconnecting from channel: ${channelName}`)
      try {
        channel?.stopListening(eventName)
        echoInstance?.leave(`private-${channelName}`)
      } catch (err) {
        // ignore cleanup errors
      }
    }
  }, [chatId, token])
}
