"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"

interface CoachProfileData {
  profile: {
    bio: string
    player_centric_approach: boolean
    data_driving_training: boolean
  }
  badges: string[]
}

export default function CoachBioCard() {
  const [profileData, setProfileData] = useState<CoachProfileData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBioData = async () => {
      try {
        const token = localStorage.getItem("go_elite_token")
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://tarkavan.thenightowl.team/api"

        const response = await fetch(`${baseUrl}/coach/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        if (response.ok) {
          const result = await response.json()
          if (result.status) {
            console.log(' Coach Bio API Response:', result.data)
            setProfileData(result.data)
          }
        }
      } catch (error) {
        console.error('Error fetching coach bio data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBioData()
  }, [])

  if (loading) {
    return (
      <Card className="rounded-[12px] border border-secondary/60 bg-primary p-6 xl:p-7 2xl:p-8">
        <div className="animate-pulse">
          <div className="h-20 bg-secondary/20 rounded mb-4"></div>
          <div className="h-32 bg-secondary/20 rounded mb-4"></div>
          <div className="h-16 bg-secondary/20 rounded"></div>
        </div>
      </Card>
    )
  }

  if (!profileData) {
    return (
      <Card className="rounded-[12px] border border-secondary/60 bg-primary p-6 xl:p-7 2xl:p-8">
        <div className="text-center text-white">
          <p>Unable to load bio data</p>
        </div>
      </Card>
    )
  }

  const badges = profileData?.badges || []
  
  return (
    <Card className="rounded-[12px] border border-secondary/60 bg-primary p-6 xl:p-7 2xl:p-8">
      <h5 className="text-base leading-[150%] font-bold text-white xl:text-lg 2xl:text-xl">
        Bio
      </h5>
      <p className="mt-2 text-sm leading-[150%] text-white/85 xl:mt-3 xl:text-base 2xl:text-lg">
        {profileData?.profile?.bio || "No bio available"}
      </p>
      
      {badges.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2 xl:mt-5 xl:gap-3">
          {badges.map((badge, index) => (
            <span
              key={index}
              className="rounded-[6px] border border-white/20 bg-white/5 px-3 py-1 text-[11px] leading-[150%] text-white/85 xl:px-3.5 xl:py-1.5 xl:text-xs"
            >
              {badge.toUpperCase()}
            </span>
          ))}
        </div>
      )}
    </Card>
  )
}
