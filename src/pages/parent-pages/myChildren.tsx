import ChildrenSection from "@/components/custom/children-section"
import { useSearchParams } from "react-router"
import danielImage from "../../../public/images/Dainel.png"
import shaunImage from "../../../public/images/Shaun.png"

const childrenData = [
  {
    id: "1",
    imageUrl: danielImage,
    name: "Daniel Martinez",
    age: 15,
    position: "Midfielder",
    jerseyNumber: 9,
    location: "North Toronto",
    isPublic: true,
    stats: { games: 18, goals: 12, assists: 6 },
  },
  {
    id: "2",
    imageUrl: shaunImage,
    name: "Shaun Marphy",
    age: 15,
    position: "Striker",
    jerseyNumber: 9,
    location: "North Toronto",
    isPublic: false,
    stats: { games: 18, goals: 12, assists: 6 },
  },
]

export default function MyChildren() {
  const [searchParams, setSearchParams] = useSearchParams()

  const openAddNewChildrenModal = () => {
    searchParams.set("addNewChildren", "coreIdentity")
    setSearchParams(searchParams)
  }

  return (
    <ChildrenSection
      children={childrenData}
      onAddChild={openAddNewChildrenModal}
      onViewProfile={(id) => console.log("View profile:", id)}
      onInvite={(id) => console.log("Invite:", id)}
      onBlock={(id) => console.log("Block:", id)}
      onRemove={(id) => console.log("Remove:", id)}
      onGetStarted={openAddNewChildrenModal}
    />
  )
}
