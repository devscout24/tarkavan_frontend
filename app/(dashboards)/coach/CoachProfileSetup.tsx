import BasicInformation from "@/components/custom/coach-profile-setup/BasicInformation"
import CertificationsAndCredentials from "@/components/custom/coach-profile-setup/CertificationsAndCredentials"
import CoachProfileSetupHeader from "@/components/custom/coach-profile-setup/coach-profile-setup-header" 
import ExperienceAndEducation from "@/components/custom/coach-profile-setup/ExperienceAndEducation"
import SportsAndSpecialties from "@/components/custom/coach-profile-setup/SportsAndSpecialties"
import UploadPhoto from "@/components/custom/coach-profile-setup/UploadPhoto"
import React from "react"

interface CoachProfileSetupProps {
  currentStep?: number
  updatePhotoUploaded?: (uploaded: boolean) => void
  updateBasicInfo?: (info: unknown) => void
}

export default function CoachProfileSetup({ 
  currentStep, 
  updatePhotoUploaded, 
  updateBasicInfo 
}: CoachProfileSetupProps) {
  return (
    <section className="   bg-primary  ">
      <div className="space-y-4 rounded-[16px] bg-secondary/20 p-4 sm:p-6">
        <CoachProfileSetupHeader currentStep={currentStep} />
        <UploadPhoto updatePhotoUploaded={updatePhotoUploaded} />
        <BasicInformation updateBasicInfo={updateBasicInfo} />
        <SportsAndSpecialties/>
        <ExperienceAndEducation/>
        <CertificationsAndCredentials/>
      </div>
    </section>
  )
}
