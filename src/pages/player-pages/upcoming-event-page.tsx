import PlayerActivePrograms from "./components/player-active-programs"
import player1 from "@/assets/images/player1.png"
import player2 from "@/assets/images/player2.png"
import player3 from "@/assets/images/player3.png"
import ProgramCard from "@/components/common/program-card"
// import { useNavigate } from "react-router"

export default function UpcomingEventPage() {
  const programs = [
    {
      id: "1",
      title: "Elite Hoops Leadership Academy",
      coachName: "Elena Rodriguez",
      schedule: "Tuesdays, 6:00 PM",
      duration: "8 Weeks Program",
      currentPrice: "$249",
      imageSrc: player1,
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
      imageSrc: player2,
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
      imageSrc: player3,
      imageAlt: "Program image",
      buttonLabel: "View Details",
    },
  ]

  // const navigate = useNavigate()

  return (
    <section>
      <PlayerActivePrograms />

      {/* upcoming events content */}
      <h2 className="text-xl font-bold text-white sm:text-2xl mt-6 ">
        Upcoming Events
      </h2>
      {/* programs cards */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {programs.map((program, index) => (
          <ProgramCard
            key={index}
            {...program}
            onClick={() => console.log("object") }
          />
        ))}
      </div>
    </section>
  )
}
