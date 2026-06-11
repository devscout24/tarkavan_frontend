import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { TProgramRatingSummary } from "@/types"
import { Star, StarHalf } from "lucide-react"
import { useMemo } from "react"

type Props = {
  review_summary: TProgramRatingSummary
  className?: string
}

function RatingStars({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating)
  const hasHalf = rating - fullStars >= 0.5
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0)

  return (
    <div className="mt-1 flex items-center gap-0.5 text-[#B6EE6B]">
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`f-${i}`} className="size-5 fill-current" />
      ))}

      {hasHalf && <StarHalf className="size-5 fill-current" />}

      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`e-${i}`} className="size-5 text-white/30" />
      ))}
    </div>
  )
}

function clampPercent(value: number) {
  return Math.min(100, Math.max(0, value))
}

export default function ProgramReview({
  review_summary,
  className,
}: Props) {
  const { average_rating, total_reviews, rating_breakdown } =
    review_summary

  const orderedBreakdown = useMemo(() => {
    return [...rating_breakdown].sort((a, b) => b.star - a.star)
  }, [rating_breakdown])

  return (
    <section
      className={cn(
        "mt-5 rounded-2xl border border-secondary/70 bg-secondary/20 p-4 md:p-8",
        className
      )}
      aria-label="Program Reviews"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[36px] font-bold text-white">
            {Number(average_rating).toFixed(1)}
          </p>

          <RatingStars rating={Number(average_rating)} />
        </div>

        <div className="text-right">
          <p className="text-sm text-white/40">Overall Rating</p>
          <p className="text-xl font-bold text-white">
            {total_reviews} reviews
          </p>
        </div>
      </div>

      {/* Breakdown */}
      <div className="mt-6 space-y-3 md:mt-8 md:space-y-4">
        {orderedBreakdown.map((item) => (
          <div
            key={item.star}
            className="grid grid-cols-[28px_1fr_50px] items-center gap-3 md:gap-4"
          >
            <span className="text-sm text-white/50">
              {item.star}
            </span>

            <Progress
              value={clampPercent(item.percent)}
              className="h-2 rounded-full bg-white/10 [&>div]:bg-brand"
            />

            <span className="text-sm text-white/50 text-right">
              {item.percent}%
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}