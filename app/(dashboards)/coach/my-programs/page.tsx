"use client"
import ProgramCard from "@/components/common/program-card"
import ProgramFilterDropdown from "@/components/common/ProgramFilterDropdown"
import CommonBtn from "@/components/common/common-btn"
import { UserRound } from "lucide-react"
import Image from "next/image"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Icon } from "@/components/custom/Icon"

function PlusIcon() {
  return (
    <Icon width="12" height="12" viewBox="0 0 12 12" stroke="#060807" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5.834 11.1673C6.38593 11.1673 6.83333 10.7199 6.83333 10.168V6.83266H10.168C10.7197 6.83266 11.1669 6.38566 11.1673 5.83399C11.1677 5.28179 10.7201 4.83399 10.168 4.83399H6.83333V1.49935C6.83333 0.94768 6.38633 0.50036 5.83467 0.5C5.28247 0.49964 4.83467 0.947174 4.83467 1.49935V4.83399H1.49935C0.947427 4.83399 0.5 5.28139 0.5 5.83333C0.5 6.38526 0.947427 6.83266 1.49935 6.83266H4.83467V10.168C4.83467 10.7199 5.28207 11.1673 5.834 11.1673Z" />
    </Icon>
  )
}

export default function UpcomingEventPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

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
      label: "Active Programs",
      onSelect: () => console.log("Active Programs"),
    },
    {
      label: "Deactive Programs",
      onSelect: () => console.log("Deactive Programs"),
    },
    {
      label: "Delete Programs",
      onSelect: () => console.log("Delete Programs"),
    },
  ]

  const programs = [
    {
      id: "1",
      title: "Elite Hoops Leadership Academy",
      coachName: "Elena Rodriguez",
      schedule: "Tuesdays, 6:00 PM",
      duration: "8 Weeks Program",
      currentPrice: "$249",
      imageSrc: "/images/player1.png",
      imageAlt: "Program image",
      buttonLabel: "View Details",
    },
    {
      id: "2",
      title: "Premier Soccer Striker Clinic",
      coachName: "David Chen",
      schedule: "Weekends, 10:00 AM",
      duration: "4 Weeks Program",
      currentPrice: "$199",
      imageSrc: "/images/player2.png",
      imageAlt: "Program image",
      buttonLabel: "View Details",
    },
    {
      id: "3",
      title: "Mindset & Performance Coaching",
      coachName: "Sarah Jenkins",
      schedule: "Thursdays, 5:00 PM",
      duration: "12 Weeks Program",
      currentPrice: "$269",
      previousPrice: "$299",
      imageSrc: "/images/player3.png",
      imageAlt: "Program image",
      buttonLabel: "View Details",
    },
  ]

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
      <article className="overflow-hidden rounded-2xl border border-white/10 bg-brand">
        <div className="lg:flex">
          <div className="relative min-h-44 md:min-h-full">
            <Image
              width={1000}
              height={1000}
              src={"/images/player1.png"}
              alt="Varsity Prep Mentorship"
              className="h-full max-h-55 w-full object-fill lg:max-w-[288px]"
            />

            <span className="absolute bottom-3 left-3 rounded-full bg-[#16A34A] px-3 py-1 text-[10px] font-bold tracking-[0.08em] text-white uppercase">
              In Progress
            </span>
          </div>

          <div className="flex-1 px-4 py-5 text-primary sm:px-6 md:py-6 lg:py-7">
            <h3 className="text-[22px] leading-tight font-bold sm:text-[24px] lg:text-[28px]">
              Varsity Prep Mentorship
            </h3>

            <p className="mt-2 flex items-center gap-2 text-sm font-normal text-primary sm:text-base">
              <UserRound className="size-4" />
              Coach: Marcus Thompson
            </p>

            <div className="mt-4 flex gap-3 text-primary md:mt-5 md:gap-8">
              <div>
                <p className="text-sm font-normal text-primary/50 sm:text-base">
                  Schedule
                </p>
                <p className="text-sm font-normal text-primary sm:text-base lg:text-lg">
                  Mon & Wed, 5:00 PM
                </p>
              </div>

              <div>
                <p className="text-sm font-normal text-primary/50 sm:text-base">
                  Next Session
                </p>
                <p className="text-sm font-normal text-primary sm:text-base lg:text-lg">
                  Oct 24, 2023
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 px-4 pb-5 sm:flex-row sm:items-end sm:justify-between sm:px-6 md:flex-col md:items-end md:justify-center md:px-6 md:py-6">
            <div className="w-full rounded-xl border border-primary/35 px-4 py-2 text-right text-primary sm:w-auto">
              <p className="text-xs font-medium opacity-75 sm:text-sm">
                Current Focus
              </p>
              <p className="text-[14px] font-medium text-primary sm:text-base lg:text-lg">
                Speed & Agility
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

      {/* upcoming events content */}
     <div className="flex justify-between items-center">
       <h2 className="mt-6 text-xl font-bold text-white sm:text-2xl">
        My Available Programs
      </h2>
      <ProgramFilterDropdown />
     </div>
      {/* programs cards */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {programs.map((program, index) => (
          <ProgramCard
            key={index}
            {...program}
            onClick={() => router.push(`/coach/my-programs/${program.id}`)}
            threeDotsItems={programActions}
          />
        ))}
      </div>
    </section>
  )
}
