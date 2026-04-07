"use client"
import ProgramCard from "@/components/common/program-card"
import PlayerActivePrograms from "../../../../components/common/player-active-programs"
import { useRouter } from "next/navigation"

export default function UpcomingEventPage() {
  const router = useRouter()

  const programActions = [
    { label: "Edit Programs", onSelect: () => console.log("Edit Programs") },
    {
      label: "Active Programs",
      onSelect: () => console.log("Active Programs"),
    },
    {
      label: "Deactive Programs",
      onSelect: () => console.log("Deactive Programs"),
    },
    {
      label: "Delete Programs",
      onSelect: () => console.log("Delete Programs"),
    },
  ]

  const programs = [
    {
      id: "1",
      title: "Elite Hoops Leadership Academy",
      coachName: "Elena Rodriguez",
      schedule: "Tuesdays, 6:00 PM",
      duration: "8 Weeks Program",
      currentPrice: "$249",
      imageSrc: "/images/player1.png",
      imageAlt: "Program image",
      buttonLabel: "View Details",
    },
    {
      id: "2",
      title: "Premier Soccer Striker Clinic",
      coachName: "David Chen",
      schedule: "Weekends, 10:00 AM",
      duration: "4 Weeks Program",
      currentPrice: "$199",
      imageSrc: "/images/player2.png",
      imageAlt: "Program image",
      buttonLabel: "View Details",
    },
    {
      id: "3",
      title: "Mindset & Performance Coaching",
      coachName: "Sarah Jenkins",
      schedule: "Thursdays, 5:00 PM",
      duration: "12 Weeks Program",
      currentPrice: "$269",
      previousPrice: "$299",
      imageSrc: "/images/player3.png",
      imageAlt: "Program image",
      buttonLabel: "View Details",
    },
  ]

  return (
    <section>
      <PlayerActivePrograms title="Upcoming Programs" btnText="Edit Details" />

      {/* upcoming events content */}
      <h2 className="mt-6 text-xl font-bold text-white sm:text-2xl">
        My Available Programs
      </h2>
      {/* programs cards */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {programs.map((program, index) => (
          <ProgramCard
            key={index}
            {...program}
            onClick={() => router.push(`/coach/my-programs/${program.id}`)}
            threeDotsItems={programActions}
          />
        ))}
      </div>
    </section>
  )
}
