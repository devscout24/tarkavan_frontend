import {
  TPlayerBasicInfo,
  TPlayerPosition,
  TPlayerPositionInfo,
  TPlayerProfile,
  TPlayerStrength,
} from "@/types"
import ProspectCard from "../components/prospect-card"
import {
  Table,
  TableBody,
  TableCell,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import PositionMap from "@/components/common/position-map"
import Achievements from "../components/achievements"
import SocialLinks from "../components/social-links"
import RadarChart from "@/components/common/radar"
import RadarStrength from "@/components/common/radar-strength"
import { useEffect, useState } from "react"
import { toPng } from "html-to-image"
import { setPlayerOG } from "../../action"
import Logo from "@/components/common/logo"

export default function PlayerCard({
  playerData,
}: {
  playerData?: TPlayerProfile
}) {
  const mapPosition = []
  const primaryPosition = {
    ...playerData?.position_info?.primary_position,
    type: "Primary",
  }
  const secondaryPosition = {
    ...playerData?.position_info?.secondary_position,
    type: "Secondary",
  }
  mapPosition.push(primaryPosition)
  mapPosition.push(secondaryPosition)

 

  return (
    <div  id="og_image" className="fixed top-0 left-0 -z-50 w-250 rounded-lg border border-brand bg-black p-2">
      <div className="py-4 flex items-center justify-center border-b border-brand ">
        <Logo />
      </div>

      <div className="flex gap-2 mt-2">
        {/* left */}
        <div className="flex-2">
          <div className="-mt-21.5 scale-y-70">
            <ProspectCard
              academyVotes={playerData?.professional_votes}
              provincialVotes={playerData?.provencial_votes}
              basic_info={playerData?.basic_info}
              position_info={playerData?.position_info}
            />
          </div>
          <div className="-mt-19">
            <RadarStrength
              strengths={playerData?.strengths as TPlayerStrength[]}
            />
          </div>
          <div className="-mt-4">
            <Achievements achievements={playerData?.achievements} />
          </div>

          <div className="-my-4">
            <SocialLinks
              profileUrl="profile/player"
              facebookUrl={playerData?.basic_info?.facebook_link}
              twitterUrl={playerData?.basic_info?.twitter_link}
              whatsappUrl={playerData?.basic_info?.whatsapp_link}
            />
          </div>
        </div>

        {/* right */}
        <div className="flex-3">
          {/* player details */}
          <div className="w-full">
            <div className="overflow-hidden rounded-xl! border border-secondary! text-white">
              <Table className="w-full">
                <TableBody>
                  <TableRow className="border-secondary!">
                    <TableCell className="font-semibold">Name :</TableCell>
                    <TableCell className="text-right">
                      {playerData?.basic_info?.full_name}
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-secondary!">
                    <TableCell className="font-semibold">Position :</TableCell>
                    <TableCell className="text-right">
                      {playerData?.position_info?.primary_position?.name}
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-secondary!">
                    <TableCell className="font-semibold">Age :</TableCell>
                    <TableCell className="text-right">
                      {playerData?.basic_info?.age}
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-secondary!">
                    <TableCell className="font-semibold">Gender :</TableCell>
                    <TableCell className="text-right capitalize">
                      {playerData?.basic_info?.gender}
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-secondary!">
                    <TableCell className="font-semibold">City :</TableCell>
                    <TableCell className="text-right">
                      {playerData?.basic_info?.city}
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-secondary!">
                    <TableCell className="font-semibold">Country :</TableCell>
                    <TableCell className="text-right">
                      {playerData?.basic_info?.country}
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-secondary!">
                    <TableCell className="font-semibold">
                      Dominant Foot :
                    </TableCell>
                    <TableCell className="text-right capitalize">
                      {playerData?.position_info?.dominant_foot}
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-secondary!">
                    <TableCell className="font-semibold">Privacy :</TableCell>
                    <TableCell className="text-right capitalize">
                      {playerData?.basic_info?.privacy_settings}
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-secondary!">
                    <TableCell className="font-semibold">Team :</TableCell>
                    <TableCell className="text-right capitalize">
                      {playerData?.position_info?.club_team || "N/A"}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          {/* map */}
          <div className="mt-2">
            <PositionMap
              size="responsive"
              data={mapPosition as TPlayerPosition[]}
            />
          </div>

          {/* Player Attributes */}
          <div className="mt-3.5">
            <div className="relative flex justify-center gap-4 rounded-xl bg-secondary/30 py-1">
              <RadarChart strengths={playerData?.strengths} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
