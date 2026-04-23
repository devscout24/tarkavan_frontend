"use client"
import AddChildCard from "@/components/custom/add-child-card"
import TeamCard from "./components/team-card"
import CommonBtn from "@/components/common/common-btn"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation" 

export default function Page() {
  const teams = [
    {
      id: 1,
      title: "Elite U16 - Competitive",
      visibility: "PUBLIC",
      ageGroup: "U16",
      competitionLevel: "Development",
      players: 18,
      maxPlayers: 24,
      coaches: 2,
      image: "team1.jpg",
    },
    {
      id: 2,
      title: "Elite U14",
      visibility: "PRIVATE",
      ageGroup: "U16",
      competitionLevel: "Development",
      players: 18,
      maxPlayers: 24,
      coaches: 2,
      image: "team2.jpg",
    },
  ] 

  const router = useRouter()

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
      <div className="flex gap-6">
        {teams.map((team) => (
          <TeamCard
            key={team.id}
            teamName={team.title}
            visibility={team.visibility}
            ageGroup={team.ageGroup}
            competitionLevel={team.competitionLevel}
            playersCount={team.players}
            playersLimit={team.maxPlayers}
            coachCount={team.coaches}
            imageSrc={team.image}
            onViewTeam={() => router.push(`/club/teams/${team.id}`)}
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
