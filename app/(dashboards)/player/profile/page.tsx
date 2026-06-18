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
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getPlayerProfile } from "./action"
import { useEffect, useState } from "react"
import {
  TPlayerPosition,
  TPlayerProfile,
  TPlayerStrength,
} from "@/types/player.type"

import { Edit } from "lucide-react"
import { useRouter } from "next/navigation"
import { FiGlobe } from "react-icons/fi"
import { FaStar, FaUsers } from "react-icons/fa"
import { FiLock } from "react-icons/fi"
import { FaUser } from "react-icons/fa"
import { IconType } from "react-icons"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { BsDownload } from "react-icons/bs";
import PlayerCard from "./player-card"
import { captureAndSave } from "@/lib/captureAndSave"

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

    window.addEventListener("player_profile_updated", playerDataGet)

    return () => {
      window.removeEventListener("player_profile_updated", playerDataGet)
    }
  }, [])

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

  const privacy = playerData?.basic_info?.privacy_settings ?? "public"

  const iconMap: Record<string, IconType> = {
    public: FiGlobe,
    coach_and_team: FaUsers,
    private: FiLock,
    only_player: FaUser,
  }

  const Icon = iconMap[privacy] ?? FiGlobe

  const handleEditPlayer = () => {
    if (playerData) {
      sessionStorage.setItem(
        "go_elite_player_edit_data",
        JSON.stringify(playerData)
      )
    }

    router.push(`?update=player`)
  }

  const toYouTubeEmbedUrl = (url: string) => {
    try {
      const parsed = new URL(url)

      if (parsed.hostname.includes("youtu.be")) {
        const id = parsed.pathname.replace("/", "")
        return id ? `https://www.youtube.com/embed/${id}` : null
      }

      if (parsed.hostname.includes("youtube.com")) {
        const id = parsed.searchParams.get("v")
        if (id) return `https://www.youtube.com/embed/${id}`

        const shortsMatch = parsed.pathname.match(/\/shorts\/([^/?]+)/)
        if (shortsMatch?.[1]) {
          return `https://www.youtube.com/embed/${shortsMatch[1]}`
        }
      }
    } catch {
      return null
    }

    return null
  }

  const mergedVideoItems = [
    ...(playerData?.videos?.map((video, index) => {
      const videoUrl = typeof video === "string" ? video : video.video_url

      return {
        id: String(video.id),
        src: videoUrl,
        alt: `Video ${index + 1}`,
        type: "video" as const,
      }
    }) ?? []),
    ...(
      (playerData?.media_links ?? []) as Array<
        string | { id?: number | string; link?: string }
      >
    )
      .map((linkItem, index) => {
        const rawUrl =
          typeof linkItem === "string" ? linkItem : (linkItem.link ?? "")
        if (!rawUrl) return null

        const embedUrl = toYouTubeEmbedUrl(rawUrl)
        if (!embedUrl) return null

        return {
          id:
            typeof linkItem === "string"
              ? `media-link-${index}`
              : String(linkItem.id ?? `media-link-${index}`),
          src: embedUrl,
          alt: `Media Link ${index + 1}`,
          type: "embed" as const,
        }
      })
      .filter((item): item is NonNullable<typeof item> => Boolean(item)),
  ]

  console.log(playerData)


  return (
    <>
      <PlayerCard playerData={playerData} />
      <section className="text-white">
        {/* visibility and customization options */}
        <Card className="flex-row items-center justify-between bg-secondary/40 px-5">
          <div className="flex items-center gap-2 rounded-lg bg-brand/90 px-4 py-2 text-primary">
            <Icon className="h-4 w-4" />
            <span className="text-sm font-medium">
              Profile Visibility: {playerData?.basic_info?.privacy_settings}
            </span>
          </div>

          <div className="flex items-center gap-4"> 

            <CommonBtn
              size={"lg"}
              variant={"default"}
              onClick={()=> captureAndSave({elementId: "og_image" , fileName: "go-elite-player-profile-card.png", userId: user?.profile_id || playerData?.basic_info?.id }) }
              text="Get Profile Card"
              icon={<BsDownload />}
              className="w-fit bg-transparent px-3 text-white border border-secondary hover:bg-transparent"
            />

            <CommonBtn
              size={"lg"}
              variant={"default"}
              onClick={handleEditPlayer}
              text="Edit"
              icon={<Edit className="h-5 w-5" />}
              className="w-fit bg-brand px-3 text-primary hover:bg-brand/80"
            />
          </div>
        </Card>

        {/* profile info */}
        <div className="mt-6 gap-10 xl:flex">
          <div className="top-5 flex-[3] self-start xl:sticky">
            <ProspectCard
              academyVotes={playerData?.professional_votes}
              provincialVotes={playerData?.provencial_votes}
              basic_info={playerData?.basic_info}
              position_info={playerData?.position_info}
            />
            <Bio description={String(playerData?.basic_info?.biography)} />
            <Achievements achievements={playerData?.achievements} />
            <SocialLinks
              profileUrl="profile/player"
              facebookUrl={playerData?.basic_info?.facebook_link}
              twitterUrl={playerData?.basic_info?.twitter_link}
              whatsappUrl={playerData?.basic_info?.whatsapp_link}
            />
          </div>
          <div className="flex-7">
            {/* position mapping */}
            <div className="">
              <div className="w-full gap-2 xl:flex">
                <div className="w-full">
                  <h2 className="mt-5 mb-4 text-base font-semibold text-white xl:mt-0">
                    Player Details Table
                  </h2>
                  <div className="overflow-hidden rounded-xl! border border-secondary!">
                    <Table className="w-full">
                      <TableBody>
                        <TableRow className="border-secondary!">
                          <TableCell className="font-semibold">
                            Name :
                          </TableCell>
                          <TableCell className="text-right">
                            {playerData?.basic_info?.full_name}
                          </TableCell>
                        </TableRow>
                        <TableRow className="border-secondary!">
                          <TableCell className="font-semibold">
                            Position :
                          </TableCell>
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
                          <TableCell className="font-semibold">
                            Gender :
                          </TableCell>
                          <TableCell className="text-right capitalize">
                            {playerData?.basic_info?.gender}
                          </TableCell>
                        </TableRow>
                        <TableRow className="border-secondary!">
                          <TableCell className="font-semibold">
                            City :
                          </TableCell>
                          <TableCell className="text-right">
                            {playerData?.basic_info?.city}
                          </TableCell>
                        </TableRow>
                        <TableRow className="border-secondary!">
                          <TableCell className="font-semibold">
                            Country :
                          </TableCell>
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
                          <TableCell className="font-semibold">
                            Privacy :
                          </TableCell>
                          <TableCell className="text-right capitalize">
                            {playerData?.basic_info?.privacy_settings}
                          </TableCell>
                        </TableRow>
                        <TableRow className="border-secondary!">
                          <TableCell className="font-semibold">
                            Team :
                          </TableCell>
                          <TableCell className="text-right capitalize">
                            {playerData?.position_info?.club_team || "N/A"}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
                <div className="min-w-fit">
                  <h2 className="mt-5 mb-4 text-base font-semibold text-white xl:mt-0 xl:text-right">
                    Player Position On Map
                  </h2>
                  <div className="overflow-hidden rounded-xl">
                    <PositionMap data={mapPosition as TPlayerPosition[]} />
                  </div>
                </div>
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

                <div className="px-6 py-4">
                  <RadarStrength
                    strengths={playerData?.strengths as TPlayerStrength[]}
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
                              {playerData?.provencial_votes}
                            </span>
                          </HoverCardTrigger>
                          <HoverCardContent>
                            Provincial Team Votes:{" "}
                            {playerData?.provencial_votes} votes
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
                              {playerData?.professional_votes}
                            </span>
                          </HoverCardTrigger>
                          <HoverCardContent>
                            Professional Academy Votes:{" "}
                            {playerData?.professional_votes} votes
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
            </div>

            {/* player stats */}
            <div className="mt-6">
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
                      {Number(playerData?.player_stats?.clean_sheets) > 0 && (
                        <TableHead className={"text-primary!"}>
                          Clean Sheets
                        </TableHead>
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
            </div>

            <div>
              {/* player image */}
              <div className="">
                <PlayerMedia
                  uploadLabel="Upload Image"
                  acceptType="image"
                  items={
                    playerData?.gallery?.map((image, index) => {
                      const imageUrl =
                        typeof image === "string" ? image : image.image

                      return {
                        id: String(image.id),
                        src: imageUrl,
                        alt: `Image ${index + 1}`,
                        type: "image" as const,
                      }
                    }) ?? []
                  }
                />
              </div>

              {/* player video */}
              <div className="">
                <PlayerMedia
                  uploadLabel="Upload Video"
                  title="My Videos"
                  acceptType="video"
                  items={mergedVideoItems}
                  linkUpload={true}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
