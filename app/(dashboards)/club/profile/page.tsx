import CommonBtn from "@/components/common/common-btn"
import ProgramCoachCard from "@/components/common/program-coach-card"
import VisibilityEdit from "@/components/common/visibility-edit"
import { Card } from "@/components/ui/card"

export default function page() {
  return (
    <section>
      {/* visibility and customization options */}
      <Card className="flex-row items-center bg-secondary/40 px-5">
        <VisibilityEdit />
        <CommonBtn
          text="Edit Profile"
          className="w-fit bg-brand px-2 font-medium text-primary hover:bg-brand"
          size={"sm"}
          variant={"default"}
        />
      </Card>

      {/* profile details */}
      <div className="flex mt-6 gap-6  ">
        <div className="flex-1">
          <ProgramCoachCard />
        </div>
        <div className="flex-2">
          {/* bio */}
          <Card className="rounded-2xl border border-white/15 bg-[#050716] p-6 text-white">
            <h3 className="mb-4 text-2xl font-semibold">Bio</h3>
            <p className="mb-6 text-base leading-8 text-white/85">
              {`My philosophy centers on mental resilience and technical
              precision. I believe that greatness is not just about physical
              ability, but the relentless pursuit of perfection in the
              fundamentals. Whether working with professional athletes or youth
              prospects, my approach is tailored to the individual&apos;s unique
              psychological profile and athletic goals.`}
            </p>
            <p className="text-base leading-8 text-white/85">
              {`I focus on a &quot;Player-centric approach&quot; where athlete
              development is tracked through data-driven training metrics. Every
              session is designed to push limits while ensuring a deep
              understanding of the &quot;why&quot; behind every movement on the
              court.`}
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}
