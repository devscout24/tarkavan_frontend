"use client"

import Logo from "@/components/common/logo"
import RadarChart from "@/components/common/radar"
import RadarStrength from "@/components/common/radar-strength"
import PositionMap from "@/components/common/position-map"
import QRCode from "@/components/common/qr-code"
import { FaFacebookF, FaStar } from "react-icons/fa"
import { IoLogoInstagram } from "react-icons/io5"
import { FaTiktok } from "react-icons/fa6"
import { FaXTwitter } from "react-icons/fa6"
import { IoLogoWhatsapp } from "react-icons/io5"
import Nav from "@/components/common/nav"
import Footer from "@/components/common/footer"
import CommonBtn from "@/components/common/common-btn"
import { useEffect, useState } from "react"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import ProfileCard from "../../../components/profile-card"
import BIO from "../../../components/bio"
import {
  TPlayerBasicInfo,
  TPlayerPosition,
  TPlayerPositionInfo,
  TPlayerProfile,
  TPlayerStrength,
} from "@/types"
import Achievements from "@/app/(dashboards)/player/components/achievements"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { storeVote } from "../../../action"
// Inline type definitions for profile data

interface ProfilePageProps {
  data: TPlayerProfile
}

export default function ProfilePage({ data }: ProfilePageProps) {
  const [loadPage, setLoadPage] = useState(false)

  const [teamVoted, setTeamVoted] = useState(false)
  const [academyVoted, setAcademyVoted] = useState(false)
  const [loading, setLoading] = useState({
    team: false,
    academy: false,
  })

  const mapPosition = []
  mapPosition.push(data?.position_info?.primary_position)
  mapPosition.push(data?.position_info?.secondary_position)
  const columnBorderClass = "border-r border-white/15 last:border-r-0"

  const handleVote = async (type: "team" | "academy") => {
    try {
      const formData = new FormData()

      const res = await storeVote(formData)
    } catch (err) {
      console.error("Error voting:", err)
    }
  }

  return (
    <>
      <Nav />
      <div
        className="bg-primary px-8 pt-24 pb-16"
        style={{
          backgroundImage: `url("/images/profilebg.png")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        id="og_image"
      >
        <div className="flex flex-col items-center justify-center">
          <Logo className="w-full max-w-111.25!" />
          <div className="mt-15 h-1 w-full bg-brand" />

          <div className="mt-8 grid w-full grid-cols-1 gap-6 md:grid-cols-2">
            {/* left */}
            <div className="">
              <ProfileCard
                academyVotes={data?.professional_votes || 0}
                provincialVotes={data?.provencial_votes || 0}
                basic_info={data?.basic_info as TPlayerBasicInfo}
                position_info={data?.position_info as TPlayerPositionInfo}
              />
              <Achievements achievements={data?.achievements} />

              <div className="mt-6 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-brand p-7">
                <div className="">
                  <h2 className="text-[24px] font-semibold text-white">
                    Watch Highlights
                  </h2>
                  <ul className="mt-8.5 flex gap-7.5 rounded-lg bg-white/20 p-4 text-2xl text-white">
                    <a
                      href="http://example.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFacebookF />
                    </a>
                    <a
                      href="http://example.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IoLogoInstagram />
                    </a>
                    <a
                      href="http://example.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaTiktok />
                    </a>
                    <a
                      href="http://example.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaXTwitter />
                    </a>
                    <a
                      href="http://example.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IoLogoWhatsapp />
                    </a>
                  </ul>
                </div>
                <QRCode link="profile/123" />
              </div>
              <BIO description={String(data?.basic_info?.biography)} />
            </div>

            {/* right */}
            <div className="">
              {/* player stats */}
              <div className="rounded-lg border-2 border-brand p-5">
                <h2 className="text-[24px] font-semibold text-white">
                  Player Stats
                </h2>

                <div className="mx-auto mt-4 max-w-[95vw] [&>div]:rounded-lg [&>div]:border">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-brand hover:bg-brand">
                        <TableHead
                          className={`sticky left-0 z-10 bg-brand ${columnBorderClass} font-semibold text-primary!`}
                        >
                          Year
                        </TableHead>
                        <TableHead className={"font-semibold text-primary!"}>
                          Games
                        </TableHead>
                        <TableHead className={"font-semibold text-primary!"}>
                          Goals
                        </TableHead>
                        <TableHead className={"font-semibold text-primary!"}>
                          Assists
                        </TableHead>
                        <TableHead className={"font-semibold text-primary!"}>
                          Yellow Cards
                        </TableHead>
                        <TableHead className={"font-semibold text-primary!"}>
                          Red Cards
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="text-white">
                      {data?.season_stats_last_five_years?.map((stat, i) => (
                        <TableRow
                          key={i}
                          className="border-t border-white/20 hover:bg-transparent"
                        >
                          <TableCell
                            className={`sticky left-0 bg-transparent font-medium ${columnBorderClass}`}
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

              {/*  */}
              {/* Player Attributes */}
              <div className="mt-6">
                {/* stats */}
                <h2 className="mb-4 text-base font-semibold text-white">
                  Player Attributes
                </h2>

                <div className="grid grid-cols-1 items-center gap-4 rounded-xl bg-secondary/30 py-1 xl:grid-cols-2">
                  <RadarChart
                    strengths={data?.strengths as TPlayerStrength[]}
                  />

                  <div className="px-6 py-4">
                    <RadarStrength
                      strengths={data?.strengths as TPlayerStrength[]}
                      isPublic={true}
                    />

                    {/* stars */}
                    <div className="mt-4">
                      <h2 className="text-lg font-bold text-white">
                        Player Ratings
                      </h2>
                      <div className="w-full gap-2">
                        {/* provincial votes */}
                        <div className="grid grid-cols-2">
                          <HoverCard openDelay={0}>
                            <HoverCardTrigger className="relative w-fit">
                              <FaStar className="text-7xl text-yellow-500" />
                              <span className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-white">
                                {data?.professional_votes || 0}
                              </span>
                            </HoverCardTrigger>
                            <HoverCardContent>
                              Provincial Team Votes:{" "}
                              {data?.provencial_votes || 0} votes
                            </HoverCardContent>
                          </HoverCard>
                          <div className="flex items-center gap-2">
                            <span className="block h-2 w-2 rounded-full bg-yellow-500" />
                            <p className="text-white">Provincial Team Votes</p>
                          </div>
                        </div>

                        {/* Professional Academy Votess */}
                        <div className="grid grid-cols-2">
                          <HoverCard openDelay={0}>
                            <HoverCardTrigger className="relative w-fit">
                              <FaStar className="text-7xl text-red-500" />
                              <span className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-white">
                                {data?.professional_votes || 0}
                              </span>
                            </HoverCardTrigger>
                            <HoverCardContent>
                              Professional Academy Votes:{" "}
                              {data?.professional_votes || 0} votes
                            </HoverCardContent>
                          </HoverCard>
                          <div className="flex items-center gap-2">
                            <span className="block h-2 w-2 rounded-full bg-red-500" />
                            <p className="text-white">
                              Professional Academy Votes
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* position map */}
                <div className="mt-6 overflow-hidden rounded-2xl border border-brand">
                  <PositionMap data={mapPosition as TPlayerPosition[]} />
                </div>
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 mt-10 flex w-full flex-wrap justify-center gap-10 py-5 backdrop-blur-md">
            <CommonBtn
              size={"lg"}
              variant={"default"}
              text={teamVoted ? "Voted" : " Provincial Team Votes"}
              className="w-fit cursor-pointer bg-yellow-500 px-10 text-primary hover:bg-yellow-500/80 hover:text-primary"
              onClick={() => {
                setLoading((prev) => ({ ...prev, team: true }))
                setTimeout(() => {
                  setTeamVoted((prev) => !prev)
                  setLoading((prev) => ({ ...prev, team: false }))
                }, 2000)
              }}
              isLoading={loading.team}
            />
            <CommonBtn
              size={"lg"}
              variant={"default"}
              text={academyVoted ? "Voted" : "Professional Academy Votes"}
              className="w-fit cursor-pointer bg-red-500 px-10 text-primary hover:bg-red-500/80 hover:text-primary"
              onClick={() => handleVote("academy")}
              isLoading={loading.academy}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
