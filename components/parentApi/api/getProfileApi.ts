"use client"

import api from "@/lib/api-fetcher"
import type { AxiosError } from "axios"
import type { ParentProfile, ProfileResponse, ProfileApiResult } from "../type/parentProfile"

/**
 * Fetch parent profile data
 */
export async function getProfile(): Promise<ProfileApiResult> {
  try {
    const res = await api.get("/parent/profile")
    
    // Handle response structure similar to auth actions
    if (res.data.status && res.data.data) {
      return { success: true, data: res.data.data }
    } else {
      return { 
        success: false, 
        message: res.data.message || "Failed to load profile data",
        status: res.status
      }
    }
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string; errors?: any }>
    
    // Handle error structure similar to auth actions
    let message = "Error loading profile"
    if (error.response?.data?.message) {
      message = error.response.data.message
    } else if (error.response?.data?.errors) {
      // Handle validation errors like in auth actions
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
