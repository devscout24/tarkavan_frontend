"use client"

import api from "@/lib/api-fetcher"
import type { AxiosError } from "axios"
import type { 
  SportOptionsResponse, 
  SportOptionsApiResult 
} from "../type/sportOptionsTypes"

/**
 * Fetch sport options
 */
export async function getSportOptions(): Promise<SportOptionsApiResult> {
  try {
    const res = await api.get("/sport/options")
    
    if (res.data.status && res.data.data) {
      return { success: true, data: res.data.data }
    } else {
      return { 
        success: false, 
        message: res.data.message || "Failed to load sport options",
        status: res.status
      }
    }
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string; errors?: any }>
    
    let message = "Error loading sport options"
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
