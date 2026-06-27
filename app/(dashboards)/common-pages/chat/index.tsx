"use client"

import ChatHead from "@/components/common/chat-head"
import ChatInbox from "@/components/common/chat-inbox"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import * as React from "react"
import { useChatListener } from "@/lib/useChatListener"
import { getChatList, getConversation, sendMessage } from "./action"
import { TChatHeadItem, TChatMessage } from "@/types"

export default function MessagePage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const receiver_chatId = searchParams.get("receiver_chatId")
  const [chatHeads, setChatHeads] = React.useState<TChatHeadItem[]>([]) 
  const [messages, setMessages] = React.useState<TChatMessage[]>([])
  const [activeConvId, setActiveConvId] = React.useState<string>(
    chatHeads.find((chat) => String(chat.receiver_id) === receiver_chatId)?.conversation_id || ""
  )
 
  // get chat heads
  React.useEffect(() => {
    const getChatHead = async () => {
      try {
        const res = await getChatList()
        if (
          res &&
          "success" in res &&
          res.success &&
          res.data &&
          "data" in res.data &&
          res.data.data
        ) {
          setChatHeads(res.data.data)
        }
      } catch (err) {
        console.error(err)
      }
    }

    getChatHead()
  }, [receiver_chatId])

  React.useEffect(() => {

    if(!activeConvId) return

    const getConv = async () => {
      try {
        const res = await getConversation(activeConvId)   
        if(res && "success" in res && res.success && res.data && "data" in res.data && res.data.data) {
          setMessages(res.data.data)
        }

      } catch (err) {
        console.error(err)
      }
    }

    getConv()
  } , [activeConvId])

  // set conv id when receiver_chatId changes
  React.useEffect(() => {
    const newConvId = chatHeads.find((chat) => String(chat.receiver_id) === receiver_chatId)?.conversation_id || ""
    setActiveConvId(newConvId)
  }, [receiver_chatId, chatHeads])
 
 
  const handleRealTimeMessage = React.useCallback(
    (message: TChatMessage ) => { 

      const msg: any  = message.message 
 
      const newMessage = {
        id: msg?.id,
        sender_id: msg?.sender_id,
        receiver_id: msg?.receiver_id, 
        conversation_id: msg?.conversation_id,
        message: msg?.message,
        image_id: msg?.image_id,
        image_url: msg?.image_url,
        sender_image: msg?.sender_image,
        receiver_image: msg?.receiver_image, 
        sender: {id: msg?.sender_id , name: msg?.sender_name , image: msg?.sender_image } ,
        receiver: {id: msg?.receiver_id , name: msg?.receiver_name , image: msg?.receiver_image }
      } 

      setMessages((currentMessages) => {
        return [...currentMessages, newMessage as unknown as TChatMessage]
      })  
    },
    [] // empty deps — reads latest state via refs, never goes stale
  )

  // Static channel list — no re-subscribe on conversationID change
  const listenerChannels = [`chat-conversation.${activeConvId}`]
  useChatListener(listenerChannels, handleRealTimeMessage)

  return (
    <section className="flex h-[90dvh] min-h-0 flex-col p-3">
      <div className="flex min-h-0 flex-1 flex-col gap-4 lg:flex-row">
        <ChatHead
          chats={chatHeads} 
          onSelectChat={(chatId: string) => { 
            const params = new URLSearchParams(searchParams.toString())
            params.set("receiver_chatId", chatId) 
            router.replace(`${pathname}?${params.toString()}`)
          }}
          setConversationID={setActiveConvId}
        />

        <ChatInbox 
          messages={messages}
          chatHead={chatHeads.find((chat) => String(chat.receiver_id) === receiver_chatId) as TChatHeadItem }
 
        />
      </div>
    </section>
  )
}
