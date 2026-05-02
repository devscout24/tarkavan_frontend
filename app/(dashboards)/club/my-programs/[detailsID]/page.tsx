"use client"

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
import {
  useRouter,
  useSearchParams,
  usePathname,
  useParams,
} from "next/navigation"
import { useEffect, useState } from "react"
import { getProgramDetails } from "../../action"
import { TProgramDetails } from "@/types"
import moment from "moment"

export default function ProgramDetails() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const params = useParams()
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

  const detailsID = params.detailsID
  const [programDetail, setProgramDetail] = useState<TProgramDetails | null>(
    null
  )

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
        }
      } catch (error) {
        console.error("Error fetching program details:", error)
      }
    }

    getProgramDetail()
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
            const nextParams = new URLSearchParams(searchParams.toString())
            nextParams.set("add-new", "program")
            router.replace(
              nextParams.toString()
                ? `${pathname}?${nextParams.toString()}&editID=${detailsID}`
                : pathname
            )
          }}
        />
      </div>

      {/* Add Program Modal handled by Modals component and URL param */}

      {/* program details banner */}
      <ProgramDetailsBanner
        title={programDetail?.program.program_name || ""}
        category={programDetail?.program?.sport_option?.name || ""}
        duration={moment.duration(moment(programDetail?.program?.program_end).diff(moment(programDetail?.program?.program_start))).humanize()}
        dateRange={`${moment(programDetail?.program?.program_start).format("MMM Do YY")} - ${moment(programDetail?.program?.program_end).format("MMM Do YY")}`}
        location={programDetail?.program?.program_location || ""}
        ageRange={`Ages: ${programDetail?.program?.upto_age || ""}`}
        program_photo={programDetail?.program?.program_photo || ""}
      />

      {/* layout */}
      <div className="mt-5 flex flex-col-reverse gap-6 lg:flex-row">
        {/* left side */}
        <div className="flex-2">
          {/* about program */}
          <AboutProgram
            sectionTitle="About This Program"
            description={programDetail?.program?.about_program || ""}
            goals={programDetail?.program?.goals || []}
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
          <ProgramCoachCard showMessageButton={false} imageUrl={programDetail?.club?.club_logo || ""} />
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
