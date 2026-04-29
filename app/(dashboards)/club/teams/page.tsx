"use client"
import AddChildCard from "@/components/custom/add-child-card"
import TeamCard from "./components/team-card"
import CommonBtn from "@/components/common/common-btn"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { getTeams } from "./action"

type Team = {
  id: number
  club_id: number
  name: string
  age_group: string
  image: string
  competition_level_id: number
  competition_level: {
    id: number
    name: string
  }
  created_at: string
  updated_at: string
  total_players: number
  total_coaches: number
}

export default function Page() {
  const [teams, setTeams] = useState<Team[]>([])
  const router = useRouter()

  const fetchTeams = useCallback(async () => {
    try {
      const res = await getTeams()
      

      if (
        res &&
        typeof res === "object" &&
        "success" in res &&
        res.success &&
        "data" in res
      ) {
        const typedRes = res as { success: true; data: { data: Team[] } }
        if (typedRes.data && typedRes.data.data) {
          setTeams(typedRes.data.data)
        }
      }
    } catch (err) {
      console.error("Error fetching teams data:", err)
    }
  }, [])

  useEffect(() => {
    const loadInitialTeams = async () => {
      await fetchTeams()
    }
    loadInitialTeams()

    window.addEventListener("refetch:teams", fetchTeams)
    return () => window.removeEventListener("refetch:teams", fetchTeams)
  }, [fetchTeams])

  return (
    <section>
      <div className="flex justify-end">
        <CommonBtn
          size={"lg"}
          variant={"default"}
          className="mr-2 w-fit bg-brand px-3 text-primary hover:bg-brand hover:text-primary"
          text="Add Team"
          icon={<Plus />}
          onClick={() => router.push("?add-new=team")}
        />
      </div>
      <div className="mt-4 flex flex-wrap gap-6">
        {teams.map((team) => (
          <TeamCard
            key={team.id}
            teamId={team.id.toString()}
            teamName={team.name}
            visibility="PUBLIC"
            ageGroup={`U${team.age_group}`}
            competitionLevel={team.competition_level.name}
            playersCount={team.total_players}
            playersLimit={24}
            coachCount={team.total_coaches}
            imageSrc={team.image}
            onViewTeam={() => router.push(`/club/teams/${team.id}`)}
            onDeleteTeam={() => {
              fetchTeams()
            }}
          />
        ))}

        <AddChildCard
          title="Add Team"
          text="Add a team for  U4/U5, U6/U7, U8, U9, U10, U11, U12, U13, U14, U15, U16, U17, U18."
          onGetStarted={() => router.push("?add-new=team")}
        />
      </div>
    </section>
  )
}
