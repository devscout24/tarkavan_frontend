"use client"

import { Button } from "@/components/ui/button"
import { eachDayOfInterval, format } from "date-fns"
import { ArrowLeftIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import ProgramDetailsBanner from "../../../../../components/common/program-details-banner"
import AboutProgram from "../../../../../components/common/about-program"
import ProgramReview from "../../../../../components/common/program-review"
import ProgramHead from "../../../../../components/common/program-head"
import ProgramFeedbackCard from "../../../../../components/common/program-feedback-card"
import ProgramCoachCard from "../../../../../components/common/program-coach-card"
import { ProgramCalendar } from "../../../../../components/common/program-calendar"

export default function SearchExploreDetails() {
  const router = useRouter()
  const programStartDate = new Date(2026, 3, 1)
  const programEndDate = new Date(2026, 3, 15)

  const timeSlotsByDate = eachDayOfInterval({
    start: programStartDate,
    end: programEndDate,
  }).reduce<Record<string, string[]>>((acc, date) => {
    acc[format(date, "yyyy-MM-dd")] = [
      "09:00 AM",
      "11:00 AM",
      "02:00 PM",
      "05:00 PM",
    ]
    return acc
  }, {})

  return (
    <section className="text-white">
      {/* BACK BUTTON */}
      <Button
        className="mb-[24px] cursor-pointer bg-transparent hover:underline"
        onClick={() => router.back()}
      >
        <ArrowLeftIcon className="text-white" />
        <span className="text-[16px] leading-[150%] font-normal text-white">
          Back to Search & Explore
        </span>
      </Button>

      {/* program details banner */}
      <ProgramDetailsBanner
        title="Elite Soccer Academy"
        category="Football"
        duration="8 Weeks Program"
        dateRange="01-04-2026 to 15-04-2026"
        location="GoElite Sports Complex, Toronto"
        ageRange="Ages 8-14"
      />

      {/* layout */}
      <div className="mt-5 flex flex-col-reverse gap-6 lg:flex-row">
        {/* left side */}
        <div className="flex-2">
          {/* about program */}
          <AboutProgram
            sectionTitle="About This Program"
            description="The Elite Soccer Academy is designed to develop young players' technical skills, tactical understanding, and physical fitness. Our comprehensive curriculum focuses on ball control, passing accuracy, shooting techniques, and game intelligence through structured drills and competitive match play."
            goals={[
              {
                title: "Technical Goals",
                description:
                  "Master ball control techniques, improve passing accuracy, and develop shooting skills from various positions.",
              },
              {
                title: "Tactical Goals",
                description:
                  "Enhance spatial awareness, improve decision-making under pressure, and understand positioning strategies.",
              },
            ]}
          />

          {/* program review */}
          <ProgramReview
            rating={4.7}
            totalReviews={85}
            feedbackLabel="Total Feedback"
            reviewLabel="Write a Review"
            breakdown={[
              { stars: 5, percentage: 78 },
              { stars: 4, percentage: 15 },
              { stars: 3, percentage: 5 },
              { stars: 2, percentage: 2 },
              { stars: 1, percentage: 0 },
            ]}
          />

          {/* recent feedback */}
          <div className="mt-6">
            <ProgramHead
              options={[{ value: "most-recent", label: "Most Recent" }]}
              placeholder="Choose short"
              title="Recent Feedback"
            />

            <ProgramFeedbackCard
              name="David Martinez"
              date="March 28, 2026"
              review="Excellent coaching staff and well-structured program. My daughter's skills improved significantly in just 8 weeks!"
              rating={5}
              avatarUrl="/images/Dainel.png"
            />
            <ProgramFeedbackCard
              name="Sarah Thompson"
              date="March 25, 2026"
              review="Great balance between technical training and game play. The coaches really know how to work with kids."
              rating={4.5}
              avatarUrl="/images/Dainel.png"
            />
          </div>
        </div>

        {/* right side */}
        <div className="flex-1">
          <ProgramCoachCard />
          <ProgramCalendar
            startDate={programStartDate}
            endDate={programEndDate}
            timeSlotsByDate={timeSlotsByDate}
          />
        </div>
      </div>
    </section>
  )
}