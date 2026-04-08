import BasicInformation from "@/components/custom/coach-profile-setup/BasicInformation"
import CoachProfileSetupHeader from "@/components/custom/coach-profile-setup/coach-profile-setup-header"
import SportsAndSpecialties from "@/components/custom/coach-profile-setup/SportsAndSpecialties"
import UploadPhoto from "@/components/custom/coach-profile-setup/UploadPhoto"
import React from "react"

export default function CoachProfileSetup() {
  return (
    <section className="x-4 py-13">
      <div className="space-y-4 rounded-[16px] bg-secondary/20 p-4 sm:p-6">
        <CoachProfileSetupHeader />
        <UploadPhoto />
        <BasicInformation />
      </div>
    </section>
  )
}
