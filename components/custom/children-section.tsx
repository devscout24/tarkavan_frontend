import { Icon } from "./Icon"
import CommonBtn from "../common/common-btn"
import ChildCard from "./child-card"
import AddChildCard from "./add-child-card"
import { useRouter } from "next/navigation" 
import { TChield } from "@/types"


interface ChildrenSectionProps {
  items: TChield[] 
  emptyText?: string
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
  items,   
  emptyText = "No children found.",
}: ChildrenSectionProps) {
  const router = useRouter()

  console.log("ChildrenSection items:", items) // Debugging line
  

 
  return (
    <section>
      {/* Header with Add Child Button */}
      <div className="m-1 mb-6 flex items-center justify-end">
        <CommonBtn
          variant="outline"
          size="default"
          icon={<AddChildIcon />}
          text="Add Child"
          className="w-fit cursor-pointer bg-brand! px-2 py-1.5 text-sm font-medium text-primary hover:border-brand hover:bg-primary hover:text-primary lg:py-1 lg:text-xs xl:py-1.5 xl:text-sm"
          onClick={() => { 
            router.push("?player=setup")}
          }
        />
      </div>

      {/* Cards Grid */}
      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 ">
        {items.length === 0 ? (
          <div className="flex w-full flex-col items-center justify-center py-12">
            <p className="mb-4 text-lg text-white/80">{emptyText}</p>
            <AddChildCard />
          </div>
        ) : (
          <>
            {items.map((child) => (
              <ChildCard
                key={child?.id}
                id={String(child?.id)}
                block_status={child?.block_status}
                invitation_status={child?.invitation_status}
                imageUrl={child?.profile_picture} 
                name={`${child?.name} ${child?.last_name}`}
                age={child?.age}
                position={child?.primary_position?.name}
                jerseyNumber={String(child?.jersey_number)}
                location={`${child?.city}, ${child?.country}`}
                privacy_settings={child?.privacy_settings}
                parentalControl={child?.parent_control}
                stats={{
                  games: child?.tolal_played_games,
                  goals: child?.goals,
                  assists: child?.assist,
                }} 
                user_id={String(child?.user_id)}
              />
            ))}
            {/* <AddChildCard /> */}
          </>
        )}
      </div>
    </section>
  )
}
