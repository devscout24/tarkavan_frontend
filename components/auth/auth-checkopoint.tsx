"use client"

import Loader from "@/components/common/loader"
import isValidToken from "@/lib/isValid-token"
import { TUser } from "@/types"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"

type Props = {
  children: React.ReactNode
  role: string
}

export default function AuthCheckPoint({ children, role }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem("go_elite_token")
        const rawUser = localStorage.getItem("go_elite_user")

        // No token or user → auth
        if (!token || !rawUser) {
          router.replace("/auth")
          return
        }

        const user: TUser = JSON.parse(rawUser)

        const requiredRole = role.trim().toLowerCase()
        const userRole = user?.role?.trim().toLowerCase()

        // invalid token
        if (!isValidToken(token)) {
          router.replace("/auth")
          return
        }

        // invalid user data
        if (!user || !user.email || !userRole) {
          router.replace("/auth")
          return
        }

        // role mismatch → redirect to correct dashboard
        if (userRole !== requiredRole) {
          if (pathname !== `/${userRole}`) {
            router.replace(`/${userRole}`)
          }
          return
        }

        // Pending profile setup handling
        if (user.status === "pending") {
          let expectedQueryKey = ""
          let expectedQueryValue = ""

          if (requiredRole === "player") {
            expectedQueryKey = "add-new"
            expectedQueryValue = "player"
          } else {
            expectedQueryKey = requiredRole
            expectedQueryValue = "profile-setup"
          }

          const currentValue = searchParams.get(expectedQueryKey)

          // More flexible check for setup page - allow if on correct path with any query
          const isAlreadyOnSetupPage =
            pathname === `/${requiredRole}` &&
            currentValue === expectedQueryValue

           

          // Only redirect if not already on the correct setup page
          if (!isAlreadyOnSetupPage) {
            const redirectUrl =
              requiredRole === "player"
                ? "/player?add-new=player"
                : `/${requiredRole}?${requiredRole}=profile-setup`
 
            router.replace(redirectUrl)
            return
          } else { 
            setIsChecking(false)
            return
          }
        }
 
        setIsChecking(false)
      } catch (err) {
        console.error("Auth error:", err)
        router.replace("/auth")
      }
    }

    // small delay prevents hydration/localStorage glitch
    const timer = setTimeout(checkAuth, 50)
    return () => clearTimeout(timer)
  }, [pathname, role, router, searchParams])

  if (isChecking) {
    return <Loader />
  }

  return <>{children}</>
}