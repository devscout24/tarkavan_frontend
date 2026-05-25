"use client"

import ChatHead from "@/components/common/chat-head"
import ChatInbox from "@/components/common/chat-inbox"
import { TChatItem, TChatMessage } from "@/types"
import { useRouter, useSearchParams } from "next/navigation"
import * as React from "react"
import { useChatListener } from "@/lib/useChatListener"
import { getChatList, getConversation, sendMessage } from "./action"

const getChatIdentity = (chat: TChatItem) =>
  String(chat.receiver_id || chat.chat_id)

const dedupeChats = (items: TChatItem[]) => {
  const chatsById = new Map<string, TChatItem>()

  for (const chat of items) {
    const identity = getChatIdentity(chat)
    const existingChat = chatsById.get(identity)

    if (!existingChat) {
      chatsById.set(identity, chat)
      continue
    }

    const existingHasConversation = Boolean(existingChat.conversation_id)
    const currentHasConversation = Boolean(chat.conversation_id)

    if (!existingHasConversation && currentHasConversation) {
      chatsById.set(identity, chat)
      continue
    }

    if (existingChat.latest_time < chat.latest_time) {
      chatsById.set(identity, chat)
    }
  }

  return Array.from(chatsById.values())
}

export default function MessagePage() {
  const user = localStorage.getItem("go_elite_user")
    ? JSON.parse(localStorage.getItem("go_elite_user") as string)
    : null
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
  const [messages, setMessages] = React.useState<TChatMessage[]>([])
 
  // --- FIX: refs so handleRealTimeMessage always reads latest values ---
  const conversationIDRef = React.useRef(conversationID)
  const activeChatIdRef = React.useRef(activeChatId)

  React.useEffect(() => {
    conversationIDRef.current = conversationID
  }, [conversationID])

  React.useEffect(() => {
    activeChatIdRef.current = activeChatId
  }, [activeChatId])
  // ---------------------------------------------------------------------

  React.useEffect(() => {
    if (!activeChatId || conversationIDRef.current) return

    const activeChat = chatList.find(
      (chat) => getChatIdentity(chat) === activeChatId
    )

    if (activeChat?.conversation_id) {
      setConversationID(activeChat.conversation_id)
    }
  }, [activeChatId, chatList])

  React.useEffect(() => {
    const handleMessageDeleted = (event: Event) => {
      const customEvent = event as CustomEvent<{ messageId?: string }>
      const messageId = customEvent.detail?.messageId

      if (!messageId) return

      setMessages((currentMessages) =>
        currentMessages.filter((message) => message.id !== messageId)
      )
    }

    window.addEventListener("chat-message-deleted", handleMessageDeleted)

    return () => {
      window.removeEventListener("chat-message-deleted", handleMessageDeleted)
    }
  }, [])

  const handleRealTimeMessage = React.useCallback(
    (message: TChatMessage) => {
      const msg = message.message

      setMessages((currentMessages) => {
        return [...currentMessages, msg as unknown as TChatMessage]
      })

      // Read latest values from refs — never stale
      const currentConversationID = conversationIDRef.current
      const currentActiveChatId = activeChatIdRef.current

      setChatList((currentChats) => {
        const nextChats = currentChats.map((chat) => {
          const matchesChat =
            (message.conversation_id &&
              chat.conversation_id === message.conversation_id) ||
            String(chat.receiver_id) === String(message.sender_id) ||
            String(chat.receiver_id) === String(message.receiver_id)

          return matchesChat
            ? {
                ...chat,
                conversation_id:
                  message.conversation_id || chat.conversation_id,
                message: message.message,
                latest_time: message.created_at,
              }
            : chat
        })

        return dedupeChats(nextChats)
      })

      // If we don't have a conversationID yet, grab it from the incoming message
      if (message.conversation_id && !conversationIDRef.current) {
        setConversationID(message.conversation_id)
      }

      const belongsToActiveChat =
        (message.conversation_id &&
          message.conversation_id === currentConversationID) ||
        String(message.sender_id) === currentActiveChatId ||
        String(message.receiver_id) === currentActiveChatId

      if (!belongsToActiveChat) return

      setMessages((currentMessages) => {
        if (currentMessages.some((existing) => existing.id === message.id)) {
          return currentMessages
        }
        return [...currentMessages, message]
      })
    },
    [] // empty deps — reads latest state via refs, never goes stale
  )

  // Static channel list — no re-subscribe on conversationID change
  const listenerChannels = [`chat-conversation.${conversationID}`]
  useChatListener(listenerChannels, handleRealTimeMessage)

  React.useEffect(() => {
    if (!activeChatId) return

    const params = new URLSearchParams(searchParams.toString())

    if (params.get("receiver_chatId") === activeChatId) return

    params.set("receiver_chatId", activeChatId)

    router.replace(`?${params.toString()}`)
  }, [activeChatId, router, searchParams])

  // Load conversation when conversationID changes
  React.useEffect(() => {
    if (!conversationID) return

    setMessages([])

    const loadConversation = async () => {
      try {
        const res = await getConversation(conversationID)
        if (res && "success" in res && res.success && res.data?.data) {
          const msgs = (res.data.data ?? []) as TChatMessage[]
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

  // Load chat list on mount
  React.useEffect(() => {
    const loadChatList = async () => {
      try {
        const res = await getChatList()

        if (res && "success" in res && res.success && res.data?.data) {
          const fetchedChats = res.data.data as TChatItem[]
          setChatList((prev) =>
            dedupeChats([
              ...(initialReceiver ? [initialReceiver] : []),
              ...fetchedChats,
              ...prev.filter(
                (chat) =>
                  !fetchedChats.some(
                    (fetchedChat) =>
                      getChatIdentity(fetchedChat) === getChatIdentity(chat)
                  )
              ),
            ])
          )
        }
      } catch (err) {
        console.error("Error fetching chat list:", err)
      }
    }

    loadChatList()
  }, [])

  // Keep initialReceiver in chat list if not already present
  React.useEffect(() => {
    if (!initialReceiver) return

    const receiverIdentity = getChatIdentity(initialReceiver)
    const exists = chatList.some(
      (chat) => getChatIdentity(chat) === receiverIdentity
    )

    if (!exists) {
      setChatList((prev) =>
        dedupeChats([
          ...prev,
          { ...initialReceiver, conversation_id: conversationID },
        ])
      )
    }
  }, [chatList, conversationID, initialReceiver])

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
          userId={String(user?.id)}
        />
      </div>
    </section>
  )
}
