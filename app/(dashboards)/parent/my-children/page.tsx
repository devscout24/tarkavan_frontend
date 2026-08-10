"use client"

import ChildrenSection from "@/components/custom/children-section"
import { useEffect, useState } from "react"
import { fetchParentChildList } from "@/components/parentAndCoachApi/api/child-list"
import { TChield } from "@/types"

function MyChildrenPage() {
  const [children, setChildren] = useState<TChield[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleFetchChildren = async () => {
      setError(null)
      try {
        const res = await fetchParentChildList()
        if (res?.status && res?.data) {
          setChildren(res.data)
        } else setError(res.message || "Failed to fetch children.")
      } catch (err: any) {
        setError(err?.message || "Failed to fetch children.")
      }
    }
    handleFetchChildren()

    const refetchData = () => {
      handleFetchChildren()
    }

    window.addEventListener("child_added", refetchData)

    return () => {
      window.removeEventListener("child_added", refetchData)
    }
  }, [])

  if (error) {
    return <div className="py-8 text-center text-red-500">{error}</div>
  }

  return (
    <ChildrenSection
      items={children}
      emptyText="No children found. Add your first child to get started!"
    />
  )
}

export default MyChildrenPage
