import RecentActivityRow from "@/components/custom/recent-activity-row"
import {
  CalendarCheck,
  Calendars,
  Plus, 
  Wallet,
} from "lucide-react"
import CommonBtn from "@/components/common/common-btn" 
import PlayerRecruitmentCard from "../player/components/player-recruitment-card"
import StatCard from "@/components/common/stat-card"
import { GrGroup } from "react-icons/gr";
import { RiUserSearchLine } from "react-icons/ri";
import EducateIcon from "@/components/icons/EducateIcon"
import { IoIosFootball } from "react-icons/io";

export default function ClubDashboardPage() {
  const activities = [
    {
      icon: <CalendarCheck className="max-h-5 max-w-5" />,
      time: "2 hours ago",
      title: "U18 Midfielder Liam Thompson  Applied",
    },
    {
      icon: <Wallet className="max-h-5 max-w-5" />,
      time: "Yesterday",
      title: "Had Coach Marcus Thorne  Applied",
    },
    {
      icon: <Calendars className="max-h-5 max-w-5" />,
      time: "3 days ago",
      title: "U16 Goalkeeper Liam Thompson  Applied",
    },
  ]

  const stats = [
  {
    "title": "Active Teams",
    "text": "04",
    "icon": <GrGroup />
  },
  {
    "title": "Player Applications",
    "text": "07",
    "icon": <RiUserSearchLine />
  },
  {
    "title": "Coach Applications",
    "text": "03",
    "icon": <EducateIcon/>
  },
  {
    "title": "Upcoming Matches",
    "text": "02",
    "icon": <IoIosFootball />
  }
]

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
        <div className="md:flex-3 xl:flex-8">
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
        <div className="md:flex-2 xl:flex-3">
          <h3 className="mb-2 text-base font-semibold">Quick Actions</h3>

          {/* actions */}
          <div className="rounded-[16px]">
            <CommonBtn
              variant={"default"}
              size={"sm"}
              icon={<Plus />}
              className="w-full cursor-pointer bg-secondary py-6! text-white hover:bg-brand hover:text-primary"
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
