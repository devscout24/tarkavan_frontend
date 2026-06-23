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
import { SlCalender } from "react-icons/sl"
import { DiScala } from "react-icons/di"
import { Settings } from "lucide-react"
import {
  Collapsible,
  CollapsibleTrigger,
} from "@/components/animate-ui/primitives/radix/collapsible"
import Logo from "@/components/common/logo"
import MenuBtn from "@/components/custom/menu-btn"
import Image from "next/image"
import { BiMessageSquareDetail } from "react-icons/bi"
import {
  RiDashboardFill,
  RiLogoutCircleRLine,
  RiMenuSearchLine,
} from "react-icons/ri"
import { FaRegUser } from "react-icons/fa6"
import Link from "next/link"
import { usePathname } from "next/navigation"
import BreadcrumbCustom from "@/components/custom/breadcrumb"
import Notification from "@/components/custom/notifications"
import ProfileDropdown from "@/components/custom/profile-dropdown"
import { ScrollArea } from "@/components/ui/scroll-area"
import { GrGroup } from "react-icons/gr"
import { AiOutlineUsergroupAdd } from "react-icons/ai"
import { IoIosFootball } from "react-icons/io"
import { CiCreditCard2 } from "react-icons/ci"
import Modals from "@/components/common/modal"
import AuthCheckPoint from "@/components/auth/auth-checkopoint"
import { useEffect } from "react"
import { getClubProfile } from "./action"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { selectUnreadCount, setUnreadCount, setUserImage } from "@/lib/features/userSlice"
import { getUnreadCount } from "../action"

export default function PlayerDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname()
  const dispatch = useAppDispatch()
  const unread = useAppSelector(selectUnreadCount)

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getClubProfile()

        if (
          res &&
          typeof res === "object" &&
          "success" in res &&
          res.success &&
          "data" in res
        ) {
          dispatch(setUserImage(res?.data?.data?.club_logo_url))
        }
      } catch (err) {
        console.error("Error fetching club profile:", err)
      }
    }
    getData()
  }, [])

  useEffect(() => {
    const getUnreadData = async () => {
      try {
        const res = await getUnreadCount()

        console.log("unread count", res)

        if (res && res.status) {
          dispatch(setUnreadCount(res.data))
        }
      } catch (error) {
        console.error(error)
      }
    }
    getUnreadData()
  }, [dispatch])

  const DATA = {
    user: {
      name: "Skyleen",
      email: "skyleen@example.com",
      avatar: "https://avatars.githubusercontent.com/u/124599?v=4",
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/club",
        icon: RiDashboardFill,
        isActive: true,
      },
      {
        title: "My Profile",
        url: "/club/profile",
        icon: FaRegUser,
      },
      {
        title: "My Teams",
        url: "/club/teams",
        icon: GrGroup,
      },
      {
        title: "My Programs",
        url: "/club/my-programs",
        icon: DiScala,
      },
      {
        title: "Bookings",
        url: "/club/bookings",
        icon: SlCalender,
      },
      {
        title: "Recruitment",
        url: "/club/recruitment",
        icon: AiOutlineUsergroupAdd,
      },
      {
        title: "Matches",
        url: "/club/matches",
        icon: IoIosFootball,
      },
      {
        title: "Search & Explore",
        url: "/club/search-explore",
        icon: RiMenuSearchLine,
      },
      {
        title: "Subscription",
        url: "/club/subscription",
        icon: CiCreditCard2,
      },
      {
        title: "Messages",
        url: "/club/messages",
        icon: BiMessageSquareDetail,
      },
      {
        title: "Profile Settings",
        url: "/club/profile-settings",
        icon: Settings,
      },
    ],
  }

  return (
    <AuthCheckPoint role="club">
      <SidebarProvider className="h-screen overflow-hidden">
        <Modals />
        <Sidebar collapsible="icon" className="relative border-secondary">
          <Image
            src={"/images/sidebarbg.png"}
            width={1000}
            height={1000}
            alt="side-bar-bg"
            loading="eager"
            className="absolute top-100 left-0 w-full"
          />
          <SidebarHeader className="border-b border-secondary py-4.5">
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
          </SidebarHeader>

          <SidebarContent className=" ">
            {/* <SidebarSearch /> */}

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
                            className={`border-2 py-4.5 text-[#999999] ${pathname == item.url ? "rounded-[12px] border-brand bg-brand/20" : "border-transparent"}`}
                          >
                            {item.icon && (
                              <item.icon
                                className={`text-[#999999] ${pathname == item.url ? "text-brand" : ""}`}
                              />
                            )}
                            <p
                              className={`${pathname == item.url ? "text-bold text-white" : ""} flex w-full items-center justify-between`}
                            >
                              <span>{item.title}</span>
                              {item.title === "Messages" && unread > 0 && (
                                <span className="ml-auto grid h-5! w-5! place-items-center rounded-full bg-brand px-1.5 text-xs text-primary">
                                  {unread}
                                </span>
                              )}
                            </p>
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
            <SidebarMenuButton className={`py-4.5 text-red-500`}>
              <RiLogoutCircleRLine />
              <span className={` `}>Log out</span>
            </SidebarMenuButton>
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
            <ScrollArea className="min-h-0 flex-1 border">
              <div className="px-8 py-6">{children}</div>
            </ScrollArea>
          )}
        </SidebarInset>
      </SidebarProvider>
    </AuthCheckPoint>
  )
}
