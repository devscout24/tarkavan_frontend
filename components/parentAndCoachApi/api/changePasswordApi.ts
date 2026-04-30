"use client"

import api from "@/lib/api-fetcher"
import type { AxiosError } from "axios"
import type {  ChangePasswordResponse, ChangePasswordApiResult } from "../type/changePassword"

/**
 * Change user password
 */
export async function changePassword(passwordData: any): Promise<ChangePasswordApiResult> {
  try {
    const res = await api.post("/change/password", passwordData)
    
    // Handle response structure
    if (res.data.status) {
      return { 
        success: true, 
        message: res.data.message || "Password changed successfully" 
      }
    } else {
      return { 
        success: false, 
        message: res.data.message || "Failed to change password",
        status: res.status
      }
    }
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string; errors?: any }>
    
    // Handle error structure
    let message = "Error changing password"
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
