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
import { useParams } from "next/navigation"
import { toast } from "sonner"
import moment from "moment"
import { TProgramDetailsParentAndPlayer } from "@/types"
import ProgramDateTimeSelector from "@/components/common/program-date-time-selector"
import { getAvailablePlayerParentProgramDetails } from "../player/programs/action"
import CommonBtn from "@/components/common/common-btn"
import { WriteReviewDialog } from "@/components/common/review-write"
import { BsCopy } from "react-icons/bs";
import Loader from "@/components/common/loader"

export default function ProgramDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.detailsID
  const [details, setDetails] = useState<TProgramDetailsParentAndPlayer | null>(
    null
  )
  const [loading, setLoading] = useState<boolean>(false)

  const [currentUser, setCurrentUser] = useState<{
    id: string
    role: string
  } | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("go_elite_user")

    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser))
    }
  }, [])

  useEffect(() => {
    const getDetailsOfProgram = async () => {
      if (!id) {
        toast.error("Program ID is missing.")
        setTimeout(() => {
          router.push(`/${currentUser?.role}/programs`)
        }, 1000)
        return
      }
      setLoading(true)
      try {
        const res = await getAvailablePlayerParentProgramDetails(String(id))

        if (
          res &&
          "success" in res &&
          res.success &&
          res.data &&
          "data" in res.data &&
          res.data.data
        ) {
          setLoading(false)
          setDetails(res.data.data.program)
        }
      } catch (err) {
        console.error("Error fetching program details:", err)
        setLoading(false)
      }
    }

    getDetailsOfProgram()

    const getUpdatedData = () => {
      getDetailsOfProgram()
    }

    window.addEventListener("programevent", getUpdatedData)

    return () => {
      window.removeEventListener("programevent", getUpdatedData)
    }
  }, [id])

  console.log(details?.provider)

  return ( 
    loading ? <Loader/> :
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

        <div className="flex">
          <CommonBtn
            text="Copy Link"
            icon={<BsCopy className="mr-2" />}
            className="h-10 w-fit rounded-[8px] bg-transparent border border-brand px-4 font-medium text-white hover:bg-transparent cursor-pointer xl:h-11 xl:px-5 xl:text-base 2xl:h-12 2xl:px-6 2xl:text-lg"
            size="sm"
            variant="default"
            onClick={async () => {
              if (!id) {
                toast.error("Program ID not found. Please try again later.")
                return
              }

              try {
                await navigator.clipboard.writeText(
                  `${process.env.NEXT_PUBLIC_FRONTEND_URL}/details/program/${id}`
                )
                toast.success("Program link copied to clipboard!")
              } catch (error) {
                console.error("Failed to copy:", error)
                toast.error("Failed to copy the link. Please try again.")
              }
            }}
          />
          {currentUser?.id === details?.provider?.user_id && (
            <CommonBtn
              text="Edit Program"
              className="h-10 w-fit rounded-[8px] bg-brand px-4 font-medium text-primary hover:bg-brand xl:h-11 xl:px-5 xl:text-base 2xl:h-12 2xl:px-6 2xl:text-lg"
              size="sm"
              variant="default"
              onClick={() => {
                localStorage.setItem("edit_program_id", String(id))
                router.push(`?add-new=program`)
              }}
            />
          )}
        </div>
      </div>

      {/* program details banner */}
      <ProgramDetailsBanner
        title={details?.program_name || "Program Name"}
        category={details?.sport || "Program Type"}
        duration={moment
          .duration(
            moment(details?.end_date || details?.times[0].slot_date).diff(
              moment(
                details?.start_date ||
                  details?.times[details?.times.length - 1].slot_date
              )
            )
          )
          .humanize()}
        dateRange={`${moment(details?.start_date || details?.times[0].slot_date).format("MMM Do YY")} - ${moment(details?.end_date || details?.times[details?.times.length - 1].slot_date).format("MMM Do YY")}`}
        location={details?.location}
        ageRange={`Age U${details?.age_limit == details?.from_age || details?.from_age == null ? details?.age_limit : `${details?.from_age} - U${details?.age_limit}`}`}
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
          {details && details?.recent_feedback?.length > 0 && (
            <ProgramReview review_summary={details.review_summary} />
          )}

          {details?.booking_status == "completed" ||
            (details?.booking_status == "confirmed" && (
              <WriteReviewDialog
                program_id={String(id)}
                trigger={
                  <Button className="mt-4 w-full cursor-pointer bg-brand font-medium text-primary">
                    Write a review
                  </Button>
                }
              />
            ))}

          {/* recent feedback */}
          {details && details?.recent_feedback?.length > 0 && (
            <div className="mt-6">
              <ProgramHead
                options={[{ id: 5, name: "Most Recent" }]}
                placeholder="Choose short"
                title="Recent Feedback"
                selectedFilter=""
                setSelectedFilter={() => {}}
              />

              {details?.recent_feedback.map((feedback, idx) => (
                <ProgramFeedbackCard
                  key={feedback.id || idx}
                  name={feedback?.reviewer?.name || "Anonymous"}
                  date={
                    feedback?.created_at
                      ? moment(feedback.created_at).format("MMMM Do YYYY")
                      : "Unknown Date"
                  }
                  review={feedback?.review || ""}
                  rating={feedback?.rating || 0}
                  avatarUrl={
                    feedback?.reviewer?.profile_image || "/images/bannerbg.png"
                  }
                />
              ))}
            </div>
          )}
        </div>

        {/* right side */}
        <div className="flex-1">
          <ProgramCoachCard
            bio=""
            className=""
            highlightedName=""
            imageAlt=""
            imageUrl={details?.provider?.image || "/images/bannerbg.png"}
            location=""
            messageLabel={`Message ${details?.provider?.type}`}
            name={details?.provider?.name || ""}
            verifiedLabel={details?.provider?.type}
            showMessageButton={
              details?.provider?.is_program_maker ? false : true
            }
            chatId={String(details?.provider?.user_id)}
            provider={details?.provider}
          />
          <ProgramDateTimeSelector
            programStartDate={details?.start_date}
            programEndDate={details?.end_date}
            price={details?.price}
            detailsID={String(id)}
            priceToShow={
              Number(details?.price) - Number(details?.discount_price)
            }
            isOwner={details?.provider?.is_program_maker}
            programid={String(id)}
            slots={
              details?.program_type == "group" &&
              details.times &&
              details.times.length > 0
                ? details.times
                    .filter(
                      (time): time is typeof time & { slot_date: string } =>
                        time.slot_date !== null
                    )
                    .map((time) => ({
                      booking_date: time.slot_date,
                      booking_time_ids: [time.id],
                    }))
                : undefined
            }
          />
        </div>
      </div>
    </section>
  )
}
