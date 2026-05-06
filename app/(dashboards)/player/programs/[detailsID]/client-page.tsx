"use client"

import AboutProgram from "@/components/common/about-program" 
import ProgramCoachCard from "@/components/common/program-coach-card"
import ProgramDateTimeSelector from "@/components/common/program-date-time-selector"
import ProgramDetailsBanner from "@/components/common/program-details-banner"
import ProgramFeedbackCard from "@/components/common/program-feedback-card"
import ProgramHead from "@/components/common/program-head"
import ProgramReview from "@/components/common/program-review"
import { Button } from "@/components/ui/button" 
import { ArrowLeftIcon } from "lucide-react"
import { useRouter } from "next/navigation" 
import { useEffect, useState } from "react"
import { getAvailablePlayerParentProgramDetails } from "../action"
import { useParams } from "next/navigation";
import { toast } from "sonner" 
import { TProgramDetailsParentAndPlayer } from "@/types"
import moment from "moment"




export default function PlayerProgramDetailsClientPage() {

  const router = useRouter() 
  const params = useParams();
  const id = params.detailsID
  const [details , setDetails] = useState<TProgramDetailsParentAndPlayer | null>(null)


  useEffect(()=> {

    const getDetailsOfProgram = async () => {
      if(!id) {
        toast.error("Program ID is missing.")
        setTimeout(() => {
          router.push("/player/programs")
        }, 1000)
        return 
      } 
      try{ 
        const res = await getAvailablePlayerParentProgramDetails(String(id)) 
        if(res && 'success' in res && res.success && res.data && 'data' in res.data && res.data.data){
          setDetails(res.data.data)
        } 
      }catch(err){
        console.error("Error fetching program details:", err)
      }
    }
    
    getDetailsOfProgram()

  } , [id])

  console.log("Program Details: ", details)
 
  return (
    <section className="text-white">
      {/* BACK BUTTON */}
      <Button
        className="cursor-pointer bg-transparent hover:underline"
        onClick={() => router.back()}
      >
        <ArrowLeftIcon />
        <span>Back to Programs</span>
      </Button>

      {/* program details banner */}
      <ProgramDetailsBanner
        title={details?.program.program_name || "Program Name"}
        category={details?.program?.sport || "Program Type"}
        duration={moment.duration(moment(details?.program?.program_end).diff(moment(details?.program?.program_start))).humanize()}
        dateRange={`${moment(details?.program?.program_start).format("MMM Do YY")} - ${moment(details?.program?.program_end).format("MMM Do YY")}`}
        location={details?.program?.program_location}
        ageRange={`Age U${details?.program?.upto_age}`}
      />

      {/* layout */}
      <div className="mt-5 flex flex-col-reverse gap-6 lg:flex-row">
        {/* left side */}
        <div className="flex-2">
          {/* about program */}
          <AboutProgram
            sectionTitle="About This Program"
            description={details?.program?.about_program}
          />

          {/* program review */}
          {details && details?.recent_feedback.length > 0 && 
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
        }

          {/* recent feedback */}
          {details && details?.recent_feedback.length > 0 && 
          <div className="mt-6">
            <ProgramHead
              options={[{ id: 5, name: "Most Recent" }]}
              placeholder="Choose short"
              title="Recent Feedback"
              selectedFilter=""
              setSelectedFilter={()=> {}}
            />

            <ProgramFeedbackCard
              name="John Doe"
              date="September 28, 2023"
              review="The program was very well structured and the instructors were very knowledgeable."
              rating={4.5}
              avatarUrl="/images/Dainel.png"
            />
          </div>
          }
        </div>

        {/* right side */}
        <div className="flex-1">
          <ProgramCoachCard />
          <ProgramDateTimeSelector/>
          {/* <ProgramCalendar
            startDate={programStartDate}
            endDate={programEndDate}
            timeSlotsByDate={timeSlotsByDate}
          /> */}
        </div>
      </div>
    </section>
  )
}
