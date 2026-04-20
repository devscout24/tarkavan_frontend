"use client"
import Loader from "@/components/common/loader/loader"
import { TUser } from "@/types"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"

type Props = {
  children: React.ReactNode
}

export default function CheckParentAuth({ children }: Props) {
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)
 

  useEffect(() => {
    const check = async () => {
      try {
        const token = localStorage.getItem("go_elite_token")
        const userRaw = localStorage.getItem("go_elite_user")

        const user: TUser | null = userRaw ? JSON.parse(userRaw) : null

        if (!token || !user || !user.email || !user.role) {
          router.replace("/auth")
          return
        }

        if (user.role !== "parent") {
          router.replace(`/${user.role}`)
          return
        }
        setIsChecking(false)
      } catch (error) {
        console.error("Auth check error:", error)
        router.replace("/auth")
      }
    }
    check()
  }, [router])

  if (isChecking) {
    return <Loader/> 
  }

  return <>{children}</>
}
