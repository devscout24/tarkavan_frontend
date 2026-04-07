import RecentActivityRow from "@/components/custom/recent-activity-row" 
import {
  CalendarCheck,
  Calendars,
  Plus,
  Share2,
  SquarePen,
  Wallet,
} from "lucide-react"
import CommonBtn from "@/components/common/common-btn" 
import TrainingReminderCard from "@/components/custom/remiender"   
import PlayerStats from "../player/components/player-stats"
import ScoutingStatus from "../player/components/scouting-status"
import PlayerRecruitmentCard from "../player/components/player-recruitment-card"

export default function ClubDashboardPage() {
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

          <div className="rounded-[16px] border border-secondary">
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
        <div className="xl:flex-3 md:flex-2 ">
          <h3 className="mb-2 text-base font-semibold">Quick Actions</h3>

          {/* actions */}
          <div className="rounded-[16px]  ">
            <CommonBtn
              variant={"default"}
              size={"sm"}
              icon={<Plus />}
              className="w-full cursor-pointer text-white bg-secondary py-6! hover:bg-brand hover:text-primary"
              text={"Create New Team"}
            />
            <CommonBtn
              variant={"default"}
              size={"sm"}
              icon={<Plus />}
              className="mt-4 w-full cursor-pointer bg-secondary py-6 text-white hover:bg-brand hover:text-primary"
              text={"Add Match"}
            />

            {/* divider */}
            <div className="my-4 border-t border-secondary/30" />
 
 
          </div>
 

          <PlayerRecruitmentCard 
            position="U16 Elite Academy"
            tryoutDates="Saturday, Oct 14th"
            location="Central Park Complex"
            features={["We have a field"]}
            buttonText="Request Match" 
            btnSecond
          />

        </div>
      </div>
    </section>
  )
}
