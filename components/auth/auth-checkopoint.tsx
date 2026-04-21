"use client"
import Loader from "@/components/common/loader"
import isValidToken from "@/lib/isValid-token"
import { TUser } from "@/types"
import { useRouter } from "next/navigation"
import React, { useEffect, useMemo, useState } from "react"

type Props = {
  children: React.ReactNode
  role: string
}

export default function AuthCheckPoint({ children, role }: Props) {
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)
  const user = useMemo<TUser | null>(() => {
    if (typeof window === "undefined") {
      return null
    }

    try {
      const rawUser = window.localStorage.getItem("go_elite_user")
      return rawUser ? JSON.parse(rawUser) : null
    } catch {
      return null
    }
  }, [])

  useEffect(() => {
    const check = async () => {
      try {
        const token = window.localStorage.getItem("go_elite_token")

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
  }, [router, role, user])

  // Redirect pending accounts to their setup flow.
  useEffect(() => {
    if (!user || user.status !== "pending") {
      return
    }

    if (role === "coach") {
      router.replace("/coach?coach=profile-setup")
      return
    }

    if (role === "club") {
      router.replace("/club?club=profile-setup")
    }
  }, [user, role, router])

  if (isChecking) {
    return <Loader />
  }

  return <>{children}</>
}
