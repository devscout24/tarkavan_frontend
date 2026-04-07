import CommonBtn from "@/components/common/common-btn"
import { ArrowRight } from "lucide-react"

type CoachOpportunityCardProps = {
  organization: string
  title: string
  subtitle: string
  tryoutDate: string
  description: string
}

export default function CoachOpportunityCard({
  organization,
  title,
  subtitle,
  tryoutDate,
  description,
}: CoachOpportunityCardProps) {
  return (
    <section className="overflow-hidden rounded-[12px] border border-secondary/70 bg-primary">
      <div className="bg-[linear-gradient(108deg,#022931_0%,#0F6757_52%,#41BF74_100%)] px-4 py-10 text-center">
        <p className="text-[13px] leading-[150%] font-normal text-white/90">
          {organization}
        </p>
        <h6 className="text-[34px] leading-[112%] font-semibold text-white">
          Looking For Coaches
        </h6>
      </div>

      <div className="space-y-3 p-4 text-white">
        <h6 className="text-[22px] leading-[125%] font-medium">{title}</h6>
        <p className="text-sm leading-[150%] text-white">{subtitle}</p>
        <p className="text-sm leading-[150%] text-white">
          Tryouts: {tryoutDate}
        </p>
        <p className="text-sm leading-[150%] text-white">{description}</p>

        <div className="flex items-center gap-3 pt-1">
          <CommonBtn
            variant="default"
            size="lg"
            text="Apply"
            className="h-10 flex-1 rounded-[8px] bg-brand text-base font-medium text-primary hover:bg-brand/90"
          />
          <button
            type="button"
            className="grid h-10 w-10 cursor-pointer place-items-center rounded-[8px] border border-brand text-brand"
            aria-label="See details"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}
