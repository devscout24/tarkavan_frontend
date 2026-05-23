"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { resolveAssetUrl } from "@/lib/url-utils"
import { MapPin } from "lucide-react"
import Image from "next/image"
import { BiMessageSquareDetail } from "react-icons/bi"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

type ProgramCoachCardProps = {
  name?: string
  highlightedName?: string
  role?: string
  bio?: string
  tags?: string[]
  imageUrl?: string
  imageAlt?: string
  verified?: boolean
  verifiedLabel?: string
  messageLabel?: string
  location?: string
  showMessageButton?: boolean
  className?: string
  chatId?: string
  provider?: {
    type: string
    id: number
    user_id: number
    name: string
    image: string
    city: string
    country: string
    is_verified: boolean
    email: string
    is_program_maker: boolean
  }
}

const defaultTags: string[] = []

export default function ProgramCoachCard({
  name,
  role,
  bio,
  tags = defaultTags,
  imageUrl = "/images/coach.png",
  imageAlt = "Program coach",
  verified = true,
  verifiedLabel = "VERIFIED",
  messageLabel = "Message Coach",
  location,
  showMessageButton = true,
  className,
  chatId,
  provider,
}: ProgramCoachCardProps) {
  const router = useRouter()
  const user = localStorage.getItem("go_elite_user")
    ? JSON.parse(localStorage.getItem("go_elite_user") as string)
    : null

  const handleMessageRedirect = async () => {
    if (!user) {
      router.push("/login")
      toast.error("Session expired. Please login to send a message")
      return
    }

    if (!chatId) {
      toast.error("Chat ID is missing. Cannot redirect to messaging.")
      return
    }

    localStorage.setItem("go_elite_message_receiver", JSON.stringify(provider))

    router.push(`/${user.role}/messages?receiver_chatId=${chatId}`)
  }

  return (
    <Card
      className={cn(
        "w-full overflow-hidden rounded-2xl border border-white/40 bg-[#171a26] p-0 ring-0",
        className
      )}
    >
      <div className="relative max-h-100">
        <Image
          width={1000}
          height={1000}
          src={resolveAssetUrl(imageUrl) || "/images/coach.png"}
          alt={imageAlt}
          className="min-h-100 w-full object-cover object-center"
        />

        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/95 via-black/40 to-black/20" />

        {verified && (
          <Badge className="absolute top-4 left-4 h-auto rotate-2 -skew-2 rounded-[5px] bg-brand px-3 py-1 text-xs font-bold tracking-wide text-black italic">
            {verifiedLabel}
          </Badge>
        )}

        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="text-[32px]! leading-[0.95] font-extrabold text-white">
            {name}
          </h3>

          <p className="mt-1 text-base font-medium text-white">{role}</p>

          {location ? (
            <div className="mt-1 flex items-center gap-1.5 text-base text-white/40">
              <MapPin className="h-4 w-4" />
              <p>{location}</p>
            </div>
          ) : bio ? (
            <p className="mt-1 text-base leading-7 text-white/40">{bio}</p>
          ) : null}

          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-white/40/60 rounded-md px-2 py-1 text-[10px] font-medium text-white"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {showMessageButton && (
            <Button
              type="button"
              onClick={handleMessageRedirect}
              className="mt-4 h-12 w-full cursor-pointer rounded-lg bg-brand text-base font-semibold text-black hover:bg-brand"
            >
              <BiMessageSquareDetail />
              {messageLabel}
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
