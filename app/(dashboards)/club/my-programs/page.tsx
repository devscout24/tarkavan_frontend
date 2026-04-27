"use client"
import ProgramCard from "@/components/common/program-card"
import ProgramFilterDropdown from "@/components/common/ProgramFilterDropdown"
import CommonBtn from "@/components/common/common-btn"
import { UserRound } from "lucide-react"
import Image from "next/image"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Icon } from "@/components/custom/Icon"
import { useEffect, useState } from "react"
import { getProgramList } from "../action"

function PlusIcon() {
  return (
    <Icon width="12" height="12" viewBox="0 0 12 12" stroke="#060807" strokeLinecap="round" strokeLinejoin="round">
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
  discount_price: number
  upto_age: number
  program_location: string
  program_start: string
  program_end: string
  program_photo: string
  status: string
  club_name: string
  coach_name: string
  time: string
  times: ProgramTime[]
  goals: ProgramGoal[]
}

interface ProgramsData {
  latest_upcoming_program: Program | null
  programs: Program[]
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
}

export default function UpcomingEventPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [programsData, setProgramsData] = useState<ProgramsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)

  const programActions = [
    { 
      label: "Edit Programs", 
      onSelect: () => {
        const nextParams = new URLSearchParams(searchParams.toString())
        nextParams.set("add-new", "program")
        router.replace(
          nextParams.toString()
            ? `${pathname}?${nextParams.toString()}`
            : pathname
        )
      }
    }, 
    {
      label: "Delete Programs",
      onSelect: () => console.log("Delete Programs"),
    },
  ]

  useEffect(() => {
    
    const getPrograms = async () => {
      try{
        setLoading(true)
        const res = await getProgramList() 
        if(res && 'success' in res && res.success && res.data && 'data' in res.data && res.data.data) {
          setProgramsData(res.data.data)
        }
      }catch(error){
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    getPrograms()
  }, [refreshKey])  

  // Function to refresh programs list
  const refreshPrograms = () => {
    setRefreshKey(prev => prev + 1)
  }

  // Listen for program creation success events
  useEffect(() => {
    const handleProgramCreated = () => {
      refreshPrograms()
    }
 
    const handleDashboardRefresh = () => {
      refreshPrograms()
    }

    // Listen for custom events
    window.addEventListener('programCreated', handleProgramCreated)
    window.addEventListener('programDeleted', handleDashboardRefresh)
    
    return () => {
      window.removeEventListener('programCreated', handleProgramCreated) 
      window.removeEventListener('programDeleted', handleDashboardRefresh)
    }
  }, [])

  return (
    <section>
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <h2 className="text-xl font-bold text-white sm:text-2xl">Upcoming Programs</h2>
        <CommonBtn
          text="Add Program"
          icon={<PlusIcon />}
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

      {/* Upcoming Program Card */}
      {programsData?.latest_upcoming_program && (
        <article className="overflow-hidden rounded-2xl border border-white/10 bg-brand">
          <div className="lg:flex">
            <div className="relative min-h-44 md:min-h-full">
              <Image
                width={1000}
                height={1000}
                src={programsData.latest_upcoming_program.program_photo || "/images/player1.png"}
                alt={programsData.latest_upcoming_program.program_name}
                className="h-full max-h-55 w-full object-fill lg:max-w-[288px]"
              />

              <span className="absolute bottom-3 left-3 rounded-full bg-[#16A34A] px-3 py-1 text-[10px] font-bold tracking-[0.08em] text-white uppercase">
                In Progress
              </span>
            </div>

            <div className="flex-1 px-4 py-5 text-primary sm:px-6 md:py-6 lg:py-7">
              <h3 className="text-[22px] leading-tight font-bold sm:text-[24px] lg:text-[28px]">
                {programsData.latest_upcoming_program.program_name}
              </h3>

              <p className="mt-2 flex items-center gap-2 text-sm font-normal text-primary sm:text-base">
                <UserRound className="size-4" />
                Coach: {programsData.latest_upcoming_program.coach_name}
              </p>

              <div className="mt-4 flex gap-3 text-primary md:mt-5 md:gap-8">
                <div>
                  <p className="text-sm font-normal text-primary/50 sm:text-base">
                    Schedule
                  </p>
                  <p className="text-sm font-normal text-primary sm:text-base lg:text-lg">
                    {programsData.latest_upcoming_program.time}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-normal text-primary/50 sm:text-base">
                    Next Session
                  </p>
                  <p className="text-sm font-normal text-primary sm:text-base lg:text-lg">
                    {programsData.latest_upcoming_program.program_start}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 px-4 pb-5 sm:flex-row sm:items-end sm:justify-between sm:px-6 md:flex-col md:items-end md:justify-center md:px-6 md:py-6">
              <div className="w-full rounded-xl border border-primary/35 px-4 py-2 text-right text-primary sm:w-auto">
                <p className="text-xs font-medium opacity-75 sm:text-sm">
                  Sport
                </p>
                <p className="text-[14px] font-medium text-primary sm:text-base lg:text-lg">
                  {programsData.latest_upcoming_program.sport}
                </p>
              </div>

              <CommonBtn
                text="Edit Details"
                className="h-11 w-full rounded-xl bg-primary px-5 text-sm font-medium text-white hover:bg-primary/90 sm:w-auto md:w-full"
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
          </div>
        </article>
      )}

      {/* upcoming events content */}
     <div className="flex justify-between items-center">
       <h2 className="mt-6 text-xl font-bold text-white sm:text-2xl">
        My Available Programs
      </h2>
      <ProgramFilterDropdown />
     </div>
      {/* programs cards */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-full text-center text-primary">Loading programs...</div>
        ) : programsData && programsData.programs.length > 0 ? (
          programsData.programs.map((program: Program) => (
            <ProgramCard
              key={program.id}
              id={program.id.toString()}
              title={program.program_name}
              coachName={program.coach_name}
              schedule={program.time}
              duration={`${program.program_start} - ${program.program_end}`}
              currentPrice={program.discount_price ? `$${program.discount_price}` : `$${program.program_price}`}
              previousPrice={program.discount_price ? `$${program.program_price}` : undefined}
              imageSrc={program.program_photo}
              imageAlt={program.program_name}
              buttonLabel="View Details"
              onClick={() => router.push(`/club/my-programs/${program.id}`)}
              threeDotsItems={programActions}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-primary">No programs available</div>
        )}
      </div>
    </section>
  )
}
