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
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { TbPlayFootball } from "react-icons/tb"

export default function ProfileDropdown() {
  const role = usePathname().split("/")[1]
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex cursor-pointer items-center">
        <div className="hidden text-start sm:block">
          <h2 className="text-base font-bold text-white">Canada Strikers FC</h2>
          <p className="text-base text-white">{role}</p>
        </div>

        <ChevronDown className="mx-2 hidden text-white sm:inline-block" />

        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            className="-mt-1 min-h-10 min-w-10 rounded-[12px]"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="border-2 border-white/20 bg-secondary text-white hover:text-white">
        <DropdownMenuGroup>
          <DropdownMenuItem className="">
            <div className="text-white flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={"https://avatars.githubusercontent.com/u/124599?v=4"}
                  alt={"https://avatars.githubusercontent.com/u/124599?v=4"}
                />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {"Canada Strikers FC"}
                </span>
                <span className="truncate text-xs">{"demo@demo.com"}</span>
              </div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />  
          <DropdownMenuItem>
            <span className="text-white">role</span>
            <DropdownMenuShortcut>
              <TbPlayFootball className="text-white" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => router.push(`/${role}/profile-settings`)}>
            <span className="text-white">Edit Profile</span>
            <DropdownMenuShortcut>
              <Settings className="text-white" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="bg-primary/60">
          <span className="text-white">Log out</span>
          <DropdownMenuShortcut>
            <Power className="text-[#ff0000]!" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
