"use client"
import MemberSection from "./components/member-section"
import { getTeamDetails, getTeams } from "../action"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { TTeamDetails, TTeamDetailsForClub } from "@/types/team.type"
import NoData from "@/components/common/no-data"
import CoachCardForRecruitment from "./components/coach-card"

export default function ClubTeamDetailsClientPage() {
  const params = useParams()
  const team_id = params.detailsID
  const [teamDetails, setTeamDetails] = useState<TTeamDetails | null>(null)

  useEffect(() => {
    const getTeamData = async () => {
      try {
        const res = await getTeamDetails(String(team_id))
        if (
          res &&
          typeof res === "object" &&
          "success" in res &&
          res.success &&
          "data" in res
        ) {
          setTeamDetails(res.data.data)
        }
      } catch (error) {
        console.error(error)
      }
    }
    getTeamData()

    const getTeamDetailsRefetch = () => {
      getTeamData()
    }

    window.addEventListener("teamDetailsRefetch", getTeamDetailsRefetch)

    return () => {
      window.removeEventListener("teamDetailsRefetch", getTeamDetailsRefetch)
    }
  }, [team_id])

  const [allTeams, setAllTeams] = useState<TTeamDetailsForClub[]>([])

  useEffect(() => {
    const getTeamList = async () => {
      try {
        const res = await getTeams()
        if (
          res &&
          "success" in res &&
          res.success &&
          res.data &&
          "data" in res.data &&
          res.data.data
        ) {
          setAllTeams(res.data.data)
        }
      } catch (error) {
        console.error("Error fetching team data:", error)
      }
    }
    getTeamList()
  }, [])

  return (
    <div className="space-y-4 bg-[#050713]">
      {teamDetails &&
        teamDetails?.coaches.length > 0 &&
        teamDetails.coaches.map((coach) => (
          <CoachCardForRecruitment
            age={String(coach?.age)}
            experience={coach?.experience}
            location={`${coach?.city}, ${coach?.country}`}
            type={coach?.position}
            name={coach?.name}
            image={coach?.profile_image}
            team_player_id={String(coach?.team_player_id)}
            allTeams={allTeams}
            team_id={String(teamDetails?.team?.id)}
          />
        ))}

      {teamDetails && teamDetails?.players.length > 0 && (
        <MemberSection
          title="Professional Players"
          actionText="All Players"
          members={teamDetails.players}
          team_id={String(teamDetails?.team?.id)}
          allTeams={allTeams}
        />
      )}

      {teamDetails?.players.length === 0 &&
        teamDetails?.coaches.length === 0 && (
          <div className="rounded-md bg-white">
            <NoData />
          </div>
        )}
    </div>
  )
}
