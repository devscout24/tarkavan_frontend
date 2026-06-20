"use client"

import ProgramCard from "@/components/common/program-card"
import ProgramFilterDropdown from "@/components/common/ProgramFilterDropdown"
import CommonBtn from "@/components/common/common-btn"
import Loader from "@/components/common/loader"
import { Hourglass, UserRound } from "lucide-react"
import Image from "next/image"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Icon } from "@/components/custom/Icon"
import { getCoachProgramList } from "../action"
import {
  differenceInCalendarDays,
  eachDayOfInterval,
  format,
  parseISO,
} from "date-fns"
import moment from "moment"
import { useAppSelector } from "@/lib/hooks"
import { selectIsSubscriptionActive } from "@/lib/features/userSlice"
import ClubDashboardSubscription from "@/components/custom/club-dashboard-subscription"
import { CiCalendarDate } from "react-icons/ci";

const formatWeekdaySchedule = (startDate?: string, endDate?: string) => {
  if (!startDate || !endDate) return "N/A"

  const days = eachDayOfInterval({
    start: parseISO(startDate),
    end: parseISO(endDate),
  })

  return days.map((day) => format(day, "EEE")).join(", ")
}

const formatStartTime = (time?: string) => {
  if (!time) return "N/A"

  const startTime = time.includes("-")
    ? time.split("-")[0]?.trim()
    : time.trim()
  if (!startTime) return "N/A"

  const parsedTime = moment(
    startTime,
    ["h:mm A", "h:mm a", "hh:mm A", "HH:mm", "H:mm"],
    true
  )
  return parsedTime.isValid() ? parsedTime.format("h:mm A") : startTime
}
 

const formatDuration = (startDate?: string, endDate?: string) => {
  if (!startDate || !endDate) return "N/A"

  const totalDays =
    differenceInCalendarDays(parseISO(endDate), parseISO(startDate)) + 1

  if (totalDays < 0) return "N/A"
  if (totalDays < 7) {
    return `${totalDays} day${totalDays === 1 ? "" : "s"}`
  }

  const weeks = Math.floor(totalDays / 7)
  const remainingDays = totalDays % 7

  if (remainingDays === 0) {
    return `${weeks} week${weeks === 1 ? "" : "s"}`
  }

  return `${weeks} week${weeks === 1 ? "" : "s"} ${remainingDays} day${remainingDays === 1 ? "" : "s"}`
}

function PlusIcon() {
  return (
    <Icon
      width="12"
      height="12"
      viewBox="0 0 12 12"
      stroke="#060807"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5.834 11.1673C6.38593 11.1673 6.83333 10.7199 6.83333 10.168V6.83266H10.168C10.7197 6.83266 11.1669 6.38566 11.1673 5.83399C11.1677 5.28179 10.7201 4.83399 10.168 4.83399H6.83333V1.49935C6.83333 0.94768 6.38633 0.50036 5.83467 0.5C5.28247 0.49964 4.83467 0.947174 4.83467 1.49935V4.83399H1.49935C0.947427 4.83399 0.5 5.28139 0.5 5.83333C0.5 6.38526 0.947427 6.83266 1.49935 6.83266H4.83467V10.168C4.83467 10.7199 5.28207 11.1673 5.834 11.1673Z" />
    </Icon>
  )
}

export default function UpcomingEventPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isUbscriber = useAppSelector(selectIsSubscriptionActive)

  const [programs, setPrograms] = useState<any[]>([])
  const [latestUpcomingProgram, setLatestUpcomingProgram] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState({
    program_type: "",
    status: "",
  })

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setIsLoading(true)
        const response = await getCoachProgramList(filter)
        console.log("getCoachProgramList response:", response)
        const res = response as any
        if (res && res.success && res.data?.data) {
          setPrograms(res.data.data.programs || [])
          setLatestUpcomingProgram(
            res.data.data.latest_upcoming_program || null
          )
        }
      } catch (error) {
        console.error("Error fetching programs:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPrograms()

    const reloadData = () => {
      fetchPrograms()
    }

    window.addEventListener("programDeleted", reloadData)

    return () => {
      window.removeEventListener("programDeleted", reloadData)
    }
  }, [searchParams, filter])

  if (isUbscriber) {
    return (
      <section>
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader />
          </div>
        ) : (
          <>
            <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
              <h2 className="text-xl font-bold text-white sm:text-2xl">
                Upcoming Programs
              </h2>
              <CommonBtn
                text="Add Program"
                icon={<PlusIcon />}
                className="h-10 w-fit rounded-[8px] bg-brand px-4 font-medium text-primary hover:bg-brand xl:h-11 xl:px-5 xl:text-base 2xl:h-12 2xl:px-6 2xl:text-lg"
                size="sm"
                variant="default"
                onClick={() => {
                  localStorage.removeItem("edit_program_id")
                  const nextParams = new URLSearchParams(
                    searchParams.toString()
                  )
                  nextParams.set("add-new", "program")
                  router.replace(
                    nextParams.toString()
                      ? `${pathname}?${nextParams.toString()}`
                      : pathname
                  )
                }}
              />
            </div>

            {/* Upcoming Program Card */}
            {latestUpcomingProgram ? (
              <article className="overflow-hidden rounded-2xl border border-white/10 bg-brand">
                <div className="lg:flex">
                  <div className="relative min-h-44 w-50 md:min-h-full lg:w-62.5">
                    <Image
                      width={1000}
                      height={1000}
                      src={latestUpcomingProgram.photo || "/images/player1.png"}
                      alt={
                        latestUpcomingProgram.program_name || "Program photo"
                      }
                      className="h-full w-full object-fill"
                    />

                    <span className="absolute bottom-3 left-3 rounded-full bg-[#16A34A] px-3 py-1 text-[10px] font-bold tracking-[0.08em] text-white uppercase">
                      {latestUpcomingProgram.status === "active" ||
                      !latestUpcomingProgram.status
                        ? "In Progress"
                        : latestUpcomingProgram.status}
                    </span>
                  </div>

                  <div className="flex-1 px-4 py-5 sm:px-6 md:py-6 lg:py-7">
                    <h3 className="text-[22px] leading-tight font-bold sm:text-[24px] lg:text-[28px]">
                      {latestUpcomingProgram.program_name}
                    </h3>

                    <p className="mt-2 flex items-center gap-2 text-sm font-normal text-gray-500! sm:text-base">
                      <UserRound className="size-4" />
                      Coach: {latestUpcomingProgram.provider?.name || "N/A"}
                    </p>

                    <div className="mt-4 space-y-4  ">
                      <div className="flex ">
                        <p className="flex items-center gap-2 text-sm font-normal text-gray-500! sm:text-base">
                         <CiCalendarDate />  Schedule : 
                        </p>
                        <p className="text-sm font-normal text-black! sm:text-base lg:text-lg ml-1 ">
                          {moment(latestUpcomingProgram.start_date).format("MMM Do YY")}
                        </p> 
                      </div>
                      <div className="flex ">
                        <p className="flex items-center gap-2 text-sm font-normal text-gray-500! sm:text-base">
                         <Hourglass className="size-5" /> Duration : 
                        </p>
 
                        <p className="text-sm font-normal text-black!  sm:text-base lg:text-lg">
                          {formatDuration(
                            latestUpcomingProgram.start_date,
                            latestUpcomingProgram.end_date
                          )} 
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 px-4 pb-5 sm:flex-row sm:items-end sm:justify-between sm:px-6 md:flex-col md:items-end md:justify-center md:px-6 md:py-6">
                    <div className="w-full rounded-xl border border-primary/35 px-4 py-2 text-right text-black! sm:w-auto">
                      <p className="text-xs font-medium text-black! opacity-75 sm:text-sm">
                        Current Focus
                      </p>
                      <p className="text-[14px] font-medium text-black! sm:text-base lg:text-lg">
                        {latestUpcomingProgram.sport || "N/A"}
                      </p>
                    </div>

                    <CommonBtn
                      text="Edit Details"
                      className="h-11 w-full rounded-xl bg-primary px-5 text-sm font-medium text-white hover:bg-primary/90 sm:w-auto md:w-full"
                      size="sm"
                      variant="default"
                      onClick={() => {
                        localStorage.setItem(
                          "edit_program_id",
                          String(latestUpcomingProgram.id)
                        )
                        router.push(
                          `/coach/my-programs/${latestUpcomingProgram.id}?add-new=program`
                        )
                      }}
                    />
                  </div>
                </div>
              </article>
            ) : (
              !isLoading && (
                <div className="flex items-center justify-center rounded-2xl border border-white/10 bg-primary py-10 text-white/50">
                  No upcoming programs found.
                </div>
              )
            )}

            {/* upcoming events content */}
            <div className="flex items-center justify-between">
              <h2 className="mt-6 text-xl font-bold text-white sm:text-2xl">
                My Programs
              </h2>
              <ProgramFilterDropdown filter={filter} setFilter={setFilter} />
            </div>
            {/* programs cards */}
            {programs.length > 0 ? (
              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {programs.map((program) => {
                  return (
                    <ProgramCard
                      key={program.id}
                      id={program.id.toString()}
                      title={program.program_name}
                      type={`Age U${program?.age_limit == program?.from_age || program?.from_age == null ? program?.age_limit : `${program?.from_age} - U${program?.age_limit}`}`}
                      schedule={program.location}
                      duration={`${moment(program.start_date || program.times[0]?.slot_date   ).format("MMM Do YY")} - ${moment(program.end_date || program.times[program.times?.length - 1]?.slot_date   ).format("MMM Do YY")}`}
                      currentPrice={
                        program.price
                          ? `$${program.price - program.discount_price}`
                          : `$${program.program_price}`
                      }
                      previousPrice={String(
                        program.discount_price + program.price
                      )}
                      imageSrc={program.photo}
                      imageAlt={program.program_name}
                      buttonLabel="View Details"
                      viewOnly={false}
                      editLink={`/coach/my-programs/${program.id}`}
                    />
                  )
                })}
              </div>
            ) : (
              !isLoading && (
                <div className="mt-6 flex items-center justify-center rounded-2xl border border-white/10 bg-primary py-10 text-white/50">
                  No programs found.
                </div>
              )
            )}
          </>
        )}
      </section>
    )
  } else {
    return (
      <ClubDashboardSubscription
        text={"May be you are not logged in or not authenticated subscription."}
        link="/coach/subscription"
        btnText="Get Subscription"
      />
    )
  }
}
