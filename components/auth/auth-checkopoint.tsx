"use client"
import Loader from "@/components/common/loader"
import isValidToken from "@/lib/isValid-token"
import { TUser } from "@/types"
import { usePathname, useRouter } from "next/navigation"
import React, { useEffect, useMemo, useState } from "react"

type Props = {
  children: React.ReactNode
  role: string
}

export default function AuthCheckPoint({ children, role }: Props) {
  const router = useRouter()
  const pathname = usePathname()
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
    const check = () => {
      try {
        const token = window.localStorage.getItem("go_elite_token") 

        if (
          !token ||
          !isValidToken(token) ||
          !user ||
          !user.email ||
          !user.role
        ) {
          router.replace("/auth")
          return
        }

        if (user.role !== role) {
          router.replace(`/${user.role}`)
          return
        }

        const pendingRedirect =
          role === "coach"
            ? "/coach?coach=profile-setup"
            : role === "club"
              ? "/club?club=profile-setup"
              : null

        if (user.status === "pending" && pendingRedirect) {
          const isAllowedPath = pathname === `/${role}`
          const requiredQuery = `${role}=profile-setup`
          const hasRequiredQuery =
            window.location.search.includes(requiredQuery)

          // Pending coach/club users can only continue on their profile-setup route.
          if (!isAllowedPath || !hasRequiredQuery) {
            router.replace(pendingRedirect)
            return
          }
        }

        setIsChecking(false)
      } catch (error) {
        console.error("Auth check error:", error)
        router.replace("/auth")
      }
    }
    check()
  }, [pathname, router, role, user])

  if (isChecking) {
    return <Loader />
  }

  return <>{children}</>
}
