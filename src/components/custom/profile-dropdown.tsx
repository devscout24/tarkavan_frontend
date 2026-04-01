import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/animate-ui/components/radix/dropdown-menu"
import { useLocation } from "react-router"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronDown, Mail, Power, UserRound } from "lucide-react"
import { TbPlayFootball } from "react-icons/tb"

export default function ProfileDropdown() {
  const role = useLocation().pathname.split("/")[1]

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

      <DropdownMenuContent className="bg-secondary border-2 border-white/20 ">
        <DropdownMenuGroup>
          <DropdownMenuItem className="">
            <span>Canada Strikers FC</span>
            <DropdownMenuShortcut>
              <UserRound />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>demo@demo.com</span>
            <DropdownMenuShortcut>
              <Mail />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>role</span>
            <DropdownMenuShortcut>
              <TbPlayFootball />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="bg-primary">
          <span>Log out</span>
          <DropdownMenuShortcut>
            <Power className="text-[#ff0000]!" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
