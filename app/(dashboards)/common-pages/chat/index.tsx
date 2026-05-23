"use client"

import ChatHead from "@/components/common/chat-head"
import ChatInbox from "@/components/common/chat-inbox"
import { TChatItem } from "@/types"
import { useRouter, useSearchParams } from "next/navigation"
import * as React from "react"
import { getChatList, getConversation, sendMessage } from "./action"

export type ChatMessage = {
  id: string
  text?: string
  time: string
  is_me: boolean
  files?: { name: string; url: string }[]
}

export default function MessagePage() {
  const searchParams = useSearchParams()
  const receiver_chatId = searchParams.get("receiver_chatId")
  const initialReceiverData = localStorage.getItem("go_elite_message_receiver")
    ? JSON.parse(localStorage.getItem("go_elite_message_receiver") as string)
    : null
  const initialReceiver = React.useMemo(() => {
    if (!initialReceiverData) return null
    return {
      chat_id: Number(initialReceiverData.user_id) || 0,
      conversation_id: "",
      latest_time: "",
      message: "",
      user_name: String(initialReceiverData.name || ""),
      receiver_id: Number(initialReceiverData.user_id) || 0,
      user_image: String(initialReceiverData.image || ""),
      my_image: "",
      chat_image: "",
      image_id: "",
      unread_count: 0,
    }
  }, [initialReceiverData])

  const [activeChatId, setActiveChatId] = React.useState<string>(
    receiver_chatId ?? String(initialReceiver?.receiver_id ?? "")
  )
  const router = useRouter()
  const [conversationID, setConversationID] = React.useState<string>("")
  const [chatList, setChatList] = React.useState<TChatItem[]>(() =>
    initialReceiver ? [initialReceiver] : []
  )
  const [messages, setMessages] = React.useState<ChatMessage[]>([])

  React.useEffect(() => {
    if (!activeChatId) return

    const params = new URLSearchParams(searchParams.toString())

    if (params.get("receiver_chatId") === activeChatId) return

    params.set("receiver_chatId", activeChatId)

    router.replace(`?${params.toString()}`)
  }, [activeChatId, router, searchParams])
 

  // load conversation when conversation id changes
  React.useEffect(() => {
    if (!conversationID) return

    const loadConversation = async () => {
      try {
        const res = await getConversation(conversationID) 
        if (res && "success" in res && res.success && res.data?.data) {
          const msgs = (res.data.data ?? []) as ChatMessage[]
          setMessages(msgs)
        } else {
          setMessages([])
        }
      } catch (err) {
        console.error("Error fetching conversation:", err)
        setMessages([])
      }
    }

    loadConversation()
  }, [conversationID])

  // load chat list
  React.useEffect(() => {
    const loadChatList = async () => {
      try {
        const res = await getChatList()
        if (res && "success" in res && res.success && res.data?.data) {
          setChatList(res.data.data as TChatItem[])
        }
      } catch (err) {
        console.error("Error fetching chat list:", err)
      }
    }

    loadChatList()
  }, [conversationID])

  // update chat list
  React.useEffect(() => {
    if (chatList.length === 0) return

    const exists = chatList.some(
      (c) => String(c.receiver_id) === String(activeChatId)
    )

    if (!exists && initialReceiver) {
      setChatList((prev) => [
        ...prev,
        { ...initialReceiver, conversation_id: conversationID },
      ])
    }
  }, [chatList, activeChatId, conversationID, initialReceiver])

 console.log(messages)

  return (
    <section className="flex h-[90dvh] min-h-0 flex-col p-3">
      <div className="flex min-h-0 flex-1 flex-col gap-4 lg:flex-row">
        <ChatHead
          chats={chatList}
          activeChatId={activeChatId}
          onSelectChat={setActiveChatId}
          setConversationID={setConversationID}
        />
        <ChatInbox
          chat={
            chatList.find(
              (chat) => String(chat.receiver_id) === activeChatId
            ) ?? chatList[0]
          }
          messages={messages} 
          setConversationID={setConversationID}
          activeChatId={activeChatId}
        />
      </div>
    </section>
  )
}
