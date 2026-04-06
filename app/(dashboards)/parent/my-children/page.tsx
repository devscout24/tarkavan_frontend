"use client"

import ChildrenSection from "@/components/custom/children-section"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { buildAddAthleteModalParams } from "../component/build-add-athlete-modal-params"

const childrenData = [
  {
    id: "1",
    imageUrl: "/images/Dainel.png",
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
    imageUrl: "/images/Shaun.png",
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
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const openAddNewChildrenModal = () => {
    const nextParams = buildAddAthleteModalParams(
      new URLSearchParams(searchParams.toString()),
      "parent"
    )

    router.replace(
      nextParams.toString() ? `${pathname}?${nextParams.toString()}` : pathname
    )
  }

  return (
    <ChildrenSection
      items={childrenData}
      onAddChild={openAddNewChildrenModal}
      onViewProfile={(id) => console.log("View profile:", id)}
      onInvite={(id) => console.log("Invite:", id)}
      onBlock={(id) => console.log("Block:", id)}
      onRemove={(id) => console.log("Remove:", id)}
      onGetStarted={openAddNewChildrenModal}
    />
  )
}
