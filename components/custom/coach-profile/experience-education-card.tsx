"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"

interface CoachProfileData {
  years_of_experience: string
  highest_education: string
  coaching_education: string
  experience_education: Array<{
    title: string | number
    duration: string
    description: string
  }>
}

export default function ExperienceEducationCard() {
  const [profileData, setProfileData] = useState<CoachProfileData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchExperienceData = async () => {
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
            console.log('🎓 Experience & Education API Response:', result.data)
            setProfileData(result.data)
          }
        }
      } catch (error) {
        console.error('Error fetching experience data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchExperienceData()
  }, [])

  if (loading) {
    return (
      <Card className="rounded-[12px] border border-secondary/60 bg-primary p-6 xl:p-7 2xl:p-8">
        <div className="animate-pulse">
          <div className="h-20 bg-secondary/20 rounded mb-4"></div>
          <div className="h-32 bg-secondary/20 rounded mb-4"></div>
        </div>
      </Card>
    )
  }

  if (!profileData) {
    return (
      <Card className="rounded-[12px] border border-secondary/60 bg-primary p-6 xl:p-7 2xl:p-8">
        <div className="text-center text-white">
          <p>Unable to load experience data</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="rounded-[12px] border border-secondary/60 bg-primary p-6 xl:p-7 2xl:p-8">
      <h5 className="text-2xl leading-[125%] font-medium text-white xl:text-3xl 2xl:text-[34px]">
        Experience &amp; Education
      </h5>

      <div className="mt-6 space-y-4 xl:mt-7 xl:space-y-5 2xl:mt-8 2xl:space-y-6">

        {/* Education Section */}
        <div className="rounded-[12px] border border-secondary/60 bg-white/10 p-4 xl:p-5 2xl:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h6 className="text-[22px] leading-[112%] font-medium text-white xl:text-[28px] 2xl:text-[36px]">
                {profileData?.years_of_experience || "5"} years
              </h6>
              <p className="mt-2 text-xs leading-[150%] font-semibold tracking-[-0.24px] text-white/50 xl:text-sm 2xl:text-base">
                {profileData?.highest_education || "Northwestern University"}
              </p>
              <p className="mt-2 text-sm leading-[150%] text-white/80">
                {profileData?.coaching_education || "Concentration in Kinesiology and High-Performance Athletic Training."}
              </p>
            </div>
            <span className="rounded-[6px] bg-secondary/40 px-2 py-1 text-xs text-white/70 xl:px-2.5 xl:py-1.5 xl:text-sm">
              Present
            </span>
          </div>
        </div>

        {/* Experience Section */}
        <div className="rounded-[12px] border border-secondary/60 bg-white/10 p-4 xl:p-5 2xl:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h6 className="text-[22px] leading-[112%] font-medium text-white xl:text-[28px] 2xl:text-[36px]">
                {profileData?.experience_education?.[0]?.title || "Senior Performance Director"}
              </h6>
              <p className="mt-2 text-xs leading-[150%] font-semibold tracking-[-0.24px] text-white/50 xl:text-sm 2xl:text-base">
                {profileData?.experience_education?.[0]?.description || "Elite Pro Basketball Academy"}
              </p>
            </div>
            <span className="rounded-[6px] bg-secondary/40 px-2 py-1 text-xs text-white/70 xl:px-2.5 xl:py-1.5 xl:text-sm">
              {profileData?.experience_education?.[0]?.duration || "2018 - Present"}
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}