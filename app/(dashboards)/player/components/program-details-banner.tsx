import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { CalendarDays, Clock3, MapPin, Users } from "lucide-react" 
import Image from "next/image"

type ProgramDetailsBannerProps = {
  title?: string
  category?: string
  duration?: string
  dateRange?: string
  location?: string
  ageRange?: string
  imageUrl?: string
  className?: string
}

export default function ProgramDetailsBanner({
  title = "Varsity Prep Mentorship",
  category = "Football",
  duration = "12 Weeks Duration",
  dateRange = "01-03-2026 to 15-05-2026",
  location = "GoElite Sports Complex, Toronto",
  ageRange = "Ages 8-14",
  imageUrl = "/images/program-banner.png",
  className,
}: ProgramDetailsBannerProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-secondary/60",
        className
      )}
      aria-label={title}
    >
      <Image
        src={imageUrl}
        alt={title}
        width={1000}
        height={1000}
        className="max-h-80 h-full w-full object-cover   "
      />

      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-black/5" />

      <div className="absolute inset-x-0 bottom-0 z-10 p-4 md:p-6">
        <div className="flex items-center gap-2">
          <Badge className="h-auto rounded-md bg-[#00A63E] px-2 py-1 text-[14px] font-semibold tracking-wide text-primary-foreground uppercase">
            {category}
          </Badge>

          <p className="flex items-center gap-1 text-xs text-white/80 md:text-sm">
            <Clock3 className="size-3.5" />
            {duration}
          </p>
        </div>

        <h1 className="mt-2 text-[36px] leading-tight font-bold text-white md:text-5xl">
          {title}
        </h1>

        <ul className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/85 md:text-base">
          <li className="flex items-center gap-1.5">
            <CalendarDays className="size-4" />
            {dateRange}
          </li>

          <li className="flex items-center gap-1.5">
            <MapPin className="size-4" />
            {location}
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
