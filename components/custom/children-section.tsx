import { Icon } from "./Icon"
import CommonBtn from "../common/common-btn"
import ChildCard from "./child-card"
import AddChildCard from "./add-child-card"
import { useRouter } from "next/navigation"
import { TChield } from "@/types"
import { FiEdit, FiPlusSquare, FiShare, FiTrash } from "react-icons/fi"
import StaggeredDropDown from "../common/profile-actions"

interface ChildrenSectionProps {
  items: TChield[]
  emptyText?: string
}

 

export default function ChildrenSection({
  items,
  emptyText = "No children found.",
}: ChildrenSectionProps) {
  const router = useRouter()

  return (
    <section>
      {/* Header with Add Child Button */}
      <div className="flex items-center justify-end pb-2 ">
        <StaggeredDropDown
          label="Child actions"
          items={[
            {
              text: "Add new child",
              icon: FiPlusSquare,
              onClick: () => {router.push("?player=setup")},
            },
            {
              text: "Continue progress",
              icon: FiEdit,
              onClick: () => {router.push("?player=setup&source=progress")},
            }, 
          ]}
        />
      </div>
      {/* <div className="m-1 mb-6 flex items-center justify-end">
        <CommonBtn
          variant="outline"
          size="default"
          icon={<AddChildIcon />}
          text="Add Child"
          className="w-fit cursor-pointer bg-brand! px-2 py-1.5 text-sm font-medium text-primary hover:border-brand hover:bg-primary hover:text-primary lg:py-1 lg:text-xs xl:py-1.5 xl:text-sm"
          onClick={() => {
            router.push("?player=setup")
          }}
        />
      </div> */}

      {/* Cards Grid */}
      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
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
