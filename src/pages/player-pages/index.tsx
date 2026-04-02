import RecentActivityRow from "@/components/custom/recent-activity-row" 
import {
  CalendarCheck,
  Calendars,
  Share2,
  SquarePen,
  Wallet,
} from "lucide-react"
import CommonBtn from "@/components/common/common-btn" 
import TrainingReminderCard from "@/components/custom/remiender" 
import ScoutingStatus from "./components/scouting-status"
import PlayerRecruitmentCard from "./components/player-recruitment-card"
import PlayerStats from "./components/player-stats"

export function PlayerDashboardPage() {
  const activities = [
    {
      icon: <CalendarCheck className="max-h-5 max-w-5" />,
      time: "2 hours ago",
      title: "Shaun registered for Elite Soccer Training",
    },
    {
      icon: <Wallet className="max-h-5 max-w-5" />,
      time: "Yesterday",
      title: "Payment of $299.00 completed",
    },
    {
      icon: <Calendars className="max-h-5 max-w-5" />,
      time: "3 days ago",
      title: "Upcoming session: Basketball Skills on Saturday",
    },
  ]

  return (
    <section className=" ">
      <h2 className="text-base font-bold text-white">Welcome, Daniel</h2>
      <p className="mt-1 text-base text-white ">
        Here is a summary of your children recent activity and upcoming
        sessions.{" "}
      </p>

      {/* stats */}
      <PlayerStats />

      {/* activity and action  */}
      <div className="mt-6 flex md:flex-row flex-col-reverse   w-full gap-6 text-white">
        {/* recent activity */}
        <div className="xl:flex-8 md:flex-3">
          <h3 className="mb-2 text-base font-semibold">Recent Activity</h3>

          <div className="rounded-[16px] border border-secondary/40">
            {activities.map((activity, index) => (
              <RecentActivityRow
                key={index}
                icon={activity.icon}
                time={activity.time}
                title={activity.title}
                showDivider={index !== activities.length - 1}
              />
            ))}
          </div>
        </div>

        {/* quick actions */}
        <div className="xl:flex-2 md:flex-2 ">
          <h3 className="mb-2 text-base font-semibold">Quick Actions</h3>

          {/* actions */}
          <div className="rounded-[16px] border border-secondary/30 bg-secondary/25 p-6">
            <CommonBtn
              variant={"default"}
              size={"sm"}
              icon={<SquarePen />}
              className="w-full cursor-pointer bg-secondary py-6! hover:bg-brand hover:text-primary"
              text={"Edit My Profile"}
            />
            <CommonBtn
              variant={"default"}
              size={"sm"}
              icon={<Share2 />}
              className="mt-4 w-full cursor-pointer bg-secondary py-6 text-white hover:bg-brand hover:text-primary"
              text={"Edit My Profile"}
            />

            {/* divider */}
            <div className="my-4 border-t border-secondary/30" />

            <h4 className="text-sm font-bold">Scouting Status</h4>

            <ScoutingStatus />
          </div>

          <TrainingReminderCard />

          <PlayerRecruitmentCard />

        </div>
      </div>
    </section>
  )
}
