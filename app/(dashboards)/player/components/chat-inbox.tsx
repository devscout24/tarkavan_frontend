import * as React from "react"
import { Link2, Send, FileText, Archive } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { ChatItem, ChatMessage } from "../messages/page"
import Image from "next/image"
 

type ChatInboxProps = {
  chat: ChatItem
  messages: ChatMessage[]
  onSendMessage: (payload: {
    text: string
    files: { name: string; url: string }[]
  }) => void
}

export default function ChatInbox({
  chat,
  messages,
  onSendMessage,
}: ChatInboxProps) {
  const [text, setText] = React.useState("")
  const [files, setFiles] = React.useState<{ name: string; url: string }[]>([])
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const messagesViewportRef = React.useRef<HTMLDivElement>(null)

  const getFileType = (filename: string) => {
    const ext = filename.split(".").pop()?.toLowerCase() || ""
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) return "image"
    if (["mp4", "webm", "mov", "avi"].includes(ext)) return "video"
    if (ext === "pdf") return "pdf"
    return "file"
  }

  const sendMessage = () => {
    if (!text.trim() && files.length === 0) return

    onSendMessage({ text: text.trim(), files })
    setText("")
    setFiles([])
    if (fileInputRef.current) fileInputRef.current.value = ""
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

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#040510] text-white lg:flex-1">
      <header className="flex items-center gap-3 border-b border-white/10 bg-white/8 px-4 py-3 md:px-5 md:py-4">
        <Image
          width={1000}
          height={1000}
          src={chat.image}
          alt={chat.name}
          className="size-9 rounded-lg object-cover md:size-10"
        />

        <div>
          <h3 className="text-base leading-none font-bold text-white">
            {chat.name}
          </h3>
          <p className="mt-1 text-sm text-white/50 md:text-base">
            {chat.tag ?? "Coach"}
          </p>
        </div>
      </header>

      <div ref={messagesViewportRef} className="min-h-0 flex-1">
        <ScrollArea className=" h-[40vh] xl:h-[70vh] px-3 py-4 md:px-5 md:py-5">
          <div className="space-y-6 pb-3">
            {messages.map((message) => {
              const isCoach = message.sender === "coach"

              return (
                <div key={message.id}>
                  <div
                    className={cn(
                      "flex items-start gap-3",
                      isCoach ? "justify-start" : "justify-end"
                    )}
                  >
                    {isCoach ? (
                      <Image
                        width={1000}
                        height={1000}
                        src={chat.image}
                        alt="Coach avatar"
                        className="mt-1 size-8 rounded-md object-cover"
                      />
                    ) : null}

                    <div
                      className={cn(
                        "rounded-2xl px-4 py-3 text-sm leading-6",
                        isCoach
                          ? "max-w-[85%] bg-white/10 text-white/90 md:max-w-[78%]"
                          : "max-w-[85%] bg-brand text-primary md:max-w-[70%]"
                      )}
                    >
                      {message.text ? <p>{message.text}</p> : null}
                      {message.files?.length ? (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {message.files.map((file) => {
                            const fileType = getFileType(file.name)
                            return (
                              <a
                                key={file.url}
                                href={file.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative overflow-hidden rounded-lg border border-white/20 transition hover:opacity-80"
                              >
                                {fileType === "image" && (
                                  <Image
                                    width={1000}
                                    height={1000}
                                    src={file.url}
                                    alt={file.name}
                                    className="h-24 w-24 object-cover"
                                  />
                                )}
                                {fileType === "video" && (
                                  <div className="flex h-24 w-24 items-center justify-center bg-black/30">
                                    <svg
                                      className="size-6 text-white"
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M8 5v14l11-7z" />
                                    </svg>
                                  </div>
                                )}
                                {fileType === "pdf" && (
                                  <div className="flex h-24 w-24 items-center justify-center bg-red-500/20">
                                    <FileText className="size-6 text-white" />
                                  </div>
                                )}
                                {fileType === "file" && (
                                  <div className="flex h-24 w-24 items-center justify-center bg-gray-500/20">
                                    <Archive className="size-6 text-white" />
                                  </div>
                                )}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                                  <span className="truncate px-2 text-xs text-white">
                                    {file.name}
                                  </span>
                                </div>
                              </a>
                            )
                          })}
                        </div>
                      ) : null}
                    </div>

                    {!isCoach ? (
                      <Image
                        src={chat.image}
                        alt="Player avatar"
                        width={1000}
                        height={1000}
                        className="mt-1 size-8 rounded-md object-cover"
                      />
                    ) : null}
                  </div>

                  <p
                    className={cn(
                      "mt-2 text-[14px] text-white",
                      isCoach ? "pl-11" : "pr-11 text-right"
                    )}
                  >
                    {message.time}
                  </p>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </div>

      <div className="border-t border-white/10 bg-secondary/8 p-3 md:p-4   ">
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
                  sendMessage()
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
            className="size-10 rounded-xl bg-brand text-primary hover:bg-brand"
            onClick={sendMessage}
          >
            <Send className="size-4" />
          </Button>
        </div>
        {files.length ? (
          <div className="mt-2 flex flex-wrap gap-2 px-1">
            {files.map((file) => {
              const fileType = getFileType(file.name)
              return (
                <div
                  key={file.url}
                  className="relative overflow-hidden rounded-lg"
                >
                  {fileType === "image" && (
                    <Image
                      src={file.url}
                      alt={file.name}
                      width={1000}
                      height={1000}
                      className="h-16 w-16 object-cover"
                    />
                  )}
                  {fileType === "video" && (
                    <div className="flex h-16 w-16 items-center justify-center bg-black/30">
                      <svg
                        className="size-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  )}
                  {fileType === "pdf" && (
                    <div className="flex h-16 w-16 items-center justify-center bg-red-500/20">
                      <FileText className="size-5 text-white" />
                    </div>
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
