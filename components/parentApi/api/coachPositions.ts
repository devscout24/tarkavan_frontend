"use client"

import api from "@/lib/api-fetcher"
import type { AxiosError } from "axios"
import type { 
  CoachPositionsResponse, 
  CoachPositionsApiResult 
} from "../type/coachPositionsTypes"

/**
 * Fetch coach positions
 */
export async function getCoachPositions(): Promise<CoachPositionsApiResult> {
  try {
    const res = await api.get("/coach/positions")
    
    if (res.data.status && res.data.data) {
      return { success: true, data: res.data.data }
    } else {
      return { 
        success: false, 
        message: res.data.message || "Failed to load coach positions",
        status: res.status
      }
    }
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string; errors?: any }>
    
    let message = "Error loading coach positions"
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
