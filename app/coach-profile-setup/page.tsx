"use client"

import { section } from "motion/react-client"
import CoachProfileSetup from "../(dashboards)/coach/CoachProfileSetup"
import SportsAndSpecialties from "@/components/custom/coach-profile-setup/SportsAndSpecialties"
import ExperienceAndEducation from "@/components/custom/coach-profile-setup/ExperienceAndEducation"
import CertificationsAndCredentials from "@/components/custom/coach-profile-setup/CertificationsAndCredentials"
import CoachingPhilosophy from "@/components/custom/coach-profile-setup/CoachingPhilosophy"
import { useCoachProfileSteps } from "@/hooks/useCoachProfileSteps"

export default function page() {
  const {
    currentStep,
    updatePhotoUploaded,
    updateBasicInfo,
    updateSports,
    updateExperience,
    updateCredentials,
    updatePhilosophy,
  } = useCoachProfileSteps()

  return (
    <section className="mx-auto max-w-7xl space-y-6 pb-12">
      <CoachProfileSetup 
        currentStep={currentStep}
        updatePhotoUploaded={updatePhotoUploaded}
        updateBasicInfo={updateBasicInfo}
      />
      <SportsAndSpecialties updateSports={updateSports} />
      <ExperienceAndEducation updateExperience={updateExperience} />
      <CertificationsAndCredentials updateCredentials={updateCredentials} />
      <CoachingPhilosophy updatePhilosophy={updatePhilosophy} />
    </section>
  )
}
