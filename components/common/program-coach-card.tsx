import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { MapPin } from "lucide-react"
import Image from "next/image"
import { BiMessageSquareDetail } from "react-icons/bi"

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
  onMessageCoach?: () => void
  location?: string
  showMessageButton?: boolean
  className?: string
}

const defaultTags: string[] = []

export default function ProgramCoachCard({
  name = "SHAHIN",
  role = "Head Performance Coach",
  bio,
  tags = defaultTags,
  imageUrl = "/images/coach.png",
  imageAlt = "Program coach",
  verified = true,
  verifiedLabel = "VERIFIED",
  messageLabel = "Message Coach",
  onMessageCoach,
  location,
  showMessageButton = true,
  className,
}: ProgramCoachCardProps) {
  return (
    <Card
      className={cn(
        "w-full overflow-hidden rounded-2xl border border-white/40 bg-[#171a26] p-0 ring-0",
        className
      )}
    >
      <div className="relative">
        <Image
          width={1000}
          height={1000}
          src={imageUrl}
          alt={imageAlt}
          className="w-full object-cover object-center"
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
          ) : (
            bio ?
            <p className="mt-1 text-base leading-7 text-white/40">{bio}</p>
            :
            null
          )}

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
        </div>
      </div>

      {showMessageButton && (
        <div className="p-4 pt-3">
          <Button
            type="button"
            onClick={onMessageCoach}
            className="h-12 w-full rounded-lg bg-brand text-base font-semibold text-black hover:bg-brand"
          >
            <BiMessageSquareDetail />
            {messageLabel}
          </Button>
        </div>
      )}
    </Card>
  )
}
