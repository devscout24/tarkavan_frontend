import ChildrenSection from "@/components/custom/children-section"
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
  return (
    <ChildrenSection
      children={childrenData}
      onAddChild={() => console.log("Add child clicked")}
      onViewProfile={(id) => console.log("View profile:", id)}
      onInvite={(id) => console.log("Invite:", id)}
      onBlock={(id) => console.log("Block:", id)}
      onRemove={(id) => console.log("Remove:", id)}
      onGetStarted={() => console.log("Get started clicked")}
    />
  )
}
