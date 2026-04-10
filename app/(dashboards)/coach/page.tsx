"use client"

import StatCard from "@/components/common/stat-card"
import Advertisement from "@/components/custom/advertisement"
import RecentActivityRow from "@/components/custom/recent-activity-row"
import CoachQuickActions from "@/components/custom/coach-quick-actions"
import {
  ActiveProgramsIcon,
  NetEarningsIcon,
  PlatformFeeIcon,
  RecentPaymentIcon,
  RecentRegisterIcon,
  RecentUpcomingIcon,
  UpcomingProgramsIcon,
} from "@/components/custom/coach-dashboard-icons"
import advertisementImage from "../../../public/images/advertisementImage.png"
import { useState } from "react"
import { toast } from "sonner"
import { Icon } from "@/components/custom/Icon"

const stats = [
  { icon: <ActiveProgramsIcon />, title: "Active Programs", text: "05" },
  { icon: <UpcomingProgramsIcon />, title: "My Upcoming Programs", text: "01" },
  { icon: <NetEarningsIcon />, title: "Net Earnings (Month)", text: "$360.00" },
  {
    icon: <PlatformFeeIcon />,
    title: "10% Platform Fee (Month)",
    text: "$60.00",
  },
]

const activityItems = [
  {
    icon: <RecentRegisterIcon />,
    title: "Shaun Booking for Elite Soccer Training",
    time: "2 hours ago",
  },
  {
    icon: <RecentPaymentIcon />,
    title: "Payment of $299.00 completed",
    time: "Yesterday",
  },
  {
    icon: <RecentUpcomingIcon />,
    title: "Upcoming session: Basketball Skills on Saturday",
    time: "3 days ago",
  },
]

const quickActions = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M7.99806 13.3392C8.55 13.3392 8.9974 12.8918 8.9974 12.3399V9.00454H12.3321C12.8837 9.00454 13.331 8.55754 13.3314 8.00587C13.3317 7.45367 12.8842 7.00587 12.3321 7.00587H8.9974V3.67123C8.9974 3.11956 8.5504 2.67224 7.99873 2.67188C7.44653 2.67152 6.99873 3.11905 6.99873 3.67123V7.00587H3.66341C3.11149 7.00587 2.66406 7.45327 2.66406 8.0052C2.66406 8.55714 3.11149 9.00454 3.66341 9.00454H6.99873V12.3399C6.99873 12.8918 7.44613 13.3392 7.99806 13.3392Z"
          stroke="#060807"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "Add EAM Programs",
    active: true,
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
  const [appliedAdvertisements, setAppliedAdvertisements] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('coachAppliedAdvertisements')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

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

  return (
    <section>
      <div className="mb-4">
        <h4 className="mb-1 leading-[150%] font-bold text-white">
          Welcome, Daniel
        </h4>
        <p className="leading-[150%] font-normal text-white">
          Here's what's happening with your coaching business today.
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
              <div className="min-w-[320px] max-w-[320px] flex-shrink-0">
                <Advertisement
                  imageUrl={advertisementImage}
                  positions="Assistant Coach"
                  teamName="Elite U16"
                  ageGroup="3+ years"
                  tryoutDate="March 15-18, 2026"
                  description="Looking for experienced assistant coach."
                  onApply={() => handleApplyAdvertisement("Elite U16")}
                  isApplied={appliedAdvertisements.includes("Elite U16")}
                />
              </div>
              
              <div className="min-w-[320px] max-w-[320px] flex-shrink-0">
                <Advertisement
                  imageUrl={advertisementImage}
                  positions="Head Coach"
                  teamName="Academy Select"
                  ageGroup="U18"
                  tryoutDate="April 20-23, 2026"
                  description="Seeking experienced head coach for elite academy program."
                  onApply={() => handleApplyAdvertisement("Academy Select")}
                  isApplied={appliedAdvertisements.includes("Academy Select")}
                />
              </div>
              
              <div className="min-w-[320px] max-w-[320px] flex-shrink-0">
                <Advertisement
                  imageUrl={advertisementImage}
                  positions="Goalkeeper Coach"
                  teamName="Premier FC"
                  ageGroup="U14"
                  tryoutDate="May 10-13, 2026"
                  description="Specialized goalkeeper coach needed for competitive team."
                  onApply={() => handleApplyAdvertisement("Premier FC")}
                  isApplied={appliedAdvertisements.includes("Premier FC")}
                />
              </div>
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

