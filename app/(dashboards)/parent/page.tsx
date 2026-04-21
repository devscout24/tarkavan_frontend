"use client"

import StatCard from "@/components/common/stat-card"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import ProgramReminder from "@/components/custom/program-reminder"
import Advertisement from "@/components/custom/advertisement"
import advertisementImage from "@/public/images/advertisementImage.png"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Icon } from "@/components/custom/Icon"
import { getDashboard } from "@/components/parentApi"
import type { DashboardData, DashboardApiResult } from "@/components/parentApi"

const ChildrenIcon = () => (
  <Icon width="18" height="14" viewBox="0 0 18 14">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.95834 0C5.22399 0 6.25001 1.02602 6.25001 2.29167C6.25001 3.55732 5.22399 4.58333 3.95834 4.58333C2.69268 4.58333 1.66668 3.55732 1.66668 2.29167C1.66668 1.02602 2.69268 0 3.95834 0ZM6.19152 8.964C5.75256 9.12783 5.33541 9.33608 4.94573 9.58333H0V7.489L0.137083 7.31775C1.06013 6.16467 2.42211 5.41667 3.95833 5.41667C4.25633 5.41667 4.54776 5.44483 4.8307 5.49858C4.80498 5.67592 4.79167 5.85725 4.79167 6.04167C4.79167 7.223 5.33788 8.27667 6.19152 8.964ZM10.8333 2.29167C10.8333 1.02602 11.8593 0 13.125 0C14.3907 0 15.4167 1.02602 15.4167 2.29167C15.4167 3.55732 14.3907 4.58333 13.125 4.58333C11.8593 4.58333 10.8333 3.55732 10.8333 2.29167ZM8.54167 9.58333C6.86787 9.58333 5.36246 10.3073 4.32725 11.4567L4.16668 11.6351V13.75H12.9167V11.6351L12.7561 11.4567C11.7209 10.3073 10.2155 9.58333 8.54167 9.58333ZM5.83334 6.04167C5.83334 4.54589 7.04592 3.33333 8.54167 3.33333C10.0374 3.33333 11.25 4.54589 11.25 6.04167C11.25 7.53742 10.0374 8.75 8.54167 8.75C7.04592 8.75 5.83334 7.53742 5.83334 6.04167ZM10.8918 8.964C11.3308 9.12783 11.7479 9.33608 12.1376 9.58333H17.0833V7.489L16.9463 7.31775C16.0233 6.16467 14.6613 5.41667 13.125 5.41667C12.827 5.41667 12.5356 5.44483 12.2527 5.49858C12.2783 5.67592 12.2917 5.85725 12.2917 6.04167C12.2917 7.223 11.7455 8.27667 10.8918 8.964Z"
      fill="#060807"
    />
  </Icon>
)

const ProgramsIcon = () => (
  <Icon>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.75 1.04163C7.19873 1.04163 7.5625 1.40624 7.5625 1.85602V2.67733C8.04408 2.6704 8.56533 2.6704 9.12808 2.67041H10.8719C11.4347 2.6704 11.9559 2.6704 12.4375 2.67733V1.85602C12.4375 1.40624 12.8012 1.04163 13.25 1.04163C13.6987 1.04163 14.0625 1.40624 14.0625 1.85602V2.74952C14.2094 2.76293 14.3508 2.7786 14.4869 2.79694C15.462 2.92835 16.2831 3.20947 16.9351 3.86307C17.5872 4.51666 17.8677 5.33961 17.9987 6.317C18.125 7.25841 18.125 8.45538 18.125 9.94038V11.6883C18.125 13.1733 18.125 14.3703 17.9987 15.3117C17.8677 16.2891 17.5872 17.112 16.9351 17.7656C16.2831 18.4192 15.462 18.7004 14.4869 18.8318C13.5477 18.9583 12.3535 18.9583 10.8719 18.9583H9.12808C7.64651 18.9583 6.45233 18.9583 5.51311 18.8318C4.53798 18.7004 3.71696 18.4192 3.06488 17.7656C2.41281 17.112 2.13233 16.2891 2.00123 15.3117C1.87496 14.3703 1.87498 13.1734 1.875 11.6884V9.94038C1.87498 8.45538 1.87496 7.25839 2.00123 6.317C2.13233 5.33961 2.41281 4.51666 3.06488 3.86307C3.71696 3.20947 4.53798 2.92835 5.51311 2.79694C5.64918 2.7786 5.79062 2.76293 5.9375 2.74952V1.85602C5.9375 1.40624 6.30127 1.04163 6.75 1.04163ZM3.51155 8.12496C3.50038 8.66313 3.50001 9.28146 3.50001 9.99996V11.6287C3.50001 13.1874 3.50173 14.2745 3.61175 15.0947C3.71863 15.8915 3.91411 16.3134 4.21394 16.6139C4.51377 16.9145 4.93472 17.1104 5.72964 17.2175C6.54793 17.3278 7.63247 17.3295 9.1875 17.3295H10.8125C12.3676 17.3295 13.4521 17.3278 14.2704 17.2175C15.0653 17.1104 15.4862 16.9145 15.7861 16.6139C16.0859 16.3134 16.2814 15.8915 16.3882 15.0947C16.4982 14.2745 16.5 13.1874 16.5 11.6287V9.99996C16.5 9.28146 16.4997 8.66313 16.4885 8.12496H3.51155Z"
      fill="#060807"
    />
    <path
      d="M13.7025 10.3665C13.8561 10.8004 13.629 11.2766 13.1952 11.4302C12.248 11.7657 11.3282 12.6504 10.6028 13.5601C10.252 14 9.96893 14.4173 9.77385 14.7244C9.6766 14.8774 9.53185 15.1249 9.48226 15.2097C9.32368 15.5009 9.00718 15.6707 8.67685 15.6415C8.34626 15.6122 8.06464 15.3897 7.95971 15.0749C7.82399 14.6677 7.54832 14.3817 7.27634 14.1874C7.14196 14.0915 6.90736 13.9768 6.81891 13.9349C6.38268 13.7891 6.14758 13.3176 6.29305 12.8812C6.43859 12.4445 6.91052 12.2086 7.34714 12.3541C7.39751 12.374 7.56226 12.4384 7.64218 12.4762C7.80113 12.5515 8.01486 12.6668 8.24507 12.8312C8.40568 12.9459 8.57868 13.0879 7.74768 13.2603C8.90843 13.0307 9.09335 12.7798 9.29968 12.521C10.0694 11.5557 11.2329 10.3571 12.6388 9.8592C13.0726 9.70553 13.5488 9.9327 13.7025 10.3665Z"
      fill="#060807"
    />
  </Icon>
)

const UpcomingIcon = () => (
  <Icon>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.9212 1.04138C15.3671 1.0414 15.7285 1.40404 15.7285 1.85112V2.25558H16.5358C17.8733 2.25558 18.9575 3.34283 18.9577 4.68396V12.7797C18.9576 14.1209 17.8733 15.208 16.5358 15.208H8.46292C7.12539 15.208 6.04112 14.1209 6.04102 12.7797V4.68396C6.04117 3.34283 7.12542 2.25558 8.46292 2.25558H9.27017V1.85112C9.27017 1.40403 9.63158 1.04138 10.0775 1.04138C10.5233 1.0414 10.8847 1.40404 10.8847 1.85112V2.25558H14.1139V1.85112C14.1139 1.40403 14.4753 1.04138 14.9212 1.04138ZM7.6556 6.45805V12.7797C7.6557 13.2267 8.0171 13.5894 8.46292 13.5894H16.5358C16.9816 13.5894 17.343 13.2267 17.3431 12.7797V6.45805H7.6556Z"
      fill="#060807"
    />
    <path
      d="M4.99935 10.208H2.6556V16.5362C2.6556 16.982 3.01704 17.3434 3.46289 17.3434H11.5358C11.9817 17.3434 12.3431 16.982 12.3431 16.5362V16.2497H13.9577V16.5362C13.9577 17.8738 12.8733 18.958 11.5358 18.958H3.46289C2.12532 18.958 1.04102 17.8738 1.04102 16.5362V8.46327C1.04102 7.1257 2.12532 6.04138 3.46289 6.04138H4.99935V10.208Z"
      fill="#060807"
    />
  </Icon>
)

const PaymentsIcon = () => (
  <Icon>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.04102 3.125H8.56752L12.5479 6.60788L11.7248 7.54859L8.09785 4.375H1.04102V3.125Z"
      fill="#060807"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.04102 10.625H4.79102V11.875H1.04102V10.625Z"
      fill="#060807"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.08268 5.36609L9.19131 7.4747C9.89564 8.17901 9.89564 9.3209 9.19131 10.0252C8.48697 10.7296 7.34506 10.7296 6.64074 10.0252L5.78037 9.1649C4.86794 9.72298 3.68203 9.68906 2.79347 9.02265L2.04102 8.45831L2.79102 7.45831L3.54347 8.02265C4.10612 8.44465 4.89343 8.38865 5.39074 7.89136L5.83268 7.44942L7.52462 9.1414C7.74078 9.35756 8.09125 9.35756 8.30741 9.1414C8.52356 8.92523 8.52356 8.57473 8.30741 8.35856L6.1988 6.24997L7.08268 5.36609Z"
      fill="#060807"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.23477 8.29678L3.54102 8.21999V16.875H18.9577V6.45837H6.40713L8.30741 8.35862C8.5236 8.57479 8.5236 8.92529 8.30741 9.14146C8.09125 9.35762 7.74078 9.35762 7.52462 9.14146L5.83268 7.44949L5.39074 7.89143C5.07792 8.20425 4.65046 8.34279 4.23477 8.29678ZM11.2493 13.3334C12.1698 13.3334 12.916 12.5871 12.916 11.6667C12.916 10.7462 12.1698 10 11.2493 10C10.3288 10 9.58268 10.7462 9.58268 11.6667C9.58268 12.5871 10.3288 13.3334 11.2493 13.3334Z"
      fill="#060807"
    />
  </Icon>
)

const AddChildIcon = () => (
  <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
    <path d="M17 10V7H14V5H17V2H19V5H22V7H19V10H17ZM8 8C6.9 8 5.95833 7.60833 5.175 6.825C4.39167 6.04167 4 5.1 4 4C4 2.9 4.39167 1.95833 5.175 1.175C5.95833 0.391667 6.9 0 8 0C9.1 0 10.0417 0.391667 10.825 1.175C11.6083 1.95833 12 2.9 12 4C12 5.1 11.6083 6.04167 10.825 6.825C10.0417 7.60833 9.1 8 8 8ZM0 16V13.2C0 12.6333 0.145833 12.1125 0.4375 11.6375C0.729167 11.1625 1.11667 10.8 1.6 10.55C2.63333 10.0333 3.68333 9.64583 4.75 9.3875C5.81667 9.12917 6.9 9 8 9C9.1 9 10.1833 9.12917 11.25 9.3875C12.3167 9.64583 13.3667 10.0333 14.4 10.55C14.8833 10.8 15.2708 11.1625 15.5625 11.6375C15.8542 12.1125 16 12.6333 16 13.2V16H0ZM2 14H14V13.2C14 13.0167 13.9542 12.85 13.8625 12.7C13.7708 12.55 13.65 12.4333 13.5 12.35C12.6 11.9 11.6917 11.5625 10.775 11.3375C9.85833 11.1125 8.93333 11 8 11C7.06667 11 6.14167 11.1125 5.225 11.3375C4.30833 11.5625 3.4 11.9 2.5 12.35C2.35 12.4333 2.22917 12.55 2.1375 12.7C2.04583 12.85 2 13.0167 2 13.2V14ZM8 6C8.55 6 9.02083 5.80417 9.4125 5.4125C9.80417 5.02083 10 4.55 10 4C10 3.45 9.80417 2.97917 9.4125 2.5875C9.02083 2.19583 8.55 2 8 2C7.45 2 6.97917 2.19583 6.5875 2.5875C6.19583 2.97917 6 3.45 6 4C6 4.55 6.19583 5.02083 6.5875 5.4125C6.97917 5.80417 7.45 6 8 6Z" />
  </svg>
)

const ProgramsOutlineIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.5 14.5L12.5 12.5L14.5 5.5L7.5 7.5L5.5 14.5ZM10 11.5C9.58333 11.5 9.22917 11.3542 8.9375 11.0625C8.64583 10.7708 8.5 10.4167 8.5 10C8.5 9.58333 8.64583 9.22917 8.9375 8.9375C9.22917 8.64583 9.58333 8.5 10 8.5C10.4167 8.5 10.7708 8.64583 11.0625 8.9375C11.3542 9.22917 11.5 9.58333 11.5 10C11.5 10.4167 11.3542 10.7708 11.0625 11.0625C10.7708 11.3542 10.4167 11.5 10 11.5ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2167 18 14.1042 17.2208 15.6625 15.6625C17.2208 14.1042 18 12.2167 18 10C18 7.78333 17.2208 5.89583 15.6625 4.3375C14.1042 2.77917 12.2167 2 10 2C7.78333 2 5.89583 2.77917 4.3375 4.3375C2.77917 5.89583 2 7.78333 2 10C2 12.2167 2.77917 14.1042 4.3375 15.6625C5.89583 17.2208 7.78333 18 10 18Z"
    />
  </svg>
)

const BillingIcon = () => (
  <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
    <path d="M3 20C2.16667 20 1.45833 19.7083 0.875 19.125C0.291667 18.5417 0 17.8333 0 17V14H3V0L4.5 1.5L6 0L7.5 1.5L9 0L10.5 1.5L12 0L13.5 1.5L15 0L16.5 1.5L18 0V17C18 17.8333 17.7083 18.5417 17.125 19.125C16.5417 19.7083 15.8333 20 15 20H3ZM15 18C15.2833 18 15.5208 17.9042 15.7125 17.7125C15.9042 17.5208 16 17.2833 16 17V3H5V14H14V17C14 17.2833 14.0958 17.5208 14.2875 17.7125C14.4792 17.9042 14.7167 18 15 18ZM6 7V5H12V7H6ZM6 10V8H12V10H6ZM14 7C13.7167 7 13.4792 6.90417 13.2875 6.7125C13.0958 6.52083 13 6.28333 13 6C13 5.71667 13.0958 5.47917 13.2875 5.2875C13.4792 5.09583 13.7167 5 14 5C14.2833 5 14.5208 5.09583 14.7125 5.2875C14.9042 5.47917 15 5.71667 15 6C15 6.28333 14.9042 6.52083 14.7125 6.7125C14.5208 6.90417 14.2833 7 14 7ZM14 10C13.7167 10 13.4792 9.90417 13.2875 9.7125C13.0958 9.52083 13 9.28333 13 9C13 8.71667 13.0958 8.47917 13.2875 8.2875C13.4792 8.09583 13.7167 8 14 8C14.2833 8 14.5208 8.09583 14.7125 8.2875C14.9042 8.47917 15 8.71667 15 9C15 9.28333 14.9042 9.52083 14.7125 9.7125C14.5208 9.90417 14.2833 10 14 10ZM3 18H12V16H2V17C2 17.2833 2.09583 17.5208 2.2875 17.7125C2.47917 17.9042 2.71667 18 3 18ZM2 18C2 18 2 17.9042 2 17.7125C2 17.5208 2 17.2833 2 17V16V18Z" />
  </svg>
)

const ArrowIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="8"
    height="12"
    viewBox="0 0 8 12"
    fill="none"
    className={className}
  >
    <path
      d="M4.6 6L0 1.4L1.4 0L7.4 6L1.4 12L0 10.6L4.6 6Z"
      fill="currentColor"
    />
  </svg>
)

const quickActions = [
  { icon: <AddChildIcon />, label: "Add Your Children", active: false },
  {
    icon: <ProgramsOutlineIcon />,
    label: "Explore EAM Programs",
    active: false,
  },
  { icon: <BillingIcon />, label: "View Billing History", active: false },
]

export default function Page() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [appliedAdvertisements, setAppliedAdvertisements] = useState<string[]>(
    () => {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("parentAppliedAdvertisements")
        return saved ? JSON.parse(saved) : []
      }
      return []
    }
  )

  const handleAddChildren = () => {
    const nextParams = new URLSearchParams(searchParams.toString())
    nextParams.set("add-new", "player")
    router.replace(
      nextParams.toString() ? `${pathname}?${nextParams.toString()}` : pathname
    )
  }

  const handleApplyAdvertisement = (teamName: string) => {
    if (!appliedAdvertisements.includes(teamName)) {
      const newApplied = [...appliedAdvertisements, teamName]
      setAppliedAdvertisements(newApplied)
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "parentAppliedAdvertisements",
          JSON.stringify(newApplied)
        )
      }
      toast.success(`Successfully applied to ${teamName}!`)
    } else {
      toast.info(`You have already applied to ${teamName}`)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: DashboardApiResult = await getDashboard()

        if (res.success && res.data) {
          setDashboardData(res.data)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchData()
  }, [])

  const mappedStats = [
    {
      icon: <ChildrenIcon />,
      title: "Total Children",
      text: String(dashboardData?.summary.total_children || 0),
    },
    {
      icon: <ProgramsIcon />,
      title: "Upcoming Programs",
      text: String(dashboardData?.summary.total_upcoming_programs || 0),
    },
    {
      icon: <UpcomingIcon />,
      title: "Upcoming Sessions",
      text: String(dashboardData?.summary.total_upcoming_recruitments || 0),
    },
    // { icon: <PaymentsIcon />, title: "Recent Payments", text: "$360.00" },
  ]

  return (
    <section className="px-2">
      <div className="mb-4">
        <h4 className="font-base mb-1 leading-[150%] font-bold text-[#ffffff]">
          Welcome Back, Shahin!
        </h4>
        <p className="font-base leading-[150%] font-normal text-[#ffffff]">
          Here is a summary of your children recent activity and upcoming
          sessions.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {mappedStats.map((stat) => (
          <StatCard
            key={stat.title}
            icon={stat.icon}
            title={stat.title}
            text={stat.text}
          />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_540px] xl:items-start">
        <div className="rounded-[24px]">
          <h5 className="mb-4 text-[18px] leading-[150%] font-semibold text-white">
            Recent Opportunities
          </h5>

          <div className="scrollbar-hide overflow-x-auto">
            <div className="flex flex-wrap gap-4 pb-2">
              {dashboardData?.recent_opportunities &&
              dashboardData.recent_opportunities.length > 0 ? (
                dashboardData.recent_opportunities.map((opportunity) => (
                  <div
                    key={opportunity.id}
                    className="max-w-[320px] min-w-[320px] shrink-0"
                  >
                    <Advertisement
                      imageUrl={opportunity.image_url || advertisementImage}
                      positions={opportunity.positions || "Various"}
                      teamName={opportunity.team_name || "Team"}
                      ageGroup={opportunity.age_group || "U16"}
                      tryoutDate={opportunity.tryout_date || "TBD"}
                      description={
                        opportunity.description || "Opportunity available."
                      }
                      onApply={() =>
                        handleApplyAdvertisement(
                          opportunity.team_name || "Team"
                        )
                      }
                      isApplied={appliedAdvertisements.includes(
                        opportunity.team_name || ""
                      )}
                    />
                  </div>
                ))
              ) : (
                <div className="w-full py-8 text-center">
                  <p className="text-sm text-white/60">
                    No recent opportunities available
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <section>
            <h5 className="mb-4 text-[18px] leading-[150%] font-semibold text-white">
              Quick Actions
            </h5>

            <div className="mb-6 space-y-3">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  onClick={
                    action.label === "Add Your Children"
                      ? handleAddChildren
                      : undefined
                  }
                  className={`group transition-alcursor-pointer flex w-full cursor-pointer items-center justify-between rounded-[16px] border px-4 py-4 text-left ${
                    action.active
                      ? "border-brand bg-brand"
                      : "border-secondary bg-secondary/25 hover:border-brand hover:bg-brand"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`h-5 w-5 shrink-0 transition-colors duration-200 ${
                        action.active
                          ? "text-primary"
                          : "text-white group-hover:text-primary"
                      }`}
                    >
                      {action.icon}
                    </span>
                    <span
                      className={`text-[15px] leading-[150%] transition-all duration-200 ${
                        action.active
                          ? "font-semibold text-primary"
                          : "font-medium text-white group-hover:font-semibold group-hover:text-primary"
                      }`}
                    >
                      {action.label}
                    </span>
                  </span>
                  <ArrowIcon
                    className={`transition-colors duration-200 ${
                      action.active
                        ? "text-primary"
                        : "text-white group-hover:text-black"
                    }`}
                  />
                </button>
              ))}
            </div>
          </section>

          {/* Program Reminder */}
          {dashboardData?.upcoming_program_reminders &&
          dashboardData.upcoming_program_reminders.length > 0 ? (
            dashboardData.upcoming_program_reminders.map((reminder) => (
              <ProgramReminder
                key={reminder.id}
                title={reminder.title || "Program Reminder"}
                date={
                  reminder.program_date
                    ? {
                        month: new Date(reminder.program_date)
                          .toLocaleDateString("en-US", { month: "short" })
                          .toUpperCase(),
                        day: new Date(reminder.program_date).getDate(),
                      }
                    : { month: "TBD", day: 1 }
                }
                time={reminder.reminder_date || "TBD"}
                location={reminder.description || "Location TBD"}
                // onClick={() => console.log("View location clicked")}
              />
            ))
          ) : (
            <div className="rounded-[24px] border border-white/12 bg-primary p-4 text-white">
              <h5 className="mb-4 text-[18px] leading-[150%] font-semibold">
                Program Reminders
              </h5>
              <p className="text-sm text-white/60">
                No upcoming program reminders
              </p>
            </div>
          )}

          {/* Advertisement */}
        </aside>
      </div>
    </section>
  )
}
