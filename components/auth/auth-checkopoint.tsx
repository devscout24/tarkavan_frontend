"use client"
import Loader from "@/components/common/loader"
import isValidToken from "@/lib/isValid-token"
import { TUser } from "@/types"
import { usePathname, useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"

type Props = {
  children: React.ReactNode
  role: string
}

export default function AuthCheckPoint({ children, role }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const check = () => {
      try {
        const token = window.localStorage.getItem("go_elite_token")
        const rawUser = window.localStorage.getItem("go_elite_user")
        const user: TUser | null = rawUser ? JSON.parse(rawUser) : null

        const requiredRole = role.trim().toLowerCase()
        const userRole = user?.role?.trim().toLowerCase()

        if (
          !token ||
          !isValidToken(token) ||
          !user ||
          !user.email ||
          !userRole
        ) {
          router.replace("/auth")
          setIsChecking(false)
          return
        }

        if (userRole !== requiredRole) {
          router.replace(`/${userRole}`)
          setIsChecking(false)
          return
        }

        const pendingRedirect =
          requiredRole === "coach"
            ? "/coach?coach=profile-setup"
            : requiredRole === "club"
              ? `/club?club=profile-setup`
              : requiredRole === "player"
                ? `/player?add-new=player`
                : null

        if (user.status === "pending" && pendingRedirect) {
          const isAllowedPath = pathname === `/${requiredRole}`
          const queryParams = new URLSearchParams(window.location.search)
          const hasProfileSetupQuery =
            requiredRole === "player" 
              ? queryParams.get("add-new") === "player"
              : queryParams.get(requiredRole) === "profile-setup"

          // Only redirect if:
          // 1. We're on the root dashboard page AND
          // 2. The profile-setup/add-new query param is not already present
          const isRootPage = pathname === `/${requiredRole}`
          if (isRootPage && !hasProfileSetupQuery) {
            router.replace(pendingRedirect)
            setIsChecking(false)
            return
          }
        }

        setIsChecking(false)
      } catch (error) {
        console.error("Auth check error:", error)
        setIsChecking(false)
        router.replace("/auth")
      }
    }
    check()
  }, [pathname, router, role]) 
  if (isChecking) {
    return <Loader />
  }
 
  return <>{children}</>
}
