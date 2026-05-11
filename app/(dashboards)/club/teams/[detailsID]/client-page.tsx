"use client"
import MemberSection from "./components/member-section"
import { type TeamMember } from "./components/member-card"
import { getTeamDetails } from "../action"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { TTeamDetails } from "@/types/team.type"
import { details } from "motion/react-client"

const coachMembers: TeamMember[] = [
  {
    id: "coach-1",
    name: "Daniell Martinez",
    age: 15,
    position: "Midfielder",
    jersey: 9,
    location: "North Toronto",
    imageSrc: "/images/Dainel.png",
    stats: { games: 18, goals: 12, assists: 6 },
  },
  {
    id: "coach-2",
    name: "Shaun Marphy",
    age: 15,
    position: "Striker",
    jersey: 9,
    location: "North Toronto",
    imageSrc: "/images/Shaun.png",
    stats: { games: 18, goals: 12, assists: 6 },
  },
]

const playerMembers: TeamMember[] = [
  {
    id: "player-1",
    name: "Daniel Martinez",
    age: 15,
    position: "Midfielder",
    jersey: 9,
    location: "North Toronto",
    imageSrc: "/images/player3.png",
    stats: { games: 18, goals: 12, assists: 6 },
  },
  {
    id: "player-2",
    name: "Shaun Marphy",
    age: 15,
    position: "Striker",
    jersey: 9,
    location: "North Toronto",
    imageSrc: "/images/player2.png",
    stats: { games: 18, goals: 12, assists: 6 },
  },
]

export default function ClubTeamDetailsClientPage() {
  const params = useParams()
  const team_id = params.detailsID
  const [teamDetails, setTeamDetails] = useState<TTeamDetails | null>(null)
  console.log(teamDetails)
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

    // const getTeamDetails = () => {
    //      getTeamData()
    // }

  }, [team_id])

  return (
    <div className="space-y-4 bg-[#050713]">
      {/* {teamDetails && teamDetails?.coaches.length > 0 && (
        <MemberSection
          title="Professional Coaches"
          actionText="All Coachs"
          members={coachMembers}
        />
      )} */}

      {teamDetails && teamDetails?.players.length > 0 && (
        <MemberSection
          title="Professional Players"
          actionText="All Players"
          members={teamDetails.players}
          team_id={String(teamDetails?.team?.id)}
        />
      )}
    </div>
  )
}
