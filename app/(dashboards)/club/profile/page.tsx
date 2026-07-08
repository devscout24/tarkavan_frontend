"use client"
import CommonBtn from "@/components/common/common-btn"
import ProgramCoachCard from "@/components/common/program-coach-card"
import { Card } from "@/components/ui/card"
import { Globe, Lock, Shield } from "lucide-react"
import { getClubProfile } from "../action"
import Link from "next/link"
import { useAppSelector } from "@/lib/hooks"
import { selectProfileID } from "@/lib/features/userSlice"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { BsCopy } from "react-icons/bs";

export default function page() { 

  const [clubProfile , setClubProfile] = useState<any>(null)

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getClubProfile()
        console.log("Club Profile Response:", res) // Log the response for debugging
        if (
          res &&
          typeof res === "object" &&
          "success" in res &&
          res.success &&
          "data" in res
        ) {
          setClubProfile(res.data.data)
        }
      } catch (err) {
        console.error("Error fetching club profile:", err)
      }
    }

    getData()
  }, [])

  const privacySetting = (clubProfile?.privacy_settings || "public")
    .toString()
    .trim()
    .toLowerCase()

  const privacyLabelMap: Record<string, string> = {
    public: "Public",
    players_and_teams: "Players and Teams",
    private: "Private",
    coach_and_players: "Coach and Players",
    coach_and_team: "Coach and Team",
    only_player: "Only Player",
  }

  const privacyText =
    privacyLabelMap[privacySetting] ||
    privacySetting
      .split("_")
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")

  const PrivacyIcon =
    privacySetting === "private"
      ? Lock
      : privacySetting === "public"
        ? Globe
        : Shield
  const profile_id = useAppSelector(selectProfileID)

  return (
    <section>
      {/* visibility and customization options */}
      <Card className="flex-row items-center justify-between bg-secondary/40 px-5">
        <div className="flex items-center gap-2 rounded-lg bg-brand/90 px-4 py-2 text-primary">
          <PrivacyIcon className="h-4 w-4" />
          <span className="text-sm font-medium">
            Profile Visibility: {privacyText}
          </span>
        </div>

        <div className="flex gap-2 ">
          <CommonBtn
            text="Copy Link"
            className="w-fit bg-transparent px-2 font-medium text-white hover:bg-transparent border border-brand   "
            size={"sm"}
            variant={"default"}
            icon={<BsCopy className="h-4 w-4" />}
            onClick={async () => {
              if (!profile_id) {
                toast.error("Profile ID not found. Please try again later.")
                return
              }

              try {
                await navigator.clipboard.writeText(
                  `${process.env.NEXT_PUBLIC_FRONTEND_URL}/profile/club/${profile_id}`
                )
                toast.success("Profile link copied to clipboard!")
              } catch (error) {
                console.error("Failed to copy:", error)
                toast.error("Failed to copy the link. Please try again.")
              }
            }}
          />
          <Link href="/club/profile-settings">
            <CommonBtn
              text="Edit Profile"
              className="w-fit bg-brand px-2 font-medium text-primary hover:bg-brand"
              size={"sm"}
              variant={"default"}
            />
          </Link>
        </div>
      </Card>

      {/* profile details */}
      <div className="mt-6 flex gap-6">
        <div className="flex-1">
          <ProgramCoachCard
            showMessageButton={false}
            location={
              clubProfile
                ? `${clubProfile.city ? `${clubProfile.city}, ` : ""} ${clubProfile.province ? `${clubProfile.province}, ` : ""} ${clubProfile.country ? `${clubProfile.country}` : ""}`
                : "Location not available"
            }
            tags={
              clubProfile?.organization_types?.map((org: { name: string }) =>
                org.name.toUpperCase()
              ) || []
            }
            name={clubProfile?.club_name || "Club Name"}
            bio={
              clubProfile?.club_description || "Club description not available"
            }
            imageUrl={clubProfile?.club_logo_url}
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
                ? `Specializing in ${clubProfile.sports_name}`
                : "Sport specialization not specified."}
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}
