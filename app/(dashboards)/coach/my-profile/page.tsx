"use client"
import CoachBioCard from "@/components/custom/coach-profile/coach-bio-card"
import CoachLeftColumn from "@/components/custom/coach-profile/coach-left-column"
import CredentialsCard from "@/components/custom/coach-profile/credentials-card"
import ExperienceEducationCard from "@/components/custom/coach-profile/experience-education-card"
import ProfileHeaderBar from "@/components/custom/coach-profile/profile-header-bar"
import { setPlayerOG } from "../../action"
import { toPng } from "html-to-image"
import { useEffect, useState } from "react"
import { getApiBaseUrl } from "@/lib/url-utils"
import { TCoachProfile, TCoachProfileData } from "@/types"
import CoachShareCard from "./coach-card"

export default function MyProfilePage() {
  const [shouldCapture, setShouldCapture] = useState(false)
  const user = localStorage.getItem("go_elite_user")
    ? JSON.parse(localStorage.getItem("go_elite_user")!)
    : null

  useEffect(() => {
    const timer = setTimeout(() => setShouldCapture(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!shouldCapture) return

    async function takeScreenshot() {
      const node = document.getElementById("og_image")
      if (!node) return

      const images = node.querySelectorAll("img")
      await Promise.all(
        Array.from(images).map(
          (img) =>
            new Promise<void>((resolve) => {
              if (img.complete) resolve()
              else {
                img.onload = () => resolve()
                img.onerror = () => resolve()
              }
            })
        )
      )

      await document.fonts.ready
      await new Promise((resolve) => requestAnimationFrame(resolve))

      toPng(node).then(async (dataUrl) => {
        const res = await fetch(dataUrl)
        const blob = await res.blob()
        const file = new File([blob], "og-image.png", { type: "image/png" })

        const formData = new FormData()
        formData.append("preview", file)
        formData.append("athlete_id", user?.profile_id)

        try {
          const uploadRes = await setPlayerOG({
            id: user?.profile_id,
            data: formData,
          })
        } catch (error) {
          console.error("Upload failed:", error)
        }
      })

      setShouldCapture(false)
    }

    takeScreenshot()
  }, [shouldCapture])

  const [profileData, setProfileData] = useState<TCoachProfile | null>(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchExperienceData = async () => {
      try {
        const token = localStorage.getItem("go_elite_token")
        const baseUrl = getApiBaseUrl()

        const response = await fetch(`${baseUrl}/coach/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }) 

        if (response.ok) {
          const result = await response.json() 
          console.log("Coach Profile Response:", result)
          if (result.status) {
            setProfileData(result.data)
          }
        }
      } catch (error) {
        console.error("Error fetching experience data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchExperienceData()

    const handleProfileUpdated = () => {
      fetchExperienceData()
    }

    window.addEventListener("coachProfileUpdated", handleProfileUpdated)

    return () => {
      window.removeEventListener("coachProfileUpdated", handleProfileUpdated)
    }
  }, [])

  return (
    <section className="pb-8 xl:pb-10 2xl:pb-12" >

      <CoachShareCard profileData={profileData as TCoachProfile}/> 
      <ProfileHeaderBar />

      <div  className=" p-2 grid gap-5 md:gap-6 lg:gap-6 xl:grid-cols-[460px_minmax(0,1fr)] xl:gap-6 2xl:grid-cols-[560px_minmax(0,1fr)] 2xl:gap-7">
        <CoachLeftColumn
          profileData={profileData?.profile as TCoachProfileData}
          coaching_titles={profileData?.coaching_titles || []}
        />

        <div className="space-y-4 xl:space-y-5 2xl:space-y-6">
          <CoachBioCard
            profileData={profileData?.profile as TCoachProfileData}
          />
          <ExperienceEducationCard
            experience_education={profileData?.experience_education || []}
          />
          <CredentialsCard coach_media={profileData?.coach_media || []} />
        </div>
      </div>
    </section>
  )
}
