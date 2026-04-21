"use client"
import Loader from "@/components/common/loader"
import { TUser } from "@/types"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"

type Props = {
  children: React.ReactNode
  role: string
}

export default function AuthCheckPoint({ children , role }: Props) {
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const check = async () => {
      try {
        const token = localStorage.getItem("go_elite_token")
        const user: TUser | null  = localStorage.getItem("go_elite_user") ? JSON.parse(localStorage.getItem("go_elite_user") || "") : null

        if (!token || !user || !user.email || !user.role) {
          router.replace("/auth")
          return
        }

        if (user.role !== role) {
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
  }, [router, role])

  if (isChecking) {
    return <Loader />
  }

  return <>{children}</>
}
