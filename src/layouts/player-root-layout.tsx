"use client"

import sidebarbg from "/images/sidebarbg.png"

 
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
  SidebarGroup, 
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton, 
} from '@/components/animate-ui/components/radix/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/animate-ui/components/radix/dropdown-menu"
import { 
  BadgeCheck,
  Bell, 
  Calendars, 
  ChevronsUpDown, 
  CreditCard,  
  LogOut, 
  Settings,  
  Sparkles, 
} from "lucide-react"
import {
  Collapsible, 
  CollapsibleTrigger,
} from '@/components/animate-ui/primitives/radix/collapsible';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useIsMobile } from "@/hooks/use-mobile"
import Logo from "@/components/common/logo"
import MenuBtn from "@/components/custom/menu-btn"
import ProfileDropdown from "@/components/custom/profile-dropdown"
import Notification from "@/components/custom/notifications"
import BreadcrumbCustom from "@/components/custom/breadcrumb"
import SidebarSearch from "@/components/custom/sidebar-search"
import { Link, Outlet, useLocation } from "react-router"
import { RiDashboardFill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa6";
import { RiMenuSearchLine } from "react-icons/ri";
import { BiMessageSquareDetail } from "react-icons/bi";
import React, { useState } from "react" 


const DATA = {
  user: {
    name: "Skyleen",
    email: "skyleen@example.com",
    avatar: "https://avatars.githubusercontent.com/u/124599?v=4",
  }, 
    navMain: [
    {
      title: 'Dashboard',
      url: '/player',
      icon: RiDashboardFill,
      isActive: true, 
    },
    {
      title: 'My Profile',
      url: '/player/profile',
      icon: FaRegUser, 
    },
    {
      title: 'Programs',
      url: '/player/programs',
      icon: RiMenuSearchLine, 
    },
    {
      title: 'Upcomming events',
      url: '/player/upcomming-events',
      icon: Calendars, 
    },
    {
      title: 'Search & Explore',
      url: '/player/upcomming-events',
      icon: RiMenuSearchLine, 
    },
    {
      title: 'Payments',
      url: '/player/upcomming-events',
      icon: Calendars, 
    },
    {
      title: 'Messages',
      url: '/player/upcomming-events',
      icon: BiMessageSquareDetail, 
    },
    {
      title: 'Profile Settings',
      url: '/player/upcomming-events',
      icon: Settings, 
    },
  ], 
}

export const PlayerRootLayout = () => {
  const isMobile = useIsMobile() 
  const pathname = useLocation().pathname

  return (
    <SidebarProvider className={` `}> 
      <Sidebar collapsible="icon" className="relative border-secondary ">
        <img
          src={sidebarbg}
          alt="side-bar-bg"
          className="absolute top-1/2 left-0 w-full -translate-y-1/2"
        />
        <SidebarHeader className="border-b border-secondary py-4.5 ">
          {/* Team Switcher */}
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="flex justify-between">
                <Logo className="w-21.25" />
                <MenuBtn>
                  <SidebarTrigger className="-ml-1 cursor-pointer   " />
                </MenuBtn>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
          {/* Team Switcher */}
        </SidebarHeader> 

        <SidebarContent className="  ">

          {/* Sidebar Search */}
          <SidebarSearch/>
          {/* Sidebar Search */}
          
          {/* navs */}
          <SidebarGroup> 
            <SidebarMenu>
              {DATA.navMain.map((item) => (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                    <Link to={item.url} className=""> 
                      <SidebarMenuButton tooltip={item.title} className={` py-4.5 border-2  ${pathname == item.url ? "bg-brand/20 border-brand rounded-[12px]  " : "border-transparent"}`} > 
                        {item.icon && <item.icon />}
                        <span className={`${pathname == item.url ? "text-white text-bold " : ""}`}>{item.title}</span> 
                      </SidebarMenuButton>
                    </Link>
                    </CollapsibleTrigger> 
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>
   
        </SidebarContent>
        <SidebarFooter>
          {/* Nav User */}
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={DATA.user.avatar}
                        alt={DATA.user.name}
                      />
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {DATA.user.name}
                      </span>
                      <span className="truncate text-xs">
                        {DATA.user.email}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                          src={DATA.user.avatar}
                          alt={DATA.user.name}
                        />
                        <AvatarFallback className="rounded-lg">
                          CN
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {DATA.user.name}
                        </span>
                        <span className="truncate text-xs">
                          {DATA.user.email}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Sparkles />
                      Upgrade to Pro
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <BadgeCheck />
                      Account
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CreditCard />
                      Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Bell />
                      Notifications
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
          {/* Nav User */}
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="flex py-2.5 shrink-0 items-center gap-2 border-b border-secondary transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center justify-between gap-2 px-4 w-full "> 
            
            <BreadcrumbCustom/>
            
            <div className="flex items-center gap-4 ">
              <Notification/>
              <ProfileDropdown/>
            </div>
            
          </div>
        </header>
        <Outlet/>
      </SidebarInset>
    </SidebarProvider>
  )
}








 