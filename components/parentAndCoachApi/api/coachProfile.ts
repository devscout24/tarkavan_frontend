"use client"

import api from "@/lib/api-fetcher"
import type { AxiosError } from "axios"
import type {
  CoachProfileFormData,
  CoachProfileResponse,
  CoachProfileApiResult,
} from "../type/coachProfileTypes"

/**
 * Create or update coach profile
 */
export async function createOrUpdateCoachProfile(
  formData: FormData
): Promise<CoachProfileApiResult> {
  try {
    const res = await api.post("/coach/profile/add/update", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    if (res.data.status && res.data.data) {
      return { success: true, data: res.data.data }
    } else {
      return {
        success: false,
        message: res.data.message || "Failed to create/update coach profile",
        status: res.status,
      }
    }
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string; errors?: any }>

    let message = "Error creating/updating coach profile"
    if (error.response?.data?.message) {
      message = error.response.data.message
    } else if (error.response?.data?.errors) {
      const errors = error.response.data.errors
      message =
        typeof errors === "string"
          ? errors
          : Object.values(errors).flat().join(", ")
    } else if (error.message) {
      message = error.message
    }

    const status = error.response?.status || 500

    return { success: false, message, status }
  }
}

/**
 * Helper function to convert CoachProfileFormData to FormData
 */
export function convertToFormData(data: CoachProfileFormData): FormData {
  const formData = new FormData()

  const currentRoleValue =
    typeof data.current_role === "string"
      ? data.current_role
      : typeof data.current_role === "number"
        ? String(data.current_role)
        : data.current_role && typeof data.current_role === "object"
          ? String(
            (
              data.current_role as {
                id?: number | string
                value?: number | string
                name?: string
              }
            ).id ??
            (
              data.current_role as {
                id?: number | string
                value?: number | string
                name?: string
              }
            ).value ??
            ""
          ) ||
          (data.current_role as { name?: string }).name ||
          ""
          : ""

  const playerCentricApproach = Boolean(data.player_centric_approach)
  const dataDrivingTraining = Boolean(data.data_driving_training)
  const privacySettings = data.privacy_settings || {
    visible_reviews: true,
    allow_parent_player_reviews: true,
  }
  const coachingTitles = Array.isArray(data.coaching_title)
    ? data.coaching_title
    : []
  const images = Array.isArray(data.images) ? data.images : []

  // Basic information
  formData.append("name", data.name || "")
  formData.append("last_name", data.last_name || "")
  formData.append("dob", data.dob || "")
  formData.append("gender", data.gender || "male")
  formData.append("nationality", data.nationality || "")
  formData.append("email", data.email || "")
  formData.append("sports", data.sports || "")

  // Profile picture
  if (data.coach_profile_pic) {
    const pic = data.coach_profile_pic as File | string

    if (pic instanceof File) {
      formData.append("coach_profile_pic", pic)
    } else if (typeof pic === "string" && pic.trim()) {
      formData.append("coach_profile_pic", pic)
    }
  }

  // Experience and education
  if (currentRoleValue) {
    formData.append("current_role", currentRoleValue)
  }
  formData.append("years_of_experience", data.years_of_experience || "")
  formData.append("highest_education", data.highest_education || "")
  formData.append("coaching_education", data.coaching_education || "")
  formData.append("coaching_philosophy", data.coaching_philosophy || "")

  // Boolean values
  formData.append("player_centric_approach", playerCentricApproach.toString())
  formData.append("data_driving_training", dataDrivingTraining.toString())

  // Coaching titles
  coachingTitles.forEach((title, index) => {
    if (title.trim()) {
      formData.append(`coaching_title[${index}]`, title)
    }
  })

  // Images
  images.forEach((image, index) => {
    formData.append(`image[${index}]`, image)
  })

  // Privacy settings
  formData.append(
    "privacy_settings[visible_reviews]",
    Boolean(privacySettings.visible_reviews).toString()
  )
  formData.append(
    "privacy_settings[allow_parent_player_reviews]",
    Boolean(privacySettings.allow_parent_player_reviews).toString()
  )

  // Location
  formData.append("city", data.city || "")
  formData.append("country", data.country || "")

  // Social media links
  if (data.facebook_link) {
    formData.append("facebook_link", data.facebook_link)
  }
  if (data.twitter_link) {
    formData.append("twitter_link", data.twitter_link)
  }
  if (data.instagram_link) {
    formData.append("instagram_link", data.instagram_link)
  }
  if (data.tiktok_link) {
    formData.append("tiktok_link", data.tiktok_link)
  }
  if (data.whatsapp_link) {
    formData.append("whatsapp_link", data.whatsapp_link)
  }

  return formData
}
