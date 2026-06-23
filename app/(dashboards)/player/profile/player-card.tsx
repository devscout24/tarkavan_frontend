import { TPlayerPosition, TPlayerProfile, TPlayerStrength } from "@/types"
import ProspectCard from "../components/prospect-card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import PositionMap from "@/components/common/position-map"
import Achievements from "../components/achievements"
// import SocialLinks from "../components/social-links"
import RadarChart from "@/components/common/radar"
import RadarStrength from "@/components/common/radar-strength"
import Logo from "@/components/common/logo"
import Bio from "../components/bio"

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
  const columnBorderClass = "border-r border-white/15 last:border-r-0"
 

  return (
    <div
      id="og_image"
      className="fixed top-0 left-0 -z-50 w-250 rounded-lg border border-brand bg-black p-2"
    >
      <div className="flex items-center justify-center border-b border-brand py-4">
        <Logo />
      </div>

      <div className="mt-2 flex gap-2">
        {/* left */}
        <div className="flex-2">
          <div className="-mt-7 scale-y-90">
            <ProspectCard
              academyVotes={playerData?.professional_votes}
              provincialVotes={playerData?.provencial_votes}
              basic_info={playerData?.basic_info}
              position_info={playerData?.position_info}
            />
          </div>
          <div className="-mt-5">
            <RadarStrength
              strengths={playerData?.strengths as TPlayerStrength[]}
            />
          </div>
          <div className="-mt-4">
            <Achievements achievements={playerData?.achievements} />
          </div>

          {/* <div className="-my-4">
            <SocialLinks
              profileUrl="profile/player"
              facebookUrl={playerData?.basic_info?.facebook_link}
              twitterUrl={playerData?.basic_info?.twitter_link}
              whatsappUrl={playerData?.basic_info?.whatsapp_link}
            />
          </div> */}
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

      <div className="mx-auto mt-2 max-w-[95vw] [&>div]:rounded-lg [&>div]:border">
        <Table>
          <TableHeader>
            <TableRow className="bg-brand hover:bg-brand">
              <TableHead
                className={`sticky left-0 z-10 bg-brand ${columnBorderClass} text-primary!`}
              >
                Year
              </TableHead>
              <TableHead className={"text-primary!"}>Games</TableHead>
              <TableHead className={"text-primary!"}>Goals</TableHead>
              <TableHead className={"text-primary!"}>Assists</TableHead>
              <TableHead className={"text-primary!"}>Yellow Cards</TableHead>
              <TableHead className={"text-primary!"}>Red Cards</TableHead>
              {Number(playerData?.player_stats?.clean_sheets) > 0 && (
                <TableHead className={"text-primary!"}>Clean Sheets</TableHead>
              )}
              {Number(playerData?.player_stats?.total_saves) > 0 && (
                <TableHead className={"text-primary!"}>
                  Total Penalties Saved
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {playerData?.season_stats_last_five_years?.map((stat) => (
              <TableRow
                key={stat.season_year}
                className="border-t border-white/20 hover:bg-transparent"
              >
                <TableCell
                  className={`sticky left-0 bg-background font-medium ${columnBorderClass}`}
                >
                  {stat.season_year}
                </TableCell>
                <TableCell className={columnBorderClass}>
                  {stat.total_played_games}
                </TableCell>
                <TableCell className={columnBorderClass}>
                  {stat.goals}
                </TableCell>
                <TableCell className={columnBorderClass}>
                  {stat.assist}
                </TableCell>
                <TableCell className={columnBorderClass}>
                  {stat.yellow_cards}
                </TableCell>
                <TableCell className={columnBorderClass}>
                  {stat.red_cards}
                </TableCell>
                {Number(playerData?.player_stats?.clean_sheets) > 0 && (
                  <TableCell className={columnBorderClass}>
                    {stat.clean_sheets}
                  </TableCell>
                )}
                {Number(playerData?.player_stats?.total_saves) > 0 && (
                  <TableCell className={columnBorderClass}>
                    {stat.total_saves}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Bio description={String(playerData?.basic_info?.biography)} />

    </div>
  )
}
