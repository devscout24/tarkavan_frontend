"use client"

import AboutProgram from "@/components/common/about-program" 
import ProgramCoachCard from "@/components/common/program-coach-card" 
import ProgramDetailsBanner from "@/components/common/program-details-banner"
import ProgramFeedbackCard from "@/components/common/program-feedback-card"
import ProgramHead from "@/components/common/program-head"
import ProgramReview from "@/components/common/program-review"
import { Button } from "@/components/ui/button" 
import { ArrowLeftIcon } from "lucide-react"
import { useRouter } from "next/navigation" 
import { useEffect, useState } from "react" 
import { useParams } from "next/navigation";
import { toast } from "sonner"  
import moment from "moment"
import { TProgramDetailsParentAndPlayer } from "@/types"
import ProgramDateTimeSelector from "@/components/common/program-date-time-selector" 
import { getAvailablePlayerParentProgramDetails } from "@/app/(dashboards)/player/programs/action"




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
          setDetails(res.data.data.program)
        } 
      }catch(err){
        console.error("Error fetching program details:", err)
      }
    }
    
    getDetailsOfProgram()

  } , [id])
 
 
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
        title={details?.program_name || "Program Name"}
        category={details?.sport || "Program Type"}
        duration={moment.duration(moment(details?.end_date).diff(moment(details?.start_date))).humanize()}
        dateRange={`${moment(details?.start_date).format("MMM Do YY")} - ${moment(details?.end_date).format("MMM Do YY")}`}
        location={details?.location}
        ageRange={`Age U${details?.age_limit}`}
        program_photo={details?.photo || ""}
      />

      {/* layout */}
      <div className="mt-5 flex flex-col-reverse gap-6 lg:flex-row">
        {/* left side */}
        <div className="flex-2">
          {/* about program */}
          <AboutProgram
            sectionTitle="About This Program"
            description={details?.about}
          />

          {/* program review */}
          {details && details?.recent_feedback?.length > 0 && 
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
          {details && details?.recent_feedback?.length > 0 && 
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
          <ProgramCoachCard
            bio=""
            className=""
            highlightedName=""
            imageAlt=""
            imageUrl={details?.provider?.logo || "/images/coach.png"}
            location=""
            messageLabel={`Message ${details?.provider?.type}`}
            tags={[]}
            name={details?.provider?.name || ""}
            verifiedLabel={details?.provider?.type}
          />
          <ProgramDateTimeSelector 
            programStartDate={details?.start_date}
            programEndDate={details?.end_date}
            price={details?.price}
            priceToShow={Number(details?.price) - Number(details?.discount_price)}
            detailsID={String(id)}
          />
 
        </div>
      </div>
    </section>
  )
}
