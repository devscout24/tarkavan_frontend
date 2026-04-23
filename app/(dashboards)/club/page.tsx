"use client"

import CommonBtn from "@/components/common/common-btn"
import StatCard from "@/components/common/stat-card"
import { GrGroup } from "react-icons/gr"
import { RiUserSearchLine } from "react-icons/ri"
import EducateIcon from "@/components/icons/EducateIcon"
import { IoIosFootball } from "react-icons/io"
import { useRouter } from "next/navigation"
import Advertisement from "@/components/custom/advertisement"
import PlusIcon from "@/components/icons/plus-icon"
import { useEffect, useState } from "react"
import { getClubDashboard } from "./action"
import ClubDashboardSubscription from "@/components/custom/club-dashboard-subscription"
import { toast } from "sonner"

export default function ClubDashboardPage() {
  const router = useRouter()

  const stats = [
    {
      title: "Active Teams",
      text: "04",
      icon: <GrGroup />,
    },
    {
      title: "Player Applications",
      text: "07",
      icon: <RiUserSearchLine />,
    },
    {
      title: "Coach Applications",
      text: "03",
      icon: <EducateIcon />,
    },
    {
      title: "Upcoming Matches",
      text: "02",
      icon: <IoIosFootball />,
    },
  ]
  const [isDashboard, setIsDashboard] = useState<{
    status: boolean
    message: string
  }>({
    status: false,
    message: "",
  })

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const res = await getClubDashboard()
        console.log(res)
        if (!res?.status) {
          setIsDashboard({
            status: true,
            message:
              String(res?.message) ||
              "May be you are not logged in or not authenticated subscription.",
          })
          toast.error(
            res?.message ||
              "May be you are not logged in or not authenticated subscription."
          )
          return
        }
      } catch (err) {
        setIsDashboard({
          status: true,
          message:
            "An error occurred while fetching dashboard data. Please try again later.",
        })
        toast.error(
          "An error occurred while fetching dashboard data. Please try again later."
        )
      }
    }

    getDashboardData()
  }, [])

  if (isDashboard.status) {
    return <ClubDashboardSubscription text={isDashboard.message} link="/club/subscription" btnText="Get Subscription" />
  }

  return (
    <section className=" ">
      <h2 className="text-base font-bold text-white">Welcome, Daniel</h2>
      <p className="mt-1 text-base text-white">
        Here is a summary of your children recent activity and upcoming
        sessions.{" "}
      </p>

      {/* stats */}
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
              <div className="min-w-[320px] flex-1 shrink-0">
                <Advertisement
                  imageUrl={"/images/advertisementImage.png"}
                  positions="Defender, Winger"
                  teamName="Elite U16"
                  ageGroup="U16"
                  tryoutDate="March 15-18, 2026"
                  description="Looking for skilled defenders for upcoming season."
                  onApply={() => {}}
                  isApplied={true}
                />
              </div>

              <div className="min-w-[320px] flex-1 shrink-0">
                <Advertisement
                  imageUrl={"/images/advertisementImage.png"}
                  positions="Goalkeeper, Midfielder"
                  teamName="Academy Select"
                  ageGroup="U18"
                  tryoutDate="April 20-23, 2026"
                  description="Join our elite academy program for professional development."
                  onApply={() => {}}
                  isApplied={false}
                />
              </div>

              <div className="min-w-[320px] flex-1 shrink-0">
                <Advertisement
                  imageUrl={"/images/advertisementImage.png"}
                  positions="Striker, Attacker"
                  teamName="Premier FC"
                  ageGroup="U14"
                  tryoutDate="May 10-13, 2026"
                  description="Seeking talented forwards for competitive league play."
                  onApply={() => {}}
                  isApplied={true}
                />
              </div>
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
