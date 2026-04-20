"use client"
import { TUser } from '@/types'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type Props = {
  children: React.ReactNode
}

export default function CheckCoachAuth({children}: Props) {
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

        if (user.role !== "coach") {
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
    return null
    // or return <div>Loading...</div>
  }

  return <>{children}</>
}