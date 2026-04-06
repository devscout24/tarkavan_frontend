"use client"

import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"

type ProtectedRouteProps = {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const role = localStorage.getItem("tarkavan_role")?.trim()

    if (!role) {
      router.replace("/auth")
      return
    }

    if (!pathname.startsWith(`/${role}`)) {
      router.replace(`/${role}`)
    }
  }, [pathname, router])

  return <>{children}</>
}