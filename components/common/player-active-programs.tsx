import { Button } from "@/components/ui/button"
import { UserRound } from "lucide-react"
import Image from "next/image"

type PlayerActiveProgramsProps = {
  title?: string
  programName?: string
  coachName?: string
  schedule?: string
  nextSession?: string
  focusLabel?: string
  focusValue?: string
  imageUrl?: string
  status?: string
  btnText?: string
  onViewDetails?: () => void
  showViewAllActive?: boolean
  programImage: string
}

export default function PlayerActivePrograms({ 
  programName = "",
  coachName = "",
  schedule = "", 
  focusLabel = "",
  focusValue = "",
  status = "",
  btnText = "",
  programImage = "/images/player1.png",
  onViewDetails, 
}: PlayerActiveProgramsProps) {
  return (
    <section className="w-full">
      <article className="overflow-hidden rounded-2xl border border-white/10 bg-brand">
        <div className="lg:flex">
          <div className="relative min-h-44 md:min-h-full">
            <Image
              width={1000}
              height={1000}
              src={"/images/player1.png"}
              alt={programName}
              className="h-full max-h-55 w-full object-fill lg:max-w-[288px]"
            />

            <span className="absolute bottom-3 left-3 rounded-full bg-[#16A34A] px-3 py-1 text-[10px] font-bold tracking-[0.08em] text-white uppercase">
              {status}
            </span>
          </div>

          <div className="flex-1 px-4 py-5 text-primary sm:px-6 md:py-6 lg:py-7">
            <h3 className="text-[22px] leading-tight font-bold sm:text-[24px] lg:text-[28px]">
              {programName}
            </h3>

            <p className="mt-2 flex items-center gap-2 text-sm font-normal text-primary! sm:text-base">
              <UserRound className="size-4" />
              Provider: {coachName}
            </p>

            <div className="mt-4 flex gap-3 text-primary md:mt-5 md:gap-8">
              <div>
                <p className="text-sm font-normal text-primary/50! sm:text-base">
                  Schedule
                </p>
                <p className="text-sm font-normal text-primary! sm:text-base lg:text-lg">
                  {schedule}
                </p>
              </div>
 
            </div>
          </div>

          <div className="flex flex-col gap-4 px-4 pb-5 sm:flex-row sm:items-end sm:justify-between sm:px-6 md:flex-col md:items-end md:justify-center md:px-6 md:py-6">
            <div className="w-full rounded-xl border border-primary/35 px-4 py-2 text-right text-primary sm:w-auto">
              <p className="text-xs font-medium opacity-75 sm:text-sm text-primary!  " >
                {focusLabel}
              </p>
              <p className="text-[14px] font-medium text-primary! sm:text-base lg:text-lg">
                {focusValue}
              </p>
            </div>

            <Button
              type="button"
              onClick={onViewDetails}
              className="h-11 w-full rounded-xl bg-primary px-5 text-sm font-medium text-white hover:bg-primary/90 sm:w-auto md:w-full"
            >
              {btnText}
            </Button>
          </div>
        </div>
      </article>
    </section>
  )
}
