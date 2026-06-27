 

import * as React from "react"
import { Link2, Send, Archive } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

import Image from "next/image"
import {   TChatHeadItem, TChatMessage } from "@/types"
import { sendMessage } from "@/app/(dashboards)/common-pages/chat/action"
import ChatDeleteTime from "./chat-delete-time"
import { toast } from "sonner"

type ChatInboxProps = { 
  messages: TChatMessage[]  
  chatHead: TChatHeadItem
}

export default function ChatInbox({ 
  chatHead ,
  messages, 
}: ChatInboxProps) {
  const [text, setText] = React.useState("")
  const [files, setFiles] = React.useState<{ name: string; url: string }[]>([])
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const messagesViewportRef = React.useRef<HTMLDivElement>(null)

  const getFileType = (filename: string) => {
    const ext = filename.split(".").pop()?.toLowerCase() || ""
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) return "image"
    return "file"
  }

  const handleSendMessage = async (payload: {
    message: string
    files: { name: string; url: string }[]
  }) => {

 
    try {
      const formData = new FormData()
      formData.append("receiver_id", String(chatHead?.receiver_id))
      formData.append("message", payload.message)
      formData.append("image", payload.files[0]?.url || "")

      const res = await sendMessage(formData)
      if (
        res &&
        "success" in res &&
        res.success &&
        res.data &&
        "data" in res.data &&
        res.data.data
      ) {
        setText("")
        setFiles([])
        if (fileInputRef.current) fileInputRef.current.value = "" 
      }

      if (res?.message) {
        toast.error(res.message)
      }
    } catch (err) {
      console.error("Error sending message:", err)
    }
  }

  const scrollToBottom = React.useCallback(() => {
    const viewport = messagesViewportRef.current?.querySelector(
      "[data-slot='scroll-area-viewport']"
    ) as HTMLDivElement | null

    if (!viewport) return

    viewport.scrollTo({
      top: viewport.scrollHeight,
      behavior: "smooth",
    })
  }, [])

  React.useEffect(() => {
    requestAnimationFrame(scrollToBottom)
  }, [messages, scrollToBottom])

  const [userId , setUserId] = React.useState<string>("")
  React.useEffect(()=> { 
    const userData = localStorage.getItem("go_elite_user")
    if(userData) {
      const user = JSON.parse(userData)
      setUserId(String(user.id))
    }  
  } , [])
 

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#040510] text-white lg:flex-1">
      <header className="flex items-center gap-3 border-b border-white/10 bg-white/8 px-4 py-3 md:px-5 md:py-4">
        <Image
          width={1000}
          height={1000}
          src={chatHead?.user_image || "/images/coach.png"}
          alt={chatHead?.user_name || "Chat avatar"}
          className="h-10 w-10 rounded-lg object-cover"
        />

        <div>
          <h3 className="text-base leading-none font-bold text-white">
            {chatHead?.user_name}
          </h3> 
        </div>
      </header>

      <div ref={messagesViewportRef} className="min-h-0 flex-1">
        <ScrollArea className="h-[45vh] px-3 py-4 md:px-5 md:py-5 xl:h-[70vh]">
          <div className="space-y-6 pb-3">
            {messages && messages.length > 0 && messages.map((message, i) => {
              const isMe = String(message.sender_id) === userId 

              return (
                <div key={i}>
                  <div
                    className={cn(
                      "flex items-end gap-3",
                      isMe ? "flex-row-reverse" : "flex-row"
                    )}
                  >
                    <Image
                      width={1000}
                      height={1000}
                      src={message?.sender_image || "/images/coach.png"}
                      alt={message?.sender.name || "Chat avatar"}
                      className="mt-1 h-4 w-4 rounded-md object-cover"
                    />

                    <div
                      className={cn(
                        "rounded-2xl px-4 py-3 text-sm leading-6",
                        isMe
                          ? "max-w-[85%] bg-white/10 text-white/90 md:max-w-[78%]"
                          : "max-w-[85%] bg-brand text-primary md:max-w-[70%]"
                      )}
                    >
                      {message.message ? (
                        <p
                          className={`${isMe ? "text-white!" : "text-primary!"}`}
                        >
                          {message.message}
                        </p>
                      ) : null}

                      <ChatDeleteTime message={message} isMe={isMe} />
                    </div>
                  </div>
                </div>
              ) 
            })}
          </div>
        </ScrollArea>
      </div>

      <div className="border-t border-white/10 bg-secondary/8 p-3 md:p-4">
        <div className="flex items-center gap-2 rounded-xl border border-secondary/50 bg-transparent p-2">
          <div className="relative flex-1">
            <Input
              placeholder="Type your message..."
              className="h-10 border-0 bg-transparent pr-11 text-sm text-white placeholder:text-white/50 focus-visible:ring-0 md:h-11 md:text-base"
              value={text}
              onChange={(event) => setText(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault()
                  handleSendMessage({ message: text.trim(), files })
                }
              }}
            />
            <button
              type="button"
              className="absolute top-1/2 right-2 -translate-y-1/2 text-secondary transition hover:text-white"
              onClick={() => fileInputRef.current?.click()}
            >
              <Link2 className="size-4" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(event) => {
                const nextFiles = Array.from(event.target.files ?? []).map(
                  (file) => ({
                    name: file.name,
                    url: URL.createObjectURL(file),
                  })
                )
                setFiles((prev) => [...prev, ...nextFiles])
              }}
            />
          </div>

          <Button
            type="button"
            size="icon"
            className="z-2 size-10 rounded-xl bg-brand text-primary hover:bg-brand"
            onClick={() => handleSendMessage({ message: text.trim(), files })}
          >
            <Send className="size-4" />
          </Button>
        </div>
        {files.length ? (
          <div className="mt-2 flex flex-wrap gap-2 px-1">
            {files.map((file, index) => {
              const fileType = getFileType(file.name)
              return (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-lg"
                >
                  {fileType === "image" && (
                    <Image
                      src={encodeURI(file.url)}
                      alt={file.name}
                      width={1000}
                      height={1000}
                      className="h-16 w-16 object-cover"
                    />
                  )}
                  {fileType === "file" && (
                    <div className="flex h-16 w-16 items-center justify-center bg-gray-500/20">
                      <Archive className="size-5 text-white" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ) : null}
      </div>
    </div>
  )
}
