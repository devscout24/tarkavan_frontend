import CoachProfileSetup from "../../../../../(dashboards)/coach/CoachProfileSetup"
import SportsAndSpecialties from "@/components/custom/coach-profile-setup/SportsAndSpecialties"
import ExperienceAndEducation from "@/components/custom/coach-profile-setup/ExperienceAndEducation"
import CertificationsAndCredentials from "@/components/custom/coach-profile-setup/CertificationsAndCredentials"
import CoachingPhilosophy from "@/components/custom/coach-profile-setup/CoachingPhilosophy"
import { useCoachProfileSteps } from "@/hooks/useCoachProfileSteps"

export default function CoachProfileSetupPage() {
  return (
    <section className="space-y-6 bg-primary pb-12">
      <div className="mx-auto max-w-7xl">
        <CoachProfileSetup />
        <SportsAndSpecialties />
        <ExperienceAndEducation />
        <CertificationsAndCredentials />
        <CoachingPhilosophy />
      </div>
    </section>
  )
}
