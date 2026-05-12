import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { CalendarDays, Clock3, MapPin, Users } from "lucide-react"
import Image from "next/image"
import { differenceInCalendarDays, parseISO, format } from "date-fns"

type ProgramDetailsBannerProps = {
  title?: string
  category?: string
  duration?: string
  startDate?: string
  endDate?: string
  dateRange?: string
  location?: string
  ageRange?: string
  program_photo?: string
  className?: string
}

const calculateDuration = (startDate?: string, endDate?: string): string => {
  if (!startDate || !endDate) return ""

  const totalDays =
    differenceInCalendarDays(parseISO(endDate), parseISO(startDate)) + 1

  if (totalDays < 0) return ""
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

export default function ProgramDetailsBanner({
  title = "Varsity Prep Mentorship",
  category = "Football",
  duration = "12 Weeks Duration",
  startDate,
  endDate,
  dateRange = "01-03-2026 to 15-05-2026",
  location = "GoElite Sports Complex, Toronto",
  ageRange = "Ages 8-14",
  program_photo = "/images/programsBannerImg.png",
  className,
}: ProgramDetailsBannerProps) {
  const displayDuration =
    startDate && endDate ? calculateDuration(startDate, endDate) : duration
  const sanitize = (s?: string) => s?.replace(/[,\s]+$/g, "")?.trim() || ""
  const displayLocation = sanitize(location) || "N/A"
 
  const displayDateRange =
    startDate && endDate
      ? `${format(parseISO(startDate), "dd-MM-yyyy")} to ${format(
          parseISO(endDate),
          "dd-MM-yyyy"
        )}`
      : dateRange
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-secondary/60",
        className
      )}
      aria-label={title}
    >
      <Image
        src={program_photo || "/images/bannerbg.png"}
        alt={title}
        width={1000}
        height={1000}
        loading="eager"
        className="h-full max-h-80 w-full object-cover"
      />

      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-black/5" />

      <div className="absolute inset-x-0 bottom-0 z-10 p-4 md:p-6">
        <div className="flex items-center gap-2">
          <Badge className="h-auto rounded-md bg-brand/50 px-2 py-1 text-[14px] font-semibold tracking-wide text-primary uppercase">
            {category}
          </Badge>

          <p className="flex items-center gap-1 text-xs text-gray-400! md:text-sm">
            <Clock3 className="size-3.5" />
            {displayDuration} duration
          </p>
        </div>

        <h1 className="mt-2 text-[36px] leading-tight font-bold text-white md:text-5xl">
          {title}
        </h1>

        <ul className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/85 md:text-base">
          <li className="flex items-center gap-1.5">
            <CalendarDays className="size-4" />
            {displayDateRange}
          </li>

          <li className="flex items-center gap-1.5">
            <MapPin className="size-4" />
            {displayLocation}
          </li>

          <li className="flex items-center gap-1.5">
            <Users className="size-4" />
            {ageRange}
          </li>
        </ul>
      </div>
    </div>
  )
}
