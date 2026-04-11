"use client"

import ProgramCard from "@/components/common/program-card" 
import ProgramHead from "@/components/common/program-head"
import { useRouter } from "next/navigation"

export default function ProgramPage() {
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
      discountLabel: "10% Off",
      imageSrc: "/images/player3.png",
      imageAlt: "Program image",
      buttonLabel: "View Details",
    },
  ]

  const router = useRouter()

  return (
    <section>
      <ProgramHead
        title="Available Programs"
        options={[
          { value: "all", label: "All" },
          { value: "football", label: "Football" },
          { value: "basketball", label: "Basketball" },
        ]}
        placeholder="All Sports"
      />

      {/* programs cards */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {programs.map((program, index) => (
          <ProgramCard
            key={index}
            {...program}
            onClick={() => router.push(`/parent/programs/${program.id}`)}
          />
        ))}
      </div>
    </section>
  )
}
