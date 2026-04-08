import MemberSection from "./components/member-section"
import { type TeamMember } from "./components/member-card"

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

export default function Page() {
  return (
    <div className="space-y-4 bg-[#050713] ">
      <MemberSection
        title="Professional Coaches"
        actionText="All Coachs"
        members={coachMembers}
      />

      <MemberSection
        title="Professional Players"
        actionText="All Players"
        members={playerMembers}
      />
    </div>
  )
}
