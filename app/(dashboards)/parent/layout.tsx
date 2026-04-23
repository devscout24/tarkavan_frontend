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
import { Calendars, CreditCard, Settings } from "lucide-react"
import {
  RiDashboardFill,
  RiLogoutCircleRLine,
  RiMenuSearchLine,
} from "react-icons/ri"
import { FaGraduationCap, FaRegUser } from "react-icons/fa"
import messagesIcon from "../../../public/images/messagesIcon.svg"
import { ScrollArea } from "@/components/ui/scroll-area"
import Notification from "@/components/custom/notifications"
import BreadcrumbCustom from "@/components/custom/breadcrumb"
import ProfileDropdown from "@/components/custom/profile-dropdown"
import Modals from "@/components/common/modal"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import Logo from "@/components/common/logo"
import MenuBtn from "@/components/custom/menu-btn"
import Link from "next/link"
import AuthCheckPoint from "@/components/auth/auth-checkopoint"
import { handleLogout } from "@/lib/helpers"

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
        icon: CreditCard,
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
  const router = useRouter()

  return (
    <AuthCheckPoint role="parent">
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
                <div className="flex items-center justify-between">
                  <div className="group-data-[collapsible=icon]:hidden">
                    <Logo className="w-21.25" />
                  </div>
                  <Link
                    href="/"
                    className="hidden size-10 items-center justify-center rounded-md group-data-[collapsible=icon]:inline-flex"
                  >
                    <Image
                      width={32}
                      height={32}
                      src="/images/logo.png"
                      alt="Tarkavan Logo"
                      className="h-8 w-8 object-contain"
                    />
                  </Link>
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
            {/* <SidebarSearch /> */}
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
            <SidebarMenuButton
              className={`py-4.5 text-red-500`}
              onClick={() => router.push("?logout-confirmation=confirm")}
            >
              <RiLogoutCircleRLine />
              <span className={` `}>Log out</span>
            </SidebarMenuButton>
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
          <ScrollArea className="h-[92vh] px-1 py-6 md:px-8">
            {children}
          </ScrollArea>
        </SidebarInset>
      </SidebarProvider>
    </AuthCheckPoint>
  )
}
