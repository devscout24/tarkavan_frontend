import { Button } from "@/components/ui/button"
import { eachDayOfInterval, format } from "date-fns"
import { ArrowLeftIcon } from "lucide-react"
import { useNavigate } from "react-router"
import AboutProgram from "./components/about-program"
import ProgramDetailsBanner from "./components/program-details-banner"
import ProgramReview from "./components/program-review"
import ProgramHead from "./components/program-head"
import ProgramFeedbackCard from "./components/program-feedback-card"
import ProgramCoachCard from "./components/program-coach-card"
import { ProgramCalendar } from "./components/program-calendar"

export default function ProgramDetails() {
  const navigate = useNavigate()
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
        className="cursor-pointer bg-transparent hover:underline"
        onClick={() => navigate(-1)}
      >
        <ArrowLeftIcon />
        <span>Back to Programs</span>
      </Button>

      {/* program details banner */}
      <ProgramDetailsBanner
        title="Varsity Prep Mentorship"
        category="Football"
        duration="12 Weeks Duration"
        dateRange="01-04-2026 to 15-04-2026"
        location="GoElite Sports Complex, Toronto"
        ageRange="Ages 8-14"
      />

      {/* layout */}
      <div className="mt-5 flex flex-col-reverse lg:flex-row    gap-6">
        {/* left side */}
        <div className="flex-2">
          {/* about program */}
          <AboutProgram
            sectionTitle="About This Program"
            description="The Varsity Prep Mentorship is designed to bridge the gap between high school athletics and NCAA-level expectations. Our curriculum focuses on three core pillars: explosive physical development, tactical sports intelligence, and psychological resilience."
            goals={[
              {
                title: "Performance Goals",
                description:
                  "Increase vertical leap by 15%, improve 40-yard dash times, and optimize recovery cycles.",
              },
              {
                title: "Mentorship Goals",
                description:
                  "Develop leadership skills and understand the collegiate recruiting landscape.",
              },
            ]}
          />

          {/* program review */}
          <ProgramReview
            rating={4.9}
            totalReviews={47}
            feedbackLabel="Total Feedback"
            reviewLabel="Write a Review"
            breakdown={[
              { stars: 5, percentage: 85 },
              { stars: 4, percentage: 12 },
              { stars: 3, percentage: 3 },
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
              name="John Doe"
              date="September 28, 2023"
              review="The program was very well structured and the instructors were very knowledgeable."
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
