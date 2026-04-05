import { Link2, Send } from "lucide-react"

import player1 from "@/assets/images/player1.png"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  text: string
  time: string
  sender: "coach" | "player"
}

const messages: Message[] = [
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
]

export default function ChatInbox() {
  return (
    <div className="flex-2 flex h-[78vh] min-h-130 w-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#040510] text-white md:min-h-170">
      <header className="flex items-center gap-3 border-b border-white/10 bg-white/8 px-4 py-3 md:px-5 md:py-4">
        <img
          src={player1}
          alt="Shaun Murphy"
          className="size-9 rounded-lg object-cover md:size-10"
        />

        <div>
          <h3 className="text-base leading-none font-bold text-white ">
            Shaun Murphy
          </h3>
          <p className="mt-1 text-sm text-secondary/80 md:text-base">Coach</p>
        </div>
      </header>

      <ScrollArea className="flex-1 px-3 py-4 md:px-5 md:py-5">
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
                    <img
                      src={player1}
                      alt="Coach avatar"
                      className="mt-1 size-8 rounded-md object-cover"
                    />
                  ) : null}

                  <div
                    className={cn(
                      "rounded-2xl px-4 py-3 text-sm leading-6  ",
                      isCoach
                        ? "max-w-[85%] bg-white/10 text-white/90 md:max-w-[78%]"
                        : "max-w-[85%] bg-brand text-primary md:max-w-[70%]"
                    )}
                  >
                    {message.text}
                  </div>

                  {!isCoach ? (
                    <img
                      src={player1}
                      alt="Player avatar"
                      className="mt-1 size-8 rounded-md object-cover"
                    />
                  ) : null}
                </div>

                <p
                  className={cn(
                    "mt-2 text-[14px] text-white ",
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

      <div className="border-t border-white/10 bg-secondary/8 p-3 md:p-4">
        <div className="flex items-center gap-2 rounded-xl border border-secondary/50 bg-transparent p-2">
          <div className="relative flex-1">
            <Input
              placeholder="Type your message..."
              className="h-10 border-0 bg-transparent pr-11 text-sm text-white placeholder:text-secondary focus-visible:ring-0 md:h-11 md:text-base"
            />
            <button
              type="button"
              className="absolute top-1/2 right-2 -translate-y-1/2 text-secondary  transition hover:text-white"
            >
              <Link2 className="size-4" />
            </button>
          </div>

          <Button
            type="button"
            size="icon"
            className="size-10 rounded-xl bg-brand text-primary hover:bg-brand"
          >
            <Send className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
