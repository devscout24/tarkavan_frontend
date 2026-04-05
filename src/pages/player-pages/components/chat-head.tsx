import player1 from "@/assets/images/player1.png"
import player2 from "@/assets/images/player2.png"
import player3 from "@/assets/images/player3.png"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

type ChatItem = {
  id: string
  name: string
  message: string
  tag?: string
  time: string
  image: string
  isActive?: boolean
  isUnread?: boolean
}

const chatItems: ChatItem[] = [
  {
    id: "1",
    name: "Coach Thompson",
    message: '"The scouting report for Leo is ready..."',
    tag: "ACADEMY",
    time: "14:20",
    image: player1,
    isActive: true,
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

export default function ChatHead() {
  return (
    <div className="flex-1 overflow-hidden rounded-2xl border border-white/15 bg-[#040510] text-white">
      <div className="border-b border-white/10 px-4 py-2 lg:py-5 md:px-6">
        <h2 className="text-lg font-semibold tracking-tight text-white  ">
          Inboxes
        </h2>
        <p className="mt-1 text-sm text-secondary/65 ">
          2 New Messages
        </p>
      </div>

      <div className="hidden lg:block">
        {chatItems.map((chat) => (
          <article
            key={chat.id}
            className={cn(
              "relative border-b border-white/8 px-6 py-5 transition-colors cursor-pointer ",
              chat.isActive ? "bg-white/8" : "bg-transparent hover:bg-white/5"
            )}
          >
            {chat.isActive ? (
              <span className="absolute inset-y-0 left-0 w-1 bg-[#B8F66A]" />
            ) : null}

            <div className="flex items-start gap-4">
              <div className="relative shrink-0">
                <img
                  src={chat.image}
                  alt={chat.name}
                  className="size-14 rounded-md object-cover"
                />
                {chat.isUnread ? (
                  <span className="absolute -right-1 -bottom-1 size-3.5 rounded-full border-2 border-[#1E2230] bg-[#C8FA6A]" />
                ) : null}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h3
                    className={cn(
                      "truncate text-base font-medium",
                      chat.isActive ? "text-[#C8FA6A]" : "text-white/90"
                    )}
                  >
                    {chat.name}
                  </h3>
                  <span className="shrink-0 text-base text-white/60">
                    {chat.time}
                  </span>
                </div>

                <p
                  className={cn(
                    "mt-1 truncate text-[12px]",
                    chat.isActive ? "text-[#C8FA6A]/85" : "text-white/65"
                  )}
                >
                  {chat.message}
                </p>

                {chat.tag ? (
                  <span
                    className={cn(
                      "mt-3 inline-flex rounded-md px-2.5 py-1 text-xs font-semibold",
                      chat.isActive
                        ? "bg-[#C8FA6A] text-[#11141A]"
                        : "bg-[#3B3E49] text-white"
                    )}
                  >
                    {chat.tag}
                  </span>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="lg:hidden">
        <ScrollArea className="w-full">
          <div className="flex w-max gap-3 px-4 py-4">
            {chatItems.map((chat) => (
              <button
                key={chat.id}
                type="button"
                className={cn(
                  "w-25 shrink-0 rounded-xl border p-2.5 text-left transition-colors",
                  chat.isActive
                    ? "border-[#C8FA6A]/70 bg-white/8"
                    : "border-white/10 bg-transparent"
                )}
              >
                <div className="relative w-fit">
                  <img
                    src={chat.image}
                    alt={chat.name}
                    className="size-14 rounded-full object-cover"
                  />
                  {chat.isUnread ? (
                    <span className="absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 border-[#050614] bg-[#C8FA6A]" />
                  ) : null}
                </div>
                <p className="mt-2 truncate text-sm font-medium text-white/90">
                  {chat.name}
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
