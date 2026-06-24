import Logo from "@/components/common/logo"
import CoachBioCard from "@/components/custom/coach-profile/coach-bio-card"
import CoachLeftColumn from "@/components/custom/coach-profile/coach-left-column"
import CredentialsCard from "@/components/custom/coach-profile/credentials-card"
import ExperienceEducationCard from "@/components/custom/coach-profile/experience-education-card"
import { TCoachProfile, TCoachProfileData } from "@/types"

export default function CoachShareCard({
  profileData,
}: {
  profileData: TCoachProfile
}) {
  return (
    <div
      id="coach_og_image"
      className="fixed top-0 left-0 -z-50 w-250  rounded-lg border border-brand bg-black p-2"
    >
      <div className="flex items-center justify-center border-b border-brand py-4">
        <Logo />
      </div>

      {/*  */}
      <div className="mt-2 flex gap-2">
        <div className="flex-2">
          <CoachLeftColumn
            profileData={profileData?.profile as TCoachProfileData}
            coaching_titles={profileData?.coaching_titles || []}
            is_socials={false}
          />
        </div>
        <div className="space-y-2  flex-3 ">
          <CoachBioCard
            profileData={profileData?.profile as TCoachProfileData}
          />
          <ExperienceEducationCard
            experience_education={profileData?.experience_education || []}
          />
          <CredentialsCard coach_media={profileData?.coach_media || []} />
        </div>
      </div>
    </div>
  )
}
