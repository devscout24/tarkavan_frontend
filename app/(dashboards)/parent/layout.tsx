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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useIsMobile } from "@/hooks/use-mobile"
import { RiDashboardFill, RiMenuSearchLine } from "react-icons/ri"
import { FaGraduationCap, FaRegUser } from "react-icons/fa"
import paymentsIcon from "../../../public/images/paymentIcon.svg"
import messagesIcon from "../../../public/images/messagesIcon.svg"
import { ScrollArea } from "@/components/ui/scroll-area"
import Notification from "@/components/custom/notifications"
import BreadcrumbCustom from "@/components/custom/breadcrumb"
import ProfileDropdown from "@/components/custom/profile-dropdown"
import Modals from "@/components/common/modal"
import { usePathname } from "next/navigation"
import Image from "next/image"
import Logo from "@/components/common/logo"
import MenuBtn from "@/components/custom/menu-btn"
import SidebarSearch from "@/components/custom/sidebar-search"
import Link from "next/link"

const PaymentsNavIcon = ({ className }: { className?: string }) => (
  <Image
    width={20}
    height={20}
    src={paymentsIcon}
    alt="Payments"
    className={`h-5 w-5 brightness-0 invert ${className ?? ""}`}
  />
)

const MessagesNavIcon = ({ className }: { className?: string }) => (
  <Image
    width={20}
    height={20}
    src={messagesIcon}
    alt="Messages"
    className={`h-5 w-5 brightness-0 invert ${className ?? ""}`}
  />
)

export default function ParentDashboardLayout({
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
        url: "/parent",
        icon: RiDashboardFill,
        isActive: true,
      },
      {
        title: "My Children",
        url: "/parent/my-children",
        icon: FaRegUser,
      },
      {
        title: "Programs",
        url: "/parent/programs",
        icon: FaGraduationCap,
      },
      {
        title: "Upcoming events",
        url: "/parent/upcoming-events",
        icon: Calendars,
      },
      {
        title: "Search & Explore",
        url: "/parent/search-explore",
        icon: RiMenuSearchLine,
      },
      {
        title: "Payments",
        url: "/parent/payments",
        icon: PaymentsNavIcon,
      },
      {
        title: "Messages",
        url: "/parent/messages",
        icon: MessagesNavIcon,
      },
      {
        title: "Profile Settings",
        url: "/parent/profile-settings",
        icon: Settings,
      },
    ],
  }

  const pathname = usePathname()
  const isMobile = useIsMobile()

  return (
    <SidebarProvider className={` `}>
      <Modals />
      <Sidebar collapsible="icon" className="relative border-secondary">
        <Image
          width={1000}
          height={1000}
          src={"/images/sidebarbg.png"}
          alt="side-bar-bg"
          className="absolute top-1/2 left-0 w-full -translate-y-1/2"
        />
        <SidebarHeader className="border-b border-secondary py-4.5">
          {/* Team Switcher */}
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
          {/* Team Switcher */}
        </SidebarHeader>

        <SidebarContent className=" ">
          {/* Sidebar Search */}
          <SidebarSearch />
          {/* Sidebar Search */}

          {/* navs */}
          <SidebarGroup>
            <SidebarMenu>
              {DATA.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Link href={item.url} className="">
                    <SidebarMenuButton
                      tooltip={item.title}
                      className={`border-2 py-4.5 ${pathname == item.url ? "rounded-[12px] border-brand bg-brand/20" : "border-transparent"}`}
                    >
                      {item.icon && (
                        <item.icon
                          className={
                            item.title === "Programs" ||
                            item.title === "Payments" ||
                            item.title === "Messages"
                              ? "text-white"
                              : undefined
                          }
                        />
                      )}
                      <span
                        className={`${pathname == item.url ? "text-bold text-white" : ""}`}
                      >
                        {item.title}
                      </span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
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
        <header className="flex shrink-0 items-center gap-2 border-b border-secondary py-2.5 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex w-full items-center justify-between gap-2 px-4">
            <BreadcrumbCustom />

            <div className="flex items-center gap-4">
              <Notification />
              <ProfileDropdown />
            </div>
          </div>
        </header>
        <ScrollArea className="h-[92vh]  px-1 py-6 md:px-8">
          {children}
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  )
}
