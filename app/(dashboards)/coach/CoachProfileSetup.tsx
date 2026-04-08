import BasicInformation from "@/components/custom/coach-profile-setup/BasicInformation"
import CoachProfileSetupHeader from "@/components/custom/coach-profile-setup/coach-profile-setup-header"
import UploadPhoto from "@/components/custom/coach-profile-setup/UploadPhoto"
import React from "react"

export default function CoachProfileSetup() {
  return (
    <section className="space-y-4 rounded-[16px] bg-secondary/10 p-4 sm:p-6 lg:p-8">
      <CoachProfileSetupHeader />
      <UploadPhoto />
      <BasicInformation />
    </section>
  )
}
