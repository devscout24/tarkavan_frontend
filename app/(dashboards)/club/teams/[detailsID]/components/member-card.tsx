"use client"

import Image from "next/image"
import {  Lock, MapPin, Shield  } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { IoIosFootball } from "react-icons/io"
import { BsThreeDots } from "react-icons/bs"
import { HiOutlineArrowUturnRight } from "react-icons/hi2"
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
import { TPlayerTeam, TTeamDetailsForClub } from "@/types/team.type"
import { releasePlayer, TransferPlayerOrCoach } from "../../action"
import { toast } from "sonner"
import { useState } from "react"
import { FaSpinner } from "react-icons/fa"

export type MemberStats = {
  games: number
  goals: number
  assists: number
}

export type TeamMember = {
  id: string
  name: string
  age: number
  position: string
  jersey: number
  location: string
  imageSrc: string
  imageAlt?: string
  stats: MemberStats
}

type TeamMemberCardProps = {
  member: TPlayerTeam
  actionLabel?: string
  allTeams: TTeamDetailsForClub[]
  team_id: string
}

export default function TeamMemberCard({
  member,
  actionLabel = "View Profile",
  allTeams,
  team_id,
}: TeamMemberCardProps) {
  const handleReleasePlayer = async () => {
    if (!member.team_player_id) {
      toast.error("Invalid team player ID")
      return
    }

    try {
      const response = await releasePlayer(String(member.team_player_id))

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

  const [loadingTransfer , setLoadingTransfer] = useState(false)
  const handleTransferPlayer = async (team_player_id: string , new_team_id: string) => {

    if(!team_player_id){
      toast.error("Invalid team player ID or not provided")
      return
    }

    if(!new_team_id){
      toast.error("Invalid new team ID or not provided")
      return
    }

    try{
      setLoadingTransfer(true)

      const formData = new FormData()
      formData.append("team_player_id", team_player_id)
      formData.append("new_team_id", new_team_id)

      const res = await TransferPlayerOrCoach(formData) 
      if(res && "data" in res && res.data && res.data.status){
        toast.success("Transferred to new team successfully")
        window.dispatchEvent(new CustomEvent("teamDetailsRefetch"))
        setLoadingTransfer(false)
      } 

    }catch(error){
      console.error("Error transferring player:", error)
      setLoadingTransfer(false)
    }
    finally{
      setLoadingTransfer(false)
    }

  }


  return (
    <Card className="gap-0 overflow-hidden rounded-xl border border-white/12 bg-[#060916] p-0 text-white">
      <div className="relative h-46 w-full">
        <Image
          src={encodeURI(member.profile_image)}
          alt={member.profile_image ?? member.name}
          className="h-46 max-h-46 object-cover"
          width={1000}
          height={400}
        />
      </div>

      <CardContent className="flex h-full flex-col justify-between space-y-2.5 bg-[#11131c] p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <h3 className="text-xl leading-tight font-medium text-white">
              {member.name}
            </h3>
            <p className="text-sm text-white/60!">
              Age:{member.age} | {member.position} | Jersey:{" "}
              {member.jersey_number}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {}}
            className="grid size-8 shrink-0 place-items-center rounded-md bg-white/15 text-white/80 hover:bg-white/25"
            aria-label="Member actions"
          >
            <IoIosFootball className="size-6" />
          </button>
        </div>

        <div className="space-y-1 text-sm text-white/75">
          <p className="flex items-center gap-1.5">
            <MapPin className="size-3.5" />
            <span>
              {member.city}, {member.country}
            </span>
            {/* location */}
          </p>
          <p className="flex items-center gap-1.5">
            <Lock className="size-3.5" />
            <span>
              {member.is_parent_child
                ? "Parental Control Active"
                : "Parental Control Inactive"}
            </span>
          </p>
        </div>

        <div className="flex items-center rounded-md bg-white/12 px-2 py-1.5">
          <div className="flex-1 text-center">
            <p className="text-base font-medium">{member.games}</p>
            <p className="text-xs text-white/70">Games</p>
          </div>
          <Separator orientation="vertical" className="mx-2 h-8 bg-white/20" />
          <div className="flex-1 text-center">
            <p className="text-base font-medium">{member.goals}</p>
            <p className="text-xs text-white/70">Goals</p>
          </div>
          <Separator orientation="vertical" className="mx-2 h-8 bg-white/20" />
          <div className="flex-1 text-center">
            <p className="text-base font-medium">{member.assists}</p>
            <p className="text-xs text-white/70">Assists</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            onClick={() => {}}
            className="h-9 flex-1 rounded-md bg-brand text-sm font-semibold text-primary hover:bg-brand"
          >
            <Shield className="size-3.5" />
            {actionLabel}
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
                              onClick={()=> handleTransferPlayer(String(member.team_player_id) , String(team.id))}
                              disabled={loadingTransfer}
                            >
                              {loadingTransfer ? <FaSpinner className="h-4 w-4" /> : null}
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
