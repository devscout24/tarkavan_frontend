import * as React from "react"
import Image, { type StaticImageData } from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { IoIosFootball } from "react-icons/io"
import { TfiLayoutLineSolid } from "react-icons/tfi"
import { CiLocationOn } from "react-icons/ci" 
import { Shield } from "lucide-react" 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/animate-ui/components/radix/dropdown-menu"
import { DropdownMenuPortal } from "@/components/animate-ui/primitives/radix/dropdown-menu"
import { Button } from "@/components/ui/button"
import { BsThreeDots } from "react-icons/bs"
import { toast } from "sonner"
import { releasePlayer } from "../../action"
import { HiOutlineArrowUturnRight } from "react-icons/hi2" 
import { TTeamDetailsForClub } from "@/types/team.type"

export type CoachCardProps = {
  image?: string | StaticImageData
  name?: string
  onClick?: () => void
  className?: string
  age: string
  type: string
  experience: string
  location: string
  team_player_id: string
  allTeams: TTeamDetailsForClub[]
  team_id: string
}

export default function CoachCardForRecruitment({
  image,
  name,
  age,
  onClick,
  className,
  type,
  experience,
  location,
  team_player_id ,
  allTeams,
  team_id
}: CoachCardProps) {
  const handleReleasePlayer = async () => {

 
 
    if (!team_player_id) {
      toast.error("Invalid team player ID")
      return
    }

    try {
      const response = await releasePlayer(String(team_player_id))

      if (
        response &&
        "data" in response &&
        response.data &&
        response.data.status
      ) {
        toast.success("Player released successfully")
        window.dispatchEvent(new CustomEvent("teamDetailsRefetch"))
      }
    } catch (error) {
      console.error("Error releasing player:", error)
    }
  }

  return (
    <Card
      className={cn(
        "relative max-w-md overflow-hidden rounded-2xl border border-white/12 bg-[#09070f] p-0 text-white shadow-[0_24px_80px_rgba(0,0,0,0.28)] transition-all duration-300 hover:shadow-[0_32px_80px_rgba(0,0,0,0.35)]",
        className
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          "relative aspect-448/234 min-h-50 w-full overflow-hidden"
        )}
      >
        {image && (
          <Image
            src={image}
            alt={name || "Coach Image"}
            fill
            className="h-50 object-cover"
          />
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Content overlay */}
        <div className="absolute right-0 bottom-0 left-0 p-4"></div>
      </div>

      <CardContent className={cn("flex h-full flex-col justify-between p-5")}>
        {/* Header */}
        <div className="mb-4 flex items-center">
          <div className="flex-1">
            <h3 className="mb-2 text-xl font-bold text-white">{name}</h3>
            <div className="flex gap-2 text-sm text-white items-center flex-wrap    ">
              <p className="text-xs">Age : {age}</p>
              <TfiLayoutLineSolid className="rotate-90 text-white" />
              <p className="text-xs">{type}</p>
              <TfiLayoutLineSolid className="rotate-90 text-white" />
              <p className="text-xs">Experience : {experience}</p>
            </div>
          </div>
          <div className="grid h-9 w-9 place-items-center rounded-md bg-secondary">
            <IoIosFootball className="text-2xl" />
          </div>
        </div>

        <div className="mt-6 gap-2 space-y-2 opacity-80">
          <p className="flex items-center text-sm text-white">
            <CiLocationOn className="mr-2 text-xl" />
            <span>{location}</span>
          </p>
        </div>

        <div className="flex gap-3 mt-5  ">
          <Button
            type="button"
            onClick={() => {}}
            className="h-9 flex-1 rounded-md bg-brand text-sm font-semibold text-primary hover:bg-brand"
          >
            <Shield className="size-3.5" />
            View Profile
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                type="button"
                onClick={() => {}}
                className="h-9 w-fit rounded-md border border-brand bg-transparent px-3 text-sm font-semibold text-brand"
              >
                <BsThreeDots className="size-3.5" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={handleReleasePlayer}
                  className="cursor-pointer hover:bg-brand"
                >
                  <span>Release</span>
                  <DropdownMenuShortcut>
                    <HiOutlineArrowUturnRight />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Transfer to</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem className="" disabled>
                      Please select one
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {allTeams.length > 1
                      ? allTeams.map((team) =>
                          team.id === Number(team_id) ? null : (
                            <DropdownMenuItem
                              key={team.id}
                              className="cursor-pointer hover:bg-brand"
                            >
                              {team.name}
                            </DropdownMenuItem>
                          )
                        )
                      : ""}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}
