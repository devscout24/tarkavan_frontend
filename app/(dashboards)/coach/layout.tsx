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
import { Settings } from "lucide-react"
import {
  RiDashboardFill,
  RiLogoutCircleRLine,
  RiMenuSearchLine,
} from "react-icons/ri"
import { FaCcStripe, FaGraduationCap, FaRegCalendarCheck, FaRegUser } from "react-icons/fa"
import earningsIcon from "../../../public/images/earningsIcon.svg"
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
import { getApiBaseUrl } from "@/lib/url-utils"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import {
  selectUnreadCount,
  setIssubscription_active,
  setProfileID,
  setUnreadCount,
  setUserImage,
} from "@/lib/features/userSlice"
import { CiCreditCard2 } from "react-icons/ci"
import { getUnreadCount } from "../action"
import { getStripeData } from "./action"

const EarningsNavIcon = ({ className }: { className?: string }) => (
  <Image
    width={20}
    height={20}
    src={earningsIcon}
    alt="Earnings"
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
  const pathname = usePathname()
  const dispatch = useAppDispatch()

  const unread = useAppSelector(selectUnreadCount)

  useEffect(() => {
    const fetchExperienceData = async () => {
      try {
        const token = localStorage.getItem("go_elite_token")
        const baseUrl = getApiBaseUrl()

        const response = await fetch(`${baseUrl}/coach/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })

        if (response.ok) {
          const result = await response.json()
          console.log(result)
          dispatch(setUserImage(result?.data?.profile?.profile_image))
          dispatch(setProfileID(result?.data?.coach_id))
          dispatch(
            setIssubscription_active(result?.data?.is_subscription_active)
          )

        }
      } catch (error) {
        console.error("Error fetching experience data:", error)
      }
    }

    fetchExperienceData()
  }, [])

  useEffect(() => {
    const getUnreadData = async () => {
      try {
        const res = await getUnreadCount()

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
        url: "/coach",
        icon: RiDashboardFill,
        isActive: true,
      },
      {
        title: "My Profile",
        url: "/coach/my-profile",
        icon: FaRegUser,
      },
      {
        title: "Stripe",
        url: "/coach/connect-stripe",
        icon: FaCcStripe,
      },
      {
        title: "My Programs",
        url: "/coach/my-programs",
        icon: FaGraduationCap,
      },
      {
        title: "Bookings",
        url: "/coach/bookings",
        icon: FaRegCalendarCheck,
      },
      {
        title: "Earnings",
        url: "/coach/earnings",
        icon: EarningsNavIcon,
      },
      {
        title: "Search & Explore",
        url: "/coach/search-explore",
        icon: RiMenuSearchLine,
      },
      {
        title: "Subscription",
        url: "/coach/subscription",
        icon: CiCreditCard2,
      },
      {
        title: `Messages`,
        url: "/coach/messages",
        icon: MessagesNavIcon,
      },
      {
        title: "Profile Settings",
        url: "/coach/profile-settings",
        icon: Settings,
      },
    ],
  }

  return (
    <AuthCheckPoint role="coach">
      <SidebarProvider className={` `}>
        <Modals />
        <Sidebar
          collapsible="icon"
          className="relative border-secondary bg-primary"
        >
          <Image
            width={1000}
            height={1000}
            src={"/images/sidebarbg.png"}
            alt="side-bar-bg"
            loading="eager"
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
                              item.title === "My Programs" ||
                              item.title === "Bookings" ||
                              item.title === "Earnings" ||
                              item.title === "Messages"
                                ? "text-white"
                                : undefined
                            }
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
                  </SidebarMenuItem>
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

        <SidebarInset>
          <header className="flex shrink-0 items-center gap-2 border-b border-secondary py-2.5 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex w-full items-center justify-between gap-2 px-4">
              <BreadcrumbCustom />

              <div className="flex items-center gap-4">
                {/* <Notification /> */}
                <ProfileDropdown />
              </div>
            </div>
          </header>
          <ScrollArea className="h-[92vh]">
            <div className="px-1 py-6 md:px-8">{children}</div>
          </ScrollArea>
        </SidebarInset>
      </SidebarProvider>
    </AuthCheckPoint>
  )
}
