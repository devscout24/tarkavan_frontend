"use client"

import React, { useEffect, useState } from "react"

import AboutProgram from "@/components/common/about-program"
import CommonBtn from "@/components/common/common-btn"
import ProgramCoachCard from "@/components/common/program-coach-card"
import ProgramDetailsBanner from "@/components/common/program-details-banner"
import ProgramFeedbackCard from "@/components/common/program-feedback-card"
import ProgramHead from "@/components/common/program-head"
import ProgramReview from "@/components/common/program-review"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { ArrowLeftIcon } from "lucide-react"
import Loader from "@/components/common/loader"

import { useRouter, useSearchParams, usePathname, useParams } from "next/navigation"
import { getCoachProgramDetails } from "../../action"
import ProgramDateTimeSelector from "@/components/common/program-date-time-selector"
import Modals from "@/components/common/modal"
import { ProgramUpdateProvider } from "@/components/common/program-update-context"

export default function ProgramDetails() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const params = useParams()
  const [programData, setProgramData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch program details
  const fetchProgramDetails = async () => {
    try {
      setIsLoading(true)
      const programId = params.detailsID as string 
      if (programId) {
        const response = await getCoachProgramDetails(programId) 
        if (response && 'success' in response && response.success) { 
          setProgramData(response.data)
        }
      }
    } catch (error) {
      console.error("Error fetching program details:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProgramDetails()
  }, [params.detailsID])

  // Handle program update
  const handleProgramUpdated = () => { 
    fetchProgramDetails()
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
    <ProgramUpdateProvider onProgramUpdated={handleProgramUpdated}>
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
            // Set program data in sessionStorage for edit modal
            if (programData?.data?.program) {
              sessionStorage.setItem("edit-program-data", JSON.stringify(programData.data.program))
            }
            const nextParams = new URLSearchParams(searchParams.toString())
            nextParams.set("edit-program", "program")
            router.replace(
              nextParams.toString()
                ? `${pathname}?${nextParams.toString()}`
                : pathname
            )
          }}
        />
      </div>

      {/* program details banner - using dynamic API data */}
      <ProgramDetailsBanner
        title={programData?.data?.program?.program_name || "Program Name"}
        category={programData?.data?.program?.sport || "Sport"}
        duration={programData?.data?.program?.program_start && programData?.data?.program?.program_end 
          ? `${Math.ceil((new Date(programData.data.program.program_end).getTime() - new Date(programData.data.program.program_start).getTime()) / (1000 * 60 * 60 * 24))} Days Duration`
          : "Duration"
        }
        dateRange={programData?.data?.program?.program_start && programData?.data?.program?.program_end
          ? `${new Date(programData.data.program.program_start).toLocaleDateString()} to ${new Date(programData.data.program.program_end).toLocaleDateString()}`
          : "Date Range"
        }
        location={programData?.data?.program?.program_location || "Location"}
        ageRange={programData?.data?.program?.upto_age ? `Ages up to ${programData.data.program.upto_age}` : "Age Range"}
        program_photo={programData?.data?.program?.program_photo || "/images/programsBannerImg.png"}
      />

      {/* layout */}
      <div className="mt-5 flex flex-col-reverse gap-6 lg:flex-row">
        {/* left side */}
        <div className="flex-2">

          {/* about program */}
          <AboutProgram
            sectionTitle="About This Program"
            description={programData?.data?.program?.about_program || "No description available."}
            goals={programData?.data?.program?.goals || []}
          />

          {/* program review */}
          <ProgramReview
            rating={programData?.review_summary?.average_rating ?? 0}
            totalReviews={programData?.review_summary?.total_reviews ?? 0}
            feedbackLabel="Total Feedback"
            reviewLabel="Write a Review"
            writeReview={false}
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
            name={programData?.data?.coach?.name || "Coach"}
            role={programData?.data?.coach?.title?.map((title: any) => title.title).join(", ") || "Coach"}
            bio={programData?.data?.coach?.bio || "Experienced coach dedicated to athlete development."}
            imageUrl={programData?.data?.coach?.profile_image || "/images/Dainel.png"}
            imageAlt={programData?.data?.coach?.name || "Coach"}
            showMessageButton={false}
          />
          <ProgramDateTimeSelector
            role="coach"
            programStartDate={programData?.data?.program?.program_start ? new Date(programData.data.program.program_start) : new Date()}
            programEndDate={programData?.data?.program?.program_end ? new Date(programData.data.program.program_end) : new Date()}
            programTimes={programData?.data?.program?.times || []}
          />
        </div>
      </div>

      {/* Modals Component */}
      <Modals />
    </section>
    </ProgramUpdateProvider>
  )
}
