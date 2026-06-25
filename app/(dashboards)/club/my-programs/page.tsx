"use client"
import ProgramCard from "@/components/common/program-card"
import ProgramFilterDropdown from "@/components/common/ProgramFilterDropdown"
import CommonBtn from "@/components/common/common-btn"
import { UserRound } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Icon } from "@/components/custom/Icon"
import { useEffect, useState, useCallback, useRef } from "react"
import { getProgramList } from "../action"
import moment from "moment"
import CommonPagination from "@/components/common/common-pagination"

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

// Define types for the API response
interface ProgramTime {
  id: number
  time: string
  slot_date: string | null
  start_time: string | null
  end_time: string | null
  is_available: boolean
}

interface ProgramGoal {
  id: number
  goal: string
}

interface Program {
  id: number
  program_name: string
  program_type: string
  sport_option_id: number | null
  sport_option: string | null
  sport: string
  program_price: number
  price: number
  discount_price: number
  upto_age: number
  from_age: number
  age_limit: number
  program_location: string
  program_start: string
  program_end: string
  program_photo: string
  photo: string
  location: string
  status: string
  club_name: string
  coach_name: string
  time: string
  times: ProgramTime[]
  goals: ProgramGoal[]
  start_date: string
  end_date: string
  provider: { name: string }
}

interface ProgramsData {
  latest_upcoming_program: Program | null
  programs: Program[]
  start_date: string
  end_date: string
  pagination: {
    current_page: number
    last_page: number
    per_page: number
    total: number
    first_page_url: string
    last_page_url: string
    next_page_url: string | null
    prev_page_url: string | null
  }
  filters: {
    filter: string
    search: string
  }
  counts: {
    all: number
    upcoming: number
    active: number
    inactive: number
  }
  provder: { name: string }
}

export default function UpcomingEventPage() {
  const router = useRouter()

  const [programsData, setProgramsData] = useState<ProgramsData | null>(null)
  const [loading, setLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(1)

  // Use a ref to track current filter without causing re-renders
  const [filter, setFilter] = useState({
    program_type: "",
    status: "",
    page: 1,
  })

  // FIX: Use useCallback so getPrograms is stable and can be called from event listeners
  // Pass filter as parameter to avoid stale closure issues
  const getPrograms = useCallback(async (currentFilter: typeof filter) => {
    try {
      setLoading(true)
      const res = await getProgramList(currentFilter)
      if (
        res &&
        "success" in res &&
        res.success &&
        res.data &&
        "data" in res.data &&
        res.data.data
      ) {
        setProgramsData(res.data.data) 
        setTotalPages(res.data.data.pagination.last_page)
      }
    } catch (error) {
      console.error(error)
    } finally {
      // FIX: Always stop loading even on error
      setLoading(false)
    }
  }, []) // No dependencies — filter is passed as argument

  // FIX: Only re-run when filter actually changes (not when setFilter is called with the same value)
  useEffect(() => {
    getPrograms(filter)
  }, [filter, getPrograms])

  // Listen for programevent / programCreated / programDeleted
  useEffect(() => {
    const handleRefresh = () => {
      // FIX: Trigger a re-fetch by resetting to page 1 (or keep current page)
      setFilter((prev) => ({ ...prev })) // shallow copy triggers effect without changing values
      // If you want to reset to page 1 on refresh: setFilter((prev) => ({ ...prev, page: 1 }))
    }

    window.addEventListener("programevent", handleRefresh)
    window.addEventListener("programCreated", handleRefresh)
    window.addEventListener("programDeleted", handleRefresh)

    return () => {
      window.removeEventListener("programevent", handleRefresh)
      window.removeEventListener("programCreated", handleRefresh)
      window.removeEventListener("programDeleted", handleRefresh)
    }
  }, [])

  

  return (
    <section>
      <div>
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
              router.replace(`?add-new=program`)
            }}
          />
        </div>

        {/* Upcoming Program Card */}
        {programsData?.latest_upcoming_program && (
          <article className="overflow-hidden rounded-2xl border border-white/10 bg-brand">
            <div className="lg:flex">
              <div className="relative min-h-44 md:min-h-full">
                <Image
                  width={1000}
                  height={1000}
                  src={
                    encodeURI(programsData.latest_upcoming_program.photo) ||
                    "/images/player1.png"
                  }
                  alt={programsData.latest_upcoming_program.program_name}
                  className="h-full max-h-55 w-full object-fill lg:max-w-[288px]"
                />

                <span className="absolute bottom-3 left-3 rounded-full bg-[#16A34A] px-3 py-1 text-[10px] font-bold tracking-[0.08em] text-primary uppercase">
                  In Progress
                </span>
              </div>

              <div className="flex-1 px-4 py-5 text-primary sm:px-6 md:py-6 lg:py-7">
                <h3 className="text-[22px] leading-tight font-bold sm:text-[24px] lg:text-[28px]">
                  {programsData.latest_upcoming_program.program_name}
                </h3>

                <p className="mt-2 flex items-center gap-2 text-sm font-normal text-primary! sm:text-base">
                  <UserRound className="size-4" />
                  Coach: {programsData.latest_upcoming_program.provider.name}
                </p>

                <div className="mt-4 flex gap-3 text-primary! md:mt-5 md:gap-8">
                  <div>
                    <p className="text-sm font-normal text-primary/50! sm:text-base">
                      Schedule
                    </p>
                    <p className="text-sm font-normal text-primary! sm:text-base lg:text-lg">
                      {moment(
                        programsData.latest_upcoming_program.start_date
                      ).format("MMM Do YY")}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-normal text-primary/50! sm:text-base">
                      Location
                    </p>
                    <p className="text-sm font-normal text-primary! sm:text-base lg:text-lg">
                      {programsData.latest_upcoming_program.location}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 px-4 pb-5 sm:flex-row sm:items-end sm:justify-between sm:px-6 md:flex-col md:items-end md:justify-center md:px-6 md:py-6">
                <div className="w-full rounded-xl border border-primary/35 px-4 py-2 text-right text-primary! sm:w-auto">
                  <p className="text-xs font-medium text-primary/50! opacity-75 sm:text-sm">
                    Sport
                  </p>
                  <p className="text-[14px] font-medium text-primary! sm:text-base lg:text-lg">
                    {programsData.latest_upcoming_program.sport}
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
                      String(programsData?.latest_upcoming_program?.id || "")
                    )
                    router.push(`?add-new=program`)
                  }}
                />
              </div>
            </div>
          </article>
        )}
      </div>

      {/* upcoming events content */}
      <div className="flex items-center justify-between">
        <h2 className="mt-6 text-xl font-bold text-white sm:text-2xl">
          My Available Programs
        </h2>
        <ProgramFilterDropdown filter={filter} setFilter={setFilter} />
      </div>

      {/* programs cards */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-full text-center text-white">
            Loading programs...
          </div>
        ) : programsData && programsData.programs.length > 0 ? (
          programsData.programs.map((program: Program) => (
            <ProgramCard
              key={program.id}
              id={program.id.toString()}
              title={program.program_name}
              type={`Age U${
                program?.age_limit == program?.from_age ||
                program?.from_age == null
                  ? program?.age_limit
                  : `${program?.from_age} - U${program?.age_limit}`
              }`}
              schedule={program.location}
              duration={`${moment(program.start_date).format("MMM Do YY")} - ${moment(program.end_date).format("MMM Do YY")}`}
              currentPrice={
                program.price
                  ? `${program.price - program.discount_price}`
                  : `${program.program_price}`
              }
              previousPrice={String(program.discount_price + program.price)}
              imageSrc={program.photo}
              imageAlt={program.program_name}
              buttonLabel="View Details"
              editLink={`/club/my-programs/${program.id}?`}
              viewOnly={false}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-white">
            No programs available
          </div>
        )}
      </div>

      {/* FIX: Pagination moved outside the grid */}
      {!loading && programsData && programsData.programs.length > 0 && (
        <div className="py-2 backdrop-blur-sm sticky bottom-0 left-0 w-full flex items-center justify-center     "> 
          <CommonPagination
            currentPage={filter.page}
            totalPages={totalPages}
            onPageChange={(page: number) => {
              setFilter((prevFilter) => ({ ...prevFilter, page }))
            }}
          />
        </div>
      )}
    </section>
  )
}