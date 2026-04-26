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
import { useState } from "react"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import ProfileCard from "../../components/profile-card"
import Achievement from "../../components/achivement" 
import BIO from "../../components/bio"
import StatCard from "../../components/stat-card"
// Inline type definitions for profile data
interface BasicInfo {
  id: number
  name: string
  last_name: string
  full_name: string
  dob: string
  age: number
  gender: string
  nationality: string
  email: string
  image: string | null
  biography: string
  privacy_settings: string
  sports: string
  sport_option_id: number | null
  sport_option: unknown
}

interface PositionInfo {
  primary_position: string | null
  secondary_position: string | null
  jersey_number: number
  dominant_foot: string
  club_team: string
  sports_selection: string
}

interface PlayerStats {
  total_matches: number
  total_played_time: number
  goals: number
  assists: number
  yellow_cards: number
  red_cards: number
  clean_sheets: number
  total_saves: number
}

interface Strength {
  id: number
  strength_type: string
  strength_name: string
  endorse_count: number
  endorsed: boolean
}

interface Achievement {
  id: number
  title: string
  description: string
  date_earned: string
  image: string | null
}

interface Video {
  id: number
  video_url: string
  status: string
  uploaded_at: string
}

interface SeasonStats {
  season_year: number
  total_played_games: number
  total_played_time: number
  goals: number
  assist: number
  yellow_cards: number
  red_cards: number
  clean_sheets: number
  total_saves: number
  penalty_saves: number
}

interface ProfileData {
  basic_info: BasicInfo
  position_info: PositionInfo
  player_stats: PlayerStats
  strengths: Strength[]
  achievements: Achievement[]
  gallery: string[]
  videos: Video[]
  media_links: string[]
  season_stats_last_five_years: SeasonStats[]
}

interface ProfilePageProps {
  data: ProfileData | null
}

export default function ProfilePage({ data }: ProfilePageProps) {
  const [teamVoted, setTeamVoted] = useState(false)
  const [academyVoted, setAcademyVoted] = useState(false)
  const [loading, setLoading] = useState({
    team: false,
    academy: false,
  })
  const provincialVotes = 7
  const academyVotes = 12
 

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
      >
        <div className="flex flex-col items-center justify-center">
          <Logo className="w-full max-w-111.25!" />
          <div className="mt-15 h-1 w-full bg-brand" />

          <div className="mt-8 grid w-full grid-cols-1 gap-6 md:grid-cols-2">
            {/* left */}
            <div className="">
              <ProfileCard academyVotes={12} provincialVotes={7} basic_info={data?.basic_info}  />
              <Achievement />

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
            </div>

            {/* right */}
            <div className="">
              {/* player stats */}
              <div className="rounded-lg border-2 border-brand p-5">
                <h2 className="text-[24px] font-semibold text-white">
                  Player Stats
                </h2>
                <div className="mt-4 flex flex-wrap justify-between gap-2">
                  <StatCard title="Games" text="30" />
                  {/* <StatCard title="Minutes Played" text="35" /> */}
                  <StatCard title="Goals" text="22" />
                  <StatCard title="Asists" text="08" />
                  <StatCard title="Yellow" text="08" />
                  <StatCard title="Red" text="01" />
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
                  <RadarChart />

                  <div className="px-6">
                    <RadarStrength />

                    {/* stars */}
                    <div className="mt-4">
                      <h2 className="text-lg font-bold text-white">
                        Player Ratings
                      </h2>
                      <div className="w-full   gap-2">
                        {/* provincial votes */}
                        <div className=" grid grid-cols-2    ">
                          {provincialVotes > 0 && (
                            <HoverCard openDelay={0}>
                              <HoverCardTrigger className="relative w-fit  ">
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

                        {/* Professional academy votes */}
                        <div className="grid grid-cols-2    ">
                          {academyVotes > 0 && (
                            <HoverCard openDelay={0}>
                              <HoverCardTrigger className="relative w-fit  ">
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
                    </div>
                  </div>
                </div>

                {/* position map */}
                <div className="mt-6 overflow-hidden rounded-2xl border border-brand">
                  <PositionMap />
                </div>
              </div>
            </div>
          </div>

          <BIO />

          <div className="sticky bottom-0 mt-10 flex w-full flex-wrap justify-center gap-10 py-5 backdrop-blur-md">
            <CommonBtn
              size={"lg"}
              variant={"default"}
              text={teamVoted ? "Voted" : "Provincial Team Vote"}
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
              text={academyVoted ? "Voted" : "Professional Academy Vote"}
              className="w-fit cursor-pointer bg-red-500 px-10 text-primary hover:bg-red-500/80 hover:text-primary"
              onClick={() => {
                setLoading((prev) => ({ ...prev, academy: true }))
                setTimeout(() => {
                  setAcademyVoted((prev) => !prev)
                  setLoading((prev) => ({ ...prev, academy: false }))
                }, 2000)
              }}
              isLoading={loading.academy}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
