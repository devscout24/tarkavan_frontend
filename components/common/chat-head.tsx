import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

import { cn } from "@/lib/utils" 
import { TChatItem } from "@/types"
import moment from "moment"

type ChatHeadProps = {
  chats: TChatItem[]
  activeChatId: string
  onSelectChat: (chatId: string) => void
  setConversationID: (conversationId: string) => void
}

export default function ChatHead({
  chats,
  activeChatId,
  onSelectChat,
  setConversationID,
}: ChatHeadProps) {



  

  return (
    <div className="h-fit overflow-hidden rounded-2xl border border-white/15 text-white lg:flex lg:min-h-0 lg:flex-1 lg:flex-col">
      <div className="border-b border-white/10 px-4 py-2 md:px-6 lg:py-5">
        <h2 className="text-lg font-semibold tracking-tight text-white">
          Inboxes
        </h2>
        {/* <p className="mt-1 text-sm text-secondary/65">
          {0} New Messages
        </p> */}
      </div>

      <ScrollArea className="hidden lg:block lg:min-h-0 lg:flex-1">
        <div className="flex flex-col">
          {chats.map((chat) => (
            <article
              key={chat.conversation_id}
              className={cn(
                "relative cursor-pointer border-b border-white/8 px-6 py-5 transition-colors",
                activeChatId === chat.conversation_id
                  ? "bg-white/8"
                  : "bg-transparent hover:bg-white/5"
              )}
              onClick={() => {
                onSelectChat(String(chat.receiver_id))
                setConversationID(chat.conversation_id)
              }}
            >
              {String(activeChatId) === String(chat.receiver_id) ? (
                <span className="absolute inset-y-0 left-0 w-1 bg-[#B8F66A]" />
              ) : null} 

              <div className="flex items-start gap-4">
                <div className="relative shrink-0">
                  <img
                    src={chat.user_image}
                    alt={chat.user_name}
                    className="size-14 rounded-md object-cover"
                  />
                  {chat.unread_count > 0 ? (
                    <span className="absolute -right-1 -bottom-1 size-3.5 rounded-full border-2 border-[#1E2230] bg-[#C8FA6A]" />
                  ) : null}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3
                      className={cn(
                        "truncate text-base font-medium",
                        activeChatId === chat.conversation_id
                          ? "text-[#C8FA6A]"
                          : "text-white/90"
                      )}
                    >
                      {chat.user_name}
                    </h3>
                    <span className="shrink-0 text-base text-white/60">
                      {moment.utc(chat.latest_time).local().fromNow()}
                    </span>
                  </div>

                  <p
                    className={cn(
                      "mt-1 truncate text-[12px]",
                      activeChatId === chat.conversation_id
                        ? "text-[#C8FA6A]/85"
                        : "text-white/65"
                    )}
                  >
                    {chat.message}
                  </p>

 
                </div>
              </div>
            </article>
          ))}
        </div>
      </ScrollArea>

      <div className="h-fit lg:hidden">
        <ScrollArea className="w-full">
          <div className="flex w-max gap-3 px-4 py-4">
            {chats.map((chat) => (
              <button
                key={chat.conversation_id}
                type="button"
                onClick={() => onSelectChat(chat.conversation_id)}
                className={cn(
                  "w-25 shrink-0 rounded-xl border p-2.5 text-left transition-colors",
                  activeChatId === chat.conversation_id
                    ? "border-[#C8FA6A]/70 bg-white/8"
                    : "border-white/10 bg-transparent"
                )}
              >
                <div className="relative w-fit">
                  <img
                    src={chat.user_image}
                    alt={chat.user_name}
                    className="size-14 rounded-full object-cover"
                  />
                  {chat.unread_count > 0 ? (
                    <span className="absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 border-[#050614] bg-[#C8FA6A]" />
                  ) : null}
                </div>
                <p className="mt-2 truncate text-sm font-medium text-white/90">
                  {chat.user_name}
                </p>
              </button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  )
}
