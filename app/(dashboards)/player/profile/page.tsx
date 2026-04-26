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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function PlayerProfile() {
  type PlayerStats = {
    id: string
    year: string
    games: number
    goals: number
    assists: number
    yellowCards: number
    redCards: number
  }

  const demoStats: PlayerStats[] = [
    {
      id: "1",
      year: "2021",
      games: 28,
      goals: 22,
      assists: 15,
      yellowCards: 35,
      redCards: 42,
    },
    {
      id: "2",
      year: "2022",
      games: 30,
      goals: 25,
      assists: 18,
      yellowCards: 40,
      redCards: 47,
    },
    {
      id: "3",
      year: "2023",
      games: 32,
      goals: 30,
      assists: 20,
      yellowCards: 45,
      redCards: 52,
    },
    {
      id: "4",
      year: "2024",
      games: 15,
      goals: 12,
      assists: 8,
      yellowCards: 25,
      redCards: 32,
    },
    {
      id: "5",
      year: "2025",
      games: 20,
      goals: 18,
      assists: 10,
      yellowCards: 30,
      redCards: 37,
    },
  ]

  const columnBorderClass = "border-r border-white/15 last:border-r-0"

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
            <ProspectCard academyVotes={20} provincialVotes={30} />
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
                    {demoStats.map((stat) => (
                      <TableRow
                        key={stat.id}
                        className="border-t border-white/20 hover:bg-transparent"
                      >
                        <TableCell
                          className={`sticky left-0 bg-background font-medium ${columnBorderClass}`}
                        >
                          {stat.year}
                        </TableCell>
                        <TableCell className={columnBorderClass}>
                          {stat.games}
                        </TableCell>
                        <TableCell className={columnBorderClass}>
                          {stat.goals}
                        </TableCell>
                        <TableCell className={columnBorderClass}>
                          {stat.assists}
                        </TableCell>
                        <TableCell className={columnBorderClass}>
                          {stat.yellowCards}
                        </TableCell>
                        <TableCell className={columnBorderClass}>
                          {stat.redCards}
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

              <div className="grid grid-cols-1 items-center gap-4 rounded-xl bg-secondary/30 py-1 xl:grid-cols-2">
                <RadarChart />
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
