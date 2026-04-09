import { Card } from "@/components/ui/card"
import CommonBtn from "@/components/common/common-btn"
import ProspectCard from "../components/prospect-card"
import Bio from "../components/bio"
import Achievements from "../components/achievements"
import SocialLinks from "../components/social-links"
import Stat from "../components/stat"
import PlayerMedia from "../components/player-media"
import VisibilityEdit from "@/components/common/visibility-edit"
import RadarChart from "@/components/common/radar"
import RadarStrength from "@/components/common/radar-strength"
import PositionMap from "@/components/common/position-map" 

export default function PlayerProfile() {
  return (
    <> 
      <section className="text-white">
        {/* visibility and customization options */}
        <Card className="flex-row items-center bg-secondary/40 px-5">
          <VisibilityEdit />
          <CommonBtn
            text="Save Changes"
            className="w-fit bg-brand px-2 font-medium text-primary hover:bg-brand"
            size={"sm"}
            variant={"default"}
          />
        </Card>

        {/* profile info */}
        <div className="mt-6 gap-6 lg:flex">
          <div className="flex-3">
            <ProspectCard />
            <Bio />
            <Achievements />
            <SocialLinks />
          </div>
          <div className="flex-7">
            {/* player stats */}
            <div className="">
              <h2 className="mb-4 text-base font-semibold text-white">
                Player Stats
              </h2>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                <Stat name="Games" count={28} />
                <Stat name="Goals" count={22} />
                <Stat name="Assists" count={15} />
                <Stat name="Yellow" count={35} />
                <Stat name="Red" count={42} />
              </div>
            </div>

            {/* Player Attributes */}
            <div className="mt-6">
              {/* stats */}
              <h2 className="mb-4 text-base font-semibold text-white">
                Player Attributes
              </h2>

              <div className="grid grid-cols-1 items-center gap-4 rounded-xl bg-secondary/30 py-1 xl:grid-cols-2">
                <RadarChart />

                <div className="px-6">
                  <RadarStrength />
                </div>
              </div>
            </div>

            {/* position mapping */}
            <div className="mt-6">
              <h2 className="mb-4 text-base font-semibold text-white">
                Position Mapping
              </h2>

              <div className="overflow-hidden rounded-xl bg-secondary/30">
                <PositionMap />
              </div>
            </div>

            {/* player medias */}
            <div className="">
              {/* player image */}
              <div className="">
                <PlayerMedia uploadLabel="Upload Image" />
              </div>

              {/* player video */}
              <div className="">
                <PlayerMedia uploadLabel="Upload Video" title="My Videos" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
