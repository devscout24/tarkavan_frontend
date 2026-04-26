import CommonBtn from "@/components/common/common-btn"
import ProgramCoachCard from "@/components/common/program-coach-card"
import { Card } from "@/components/ui/card"
import { Globe, Lock, Shield } from "lucide-react"
import { FaFacebookF, FaTiktok } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { IoLogoInstagram, IoLogoWhatsapp } from "react-icons/io"
import { getClubProfile } from "../action"
import Link from "next/link"
import AddSocialClub from "../components/add-social"
import ProfileShareButton from "../components/profile-share-button"

export default async function page() {
  let clubProfile = null
  try {
    const res = await getClubProfile()
    console.log(res)

    if (
      res &&
      typeof res === "object" &&
      "success" in res &&
      res.success &&
      "data" in res
    ) {
      clubProfile = res.data.data
    }
  } catch (err) {
    console.error("Error fetching club profile:", err)
  }

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

  const shareUrl = clubProfile?.id
    ? `https://tarkavan.vercel.app/profile/${clubProfile.id}`
    : ""

  const shareTitle = clubProfile?.club_name
    ? `Check out ${clubProfile.club_name}`
    : "Check out this club profile"

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
        <Link href="/club/profile-settings">
          <CommonBtn
            text="Edit Profile"
            className="w-fit bg-brand px-2 font-medium text-primary hover:bg-brand"
            size={"sm"}
            variant={"default"}
          />
        </Link>
      </Card>

      {/* profile details */}
      <div className="mt-6 flex gap-6">
        <div className="flex-1">
          <ProgramCoachCard
            showMessageButton={false}
            location={
              clubProfile
                ? `${clubProfile.city}, ${clubProfile.state}, ${clubProfile.country}`
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

          {/* <div className="mt-6 flex flex-wrap items-center justify-between rounded-2xl border border-secondary p-7">
            <div className="">
              <ul className="flex gap-7.5 rounded-lg p-4 text-2xl text-white">
                <a
                  href="http://example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="http://example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IoLogoInstagram />
                </a>
                <a
                  href="http://example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTiktok />
                </a>
                <a
                  href="http://example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaXTwitter />
                </a>
                <a
                  href="http://example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IoLogoWhatsapp />
                </a>
              </ul>
            </div>
            <ProfileShareButton url={shareUrl} title={shareTitle} />
          </div> */}
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

          {/* programs */}
          <div className="mx-2 mt-10">
            <h3 className="pb-5 text-xl font-semibold text-white">
              Social Media
            </h3>

            <AddSocialClub />
          </div>
        </div>
      </div>
    </section>
  )
}
