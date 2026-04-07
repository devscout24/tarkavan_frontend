"use client"

import Image from "next/image"
import { Edit2, Lock, MapPin, Shield, Trash2 } from "lucide-react"

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
  member: TeamMember
  actionLabel?: string
  onAction?: (memberId: string) => void
  onMore?: (memberId: string) => void
}

export default function TeamMemberCard({
  member,
  actionLabel = "View Profile",
  onAction,
  onMore,
}: TeamMemberCardProps) {
  return (
    <Card className="gap-0 overflow-hidden rounded-xl border border-white/12 bg-[#060916] p-0 text-white">
      <div className="relative h-40 w-full">
        <Image
          src={member.imageSrc}
          alt={member.imageAlt ?? member.name}
          fill
          className="object-cover"
        />
      </div>

      <CardContent className="space-y-2.5 bg-[#11131c] p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <h3 className="text-xl leading-tight font-medium text-white">
              {member.name}
            </h3>
            <p className="text-sm text-white/80">
              Age:{member.age} | {member.position} | Jersey: {member.jersey}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onMore?.(member.id)}
            className="grid size-8 shrink-0 place-items-center rounded-md bg-white/15 text-white/80 hover:bg-white/25"
            aria-label="Member actions"
          >
            <IoIosFootball className="size-6" />
          </button>
        </div>

        <div className="space-y-1 text-sm text-white/75">
          <p className="flex items-center gap-1.5">
            <MapPin className="size-3.5" />
            <span>{member.location}</span>
          </p>
          <p className="flex items-center gap-1.5">
            <Lock className="size-3.5" />
            <span>Parental Control Active</span>
          </p>
        </div>

        <div className="flex items-center rounded-md bg-white/12 px-2 py-1.5">
          <div className="flex-1 text-center">
            <p className="text-base font-medium">{member.stats.games}</p>
            <p className="text-xs text-white/70">Games</p>
          </div>
          <Separator orientation="vertical" className="mx-2 h-8 bg-white/20" />
          <div className="flex-1 text-center">
            <p className="text-base font-medium">{member.stats.goals}</p>
            <p className="text-xs text-white/70">Goals</p>
          </div>
          <Separator orientation="vertical" className="mx-2 h-8 bg-white/20" />
          <div className="flex-1 text-center">
            <p className="text-base font-medium">{member.stats.assists}</p>
            <p className="text-xs text-white/70">Assists</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            onClick={() => onAction?.(member.id)}
            className="h-9 flex-1 rounded-md bg-brand text-sm font-semibold text-primary hover:bg-brand"
          >
            <Shield className="size-3.5" />
            {actionLabel}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                type="button"
                onClick={() => onAction?.(member.id)}
                className="h-9 w-fit rounded-md border border-brand bg-transparent px-3 text-sm font-semibold text-brand"
              >
                <BsThreeDots className="size-3.5" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => {}}
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
                    <DropdownMenuItem className="" disabled>Please select one</DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem className="cursor-pointer hover:bg-brand">Message</DropdownMenuItem>   
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
