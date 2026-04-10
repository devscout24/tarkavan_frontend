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

export default function UpcomingEventDetails() {
  const router = useRouter()
  const eventStartDate = new Date(2026, 3, 15)
  const eventEndDate = new Date(2026, 3, 15)

  const timeSlotsByDate = eachDayOfInterval({
    start: eventStartDate,
    end: eventEndDate,
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
          Back to Upcoming Events
        </span>
      </Button>

      {/* event details banner */}
      <ProgramDetailsBanner
        title="Elite Technical Clinic"
        category="Football"
        duration="1 Day Event"
        dateRange="15-03-2026"
        location="West Side Sports Complex, Field 4"
        ageRange="Ages 12-18"
      />

      {/* layout */}
      <div className="mt-5 flex flex-col-reverse gap-6 lg:flex-row">
        {/* left side */}
        <div className="flex-2">
          {/* about event */}
          <AboutProgram
            sectionTitle="About This Event"
            description="The Elite Technical Clinic is a one-day intensive training program focused on developing advanced technical skills for competitive players. Participants will work on ball control, passing accuracy, shooting techniques, and tactical awareness through specialized drills and game scenarios."
            goals={[
              {
                title: "Technical Goals",
                description:
                  "Improve first touch, master passing techniques, and develop shooting accuracy from various positions.",
              },
              {
                title: "Tactical Goals",
                description:
                  "Enhance spatial awareness, improve decision-making under pressure, and understand positioning strategies.",
              },
            ]}
          />

          {/* event review */}
          <ProgramReview
            rating={4.8}
            totalReviews={23}
            feedbackLabel="Total Feedback"
            reviewLabel="Write a Review"
            breakdown={[
              { stars: 5, percentage: 92 },
              { stars: 4, percentage: 8 },
              { stars: 3, percentage: 0 },
              { stars: 2, percentage: 0 },
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
              name="Michael Chen"
              date="March 10, 2026"
              review="Excellent coaching staff and well-organized drills. My son's ball control improved significantly in just one day!"
              rating={5}
              avatarUrl="/images/Dainel.png"
            />
            <ProgramFeedbackCard
              name="Emily Rodriguez"
              date="March 8, 2026"
              review="Great technical focus and individual attention. The video analysis session was particularly valuable."
              rating={4.5}
              avatarUrl="/images/Dainel.png"
            />
          </div>
        </div>

        {/* right side */}
        <div className="flex-1">
          <ProgramCoachCard />
          <ProgramCalendar
            startDate={eventStartDate}
            endDate={eventEndDate}
            timeSlotsByDate={timeSlotsByDate}
          />
        </div>
      </div>
    </section>
  )
}