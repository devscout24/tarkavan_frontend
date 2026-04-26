"use client"
import { Share2, SquarePen } from "lucide-react"
import CommonBtn from "@/components/common/common-btn"
import TrainingReminderCard from "@/components/custom/remiender"
import PlayerStats from "./components/player-stats"
import ScoutingStatus from "./components/scouting-status"
import PlayerRecruitmentCard from "./components/player-recruitment-card"
import { useRouter } from "next/navigation"
import ShareModal from "@/components/common/modal/all-modals/share-modal"
import { useState } from "react"
import Advertisement from "@/components/custom/advertisement"

export default function PlayerDashboardPage() {
  const router = useRouter()

  const [openShareModal, setOpenShareModal] = useState(false)

  return (
    <section className=" ">
      <h2 className="text-base font-bold text-white">Welcome, Daniel</h2>
      <p className="mt-1 text-base text-white">
        Here is a summary of your children recent activity and upcoming
        sessions.{" "}
      </p>

      {/* stats */}
      <PlayerStats />

      {/* activity and action  */}
      <div className="mt-6 flex w-full flex-col-reverse gap-6 text-white lg:flex-row">
        {/* recent activity */}
        <div className="rounded-[24px] w-full lg:w-[60%]   ">
          <h5 className="mb-4 text-[18px] leading-[150%] font-semibold text-white">
            Recent Opportunities
          </h5>

          <div className="scrollbar-hide overflow-x-auto">
            <div className="flex flex-wrap gap-4 pb-2">
              <div className="max-w-[320px] min-w-[320px] shrink-0">
                <Advertisement
                  imageUrl={"/images/advertisementImage.png"}
                  positions="Defender, Winger"
                  teamName="Elite U16"
                  ageGroup="U16"
                  tryoutDate="March 15-18, 2026"
                  description="Looking for skilled defenders for upcoming season."
                  onApply={() => {}}
                  isApplied={true}
                />
              </div>

              <div className="max-w-[320px] min-w-[320px] shrink-0">
                <Advertisement
                  imageUrl={"/images/advertisementImage.png"}
                  positions="Goalkeeper, Midfielder"
                  teamName="Academy Select"
                  ageGroup="U18"
                  tryoutDate="April 20-23, 2026"
                  description="Join our elite academy program for professional development."
                  onApply={() => {}}
                  isApplied={false}
                />
              </div>

              <div className="max-w-[320px] min-w-[320px] shrink-0">
                <Advertisement
                  imageUrl={"/images/advertisementImage.png"}
                  positions="Striker, Attacker"
                  teamName="Premier FC"
                  ageGroup="U14"
                  tryoutDate="May 10-13, 2026"
                  description="Seeking talented forwards for competitive league play."
                  onApply={() => {}}
                  isApplied={true}
                />
              </div>
            </div>
          </div>
        </div>

        {/* quick actions */}
        <div className="w-full lg:w-[40%] ">
          <h3 className="mb-2 text-base font-semibold">Quick Actions</h3>

          {/* actions */}
          <div className="rounded-[16px] border border-secondary/30 bg-secondary/25 p-6">
            <CommonBtn
              variant={"default"}
              size={"sm"}
              icon={<SquarePen />}
              className="w-full cursor-pointer bg-secondary py-6! text-white hover:bg-brand hover:text-primary"
              text={"Edit My Profile"}
              onClick={() => router.push("/player/profile-settings")}
            />
            <CommonBtn
              variant={"default"}
              size={"sm"}
              icon={<Share2 />}
              className="mt-4 w-full cursor-pointer bg-secondary py-6 text-white hover:bg-brand hover:text-primary"
              text={"Share Player Card"}
              onClick={() => setOpenShareModal(true)}
            />

            <ShareModal
              key={"shareUrl"}
              open={openShareModal}
              onOpenChange={setOpenShareModal}
              url={"https://tarkavan.vercel.app/profile/234"}
              title="Watch my Player Card"
            />

            {/* divider */}
            <div className="my-4 border-t border-secondary/30" />

            <h4 className="text-sm font-bold">Scouting Status</h4>

            <ScoutingStatus />
          </div>

          <TrainingReminderCard />

          <PlayerRecruitmentCard
            position="Defender, Winger"
            ageGroup="Elite U16 | Age: U16"
            tryoutDates="Tryouts: March 15-18, 2026"
            description="Looking for skilled defenders for upcoming season."
            buttonText="Apply"
          />
        </div>
      </div>
    </section>
  )
}
