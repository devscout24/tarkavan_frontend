import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useIsInView } from "@/hooks/use-is-in-view"
import { cn } from "@/lib/utils"
import { Pencil, Star, StarHalf } from "lucide-react"
import { useRef } from "react"

type RatingBreakdownItem = {
  stars: 1 | 2 | 3 | 4 | 5
  percentage: number
}

type ProgramReviewProps = {
  rating?: number
  totalReviews?: number
  breakdown?: RatingBreakdownItem[]
  feedbackLabel?: string
  reviewLabel?: string
  onWriteReview?: () => void
  className?: string
}

const defaultBreakdown: RatingBreakdownItem[] = [
  { stars: 5, percentage: 85 },
  { stars: 4, percentage: 12 },
  { stars: 3, percentage: 3 },
  { stars: 2, percentage: 0 },
  { stars: 1, percentage: 0 },
]

function clampPercent(value: number) {
  return Math.min(100, Math.max(0, value))
}

function RatingStars({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating)
  const hasHalf = rating - fullStars >= 0.5
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0)

  return (
    <div className="mt-1 flex items-center gap-0.5 text-[#B6EE6B]">
      {Array.from({ length: fullStars }).map((_, index) => (
        <Star key={`full-${index}`} className="size-5 fill-current" />
      ))}

      {hasHalf && <StarHalf className="size-5 fill-current" />}

      {Array.from({ length: emptyStars }).map((_, index) => (
        <Star key={`empty-${index}`} className="size-5" />
      ))}
    </div>
  )
}

export default function ProgramReview({
  rating = 4.9,
  totalReviews = 47,
  breakdown = defaultBreakdown,
  feedbackLabel = "Total Feedback",
  reviewLabel = "Write a Review",
  onWriteReview,
  className,
}: ProgramReviewProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { ref, isInView } = useIsInView(sectionRef, {
    inView: true,
    inViewOnce: true,
    inViewMargin: "-10% 0px",
  })

  const orderedBreakdown = [...breakdown].sort((a, b) => b.stars - a.stars)

  return (
    <section
      ref={ref}
      className={cn(
        "mt-5 rounded-2xl border border-secondary/70 bg-[#020515] p-4 md:p-8",
        className
      )}
      aria-label="Program Reviews"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[36px] font-bold text-white">
            {rating.toFixed(1)}
          </p>
          <RatingStars rating={rating} />
        </div>

        <div className="text-right">
          <p className="text-base text-white/40">{feedbackLabel}</p>
          <p className="text-xl font-bold text-white">{totalReviews} reviews</p>
        </div>
      </div>

      <div className="mt-6 space-y-3 md:mt-8 md:space-y-4">
        {orderedBreakdown.map((item) => (
          <div
            key={item.stars}
            className="grid grid-cols-[28px_1fr_44px] items-center gap-3 md:gap-4"
          >
            <span className="text-base text-white/40">{item.stars}</span>

            <Progress
              value={isInView ? clampPercent(item.percentage) : 0}
              className="h-2 rounded-full bg-white/10 [&>div]:bg-brand [&>div]:duration-900 [&>div]:ease-out"
            />

            <span className="text-base text-white/40">{item.percentage}%</span>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="secondary"
        onClick={onWriteReview}
        className="mt-6 h-16 w-full rounded-2xl border border-white/40 bg-white/10 text-base font-semibold text-white hover:bg-white/15 md:mt-8"
      >
        <Pencil className="size-4" />
        {reviewLabel}
      </Button>
    </section>
  )
}
