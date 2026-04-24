"use client"

import StatCard from "@/components/common/stat-card"
import Advertisement from "@/components/custom/advertisement" 
import CoachQuickActions from "@/components/custom/coach-quick-actions"
import {
  ActiveProgramsIcon,
  NetEarningsIcon,
  PlatformFeeIcon, 
  UpcomingProgramsIcon,
} from "@/components/custom/coach-dashboard-icons" 
import { useEffect, useState } from "react"
import { toast } from "sonner"
import PlusIcon from "@/components/icons/plus-icon"
import { getCoachDashboard } from "@/components/parentAndCoachApi/api/coachDashboardApi"
import type { CoachDashboardData } from "@/components/parentAndCoachApi/type/coachDashboardTypes"
import Loader from "@/components/common/loader"

const quickActions = [
  {
    icon:  <PlusIcon/>,
    label: "Add Programs",
    active: true,
    link: "?add-new=program"
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M1.875 15.625V13.125H3.54167V15.625C3.54167 16.0852 3.91476 16.4583 4.375 16.4583H15.625C16.0852 16.4583 16.4584 16.0852 16.4584 15.625V13.125H18.125V15.625C18.125 17.0057 17.0057 18.125 15.625 18.125H4.375C2.99428 18.125 1.875 17.0057 1.875 15.625Z"
          fill="white"
        />
        <path
          d="M9.1654 1.875H10.8321V11.1133L13.7487 8.19662L14.9271 9.37501L9.99874 14.3034L5.07031 9.37501L6.2487 8.19662L9.1654 11.1133V1.875Z"
          fill="white"
        />
      </svg>
    ),
    label: "Export Earnings",
    active: false,
  },
]

export default function CoachDashboardPage() {
  const [dashboardData, setDashboardData] = useState<CoachDashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  const [appliedAdvertisements, setAppliedAdvertisements] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('coachAppliedAdvertisements')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const result = await getCoachDashboard()
        if (result.success && result.data) {
          setDashboardData(result.data)
        } else {
          toast.error(result.message || "Failed to fetch dashboard data")
        }
      } catch (error) {
        toast.error("An unexpected error occurred while fetching dashboard data")
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const handleApplyAdvertisement = (teamName: string) => {
    if (!appliedAdvertisements.includes(teamName)) {
      const newApplied = [...appliedAdvertisements, teamName]
      setAppliedAdvertisements(newApplied)
      if (typeof window !== 'undefined') {
        localStorage.setItem('coachAppliedAdvertisements', JSON.stringify(newApplied))
      }
      toast.success(`Successfully applied to ${teamName}!`)
    } else {
      toast.info(`You have already applied to ${teamName}`)
    }
  }

  if (loading) {
    return <Loader />
  }

  const stats = [
    { icon: <ActiveProgramsIcon />, title: "Active Programs", text: dashboardData?.summary?.active_programs?.toString().padStart(2, '0') || "00" },
    { icon: <UpcomingProgramsIcon />, title: "My Upcoming Programs", text: dashboardData?.summary?.upcoming_programs?.toString().padStart(2, '0') || "00" },
    { icon: <NetEarningsIcon />, title: "Net Earnings (Month)", text: `$${dashboardData?.summary?.net_earnings_month?.toFixed(2) || "0.00"}` },
    {
      icon: <PlatformFeeIcon />,
      title: `${dashboardData?.summary?.platform_fee_rate || 0}% Platform Fee (Month)`,
      text: `$${dashboardData?.summary?.platform_fee_month?.toFixed(2) || "0.00"}`,
    },
  ]

  return (
    <section>
      <div className="mb-4">
        <h4 className="mb-1 leading-[150%] font-bold text-white">
          Welcome, {dashboardData?.coach_info?.name || "Coach"}
        </h4>
        <p className="leading-[150%] font-normal text-white">
          {`Here's what's happening with your coaching business today.`}
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            icon={stat.icon}
            title={stat.title}
            text={stat.text}
          />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_540px] xl:items-start">
        <section className="rounded-[24px]">
          <h5 className="mb-4 text-[24px] leading-[125%] font-medium text-white">
            Recent Opportunities
          </h5>

          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 pb-2">
              {dashboardData?.recent_opportunities && dashboardData.recent_opportunities.length > 0 ? (
                dashboardData.recent_opportunities.map((opportunity, index) => (
                  <div key={opportunity.id || index} className="min-w-[320px] max-w-[320px] shrink-0">
                    <Advertisement
                      imageUrl={opportunity.image_url || "/images/advertisementImage.png"}
                      positions={opportunity.positions || "Coach"}
                      teamName={opportunity.team_name || "Unknown Team"}
                      ageGroup={opportunity.age_group || "All ages"}
                      tryoutDate={opportunity.tryout_date || "TBA"}
                      description={opportunity.description || "No description provided."}
                      onApply={() => handleApplyAdvertisement(opportunity.team_name || `Team ${index}`)}
                      isApplied={appliedAdvertisements.includes(opportunity.team_name || `Team ${index}`)}
                    />
                  </div>
                ))
              ) : (
                <div className="text-white/60 text-[32px] py-8 px-4">
                  No recent opportunities found.
                </div>
              )}
            </div>
          </div>
        </section>

        <aside>
          <h5 className="mb-4 text-[24px] leading-[125%] font-medium text-white">
            Quick Actions
          </h5>

          <div className="rounded-[16px] border border-secondary/65 bg-white/10 p-4">
            <CoachQuickActions actions={quickActions} />
          </div>
        </aside>
      </div>
    </section>
  )
}

