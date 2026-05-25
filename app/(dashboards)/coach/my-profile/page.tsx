"use client"
import CoachBioCard from "@/components/custom/coach-profile/coach-bio-card"
import CoachLeftColumn from "@/components/custom/coach-profile/coach-left-column"
import CredentialsCard from "@/components/custom/coach-profile/credentials-card"
import ExperienceEducationCard from "@/components/custom/coach-profile/experience-education-card"
import ProfileHeaderBar from "@/components/custom/coach-profile/profile-header-bar"
import { setPlayerOG } from "../../action"
import { toPng } from "html-to-image"
import { useEffect, useState } from "react"

export default function MyProfilePage() {

  const [shouldCapture, setShouldCapture] = useState(false)
  const user = localStorage.getItem("go_elite_user")    ? JSON.parse(localStorage.getItem("go_elite_user")!)
    : null

  useEffect(() => { 

    const timer = setTimeout(() => setShouldCapture(true), 2000)
    return () => clearTimeout(timer)
  }, [ ])

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

        console.log(file)

        try {
          const uploadRes = await setPlayerOG({
            id: user?.profile_id,
            data: formData,
          })
          console.log(uploadRes)
        } catch (error) {
          console.error("Upload failed:", error)
        }
      })

      setShouldCapture(false)
    }

    takeScreenshot()
  }, [shouldCapture])

  return (
    <section className="pb-8 xl:pb-10 2xl:pb-12" id="og_image">
      <ProfileHeaderBar />

      <div className="grid gap-5 md:gap-6 lg:gap-6 xl:grid-cols-[460px_minmax(0,1fr)] xl:gap-6 2xl:grid-cols-[560px_minmax(0,1fr)] 2xl:gap-7">
        <CoachLeftColumn />

        <div className="space-y-4 xl:space-y-5 2xl:space-y-6">
          <CoachBioCard />
          <ExperienceEducationCard />
          <CredentialsCard />
        </div>
      </div>
    </section>
  )
}
