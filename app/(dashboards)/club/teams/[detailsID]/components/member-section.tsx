import TeamMemberCard, { type TeamMember } from "./member-card"

type MemberSectionProps = {
  title: string
  actionText: string
  members: TeamMember[]
  showPlaceholder?: boolean
}

export default function MemberSection({
  title,
  actionText,
  members,
  showPlaceholder = true,
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
          <TeamMemberCard key={member.id} member={member} />
        ))}

        {showPlaceholder ? (
          <div className="min-h-95 rounded-xl border border-dashed border-white/15" />
        ) : null}
      </div>
    </div>
  )
}
