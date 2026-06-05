"use client"

import { useEffect, useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/animate-ui/components/radix/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronDown, Power, Settings } from "lucide-react"
import { useParams, usePathname, useRouter } from "next/navigation"
import { TbPlayFootball } from "react-icons/tb"
import { getPlayerProfile } from "@/app/(public)/action"
import { TPlayerProfile } from "@/types"

export default function ChildProfileDropdown() {
  const role = usePathname().split("/")[1]
  const router = useRouter()
  const [userInfo] = useState(() => {
    if (typeof window === "undefined") return null
    const stored = localStorage.getItem("go_elite_user")
    return stored ? JSON.parse(stored) : null
  })
    const params = useParams()
    const child_id = params.child_id
    const [playerData, setPlayerData] = useState<TPlayerProfile>() 
    useEffect(() => {
      if (!child_id) {
        return
      }
  
      const profileData = async () => {
        try {
          const res = await getPlayerProfile(String(child_id)) 
          if (res && "success" in res && res.data && res.data.data) {
            setPlayerData(res.data.data)
          }
        } catch (error) {
          console.error(error)
        }
      }
  
      profileData()
  
      const playerDataGet = () => {
        profileData()
      }
  
      window.addEventListener("player_profile_updated", playerDataGet)
  
      return () => {
        window.removeEventListener("player_profile_updated", playerDataGet)
      }
    }, [child_id])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex cursor-pointer items-center">
        <div className="hidden text-start sm:block">
          <h2 className="text-base font-bold text-white">{playerData?.basic_info?.name} {playerData?.basic_info?.last_name}</h2>
          <p className="text-base text-white">{"Child"}</p>
        </div>

        <ChevronDown className="mx-2 hidden text-white sm:inline-block" />

        <Avatar>
          <AvatarImage
            src={playerData?.basic_info?.image || "https://github.com/shadcn.png"}
            className="-mt-1 min-h-10 min-w-10 rounded-[12px]"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="border-2 border-white/20 bg-secondary text-white hover:text-white">
        <DropdownMenuGroup>
          <DropdownMenuItem className="">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm text-white">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={playerData?.basic_info?.image || "https://avatars.githubusercontent.com/u/124599?v=4"}
                  alt={playerData?.basic_info?.name || "User"}
                />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{playerData?.basic_info?.name || userInfo?.name}</span>
                <span className="truncate text-xs">{playerData?.basic_info?.email || userInfo?.email}</span>
              </div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onSelect={() => router.push(`/parent`)}
          >
            <span className="text-white">{"Go to parent"}</span>
            <DropdownMenuShortcut>
              <TbPlayFootball className="text-white" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => router.push(`?update=child`)}
          >
            <span className="text-white">Edit Profile</span>
            <DropdownMenuShortcut>
              <Settings className="text-white" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="bg-primary/60"
          onSelect={() => router.push(`?logout-confirmation=confirm`)}
        >
          <span className="text-white">Log out</span>
          <DropdownMenuShortcut>
            <Power className="text-[#ff0000]!" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
