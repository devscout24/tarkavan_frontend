"use client"
import React from "react"

import AboutProgram from "@/components/common/about-program"
import CommonBtn from "@/components/common/common-btn"
import { ProgramCalendar } from "@/components/common/program-calendar"
import ProgramCoachCard from "@/components/common/program-coach-card"
import ProgramDetailsBanner from "@/components/common/program-details-banner"
import ProgramFeedbackCard from "@/components/common/program-feedback-card"
import ProgramHead from "@/components/common/program-head"
import ProgramReview from "@/components/common/program-review"
import { Button } from "@/components/ui/button"
import { eachDayOfInterval, format } from "date-fns"
import { ArrowLeftIcon } from "lucide-react"

import AddProgramPage from "@/components/common/add-program-modal"
import { useRouter, useSearchParams, usePathname } from "next/navigation"

export default function ProgramDetails() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
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

  // Handler for saving the new program (implement logic as needed)
  const handleSaveProgram = (data: any) => {
    // TODO: Add your save logic here (API call, state update, etc.)
    console.log("Saved program:", data)
  }

  return (
    <section className="text-white">
      {/* BACK BUTTON */}
      <div className="mb-5 flex items-center justify-between px-2 py-2">
        <Button
          className="cursor-pointer bg-transparent pb-4 text-white/50 hover:underline"
          onClick={() => router.back()}
        >
          <ArrowLeftIcon />
          <span>Back to Programs</span>
        </Button>
        <CommonBtn
          text="Edit Program"
          className="h-10 w-fit rounded-[8px] bg-brand px-4 font-medium text-primary hover:bg-brand xl:h-11 xl:px-5 xl:text-base 2xl:h-12 2xl:px-6 2xl:text-lg"
          size="sm"
          variant="default"
          onClick={() => {
            const nextParams = new URLSearchParams(searchParams.toString())
            nextParams.set("add-new", "program")
            router.replace(
              nextParams.toString()
                ? `${pathname}?${nextParams.toString()}`
                : pathname
            )
          }}
        />
      </div>

      {/* Add Program Modal handled by Modals component and URL param */}

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
      <div className="mt-5 flex flex-col-reverse gap-6 lg:flex-row">
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
