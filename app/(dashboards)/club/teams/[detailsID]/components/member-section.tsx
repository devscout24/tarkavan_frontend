"use client"
import { TPlayerTeam, TTeamDetailsForClub } from "@/types/team.type"
import TeamMemberCard from "./member-card" 

type MemberSectionProps = {
  title: string
  actionText: string
  members: TPlayerTeam[]
  showPlaceholder?: boolean
  team_id: string
  allTeams: TTeamDetailsForClub[]
}

export default function MemberSection({
  title,
  actionText,
  members,
  showPlaceholder = true,
  team_id ,
  allTeams
}: MemberSectionProps) {




  return (
    <div className="space-y-3">
      <header className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-white">{title}</h2>
        <button
          type="button"
          className="text-sm font-medium text-brand hover:text-brand/90"
        >
          {actionText}
        </button>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {members.map((member) => (
          <TeamMemberCard key={member.team_player_id} member={member} allTeams={allTeams} team_id={team_id} />
        ))}

        {showPlaceholder ? (
          <div className="min-h-95 rounded-xl border border-dashed border-white/15" />
        ) : null}
      </div>
    </div>
  )
}
