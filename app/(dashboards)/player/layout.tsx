"use client"

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
} from "@/components/animate-ui/components/radix/sidebar"
import { Calendars, LogOut, Settings } from "lucide-react"
import {
  Collapsible,
  CollapsibleTrigger,
} from "@/components/animate-ui/primitives/radix/collapsible"
import Logo from "@/components/common/logo"
import MenuBtn from "@/components/custom/menu-btn"
import Image from "next/image"
import SidebarSearch from "@/components/custom/sidebar-search"
import { BiMessageSquareDetail } from "react-icons/bi"
import { RiDashboardFill, RiMenuSearchLine } from "react-icons/ri"
import { FaRegUser } from "react-icons/fa6"
import Link from "next/link"
import { usePathname } from "next/navigation"
import BreadcrumbCustom from "@/components/custom/breadcrumb"
import Notification from "@/components/custom/notifications"
import ProfileDropdown from "@/components/custom/profile-dropdown"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function PlayerDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const DATA = {
    user: {
      name: "Skyleen",
      email: "skyleen@example.com",
      avatar: "https://avatars.githubusercontent.com/u/124599?v=4",
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/player",
        icon: RiDashboardFill,
        isActive: true,
      },
      {
        title: "My Profile",
        url: "/player/profile",
        icon: FaRegUser,
      },
      {
        title: "Programs",
        url: "/player/programs",
        icon: RiMenuSearchLine,
      },
      {
        title: "Upcoming events",
        url: "/player/upcoming-events",
        icon: Calendars,
      },
      {
        title: "Search & Explore",
        url: "/player/search-explore",
        icon: RiMenuSearchLine,
      },
      {
        title: "Payments",
        url: "/player/payments",
        icon: Calendars,
      },
      {
        title: "Messages",
        url: "/player/messages",
        icon: BiMessageSquareDetail,
      },
      {
        title: "Profile Settings",
        url: "/player/profile-settings",
        icon: Settings,
      },
    ],
  }

  const pathname = usePathname()

  return (
    <SidebarProvider className="h-screen overflow-hidden">
      <Sidebar collapsible="icon" className="relative border-secondary">
        <Image
          src={"/images/sidebarbg.png"}
          width={1000}
          height={1000}
          alt="side-bar-bg"
          className="absolute top-1/2 left-0 w-full -translate-y-1/2"
        />
        <SidebarHeader className="border-b border-secondary py-4.5">
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="flex justify-between">
                <Logo className="w-21.25" />
                <MenuBtn>
                  <SidebarTrigger className="-ml-1 cursor-pointer" />
                </MenuBtn>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent className=" ">
          <SidebarSearch />

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
                      <Link href={item.url} className="">
                        <SidebarMenuButton
                          tooltip={item.title}
                          className={`border-2 py-4.5 ${pathname == item.url ? "rounded-[12px] border-brand bg-brand/20" : "border-transparent"}`}
                        >
                          {item.icon && <item.icon />}
                          <span
                            className={`${pathname == item.url ? "text-bold text-white" : ""}`}
                          >
                            {item.title}
                          </span>
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
          <SidebarMenu className="cursor-pointer flex-row gap-2 py-2 pl-2 text-base text-red-500">
            <LogOut />
            <span>Logout</span>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SidebarInset className="flex h-screen min-h-0 flex-col">
        <header className="flex shrink-0 items-center gap-2 border-b border-secondary py-2.5 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex w-full items-center justify-between gap-2 px-4">
            <BreadcrumbCustom />

            <div className="flex items-center gap-4">
              <Notification />
              <ProfileDropdown />
            </div>
          </div>
        </header>
        {pathname.includes("/player/messages") ? (
          children
        ) : (
          <ScrollArea className="min-h-0 flex-1 border px-8 py-6">
            {children}
          </ScrollArea>
        )}
        {/* <ScrollArea className="h-[92vh] border px-8 py-6">
          <Outlet />
        </ScrollArea> */}
      </SidebarInset>
    </SidebarProvider>
  )
}
