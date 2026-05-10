"use client"

import { useParams, useRouter } from "next/navigation"
import PlayerStats from "../../player/components/player-stats";
import { TPlayerDashboard, TPlayerStatsSummary } from "@/types/player.type"
import Advertisement from "@/components/custom/advertisement"
import CommonBtn from "@/components/common/common-btn";
import { Share2, SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import ShareModal from "@/components/common/modal/all-modals/share-modal";
import ScoutingStatus from "../../player/components/scouting-status";
import TrainingReminderCard from "@/components/custom/remiender";
import { getPlayerDashboard } from "../../action"; 
import moment from "moment";

export default function ChildDashboard() {

    const params = useParams()
    const child_id = params.child_id
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
              onClick={() => router.push(`/child-dashboard/${child_id}/profile-settings`)}
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
              key={String(child_id)}
              open={openShareModal}
              onOpenChange={setOpenShareModal}
              url={`${typeof window !== "undefined" ? window.location.origin : ""}/profile/${child_id}`}
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
    );
}