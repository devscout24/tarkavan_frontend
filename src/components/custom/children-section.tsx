import { Icon } from "./Icon"
import CommonBtn from "../common/common-btn"
import ChildCard from "./child-card"
import AddChildCard from "./add-child-card"

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
  children: Child[]
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
          className="w-fit cursor-pointer bg-brand px-2 py-1.5 text-sm font-medium text-primary hover:border-brand hover:bg-transparent hover:text-[#ffffff]"
          onClick={onAddChild}
        />
      </div>

      {/* Cards Grid */}
      <div className="flex flex-col gap-6 md:flex-row">
        {children.map((child) => (
          <ChildCard
            key={child.id}
            imageUrl={child.imageUrl}
            name={child.name}
            age={child.age}
            position={child.position}
            jerseyNumber={child.jerseyNumber}
            location={child.location}
            isPublic={child.isPublic}
            stats={child.stats}
            onViewProfile={() => onViewProfile?.(child.id)}
            onInvite={() => onInvite?.(child.id)}
            onBlock={() => onBlock?.(child.id)}
            onRemove={() => onRemove?.(child.id)}
          />
        ))}
        <AddChildCard onGetStarted={onGetStarted} />
      </div>
    </section>
  )
}
