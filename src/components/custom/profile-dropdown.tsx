 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem, 
  DropdownMenuSeparator,
  DropdownMenuShortcut, 
  DropdownMenuTrigger,
} from '@/components/animate-ui/components/radix/dropdown-menu';
import { useLocation } from 'react-router';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronDown, Mail, Power, UserRound } from 'lucide-react';
import { TbPlayFootball } from "react-icons/tb";





export default function ProfileDropdown({ 
}: {
  children?: React.ReactNode
  className?: string
}) {

    const role = useLocation().pathname.split("/")[1]
 
    

  return (
    <DropdownMenu>
  <DropdownMenuTrigger className='flex items-center cursor-pointer '>
    <div className="hidden sm:block text-start">
        <h2 className="text-white font-bold text-base ">Canada Strikers FC</h2>
        <p className="text-base text-white">{role}</p>
    </div>

    <ChevronDown className='hidden sm:inline-block text-white mx-2 '/>

    <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" className='min-w-10 min-h-10 rounded-[12px] -mt-1  '/>
        <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    
  </DropdownMenuTrigger>

  <DropdownMenuContent> 
 

    <DropdownMenuGroup> 
      <DropdownMenuItem>
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
            <TbPlayFootball/>
        </DropdownMenuShortcut>
      </DropdownMenuItem> 
    </DropdownMenuGroup>
 
    <DropdownMenuSeparator />

    <DropdownMenuItem>
      <span>Log out</span>
      <DropdownMenuShortcut>
        <Power className='text-[#ff0000]' />
      </DropdownMenuShortcut>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
  )
}
