import Image from "next/image"
import { MoreHorizontal } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/animate-ui/components/radix/dropdown-menu"
import { BsThreeDots } from "react-icons/bs"

type TeamCardProps = {
  teamName?: string
  ageGroup?: string
  competitionLevel?: string
  playersCount?: number
  playersLimit?: number
  coachCount?: number
  visibility?: string
  imageSrc?: string
  imageAlt?: string
  viewTeamLabel?: string
  className?: string
  onViewTeam?: () => void
  onMoreClick?: () => void
}

export default function TeamCard({
  teamName = "Elite U16 - Competitive",
  ageGroup = "U16",
  competitionLevel = "Development",
  playersCount = 18,
  playersLimit = 24,
  coachCount = 2,
  visibility = "PUBLIC", 
  imageAlt = "Team photo",
  viewTeamLabel = "View Team",
  className,
  onViewTeam, 
}: TeamCardProps) {
  return (
    <Card
      className={cn(
        "mah-h-113 w-full max-w-90 gap-0 overflow-hidden rounded-2xl border border-white/15 bg-[#050713] p-0 text-white",
        className
      )}
    >
      <div className="relative h-48 w-full">
        <Image src={"/images/player1.png"} alt={imageAlt} fill className="object-cover" />
        <Badge className="absolute top-3 right-3 h-9 rounded-full bg-[#0ea54b] px-4 text-sm font-medium text-white hover:bg-[#0ea54b]">
          {visibility}
        </Badge>
      </div>

      <CardContent className="space-y-5 px-5 py-4">
        <div className="space-y-2.5">
          <h3 className="mb-6 text-xl leading-none tracking-tight">
            {teamName}
          </h3>
          <p className="text-sm text-white/90">
            Age Group: <span>{ageGroup}</span>
          </p>
          <p className="text-sm text-white/90">
            Competition Level: <span>{competitionLevel}</span>
          </p>
        </div>

        <div className="mt-6 flex items-center rounded-lg bg-white/18 px-4 py-3">
          <p className="flex-1 text-sm text-white/75">
            Players:{" "}
            <span className="text-base font-medium text-white">
              {playersCount}/{playersLimit}
            </span>
          </p>
          <Separator orientation="vertical" className="mx-4 h-8 bg-white/35" />
          <p className="flex-1 text-sm text-white/75">
            Coach: <span className="font-medium text-white">{coachCount}</span>
          </p>
        </div>

        <div className="flex items-center gap-3 pb-1">
          <Button
            type="button"
            onClick={onViewTeam}
            className="h-12 flex-1 rounded-lg bg-brand text-sm font-semibold text-primary hover:bg-brand"
          >
            {viewTeamLabel}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                type="button" 
                className="h-12  rounded-lg bg-transparent border border-brand text-brand hover:text-brand text-sm font-semibold px-5 "
              >
                <BsThreeDots/>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <span>Profile</span>
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}
