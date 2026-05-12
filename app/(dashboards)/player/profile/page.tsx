"use client"
import { Card } from "@/components/ui/card"
import CommonBtn from "@/components/common/common-btn"
import ProspectCard from "../components/prospect-card"
import Bio from "../components/bio"
import Achievements from "../components/achievements"
import SocialLinks from "../components/social-links"
import PlayerMedia from "../components/player-media" 
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
import { TPlayerPosition, TPlayerProfile, TPlayerStrength } from "@/types/player.type"
 

import { Edit } from "lucide-react" 
import { useRouter } from "next/navigation"
import { FiGlobe } from "react-icons/fi";
import { FaStar, FaUsers } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { IconType } from "react-icons";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"



export default function PlayerProfile() {
  const columnBorderClass = "border-r border-white/15 last:border-r-0"
  const user = localStorage.getItem("go_elite_user")
    ? JSON.parse(localStorage.getItem("go_elite_user")!)
    : null
  const [playerData, setPlayerData] = useState<TPlayerProfile>()
  const router = useRouter() 
  useEffect(() => {
    const profileData = async () => {
      try {
        const res = await getPlayerProfile(user?.profile_id) 
        if (res && "success" in res && res.data && res.data.data) {
          setPlayerData(res.data.data)
        }
      } catch (error) {
        console.error(error)
      }
    }

    profileData()

    const playerDataGet = () => {
      profileData()
    }

    window.addEventListener("player_profile_updated", playerDataGet);

    return () => {
      window.removeEventListener("player_profile_updated", playerDataGet);
    };


  }, [])

  const mapPosition = []
  mapPosition.push(playerData?.position_info?.primary_position)
  mapPosition.push(playerData?.position_info?.secondary_position)
  
  const privacy = playerData?.basic_info?.privacy_settings ?? "public";

  const iconMap: Record<string, IconType> = {
    public: FiGlobe,
    coach_and_team: FaUsers,
    private: FiLock,
    only_player: FaUser,
  };

  const Icon = iconMap[privacy] ?? FiGlobe;

  

  return (
    <>
      <section className="text-white">
        {/* visibility and customization options */}
        <Card className="flex-row items-center justify-between bg-secondary/40 px-5"> 

            <div className="flex items-center gap-2 rounded-lg bg-brand/90 px-4 py-2 text-primary">
              <Icon className="h-4 w-4" />
              <span className="text-sm font-medium">
                Profile Visibility: {playerData?.basic_info?.privacy_settings}
              </span>
            </div>

            <CommonBtn
               size={"lg"}
               variant={"default"}
               onClick={() => router.push(`?update=player`) }
               text="Edit"
               icon={<Edit className="h-5 w-5" />}
               className=" w-fit bg-brand px-3 text-primary hover:bg-brand/80"
            />
 
        </Card>

        {/* profile info */}
        <div className="mt-6 gap-6 lg:flex">
          <div className="flex-3">
            <ProspectCard
              academyVotes={playerData?.professional_votes}
              provincialVotes={playerData?.provencial_votes}
              basic_info={playerData?.basic_info}
              position_info={playerData?.position_info}
            />
            <Bio description={String(playerData?.basic_info?.biography)} />
            <Achievements achievements={playerData?.achievements} />
            <SocialLinks  profileUrl="profile/player" />
          </div>
          <div className="flex-7">
            {/* player stats */}
            <div className="">
              <h2 className="mb-4 text-base font-semibold text-white">
                Player Stats
              </h2> 

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

 
                <div className="px-6 py-4 ">
                  <RadarStrength strengths={playerData?.strengths as TPlayerStrength[]} />

                  {/* stars */}
                    <div className="mt-4">
                      <h2 className="text-lg font-bold text-white">
                        Player Ratings
                      </h2>
                      <div className="w-full   gap-2">
                        {/* provincial votes */}
                        <div className=" grid grid-cols-2    ">
                            <HoverCard openDelay={0}>
                              <HoverCardTrigger className="relative w-fit  ">
                                <FaStar className="text-7xl text-yellow-500" />
                                <span className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-white">
                                  {playerData?.provencial_votes}
                                </span>
                              </HoverCardTrigger>
                              <HoverCardContent>
                                Provincial Team Vote: {playerData?.provencial_votes} votes
                              </HoverCardContent>
                            </HoverCard> 
                          <div className="flex items-center gap-2">
                            <span className="block h-2 w-2 rounded-full bg-yellow-500" />
                            <p className="text-white">Provincial Team</p>
                          </div>
                        </div>

                        {/* Professional academy votes */}
                        <div className="grid grid-cols-2    ">
                            <HoverCard openDelay={0}>
                              <HoverCardTrigger className="relative w-fit  ">
                                <FaStar className="text-7xl text-red-500" />
                                <span className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-white">
                                  {playerData?.professional_votes}
                                </span>
                              </HoverCardTrigger>
                              <HoverCardContent>
                                Professional Academy Vote: {playerData?.professional_votes} votes
                              </HoverCardContent>
                            </HoverCard> 
                          <div className="flex items-center gap-2">
                            <span className="block h-2 w-2 rounded-full bg-red-500" />
                            <p className="text-white">Professional Academy</p>
                          </div>
                        </div>
                      </div>
                    </div>

                </div>
              </div> 
               
            </div>

            {/* position mapping */}
            <div className="mt-6">
              <h2 className="mb-4 text-base font-semibold text-white">
                Position Mapping
              </h2>

              <div className="overflow-hidden rounded-xl bg-secondary/30">
                <PositionMap data={mapPosition as TPlayerPosition[]}  />
              </div>
            </div>

            {/* player medias */}
            <div className="">
              {/* player image */}
              <div className="">
                <PlayerMedia uploadLabel="Upload Image" acceptType="image" /> 
              </div>

              {/* player video */}
              <div className="">
                <PlayerMedia uploadLabel="Upload Video" title="My Videos" acceptType="video" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
