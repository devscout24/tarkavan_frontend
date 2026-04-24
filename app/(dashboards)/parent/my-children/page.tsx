"use client"

import ChildrenSection from "@/components/custom/children-section"
import { Skeleton } from "@/components/ui/skeleton"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { buildAddAthleteModalParams } from "../component/build-add-athlete-modal-params"
import { useEffect, useState } from "react"
import { fetchParentChildList } from "@/components/parentAndCoachApi/api/child-list"
import { Child } from "@/components/parentAndCoachApi/type/child-list.type"

function MyChildrenPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [children, setChildren] = useState<Child[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetchParentChildList()
        if (res.status) setChildren(res.data)
        else setError(res.message || "Failed to fetch children.")
      } catch (err: any) {
        setError(err?.message || "Failed to fetch children.")
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const openAddNewChildrenModal = () => {
    const nextParams = buildAddAthleteModalParams(
      new URLSearchParams(searchParams.toString()),
      "parent"
    )
    router.replace(
      nextParams.toString() ? `${pathname}?${nextParams.toString()}` : pathname
    )
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-6 lg:flex-row lg:flex-wrap lg:items-stretch lg:justify-center xl:flex-nowrap xl:justify-start">
        {[1, 2, 3].map((i) => (
          <Skeleton
            key={i}
            className="h-[350px] w-[300px] lg:w-[260px] xl:w-[300px]"
          />
        ))}
      </div>
    )
  }

  if (error) {
    return <div className="py-8 text-center text-red-500">{error}</div>
  }

  return (
    <ChildrenSection
      items={children}
      onAddChild={openAddNewChildrenModal}
      onViewProfile={(id) => console.log("View profile:", id)}
      onInvite={(id) => console.log("Invite:", id)}
      onBlock={(id) => console.log("Block:", id)}
      onRemove={(id) => console.log("Remove:", id)}
      onGetStarted={openAddNewChildrenModal}
      emptyText="No children found. Add your first child to get started!"
    />
  )
}

export default MyChildrenPage
