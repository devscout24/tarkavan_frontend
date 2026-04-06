import { cn } from "@/lib/utils"
import { Star, StarHalf } from "lucide-react"

type ProgramFeedbackCardProps = {
  name?: string
  date?: string
  review?: string
  rating?: number
  avatarUrl?: string
  className?: string
}

function clampRating(value: number) {
  return Math.min(5, Math.max(0, value))
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/)
  if (!parts.length) return "U"
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase()
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

function RatingStars({ rating }: { rating: number }) {
  const safeRating = clampRating(rating)
  const fullStars = Math.floor(safeRating)
  const hasHalf = safeRating - fullStars >= 0.5
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0)

  return (
    <div className="flex items-center gap-0.5 text-[#B6EE6B]">
      {Array.from({ length: fullStars }).map((_, index) => (
        <Star key={`full-${index}`} className="size-4 fill-current" />
      ))}

      {hasHalf && <StarHalf className="size-4 fill-current" />}

      {Array.from({ length: emptyStars }).map((_, index) => (
        <Star key={`empty-${index}`} className="size-4" />
      ))}
    </div>
  )
}

export default function ProgramFeedbackCard({
  name = "Sarah Jenkins",
  date = "September 28, 2023",
  review = "Very technical and precise instructions. The video analysis sessions were especially useful. Great energy and professional attitude.",
  rating = 4.5,
  avatarUrl = "/images/Dainel.png",
  className,
}: ProgramFeedbackCardProps) {
  return (
    <article
      className={cn(
        "mt-5 rounded-3xl border border-secondary/80 bg-white/8 p-5 md:p-7",
        className
      )}
      aria-label={`Feedback from ${name}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3 md:gap-4">
          <div className="  overflow-hidden rounded-full border border-brand/40 bg-secondary/40">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={name}
                className="size-full object-cover object-center w-12 h-12 "
              />
            ) : (
              <div className="flex size-full items-center justify-center text-sm font-semibold text-white/85">
                {getInitials(name)}
              </div>
            )}
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-white ">
              {name}
            </h3>
            <p className="text-[12px] text-secondary ">{date}</p>
          </div>
        </div>

        <RatingStars rating={rating} />
      </div>

      <p className="mt-4 text-[14px] leading-8 text-secondary md:mt-5  ">
        {review}
      </p>
    </article>
  )
}
