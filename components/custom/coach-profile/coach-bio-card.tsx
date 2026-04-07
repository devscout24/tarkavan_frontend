import { Card } from "@/components/ui/card"

export default function CoachBioCard() {
  return (
    <Card className="rounded-[12px] border border-secondary/60 bg-primary p-6 xl:p-7 2xl:p-8">
      <h5 className="text-base leading-[150%] font-bold text-white xl:text-lg 2xl:text-xl">
        Bio
      </h5>
      <p className="mt-2 text-sm leading-[150%] text-white/85 xl:mt-3 xl:text-base 2xl:text-lg">
        My philosophy centers on mental resilience and technical precision. I
        believe that greatness is not just about physical ability, but the
        relentless pursuit of perfection in the fundamentals. Whether working
        with professional athletes or youth prospects, my approach is tailored
        to the individual's unique psychological profile and athletic goals.
      </p>
      <p className="mt-4 text-sm leading-[150%] text-white/85 xl:mt-5 xl:text-base 2xl:text-lg">
        I focus on a "Player-centric approach" where athlete development is
        tracked through data-driven training metrics. Every session is designed
        to push limits while ensuring a deep understanding of the "why" behind
        every movement on the court.
      </p>
      <div className="mt-4 flex flex-wrap gap-2 xl:mt-5 xl:gap-3">
        <span className="rounded-[6px] border border-white/20 bg-white/5 px-3 py-1 text-[11px] leading-[150%] text-white/85 xl:px-3.5 xl:py-1.5 xl:text-xs">
          DATA-DRIVEN PROGRESS TRACKING
        </span>
        <span className="rounded-[6px] border border-white/20 bg-white/5 px-3 py-1 text-[11px] leading-[150%] text-white/85 xl:px-3.5 xl:py-1.5 xl:text-xs">
          COGNITIVE SKILL DEVELOPMENT
        </span>
      </div>
    </Card>
  )
}
