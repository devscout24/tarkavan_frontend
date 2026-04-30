"use client"

import CommonBtn from "@/components/common/common-btn"
import StatCard from "@/components/common/stat-card"
import { LayoutGrid } from "lucide-react"
import { GrGroup } from "react-icons/gr"
import { RiUserSearchLine } from "react-icons/ri"
import EducateIcon from "@/components/icons/EducateIcon"
import { IoIosFootball } from "react-icons/io"
import { useRouter } from "next/navigation"
import PlusIcon from "@/components/icons/plus-icon"
import { useCallback, useEffect, useState } from "react"
import { getClubDashboard } from "./action"
import ClubDashboardSubscription from "@/components/custom/club-dashboard-subscription"
import { toast } from "sonner"
import { type TClubDashboardData } from "@/types"
import ClubOpurtunityCard from "./components/recent-opurtunity-card"

type TClubDashboardSuccessResponse = {
  success: true
  data: TClubDashboardData
}

const isClubDashboardSuccessResponse = (
  value: unknown
): value is TClubDashboardSuccessResponse => {
  if (typeof value !== "object" || value === null) {
    return false
  }

  if (!("success" in value) || !("data" in value)) {
    return false
  }

  return value.success === true
}

 

 

type RecentOpportunity = {
  id: number;
  headline: string;
  club: {
    id: number;
    club_name: string;
    club_logo: string;
    city: string | null;
    state: string | null;
    country: string | null;
  } | null;
  team: {
    id: number;
    name: string;
    age_group: string;
    image: string;
    competition_level: string;
    formatted_age: string;
  };
  available_date: string;
  location: string;
  field_opportunity: string;
  opponent_club: {
    id: number | null;
    club_name: string | null;
    club_logo: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
  };
  status: string;
  is_requested: boolean;
  action_label: string;
}

export default function ClubDashboardPage() {
  const router = useRouter()
  const [dashboardData, setDashboardData] = useState<TClubDashboardData | null>(
    null
  )
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const recentOpportunities: RecentOpportunity[] = dashboardData?.recent_opportunities as RecentOpportunity[] ?? []
  
  const fetchDashboardData = useCallback(async () => {
    try {
      const res = await getClubDashboard()  
      if (!isClubDashboardSuccessResponse(res)) {
        setIsError(true)
        setErrorMessage(
          "May be you are not logged in or not authenticated subscription."
        )
        toast.error(
          "May be you are not logged in or not authenticated subscription."
        )
        return
      }

      setIsError(false)
      setErrorMessage("")
      setDashboardData(res.data)
    } catch {
      setIsError(true)
      setErrorMessage(
        "An error occurred while fetching dashboard data. Please try again later."
      )
      toast.error(
        "An error occurred while fetching dashboard data. Please try again later."
      )
    }
  }, [])

  const stats = dashboardData
    ? [
        {
          title: "Active Teams",
          text: String(dashboardData.summary.active_teams),
          icon: <GrGroup />,
        },
        {
          title: "Player Applications",
          text: String(dashboardData.summary.player_applications),
          icon: <RiUserSearchLine />,
        },
        {
          title: "Coach Applications",
          text: String(dashboardData.summary.coach_applications),
          icon: <EducateIcon />,
        },
        {
          title: "Upcoming Matches",
          text: String(dashboardData.summary.upcoming_matches),
          icon: <IoIosFootball />,
        },
        {
          title: "Programs",
          text: String(dashboardData.summary.programs),
          icon: <LayoutGrid />,
        },
      ]
    : [
        { title: "Active Teams", text: "0", icon: <GrGroup /> },
        { title: "Player Applications", text: "0", icon: <RiUserSearchLine /> },
        { title: "Coach Applications", text: "0", icon: <EducateIcon /> },
        { title: "Upcoming Matches", text: "0", icon: <IoIosFootball /> },
        { title: "Programs", text: "0", icon: <LayoutGrid /> },
      ]

  useEffect(() => {
    const initialFetchTimer = window.setTimeout(() => {
      void fetchDashboardData()
    }, 0)

    const handleDashboardRefresh = () => {
      void fetchDashboardData()
    }

    window.addEventListener("matchApplied", handleDashboardRefresh)
    return () => {
      window.clearTimeout(initialFetchTimer)
      window.removeEventListener(
        "matchApplied",
        handleDashboardRefresh
      )
    }
  }, [fetchDashboardData])

  if (isError) {
    return (
      <ClubDashboardSubscription
        text={errorMessage}
        link="/club/subscription"
        btnText="Get Subscription"
      />
    )
  }

  return (
    <section className=" ">
      <h2 className="text-base font-bold text-white">
        Welcome, {dashboardData?.club_info.club_name || "Club"}
      </h2>
      <p className="mt-1 text-base text-white">
        {
          "Here is a summary of your club's recent activity and upcoming  sessions."
        }
      </p>

      {/* stats / all summery */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            text={stat.text}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* activity and action  */}
      <div className="mt-6 flex w-full flex-col-reverse gap-6 text-white md:flex-row">
        {/* recent activity */}
        <div className="flex-2 rounded-[24px]">
          <h5 className="mb-4 text-[18px] leading-[150%] font-semibold text-white">
            Recent Opportunities
          </h5>

          <div className="scrollbar-hide overflow-x-auto">
            <div className="flex flex-wrap gap-4 pb-2">
              {recentOpportunities.length > 0 ? (
                recentOpportunities.map((opportunity: RecentOpportunity) => (
                  <div
                    key={opportunity.id}
                    className="min-w-[320px] flex-1 shrink-0"
                  >
                    <ClubOpurtunityCard
                      ClubName={opportunity.club?.club_name || "Unknown Club"}
                      date={opportunity.available_date}
                      location={opportunity.location}
                      opurtunity={opportunity.field_opportunity}
                      matchId={String(opportunity.id)}
                      action_label={opportunity.action_label}
                      headline={opportunity.headline}
                      openerClubName={opportunity.club?.club_name || "Unknown Club"}
                    />
                  </div>
                ))
              ) : (
                <div className="w-full rounded-2xl border border-white/20 bg-secondary/20 p-6 text-sm text-white/80">
                  No recent opportunities available.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* quick actions */}
        <div className="flex-1 rounded-2xl border border-white/20">
          <h3 className="mt-2 mb-2 ml-6 text-base font-semibold">
            Quick Actions
          </h3>

          {/* actions */}
          <div className="rounded-[16px]">
            <CommonBtn
              variant={"default"}
              size={"sm"}
              icon={<PlusIcon />}
              className="w-full scale-90 cursor-pointer bg-secondary py-6! text-white hover:bg-brand hover:text-primary"
              text={"Add Program"}
              onClick={() => router.push("?add-new=program")}
            />
            <CommonBtn
              variant={"default"}
              size={"sm"}
              icon={<PlusIcon />}
              className="mt-4 w-full scale-90 cursor-pointer bg-secondary py-6! text-white hover:bg-brand hover:text-primary"
              text={"Create New Team"}
              onClick={() => router.push("?add-new=team")}
            />
            <CommonBtn
              variant={"default"}
              size={"sm"}
              icon={<PlusIcon />}
              className="mt-4 w-full scale-90 cursor-pointer bg-secondary py-6 text-white hover:bg-brand hover:text-primary"
              text={"Add Match"}
              onClick={() => router.push("?add-new=friendly-match")}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
