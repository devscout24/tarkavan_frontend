import CoachBioCard from "@/components/custom/coach-profile/coach-bio-card"
import CoachLeftColumn from "@/components/custom/coach-profile/coach-left-column"
import CredentialsCard from "@/components/custom/coach-profile/credentials-card"
import ExperienceEducationCard from "@/components/custom/coach-profile/experience-education-card"
import ProfileHeaderBar from "@/components/custom/coach-profile/profile-header-bar"

export default function MyProfilePage() {
  return (
    <section className="pb-8 xl:pb-10 2xl:pb-12">
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
