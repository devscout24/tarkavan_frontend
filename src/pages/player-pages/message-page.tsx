"use client"

import * as React from "react"

import player1 from "@/assets/images/player1.png"
import player2 from "@/assets/images/player2.png"
import player3 from "@/assets/images/player3.png"

import ChatHead from "./components/chat-head"
import ChatInbox from "./components/chat-inbox"

export type ChatItem = {
  id: string
  name: string
  message: string
  tag?: string
  time: string
  image: string
  isUnread?: boolean
}

export type ChatMessage = {
  id: string
  text?: string
  time: string
  sender: "coach" | "player"
  files?: { name: string; url: string }[]
}

const chats: ChatItem[] = [
  {
    id: "1",
    name: "Coach Thompson",
    message: '"The scouting report for Leo is ready..."',
    tag: "ACADEMY",
    time: "14:20",
    image: player1,
    isUnread: true,
  },
  {
    id: "2",
    name: "Elite Clubs Intl.",
    message: "Please confirm travel arrangements for ...",
    tag: "ADMIN",
    time: "Yesterday",
    image: player2,
  },
  {
    id: "3",
    name: "Recruiter",
    message: "Great performance at the regional camp...",
    time: "Mar 12",
    image: player3,
  },
]

const initialMessages: Record<string, ChatMessage[]> = {
  "1": [
    {
      id: "1",
      sender: "coach",
      text: "Hello Mr. Henderson, I've finished reviewing Leo's latest performance data from the state qualifiers. He showed exceptional explosiveness in the third quarter.",
      time: "Yesterday 2:30 PM",
    },
    {
      id: "2",
      sender: "player",
      text: "That's great to hear, Coach. We've been working on his vertical leap specifically. Have you had a chance to look at the scholarship availability for the DI programs we discussed?",
      time: "Yesterday 4:15 PM",
    },
    {
      id: "3",
      sender: "coach",
      text: "Yes, I've compiled a full scouting report with the specific DI leads. I'm attaching the PDF now for your review. Leo's profile is currently trending in the top 5% for his age group.",
      time: "2 hours ago",
    },
  ],
}

export default function MessagePage() {
  const [activeChatId, setActiveChatId] = React.useState(chats[0]?.id ?? "")
  const [messagesByChat, setMessagesByChat] = React.useState(initialMessages)

  return (
    <section className="flex h-[90dvh] min-h-0 flex-col p-3">
      <div className="flex min-h-0 flex-1 flex-col gap-4 lg:flex-row">
        <ChatHead
          chats={chats}
          activeChatId={activeChatId}
          onSelectChat={setActiveChatId}
        />
        <ChatInbox
          chat={chats.find((chat) => chat.id === activeChatId) ?? chats[0]}
          messages={messagesByChat[activeChatId] ?? []}
          onSendMessage={(payload) => {
            setMessagesByChat((prev) => ({
              ...prev,
              [activeChatId]: [
                ...(prev[activeChatId] ?? []),
                {
                  id: crypto.randomUUID(),
                  sender: "player",
                  text: payload.text,
                  files: payload.files,
                  time: "Just now",
                },
              ],
            }))
          }}
        />
      </div>
    </section>
  )
}
