import BasicInformation from "@/components/custom/coach-profile-setup/BasicInformation"
import CertificationsAndCredentials from "@/components/custom/coach-profile-setup/CertificationsAndCredentials"
import CoachProfileSetupHeader from "@/components/custom/coach-profile-setup/coach-profile-setup-header"
import CoachingPhilosophy from "@/components/custom/coach-profile-setup/CoachingPhilosophy"
import ExperienceAndEducation from "@/components/custom/coach-profile-setup/ExperienceAndEducation"
import SocialMediaLinks, {
  type SocialMediaData,
} from "@/components/custom/coach-profile-setup/SocialMediaLinks"
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
import { getCoachEditData } from "./action"

interface CoachProfileSetupProps {
  currentStep?: number
  updatePhotoUploaded?: (uploaded: boolean) => void
  updateBasicInfo?: (info: unknown) => void
  isEditMode?: boolean
}

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
  facebook_link: "",
  twitter_link: "",
  instagram_link: "",
  tiktok_link: "",
  whatsapp_link: "",
})

export default function CoachProfileSetup({
  currentStep,
  updatePhotoUploaded,
  updateBasicInfo,
  isEditMode = false,
}: CoachProfileSetupProps) {
  const [formData, setFormData] =
    useState<CoachProfileFormData>(getInitialFormData)
  const [isLoading, setIsLoading] = useState(false)
  const [initialPreview, setInitialPreview] = useState<string | null>(null)
  const formDataRef = useRef(formData)

  console.log(formData)

  useEffect(() => {
    const getCaochProfileData = async () => {
      try {
        const res = await getCoachEditData()
        console.log(res)
        type CoachEditPayload = {
          name?: string
          last_name?: string
          dob?: string
          gender?: string
          nationality?: string
          email?: string
          sports?: string
          current_role?: { name?: string }
          years_of_experience?: string
          highest_education?: string
          coaching_education?: string
          coaching_philosophy?: string
          player_centric_approach?: boolean
          data_driving_training?: boolean
          coaching_titles?: Array<{ title?: string }>
          city?: string
          country?: string
          facebook_link?: string
          twitter_link?: string
          instagram_link?: string
          tiktok_link?: string
          whatsapp_link?: string
          coach_profile_pic?: string
        }

        if (
          res &&
          typeof res === "object" &&
          "data" in res &&
          res.data &&
          typeof res.data === "object" &&
          "data" in res.data &&
          res.data.data
        ) {
          const d = res.data.data as CoachEditPayload
          setFormData((prev) => ({
            ...prev,
            name: d.name || "",
            last_name: d.last_name || "",
            dob: d.dob || "",
            gender:
              d.gender === "male" ||
              d.gender === "female" ||
              d.gender === "other"
                ? d.gender
                : "male",
            nationality: d.nationality || "",
            email: d.email || "",
            sports: d.sports || "",
            current_role: d.current_role?.name || "",
            years_of_experience: d.years_of_experience || "",
            highest_education: d.highest_education || "",
            coaching_education: d.coaching_education || "",
            coaching_philosophy: d.coaching_philosophy || "",
            player_centric_approach: !!d.player_centric_approach,
            data_driving_training: !!d.data_driving_training,
            coaching_title: d.coaching_titles
              ? d.coaching_titles.map((t) => t.title || "")
              : ["", ""],
            city: d.city || "",
            country: d.country || "",
            facebook_link: d.facebook_link || "",
            twitter_link: d.twitter_link || "",
            instagram_link: d.instagram_link || "",
            tiktok_link: d.tiktok_link || "",
            whatsapp_link: d.whatsapp_link || "",
          }))

          if (d.coach_profile_pic) {
            try {
              const { resolveAssetUrl } = await import("@/lib/url-utils")
              const preview = resolveAssetUrl(d.coach_profile_pic)
              setInitialPreview(preview)
            } catch {
              // ignore
            }
          }
        }
      } catch (error) {
        console.error("Error fetching coach profile data:", error)
      }
    }
    getCaochProfileData()
  }, [])

  // Check and update user status from coach profile API
  useEffect(() => {
    const checkCoachProfile = async () => {
      try {
        const token = localStorage.getItem("go_elite_token")
        const rawUser = localStorage.getItem("go_elite_user")

        if (!token || !rawUser) return

        const user = JSON.parse(rawUser)

        // Only check if user is currently "pending"
        if (user.status === "pending") {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL || "https://tarkavan.thenightowl.team/api"}/coach/profile`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          )

          if (response.ok) {
            const data = await response.json()

            if (data.data?.user_status === "approve") {
              const updatedUser = { ...user, status: "approved" }
              localStorage.setItem("go_elite_user", JSON.stringify(updatedUser))
            }
          }
        }
      } catch (error) {
        console.error("ERROR CHECKING COACH PROFILE:", error)
      }
    }

    checkCoachProfile()
  }, [])

  // Update ref whenever formData changes
  useEffect(() => {
    formDataRef.current = formData
  }, [formData])

  // Update form data in state
  const updateFormData = useCallback(
    (updates: Partial<CoachProfileFormData>) => {
      setFormData((prev) => ({ ...prev, ...updates }))
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
        setFormData(getInitialFormData())
        // Redirect to clean dashboard URL (no query params → modal won't reopen)
        window.location.replace("/coach")
      } else {
        toast.error(result.message || "Failed to create coach profile")
      }
    } catch (err) {
      toast.error("An unexpected error occurred")
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

  // Stable callback for SocialMediaLinks
  const handleSocialMediaUpdate = useCallback(
    (data: SocialMediaData) => {
      updateFormData({
        facebook_link: data.facebook_link || "",
        twitter_link: data.twitter_link || "",
        instagram_link: data.instagram_link || "",
        tiktok_link: data.tiktok_link || "",
        whatsapp_link: data.whatsapp_link || "",
      })
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
            initialPreviewUrl={initialPreview || undefined}
          />
          <BasicInformation
            updateBasicInfo={handleBasicInfoUpdate}
            initialData={{
              firstName: formData.name,
              lastName: formData.last_name,
              dateOfBirth: formData.dob,
              gender: formData.gender,
              nationality: formData.nationality,
              email: formData.email,
              city: formData.city,
              country: formData.country,
            }}
          />
        </div>
        <SportsAndSpecialties
          updateSports={handleSportsUpdate}
          initialData={{
            sport: formData.sports,
            role: formData.current_role,
            coachingTitles: formData.coaching_title,
          }}
        />

        <ExperienceAndEducation
          updateExperience={handleExperienceUpdate}
          initialData={{
            years: formData.years_of_experience,
            education: formData.highest_education,
            history: formData.coaching_education,
          }}
        />

        <CertificationsAndCredentials
          updateCredentials={handleCredentialsUpdate}
        />

        <SocialMediaLinks
          updateSocialMedia={handleSocialMediaUpdate}
          initialData={{
            facebook_link: formData.facebook_link,
            twitter_link: formData.twitter_link,
            instagram_link: formData.instagram_link,
            tiktok_link: formData.tiktok_link,
            whatsapp_link: formData.whatsapp_link,
          }}
        />

        <CoachingPhilosophy
          updatePhilosophy={handlePhilosophyUpdate}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          isEditMode={isEditMode}
          initialData={{
            philosophy: formData.coaching_philosophy,
            playerCentric: formData.player_centric_approach,
            dataDriven: formData.data_driving_training,
          }}
        />
      </div>
    </section>
  )
}
