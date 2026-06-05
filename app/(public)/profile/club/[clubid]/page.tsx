"use client"
import CommonBtn from "@/components/common/common-btn"
import ProgramCoachCard from "@/components/common/program-coach-card"
import { Card } from "@/components/ui/card"
import { getPublicClubData } from "../action"
import Nav from "@/components/common/nav"
import Footer from "@/components/common/footer"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import type { TClubProfile } from "@/types/club.type"

export default function page() {
  const [clubProfile, setClubProfile] = useState<TClubProfile | null>(null)
  const params = useParams()
  const clubid = params.clubid

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPublicClubData(String(clubid))
   
        if (
          res &&
          typeof res === "object" &&
          "success" in res &&
          res.success &&
          "data" in res
        ) {
          setClubProfile(res.data.data as TClubProfile)
        }
      } catch (err) {
        console.error("Error fetching club profile:", err)
      }
    }
    fetchData()
  }, [])

  const router = useRouter()

  return (
    <>
      <Nav />

      <CommonBtn
        variant="outline"
        size="sm"
        text="Go Back"
        onClick={() => router.back()}
        className="mt-30 ml-10 w-fit cursor-pointer bg-brand px-5 hover:bg-brand"
      />

      <section className="mt-5 px-10 pb-10">
        {/* profile details */}
        <div className="mt-6 flex gap-6">
          <div className="flex-1">
            <ProgramCoachCard
              showMessageButton={false}
              location={
                clubProfile
                  ? `${clubProfile?.city}, ${clubProfile?.country}`
                  : "Location not available"
              }
              tags={
                clubProfile?.organization_types?.map((org) =>
                  org.name.toUpperCase()
                ) || []
              }
              name={clubProfile?.club_name || "Club Name"}
              bio={
                clubProfile?.club_description ||
                "Club description not available"
              }
              imageUrl={clubProfile?.club_logo_url ?? undefined}
              role={clubProfile?.sports_name || "Sports Club"}
            />
          </div>
          <div className="flex-2">
            {/* bio */}
            <Card className="rounded-2xl border border-white/15 bg-[#050716] p-6 text-white">
              <h3 className="mb-4 text-2xl font-semibold">Bio</h3>
              <p className="mb-6 text-base leading-8 text-white/85">
                {clubProfile?.club_description ||
                  "Club description not available."}
              </p>
              <p className="text-base leading-8 text-white/85">
                {clubProfile?.sports_name
                  ? `Specializing in ${clubProfile?.sports_name}`
                  : "Sport specialization not specified."}
              </p>
            </Card>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
