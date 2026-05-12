"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { getApiBaseUrl } from "@/lib/url-utils"
import { NscaIcon, UsabIcon } from "./icons"

interface CoachProfileData {
  media: Array<{
    id: number
    title: string
    type: string
    url: string
    description?: string
  }>
}

export default function CredentialsCard() {
  const [profileData, setProfileData] = useState<CoachProfileData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCredentialsData = async () => {
      try {
        const token = localStorage.getItem("go_elite_token")
        const baseUrl = getApiBaseUrl()

        const response = await fetch(`${baseUrl}/coach/profile/data/edit`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })

        if (response.ok) {
          const result = await response.json()
          if (result.status) {
            setProfileData(result.data)
          }
        }
      } catch (error) {
        console.error("Error fetching credentials data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCredentialsData()
  }, [])

  if (loading) {
    return (
      <Card className="rounded-[12px] border border-secondary/60 bg-primary p-6 xl:p-7 2xl:p-8">
        <div className="animate-pulse">
          <div className="mb-4 h-20 rounded bg-secondary/20"></div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="h-20 rounded bg-secondary/20"></div>
            <div className="h-20 rounded bg-secondary/20"></div>
          </div>
        </div>
      </Card>
    )
  }

  if (!profileData) {
    return (
      <Card className="rounded-[12px] border border-secondary/60 bg-primary p-6 xl:p-7 2xl:p-8">
        <div className="text-center text-white">
          <p>Unable to load credentials data</p>
        </div>
      </Card>
    )
  }

  const credentials = profileData?.media || []

  return (
    <Card className="rounded-[12px] border border-secondary/60 bg-primary p-6 xl:p-7 2xl:p-8">
      <h5 className="text-2xl leading-[125%] font-medium text-white xl:text-3xl 2xl:text-[34px]">
        Certified Credentials
      </h5>

      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:mt-5 xl:gap-5">
        {credentials.length > 0 ? (
          credentials.map((credential, index) => (
            <div
              key={credential.id}
              className="flex items-start gap-3 rounded-[10px] border border-secondary/60 bg-white/5 p-3 xl:gap-4 xl:p-4 2xl:p-5"
            >
              <div className="grid h-10 w-10 place-items-center rounded-[8px] bg-secondary/10 xl:h-11 xl:w-11 2xl:h-12 2xl:w-12">
                {credential.type === "usab" ? <UsabIcon /> : <NscaIcon />}
              </div>
              <div>
                <p className="text-base leading-[150%] font-semibold text-white xl:text-lg 2xl:text-xl">
                  {credential.title}
                </p>
                <p className="text-xs leading-[150%] font-normal text-white/70 xl:text-sm 2xl:text-base">
                  ID: {credential.description || `CRED-${credential.id}-2024`}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="py-8 text-center text-white/70">
            <p className="text-sm xl:text-base">
              No certified credentials available
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}
