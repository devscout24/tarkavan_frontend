import { section } from "motion/react-client"
import CoachProfileSetup from "../(dashboards)/coach/CoachProfileSetup"
import SportsAndSpecialties from "@/components/custom/coach-profile-setup/SportsAndSpecialties"
import ExperienceAndEducation from "@/components/custom/coach-profile-setup/ExperienceAndEducation"
import CertificationsAndCredentials from "@/components/custom/coach-profile-setup/CertificationsAndCredentials"
import CoachingPhilosophy from "@/components/custom/coach-profile-setup/CoachingPhilosophy"

export default function page() {
  return (
    <section className="mx-auto max-w-7xl space-y-6 pb-12">
      <CoachProfileSetup />
      <SportsAndSpecialties />
      <ExperienceAndEducation />
      <CertificationsAndCredentials />
      <CoachingPhilosophy />
    </section>
  )
}
