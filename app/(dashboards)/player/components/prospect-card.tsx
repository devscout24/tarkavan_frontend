import { Badge } from "@/components/ui/badge"
import { Lock, MapPin } from "lucide-react"
import Image from "next/image"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { FaStar } from "react-icons/fa"

export default function ProspectCard({
  provincialVotes = 0,
  academyVotes = 0,
}: {
  provincialVotes?: number
  academyVotes?: number
}) {
  return (
    <div className="relative rounded-lg border-2 border-secondary">
      <Image
        width={500}
        height={1000}
        src="/images/playerimage.png"
        alt="playerimage"
        className="h-full rounded-lg object-cover"
      />

      <Badge
        variant="default"
        className="absolute top-3 left-3 rotate-10 -skew-10 rounded-[4px] bg-brand text-[14px] font-bold text-primary"
      >
        PROSPECT #10
      </Badge>

      {/* stars */}
      <div className=" absolute top-0 right-0   flex w-full flex-col items-end justify-end gap-2 px-5 pt-5">
        {/* provincial votes */}
        {provincialVotes > 0 && (
          <HoverCard openDelay={0}>
            <HoverCardTrigger className="relative">
              <FaStar className="text-7xl text-yellow-500" />
              <span className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-white">
                {provincialVotes}
              </span>
            </HoverCardTrigger>
            <HoverCardContent>
              Provincial Team Vote: {provincialVotes} votes
            </HoverCardContent>
          </HoverCard>
        )}

        {/* Professional academy votes */}
        {academyVotes > 0 && (
          <HoverCard openDelay={0}>
            <HoverCardTrigger className="relative">
              <FaStar className="text-7xl text-red-500" />
              <span className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-white">
                {academyVotes}
              </span>
            </HoverCardTrigger>
            <HoverCardContent>
              Professional Academy Vote: {academyVotes} votes
            </HoverCardContent>
          </HoverCard>
        )}
      </div>

      <div className="absolute right-0 bottom-0 left-0 px-8">
        <h1 className="text-extrabold text-[32px]">
          <p className="">SHAHIN</p>
          <span className="text-brand">TARKAVAN</span>
        </h1>

        <p className="py-1 text-[14px]">Midfielder | Toronto FC Academy</p>

        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-1">
            <span className="font-bold">
              <MapPin className="w-5" />{" "}
            </span>
            North Toronto
          </li>
          <li className="flex items-center gap-1">
            <span className="font-bold">
              <Lock className="w-5" />
            </span>
            Parental Control Active
          </li>
        </ul>

        <div className="mt-3 flex flex-wrap justify-start gap-2 pb-8">
          <Badge
            variant="outline"
            className="rounded-[4px] border-secondary py-3 text-[12px] font-medium text-white"
          >
            <img src="/images/footballfull.png" alt="footballfull" />
          </Badge>
          <Badge
            variant="outline"
            className="rounded-[4px] border-secondary py-3 text-[12px] font-medium text-white"
          >
            MALE
          </Badge>
          <Badge
            variant="outline"
            className="rounded-[4px] border-secondary py-3 text-[12px] font-medium text-white"
          >
            UNDER-16
          </Badge>
          <Badge
            variant="outline"
            className="rounded-[4px] border-secondary py-3 text-[12px] font-medium text-white"
          >
            HIGHTFOOTED
          </Badge>
        </div>
      </div>
    </div>
  )
}
