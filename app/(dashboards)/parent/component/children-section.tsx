import CommonBtn from "@/components/common/common-btn"
import AddChildCard from "@/components/custom/add-child-card"
import ChildCard from "@/components/custom/child-card"
import { Icon } from "@/components/custom/Icon"
import { TChield } from "@/types"

 

interface Child {
  id: string
  imageUrl: string
  name: string
  age: number
  position: string
  jerseyNumber: number
  location: string
  isPublic: boolean
  stats: {
    games: number
    goals: number
    assists: number
  }
}

interface ChildrenSectionProps {
  children: TChield[]
  onAddChild?: () => void
  onViewProfile?: (id: string) => void
  onInvite?: (id: string) => void
  onBlock?: (id: string) => void
  onRemove?: (id: string) => void
  onGetStarted?: () => void
}

const AddChildIcon = () => (
  <Icon width="16" height="16" viewBox="0 0 16 16">
    <path
      d="M8.00002 13.3392C8.55195 13.3392 8.99935 12.8918 8.99935 12.3399V9.00454H12.334C12.8857 9.00454 13.3329 8.55754 13.3333 8.00587C13.3337 7.45367 12.8861 7.00587 12.334 7.00587H8.99935V3.67123C8.99935 3.11956 8.55235 2.67224 8.00068 2.67188C7.44848 2.67152 7.00068 3.11905 7.00068 3.67123V7.00587H3.66536C3.11344 7.00587 2.66602 7.45327 2.66602 8.0052C2.66602 8.55714 3.11344 9.00454 3.66536 9.00454H7.00068V12.3399C7.00068 12.8918 7.44808 13.3392 8.00002 13.3392Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
)

export default function ChildrenSection({
  children,
  onAddChild,
  onViewProfile,
  onInvite,
  onBlock,
  onRemove,
  onGetStarted,
}: ChildrenSectionProps) {
  return (
    <section>
      {/* Header with Add Child Button */}
      <div className="m-1 mb-6 flex items-center justify-end">
        <CommonBtn
          variant="outline"
          size="default"
          icon={<AddChildIcon />}
          text="Add Child"
          className="w-fit cursor-pointer bg-brand px-2 py-1.5 text-sm font-medium text-primary hover:border-brand hover:bg-transparent hover:text-[#ffffff] lg:py-1 lg:text-xs xl:py-1.5 xl:text-sm"
          onClick={onAddChild}
        />
      </div>

      {/* Cards Grid */}
      <div className="flex flex-col items-center gap-6 lg:flex-row lg:flex-wrap lg:items-stretch lg:justify-center xl:flex-nowrap xl:justify-start">
        {children.map((child) => (
          <ChildCard
            key={child.id}
            id={String(child.id)}
            user_id={String(child.user_id)}
            imageUrl={child?.profile_picture}
            name={child.name}
            age={child.age}
            position={child?.primary_position?.name}
            jerseyNumber={String(child?.jersey_number)}
            location={`${child?.city}, ${child?.country}`}
            stats={{
              games: child?.tolal_played_games || 0,
              goals: child?.goals || 0,
              assists: child?.assist || 0,
            }}
            invitation_status={child?.invitation_status}
            privacy_settings={child?.privacy_settings}
            block_status={child?.block_status}
            parentalControl={child?.parent_control}
          />
        ))}
        <AddChildCard   />
      </div>
    </section>
  )
}
