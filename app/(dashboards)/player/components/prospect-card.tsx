import { Badge } from "@/components/ui/badge"
import { Lock, MapPin } from "lucide-react"
import Image from "next/image"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { FaStar } from "react-icons/fa"
import { TPlayerBasicInfo, TPlayerPositionInfo } from "@/types/player.type"

export default function ProspectCard({
  provincialVotes = 0,
  academyVotes = 0,
  basic_info,
  position_info,
}: {
  provincialVotes?: number
  academyVotes?: number
  basic_info?: TPlayerBasicInfo
  position_info?: TPlayerPositionInfo
}) {
  // console.log(position_info)

  return (
    <div className="relative rounded-lg border-2 border-secondary">
      <Image
        width={500}
        height={1000}
        src={basic_info?.image || "/images/playerimage.png"}
        alt="playerimage"
        className="h-full min-h-130 rounded-lg object-cover"
      />

      <Badge
        variant="default"
        className="absolute top-3 left-3 rotate-10 -skew-10 rounded-[4px] bg-brand text-[14px] font-bold text-primary"
      >
        JERSEY #{position_info?.jersey_number}
      </Badge>

      {/* stars */}
      <div className="absolute top-0 right-0 flex w-full flex-col items-end justify-end gap-2 px-5 pt-5">
        {/* provincial votes */}
        <HoverCard openDelay={0}>
          <HoverCardTrigger className="relative">
            <FaStar className="text-7xl text-yellow-500" />
            <span className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-white">
              {provincialVotes}
            </span>
          </HoverCardTrigger>
          <HoverCardContent>
            Provincial Team Votes: {provincialVotes} votes
          </HoverCardContent>
        </HoverCard>
        {/* {provincialVotes > 0 && (
        )} */}

        {/* Professional Academy Votess */}
        <HoverCard openDelay={0}>
          <HoverCardTrigger className="relative">
            <FaStar className="text-7xl text-red-500" />
            <span className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-white">
              {academyVotes}
            </span>
          </HoverCardTrigger>
          <HoverCardContent>
            Professional Academy Votes: {academyVotes} votes
          </HoverCardContent>
        </HoverCard>
        {/* {academyVotes > 0 && (
        )} */}
      </div>

      <div className="absolute right-0 bottom-0 left-0 px-8">
        <h1 className="text-extrabold text-[32px]">
          <p className="">{basic_info?.name}</p>
          <span className="text-brand">{basic_info?.last_name}</span>
        </h1>

        <p className="py-1 text-[14px]">
          {position_info?.primary_position?.name}{" "}
          {position_info?.club_team ? `| ${position_info?.club_team}` : ""}{" "}
        </p>

        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-1">
            <span className="font-bold">
              <MapPin className="w-5" />{" "}
            </span>
            {basic_info?.city}, {basic_info?.country}
          </li>
          {basic_info?.age && (
            <li className="flex items-center gap-1">
              <span className="font-bold">
                <Lock className="w-5" />
              </span>
              {basic_info?.age <= 18
                ? "Parental Control Enabled"
                : basic_info?.privacy_settings}
            </li>
          )}
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
            className="rounded-[4px] border-secondary py-3 text-[12px] font-medium text-white uppercase"
          >
            {basic_info?.gender}
          </Badge>

          <Badge
            variant="outline"
            className="rounded-[4px] border-secondary py-3 text-[12px] font-medium text-white"
          >
            UNDER-{basic_info?.age}
          </Badge>
          <Badge
            variant="outline"
            className="rounded-[4px] border-secondary py-3 text-[12px] font-medium text-white uppercase"
          >
            {position_info?.dominant_foot}
          </Badge>
        </div>
      </div>
    </div>
  )
}
