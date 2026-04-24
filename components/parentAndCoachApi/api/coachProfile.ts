"use client"

import api from "@/lib/api-fetcher"
import type { AxiosError } from "axios"
import type { 
  CoachProfileFormData, 
  CoachProfileResponse, 
  CoachProfileApiResult 
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
        'Content-Type': 'multipart/form-data',
      },
    })
    
    if (res.data.status && res.data.data) {
      return { success: true, data: res.data.data }
    } else {
      return { 
        success: false, 
        message: res.data.message || "Failed to create/update coach profile",
        status: res.status
      }
    }
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string; errors?: any }>
    
    let message = "Error creating/updating coach profile"
    if (error.response?.data?.message) {
      message = error.response.data.message
    } else if (error.response?.data?.errors) {
      const errors = error.response.data.errors
      message = typeof errors === 'string' 
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
  
  // Basic information
  formData.append('name', data.name)
  formData.append('last_name', data.last_name)
  formData.append('dob', data.dob)
  formData.append('gender', data.gender)
  formData.append('nationality', data.nationality)
  formData.append('email', data.email)
  formData.append('sports', data.sports)
  
  // Profile picture
  if (data.coach_profile_pic) {
    formData.append('coach_profile_pic', data.coach_profile_pic)
  }
  
  // Experience and education
  if (data.current_role) {
    formData.append('current_role', data.current_role)
  }
  formData.append('years_of_experience', data.years_of_experience)
  formData.append('highest_education', data.highest_education)
  formData.append('coaching_education', data.coaching_education)
  formData.append('coaching_philosophy', data.coaching_philosophy)
  
  // Boolean values
  formData.append('player_centric_approach', data.player_centric_approach.toString())
  formData.append('data_driving_training', data.data_driving_training.toString())
  
  // Coaching titles
  data.coaching_title.forEach((title, index) => {
    if (title.trim()) {
      formData.append(`coaching_title[${index}]`, title)
    }
  })
  
  // Images
  data.images.forEach((image, index) => {
    formData.append(`image[${index}]`, image)
  })
  
  // Privacy settings
  formData.append('privacy_settings[visible_reviews]', data.privacy_settings.visible_reviews.toString())
  formData.append('privacy_settings[allow_parent_player_reviews]', data.privacy_settings.allow_parent_player_reviews.toString())
  
  // Location
  formData.append('city', data.city)
  formData.append('country', data.country)
  
  return formData
}
