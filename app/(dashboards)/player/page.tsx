"use client"
import { Share2, SquarePen } from "lucide-react"
import CommonBtn from "@/components/common/common-btn"
import TrainingReminderCard from "@/components/custom/remiender"
import PlayerStats from "./components/player-stats"
import ScoutingStatus from "./components/scouting-status"
import PlayerRecruitmentCard from "./components/player-recruitment-card"
import { useRouter } from "next/navigation"
import ShareModal from "@/components/common/modal/all-modals/share-modal"
import { useEffect, useState } from "react"
import Advertisement from "@/components/custom/advertisement"
import { getPlayerDashboard } from "../action"
import { TPlayerDashboard, TPlayerStatsSummary } from "@/types/player.type"
import moment from "moment"

export default function PlayerDashboardPage() {
  const router = useRouter()

  const [openShareModal, setOpenShareModal] = useState(false)

  const [dashData, setDashData] = useState<TPlayerDashboard>()
  
  useEffect(() => {
    
    const getDashboard  = async () => {
      try {
        const res = await getPlayerDashboard()

        if(res && 'success' in res && res.success && res.data && 'data' in res.data && res.data.data){
          setDashData(res.data.data)
        }
 
      } catch (error) {
        console.error(error)
      } 
    }
    getDashboard()

    const handleLoadDashboard = () => {
      getDashboard()
    }

    window.addEventListener("load_coach_dashboard", handleLoadDashboard)

    return () => {
      window.removeEventListener("load_coach_dashboard", handleLoadDashboard)
    }


  }, [])

  const playerId = dashData?.player_info?.id;
   
 

  return (
    <section className=" ">
      <h2 className="text-base font-bold text-white">Welcome, Daniel</h2>
      <p className="mt-1 text-base text-white">
        Here is a summary of your children recent activity and upcoming
        sessions.{" "}
      </p>

      {/* stats */}
      <PlayerStats summary={dashData?.summary as TPlayerStatsSummary} />

      {/* activity and action  */}
      <div className="mt-6 flex w-full flex-col-reverse gap-6 text-white lg:flex-row">
        {/* recent activity */}
        <div className="rounded-[24px] w-full lg:w-[60%]   ">
          <h5 className="mb-4 text-[18px] leading-[150%] font-semibold text-white">
            Recent Opportunities
          </h5>

          <div className="scrollbar-hide overflow-x-auto">
            <div className="flex flex-wrap gap-4 pb-2">

              {dashData?.recent_opportunities.map((opportunity) => (
                <div key={opportunity.id} className="max-w-[320px] min-w-[320px] shrink-0">
                  <Advertisement
                    imageUrl={opportunity.club.club_logo}
                    positions={opportunity.position.name}
                    teamName={opportunity.club.club_name}
                    ageGroup={String(opportunity.upto_age)}
                    tryoutDate={moment(opportunity.tryout_date).format("MMM Do YY")}
                    description={opportunity.description}
                    recruitId={String(opportunity.id)}
                    application_status={opportunity.application_status}
                  />
                </div>
              ))} 
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
              key={playerId}
              open={openShareModal}
              onOpenChange={setOpenShareModal}
              url={`${typeof window !== "undefined" ? window.location.origin : ""}/profile/${playerId}`}
              title="Watch my Player Card"
            />

            {/* divider */}
            <div className="my-4 border-t border-secondary/30" />

            <h4 className="text-sm font-bold">Scouting Status</h4>

            <ScoutingStatus 
              percentage={dashData?.scouting_status?.profile_completeness }
            />
          </div>

          <TrainingReminderCard />

 
        </div>
      </div>
    </section>
  )
}
