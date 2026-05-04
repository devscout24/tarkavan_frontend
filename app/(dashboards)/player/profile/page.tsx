"use client"
import { Card } from "@/components/ui/card"
import CommonBtn from "@/components/common/common-btn"
import ProspectCard from "../components/prospect-card"
import Bio from "../components/bio"
import Achievements from "../components/achievements"
import SocialLinks from "../components/social-links"
import PlayerMedia from "../components/player-media"
import VisibilityEdit from "@/components/common/visibility-edit"
import RadarChart from "@/components/common/radar"
import RadarStrength from "@/components/common/radar-strength"
import PositionMap from "@/components/common/position-map"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getPlayerProfile } from "./action"
import { useEffect, useState } from "react"
import { TPlayerProfile } from "@/types/player.type"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Edit } from "lucide-react"
import EditPlayerAttributes from "@/components/common/player-edits/edit-player-attributes"

export default function PlayerProfile() {
  const columnBorderClass = "border-r border-white/15 last:border-r-0"
  const user = localStorage.getItem("go_elite_user")
    ? JSON.parse(localStorage.getItem("go_elite_user")!)
    : null
  const [playerData, setPlayerData] = useState<TPlayerProfile>()
  console.log(playerData)
  useEffect(() => {
    const profileData = async () => {
      try {
        const res = await getPlayerProfile(user?.profile_id)
        console.log(res)
        if (res && "success" in res && res.data && res.data.data) {
          setPlayerData(res.data.data)
        }
      } catch (error) {
        console.error(error)
      }
    }

    profileData()
  }, [])

  return (
    <>
      <section className="text-white">
        {/* visibility and customization options */}
        <Card className="flex-row items-center bg-secondary/40 px-5">
          <VisibilityEdit />

          <CommonBtn
            text="Save Changes"
            className="w-fit bg-brand px-2 font-medium text-nowrap text-primary hover:bg-brand"
            size={"sm"}
            variant={"default"}
          />

          {/* <Dialog >
            <DialogTrigger>
              <CommonBtn
                text="Save Changes"
                className="w-fit text-nowrap bg-brand px-2 font-medium text-primary hover:bg-brand"
                size={"sm"}
                variant={"default"}
              />
            </DialogTrigger>
            <DialogContent className="max-w-2xl! max-h-[90vh] overflow-y-auto bg-primary text-white ">
              <DialogHeader> 
                <DialogDescription>
                  <PlayerProfileEditForm/>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>  */}
        </Card>

        {/* profile info */}
        <div className="mt-6 gap-6 lg:flex">
          <div className="flex-3">
            <ProspectCard
              academyVotes={20}
              provincialVotes={30}
              basic_info={playerData?.basic_info}
              position_info={playerData?.position_info}
            />
            <Bio description={String(playerData?.basic_info?.biography)} />
            <Achievements achievements={playerData?.achievements} />
            <SocialLinks />
          </div>
          <div className="flex-7">
            {/* player stats */}
            <div className="">
              <h2 className="mb-4 text-base font-semibold text-white">
                Player Stats
              </h2>

              {/* <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                <Stat name="Games" count={28} />
                <Stat name="Goals" count={22} />
                <Stat name="Assists" count={15} />
                <Stat name="Yellow" count={35} />
                <Stat name="Red" count={42} />
              </div> */}

              <div className="mx-auto mt-4 max-w-[95vw] [&>div]:rounded-lg [&>div]:border">
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
                      <TableHead className={"text-primary!"}>
                        Yellow Cards
                      </TableHead>
                      <TableHead className={"text-primary!"}>
                        Red Cards
                      </TableHead>
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
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Player Attributes */}
            <div className="mt-6">
              {/* stats */}
              <h2 className="mb-4 text-base font-semibold text-white">
                Player Attributes
              </h2>

              <div className="relative grid grid-cols-1 items-center gap-4 rounded-xl bg-secondary/30 py-1 xl:grid-cols-2">
                <RadarChart strengths={playerData?.strengths} />

                <Dialog>
                  <DialogTrigger className="absolute! top-2 right-2">
                    <CommonBtn
                      size={"lg"}
                      variant={"default"}
                      onClick={() => {}}
                      text="Edit"
                      icon={<Edit className="h-5 w-5" />}
                      className=" w-fit bg-brand px-3 text-primary hover:bg-brand/80"
                    />
                  </DialogTrigger>
                  <DialogContent className="max-h-[90vh] max-w-2xl! overflow-y-auto bg-primary text-white">
                    <DialogHeader>
                      <DialogDescription>
                        <EditPlayerAttributes    />
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                <div className="px-6">
                  <RadarStrength />
                </div>
              </div>

              {/* player stars and ratings */}
              {/* <div className="mt-4">
                <h2 className="text-lg font-bold text-white">Player Ratings</h2>
                <div className="w-full gap-2"> 
                  <div className="grid grid-cols-2">
                    {provincialVotes > 0 && (
                      <HoverCard openDelay={0}>
                        <HoverCardTrigger className="relative w-fit">
                          <FaStar className="text-7xl text-yellow-500" />
                          <span className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-white">
                            {provincialVotes}
                          </span>
                        </HoverCardTrigger>
                        <HoverCardContent>
                          Provincial Team Vote: {provincialVotes} votes
                        </HoverCardContent>
                      </HoverCard>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="block h-2 w-2 rounded-full bg-yellow-500" />
                      <p className="text-white">Provincial Team</p>
                    </div>
                  </div>
 
                  <div className="grid grid-cols-2">
                    {academyVotes > 0 && (
                      <HoverCard openDelay={0}>
                        <HoverCardTrigger className="relative w-fit">
                          <FaStar className="text-7xl text-red-500" />
                          <span className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-white">
                            {academyVotes}
                          </span>
                        </HoverCardTrigger>
                        <HoverCardContent>
                          Professional Academy Vote: {academyVotes} votes
                        </HoverCardContent>
                      </HoverCard>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="block h-2 w-2 rounded-full bg-red-500" />
                      <p className="text-white">Professional Academy</p>
                    </div>
                  </div>
                </div>
              </div> */}
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
