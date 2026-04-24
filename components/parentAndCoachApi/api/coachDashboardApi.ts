"use client"

import api from "@/lib/api-fetcher"
import type { AxiosError } from "axios"
import type { CoachDashboardData } from "../type/coachDashboardTypes"

export interface CoachDashboardApiResult {
  success: boolean;
  data?: CoachDashboardData;
  message?: string;
  status?: number;
}

/**
 * Fetch coach dashboard data
 */
export async function getCoachDashboard(): Promise<CoachDashboardApiResult> {
  try {
    const res = await api.get("/coach/dashboard")
    
    // Handle response structure similar to auth actions
    if (res.data.status && res.data.data) {
      return { success: true, data: res.data.data }
    } else {
      return { 
        success: false, 
        message: res.data.message || "Failed to load coach dashboard data",
        status: res.status
      }
    }
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string; errors?: any }>
    
    let message = "Error loading coach dashboard data"
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
