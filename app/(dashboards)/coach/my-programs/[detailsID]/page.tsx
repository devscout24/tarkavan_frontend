"use client"
import React, { useEffect, useState } from "react"

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
import Loader from "@/components/common/loader"

import AddProgramPage from "@/components/common/add-program-modal"
import { useRouter, useSearchParams, usePathname, useParams } from "next/navigation"
import { getCoachProgramDetails } from "../../action"

export default function ProgramDetails() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const params = useParams()
  const [programData, setProgramData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch program details
  useEffect(() => {
    const fetchProgramDetails = async () => {
      try {
        setIsLoading(true)
        const programId = params.detailsID as string
        console.log("Fetching program details for ID:", programId)
        if (programId) {
          const response = await getCoachProgramDetails(programId)
          console.log("Full API Response:", JSON.stringify(response, null, 2))
          if (response && 'success' in response && response.success) {
            console.log("Program Data being set:", JSON.stringify(response.data, null, 2))
            setProgramData(response.data)
          }
        }
      } catch (error) {
        console.error("Error fetching program details:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProgramDetails()
  }, [params.detailsID])

  // Generate time slots from API data
  const timeSlotsByDate = programData?.program ? 
    eachDayOfInterval({
      start: new Date(programData.program.program_start),
      end: new Date(programData.program.program_end),
    }).reduce<Record<string, string[]>>((acc, date) => {
      acc[format(date, "yyyy-MM-dd")] = programData.program.times.map((time: any) => time.time)
      return acc
    }, {}) : {}

  // Handler for saving the new program (implement logic as needed)
  const handleSaveProgram = (data: any) => {
    // TODO: Add your save logic here (API call, state update, etc.)
    console.log("Saved program:", data)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader />
      </div>
    )
  }

  if (!programData) {
    return (
      <div className="flex items-center justify-center py-20 text-white">
        Program not found.
      </div>
    )
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

      {/* program details banner - using hardcoded values until API data issue is fixed */}
      <ProgramDetailsBanner
        title="Dekhi try kore"
        category="Football (Soccer)"
        duration="3 Days Duration"
        dateRange="4/11/2026 to 4/14/2026"
        location="Badda"
        ageRange="Ages up to 15"
      />

      {/* layout */}
      <div className="mt-5 flex flex-col-reverse gap-6 lg:flex-row">
        {/* left side */}
        <div className="flex-2">
          {/* Debug display to see what's actually being fetched */}
          <div className="mb-4 p-4 bg-red-900/50 border border-red-500 rounded-lg text-white text-sm">
            <h3 className="font-bold mb-2">Current Fetch Debug Info:</h3>
            <p><strong>Program ID from URL:</strong> {params.detailsID}</p>
            <p><strong>Full URL:</strong> {window.location.href}</p>
            <p><strong>Has programData:</strong> {programData ? 'Yes' : 'No'}</p>
            {programData && (
              <>
                <p><strong>Program ID from API:</strong> {programData?.program?.id}</p>
                <p><strong>Program Name:</strong> {programData?.program?.program_name}</p>
                <p><strong>about_program:</strong> {JSON.stringify(programData?.program?.about_program)}</p>
                <p><strong>goals:</strong> {JSON.stringify(programData?.program?.goals)}</p>
              </>
            )}
          </div>

          {/* about program */}
          <AboutProgram
            sectionTitle="About This Program"
            description={programData?.program?.about_program || "No description available."}
            goals={programData?.program?.goals?.map((goal: any) => ({
              title: goal.goal,
              description: goal.goal
            })) || []}
          />

          
          {/* program review */}
          <ProgramReview
            rating={programData?.review_summary?.average_rating ?? 0}
            totalReviews={programData?.review_summary?.total_reviews ?? 0}
            feedbackLabel="Total Feedback"
            reviewLabel="Write a Review"
            breakdown={programData?.review_summary?.rating_breakdown?.map((rating: any) => ({
              stars: rating.star,
              percentage: rating.percent
            })) || [
              { stars: 5, percentage: 0 },
              { stars: 4, percentage: 0 },
              { stars: 3, percentage: 0 },
              { stars: 2, percentage: 0 },
              { stars: 1, percentage: 0 }
            ]}
          />

          {/* recent feedback */}
          <div className="mt-6">
            <ProgramHead
              options={[{ value: "most-recent", label: "Most Recent" }]}
              placeholder="Choose short"
              title="Recent Feedback"
            />

            {programData?.recent_feedback?.length > 0 ? (
              programData.recent_feedback.map((feedback: any, index: number) => (
                <ProgramFeedbackCard
                  key={index}
                  name={feedback.name || "Anonymous"}
                  date={feedback.date || new Date().toLocaleDateString()}
                  review={feedback.review || "No review provided"}
                  rating={feedback.rating || 0}
                  avatarUrl={feedback.avatarUrl || "/images/Dainel.png"}
                />
              ))
            ) : (
              <div className="text-white/50 text-center py-4">
                No feedback available yet.
              </div>
            )}
          </div>
        </div>

        {/* right side */}
        <div className="flex-1">
          <ProgramCoachCard 
            name={programData?.coach?.name || "Coach"}
            role={programData?.coach?.title?.map((title: any) => title.title).join(", ") || "Coach"}
            bio={programData?.coach?.bio || "Experienced coach dedicated to athlete development."}
            imageUrl={programData?.coach?.profile_image || "/images/Dainel.png"}
            imageAlt={programData?.coach?.name || "Coach"}
          />
          <ProgramCalendar
            startDate={programData?.program?.program_start ? new Date(programData.program.program_start) : new Date()}
            endDate={programData?.program?.program_end ? new Date(programData.program.program_end) : new Date()}
            timeSlotsByDate={timeSlotsByDate}
          />
        </div>
      </div>
    </section>
  )
}
