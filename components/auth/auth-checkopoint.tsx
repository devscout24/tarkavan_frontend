"use client"

import Loader from "@/components/common/loader"
import isValidToken from "@/lib/isValid-token"
import { TUser } from "@/types"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

type Props = {
  children: React.ReactNode
  role: string
}

export default function AuthCheckPoint({ children, role }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [isChecking, setIsChecking] = useState(true)

  const search = searchParams.toString()

  useEffect(() => {
    if (typeof window === "undefined") return

    const token = localStorage.getItem("go_elite_token")
    const rawUser = localStorage.getItem("go_elite_user")

    if (!token || !rawUser) {
      if (pathname !== "/auth") {
        router.replace("/auth")
      }
      return
    }

    let user: TUser

    try {
      user = JSON.parse(rawUser)
    } catch {
      router.replace("/auth")
      return
    }

    if (!isValidToken(token)) {
      router.replace("/auth")
      return
    }

    const userRole = user?.role?.trim().toLowerCase()
    const requiredRole = role.trim().toLowerCase()

    if (!userRole || !user.email) {
      router.replace("/auth")
      return
    }

    // Wrong dashboard
    if (userRole !== requiredRole) {
      const target = `/${userRole}`

      if (pathname !== target) {
        router.replace(target)
        return
      }

      setIsChecking(false)
      return
    }

    // Pending profile setup
    if (user.status === "pending") {
      let redirectUrl = ""
      let isAlreadyOnSetupPage = false

      if (requiredRole === "player") {
        redirectUrl = "/player?player=setup"

        isAlreadyOnSetupPage =
          pathname === "/player" &&
          searchParams.get("player") === "setup"
      } else {
        redirectUrl = `/${requiredRole}?${requiredRole}=profile-setup`

        isAlreadyOnSetupPage =
          pathname === `/${requiredRole}` &&
          searchParams.get(requiredRole) === "profile-setup"
      }

      if (!isAlreadyOnSetupPage) {
        router.replace(redirectUrl)
        return
      }

      setIsChecking(false)
      return
    }

    setIsChecking(false)
  }, [pathname, search, role, router, searchParams])

  if (isChecking) {
    return <Loader />
  }

  return <>{children}</>
}