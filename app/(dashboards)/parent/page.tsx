"use client"

import StatCard from "@/components/common/stat-card"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import ProgramReminder from "@/components/custom/program-reminder" 
import advertisementImage from "@/public/images/advertisementImage.png"
import { useEffect, useState } from "react" 
import { Icon } from "@/components/custom/Icon"
import { getDashboard } from "@/components/parentAndCoachApi"
import type { DashboardData, DashboardApiResult } from "@/components/parentAndCoachApi"
import AdvertisementParent from "./component/parent-advertisement"

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

 

 
 
 

const quickActions = [
  { label: "Add Your Children", active: true },
  { label: "Explore Programs", active: false, },
  { label: "View Billing History", active: false },
]

export default function Page() {
  const router = useRouter()
  const pathname = usePathname()
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null) 

  const handleAddChildren = () => {
    router.push(`${pathname}?player=setup`)
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

  const [user , setUser] = useState<Record<string, string> | null>(null)
  useEffect(()=> {

    const userData = localStorage.getItem("go_elite_user")
    if(userData){
      setUser(JSON.parse(userData))
    } 
  } , [])
  


  return (
    <section className="px-2">
      <div className="mb-4">
        <h4 className="font-base mb-1 leading-[150%] font-bold text-[#ffffff]">
          Welcome Back, {user?.name || ""}!
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
                    <AdvertisementParent
                      imageUrl={opportunity.team.image || advertisementImage}
                      positions={opportunity.position.name || "Various"}
                      teamName={opportunity.team.name || "Team"}
                      ageGroup={String(opportunity.upto_age) || "U16"}
                      tryoutDate={opportunity.tryout_date || "TBD"}
                      description={
                        opportunity.description || "Opportunity available."
                      }  
                      application_status={"pending"}
                      recruitId={String(opportunity.id)}
                      matched_children={opportunity.matched_children || []}
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
                      : 
                      action.label === "View Billing History" ? 
                      () => router.push("/parent/payments") :
                      action.label === "Explore Programs" ?
                      () => router.push("/parent/programs") :
                      undefined
                  }
                  className={`group transition-alcursor-pointer flex w-full cursor-pointer items-center justify-between rounded-[16px] border px-4 py-4 text-left transition-all duration-200 ${
                    action.active
                      ? "border-brand bg-brand"
                      : "border-secondary bg-secondary/25 hover:border-brand hover:bg-brand"
                  }`}
                >
                  <span className="flex items-center gap-3"> 
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
