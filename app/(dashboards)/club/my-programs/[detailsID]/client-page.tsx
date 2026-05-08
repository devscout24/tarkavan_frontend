"use client"

import AboutProgram from "@/components/common/about-program"
import CommonBtn from "@/components/common/common-btn" 
import ProgramCoachCard from "@/components/common/program-coach-card"
import ProgramDetailsBanner from "@/components/common/program-details-banner"
import ProgramFeedbackCard from "@/components/common/program-feedback-card"
import ProgramHead from "@/components/common/program-head" 
import { Button } from "@/components/ui/button"
import { eachDayOfInterval, format } from "date-fns"
import { ArrowLeftIcon } from "lucide-react"
import {
  useRouter, 
  useParams,
} from "next/navigation"
import { useEffect, useState } from "react"
import { getProgramDetails } from "../../action"
import { TProgramDetails, TTimeSlot } from "@/types"
import moment from "moment"
import ProgramDateTimeSelector from "@/components/common/program-date-time-selector"
import { getAvailableTimes } from "@/app/(dashboards)/action"
 


 
export default function ClubProgramDetailsClientPage() {
  const router = useRouter() 
  const params = useParams() 

  const detailsID = params.detailsID
  const [programDetail, setProgramDetail] = useState<TProgramDetails | null>(
    null
  )  
  const [selectedFilter, setSelectedFilter] = useState<string>("most_recent") 
  
 
  useEffect(() => {
    if (!detailsID) return

    const getProgramDetail = async () => {
      try {
        const res = await getProgramDetails(String(detailsID)) 

        if (
          res &&
          "success" in res &&
          res.success &&
          res.data &&
          "data" in res.data &&
          res.data.data
        ) {
          setProgramDetail(res.data.data)
          console.log(res.data)
        }
      } catch (error) {
        console.error("Error fetching program details:", error)
      }
    }

    getProgramDetail()

    const handleProgramEvent = () => {
      getProgramDetail()
    }

    window.addEventListener("programevent", handleProgramEvent)

    return () => {
      window.removeEventListener("programevent", handleProgramEvent)
    }


  }, [detailsID])







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
             localStorage.setItem("edit_program_id", String(detailsID))
             router.push(`?add-new=program`)
          }}
        />
      </div> 

      {/* program details banner */}
      <ProgramDetailsBanner
        title={programDetail?.program_name || ""}
        category={programDetail?.sport_option?.name || ""}
        duration={moment.duration(moment(programDetail?.end_date).diff(moment(programDetail?.start_date))).humanize()}
        dateRange={`${moment(programDetail?.start_date).format("MMM Do YY")} - ${moment(programDetail?.end_date).format("MMM Do YY")}`}
        location={programDetail?.program_location || ""}
        ageRange={`Ages: ${programDetail?.age_limit || ""}`}
        program_photo={programDetail?.photo || "https://avatars.githubusercontent.com/u/6880091?v=4"}
      />

      {/* layout */}
      <div className="mt-5 flex flex-col-reverse gap-6 lg:flex-row">
        {/* left side */}
        <div className="flex-2">
          {/* about program */}
          <AboutProgram
            sectionTitle="About This Program"
            description={programDetail?.about_program || ""}
            goals={programDetail?.goals || []}
          />

 

          {/* recent feedback */}
          <div className="mt-6">
            <ProgramHead
              options={[{ id: 1, name: "Most Recent" }]}
              placeholder="Choose short"
              title="Recent Feedback"
              setSelectedFilter={setSelectedFilter}
              selectedFilter={selectedFilter}
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
          <ProgramCoachCard showMessageButton={false} imageUrl={programDetail?.provider?.logo || ""} name={programDetail?.provider?.name || ""} 
          location={`${programDetail?.provider?.city || ""}, ${programDetail?.provider?.country || ""}`}
          verified={programDetail?.provider?.is_verified}
          /> 
          <ProgramDateTimeSelector 
            isOwner={true} 
            programStartDate={programDetail?.start_date}
            programEndDate={programDetail?.end_date} 
            price={programDetail?.price}
            detailsID={String(detailsID)}
          />
        </div>
      </div>
    </section>
  )
}
