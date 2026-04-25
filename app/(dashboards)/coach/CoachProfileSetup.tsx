import BasicInformation from "@/components/custom/coach-profile-setup/BasicInformation"
import CertificationsAndCredentials from "@/components/custom/coach-profile-setup/CertificationsAndCredentials"
import CoachProfileSetupHeader from "@/components/custom/coach-profile-setup/coach-profile-setup-header"
import CoachingPhilosophy from "@/components/custom/coach-profile-setup/CoachingPhilosophy"
import ExperienceAndEducation from "@/components/custom/coach-profile-setup/ExperienceAndEducation"
import SportsAndSpecialties from "@/components/custom/coach-profile-setup/SportsAndSpecialties"
import UploadPhoto from "@/components/custom/coach-profile-setup/UploadPhoto"
import React, { useState, useEffect, useCallback, useRef } from "react"
import { toast } from "sonner"
import {
  createOrUpdateCoachProfile,
  convertToFormData,
} from "@/components/parentAndCoachApi/api/coachProfile"
import type {
  CoachProfileFormData,
  CoachProfileApiResult,
} from "@/components/parentAndCoachApi/type/coachProfileTypes"

interface CoachProfileSetupProps {
  currentStep?: number
  updatePhotoUploaded?: (uploaded: boolean) => void
  updateBasicInfo?: (info: unknown) => void
}

const STORAGE_KEY = "coach_profile_draft"

const getInitialFormData = (): CoachProfileFormData => ({
  name: "",
  last_name: "",
  dob: "",
  gender: "male",
  nationality: "",
  email: "",
  sports: "",
  current_role: "",
  years_of_experience: "",
  highest_education: "",
  coaching_education: "",
  coaching_philosophy: "",
  player_centric_approach: false,
  data_driving_training: false,
  coaching_title: ["", ""],
  images: [],
  privacy_settings: {
    visible_reviews: true,
    allow_parent_player_reviews: true,
  },
  city: "",
  country: "",
})

export default function CoachProfileSetup({
  currentStep,
  updatePhotoUploaded,
  updateBasicInfo,
}: CoachProfileSetupProps) {
  const [formData, setFormData] =
    useState<CoachProfileFormData>(getInitialFormData)
  const [isLoading, setIsLoading] = useState(false)
  const formDataRef = useRef(formData)

  // Update ref whenever formData changes
  useEffect(() => {
    formDataRef.current = formData
  }, [formData])

  // Load saved form data from localStorage on mount
  // Also clean up old keys that child components previously wrote directly
  useEffect(() => {
    // Clear stale child-component localStorage keys
    localStorage.removeItem("coachProfileImage")
    localStorage.removeItem("coachProfileImageName")
    localStorage.removeItem("coach-profile-certifications")

    try {
      const savedData = localStorage.getItem(STORAGE_KEY)
      if (savedData) {
        const parsedData = JSON.parse(savedData)
        setFormData((prev) => ({ ...prev, ...parsedData }))
      }
    } catch (err) {
      console.warn("Failed to load saved form data:", err)
    }
  }, [])

  // Save form data to localStorage whenever it changes
  const saveToLocalStorage = (data: CoachProfileFormData) => {
    try {
      // Create a clean object without File objects for localStorage
      const dataToSave: Partial<CoachProfileFormData> = {
        ...data,
        coach_profile_pic: undefined,
        images: [],
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
    } catch (err) {
      console.warn("Failed to save form data:", err)
    }
  }

  // Update form data and save to localStorage
  const updateFormData = useCallback(
    (updates: Partial<CoachProfileFormData>) => {
      setFormData((prev) => {
        const newData = { ...prev, ...updates }
        saveToLocalStorage(newData)
        return newData
      })
    },
    []
  )

  // Validation function
  const validateForm = (
    data: CoachProfileFormData
  ): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []

    // Required field validations
    if (!data.name?.trim()) errors.push("First name is required")
    if (!data.last_name?.trim()) errors.push("Last name is required")
    if (!data.email?.trim()) errors.push("Email is required")
    if (!data.dob) errors.push("Date of birth is required")
    if (!data.gender) errors.push("Gender is required")
    if (!data.nationality?.trim()) errors.push("Nationality is required")
    if (!data.country?.trim()) errors.push("Country is required")
    if (!data.city?.trim()) errors.push("City is required")
    if (!data.sports?.trim()) errors.push("Sport selection is required")
    if (!data.years_of_experience?.trim())
      errors.push("Years of experience is required")
    if (!data.highest_education?.trim())
      errors.push("Highest education is required")
    if (!data.coaching_philosophy?.trim())
      errors.push("Coaching philosophy is required")

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (data.email && !emailRegex.test(data.email)) {
      errors.push("Please enter a valid email address")
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  // Handle form submission — reads latest data directly from the ref
  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault()
    setIsLoading(true)

    try {
      // Always read the latest snapshot from the ref (updated every render)
      const currentFormData = formDataRef.current

      // Validate form
      const validation = validateForm(currentFormData)
      if (!validation.isValid) {
        validation.errors.forEach((error) => {
          toast.error(error)
        })
        setIsLoading(false)
        return
      }

      const apiFormData = convertToFormData(currentFormData)
      const result: CoachProfileApiResult =
        await createOrUpdateCoachProfile(apiFormData)

      if (result.success) {
        toast.success(result.message || "Coach profile created successfully!")
        localStorage.removeItem(STORAGE_KEY)

        setFormData(getInitialFormData())
        // Redirect to clean dashboard URL (no query params → modal won't reopen)
        window.location.replace("/coach")
      } else {
        toast.error(result.message || "Failed to create coach profile")
      }
    } catch (err) {
      toast.error("An unexpected error occurred")
      console.error("Profile submission error:", err)
    } finally {
      setIsLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Stable callback for BasicInformation
  const handleBasicInfoUpdate = useCallback(
    (data: any) => {
      updateFormData({
        name: data.firstName || "",
        last_name: data.lastName || "",
        dob: data.dateOfBirth
          ? new Date(data.dateOfBirth).toISOString().split("T")[0]
          : "",
        gender: data.gender || "male",
        nationality: data.nationality || "",
        email: data.email || "",
        city: data.city || "",
        country: data.country || "",
      })
      if (updateBasicInfo) updateBasicInfo(data)
    },
    [updateFormData, updateBasicInfo]
  )

  // Stable callback for UploadPhoto
  const handleFileSelect = useCallback(
    (file: File | null) => {
      updateFormData({ coach_profile_pic: file || undefined })
    },
    [updateFormData]
  )

  // Stable callback for SportsAndSpecialties
  const handleSportsUpdate = useCallback(
    (data: any) => {
      updateFormData({
        sports: data.sport || "",
        current_role: data.role || "",
        coaching_title: data.coachingTitles || [],
      })
    },
    [updateFormData]
  )

  // Stable callback for ExperienceAndEducation
  const handleExperienceUpdate = useCallback(
    (data: any) => {
      updateFormData({
        years_of_experience: data.years || "",
        highest_education: data.education || "",
        coaching_education: data.history || "",
      })
    },
    [updateFormData]
  )

  // Stable callback for CertificationsAndCredentials (optional, not validated)
  const handleCredentialsUpdate = useCallback(
    (files: unknown[]) => {
      // Files are stored inside the child; just track that uploads happened
      updateFormData({ images: files as any[] })
    },
    [updateFormData]
  )

  // Stable callback for CoachingPhilosophy
  const handlePhilosophyUpdate = useCallback(
    (data: {
      philosophy: string
      playerCentric: boolean
      dataDriven: boolean
    }) => {
      updateFormData({
        coaching_philosophy: data.philosophy,
        player_centric_approach: data.playerCentric,
        data_driving_training: data.dataDriven,
      })
    },
    [updateFormData]
  )

  return (
    <section className="bg-primary">
      <div className="space-y-4 rounded-[16px] bg-primary p-4 sm:p-6">
        <CoachProfileSetupHeader currentStep={currentStep} />

        <div className="rounded-[16px] bg-secondary/20 p-4">
          <UploadPhoto
            updatePhotoUploaded={updatePhotoUploaded}
            onFileSelect={handleFileSelect}
          />
          <BasicInformation updateBasicInfo={handleBasicInfoUpdate} />
        </div>

        <SportsAndSpecialties updateSports={handleSportsUpdate} />

        <ExperienceAndEducation updateExperience={handleExperienceUpdate} />

        <CertificationsAndCredentials
          updateCredentials={handleCredentialsUpdate}
        />

        <CoachingPhilosophy
          updatePhilosophy={handlePhilosophyUpdate}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </section>
  )
}
