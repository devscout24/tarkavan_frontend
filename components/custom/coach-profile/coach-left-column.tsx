import CommonBtn from "@/components/common/common-btn"
import ProgramCoachCard from "@/components/common/program-coach-card"
import { Card } from "@/components/ui/card"
import {
  FacebookIcon,
  FullStarIcon,
  InstagramIcon,
  PartialStarIcon,
  ProfileShareIcon,
  TiktokIcon,
  WhatsappIcon,
  XIcon,
} from "./icons"

const coachingTitles = [
  "PLAYER DEVELOPMENT",
  "MENTAL PERFORMANCE",
  "SHOOTING MECHANICS",
  "GAME STRATEGY",
]

export default function CoachLeftColumn() {
  return (
    <aside className="space-y-4 xl:space-y-5 2xl:space-y-6">
      <ProgramCoachCard
        className="rounded-[12px] border border-secondary/60 bg-primary xl:[&_h3]:text-[38px] 2xl:[&_h3]:text-[46px] xl:[&_p]:text-[17px] 2xl:[&_p]:text-[19px] xl:[&_span]:text-[11px] 2xl:[&_span]:text-[12px]"
        name="SHAHIN"
        highlightedName="TARKAVAN"
        role="Elite Basketball Coach"
        location="Chicago, Illinois, USA"
        tags={["MALE", "HEAD COACH", "SKILLS TRAINER"]}
        imageUrl="/images/coach.png"
        showMessageButton={false}
      />

      <Card className="rounded-[12px] border border-secondary/60 bg-primary p-6 xl:p-7 2xl:p-8">
        <p className="text-[32px] leading-[125%] font-bold text-white xl:text-[38px] 2xl:text-[44px]">
          4.9
        </p>
        <div className="mt-1 flex items-center gap-1 xl:mt-2 xl:gap-1.5 xl:[&_svg]:scale-110 2xl:[&_svg]:scale-125">
          <FullStarIcon />
          <FullStarIcon />
          <FullStarIcon />
          <FullStarIcon />
          <PartialStarIcon />
        </div>
        <p className="mt-2 text-base leading-[150%] font-semibold tracking-[-0.32px] text-white xl:text-lg 2xl:text-xl">
          Average Rating Based on 47 reviews
        </p>
      </Card>

      <Card className="rounded-[12px] border border-secondary/60 bg-primary p-6 xl:p-7 2xl:p-8">
        <h5 className="text-base leading-[150%] font-semibold text-white uppercase xl:text-lg 2xl:text-xl">
          Coaching Titles
        </h5>
        <div className="mt-3 flex flex-wrap gap-4 xl:mt-4 xl:gap-5">
          {coachingTitles.map((title) => (
            <span
              key={title}
              className="rounded-[6px] bg-white/10 p-2 text-[10px] leading-[120%] font-medium text-white xl:px-2.5 xl:py-2.5 xl:text-[11px] 2xl:text-xs"
            >
              {title}
            </span>
          ))}
        </div>
      </Card>

      <Card className="rounded-[12px] border border-secondary/60 bg-primary px-5 py-4 xl:px-6 xl:py-5 2xl:px-7 2xl:py-6">
        <div className="flex flex-wrap items-center gap-3 xl:flex-nowrap xl:justify-between">
          <div className="flex items-center gap-4 xl:gap-5 xl:[&_svg]:scale-110 2xl:[&_svg]:scale-125">
            <FacebookIcon />
            <InstagramIcon />
            <TiktokIcon />
            <XIcon />
            <WhatsappIcon />
          </div>
          <CommonBtn
            variant="default"
            size="lg"
            text="Profile Share"
            icon={<ProfileShareIcon />}
            className="h-10 w-fit rounded-[10px] bg-brand px-4 text-sm font-semibold text-primary hover:bg-brand/90 xl:h-11 xl:px-5 xl:text-base 2xl:h-12 2xl:px-6 2xl:text-lg xl:[&_svg]:scale-110"
          />
        </div>
      </Card>
    </aside>
  )
}
