"use server"

import api from "@/lib/api-fetcher"
import { TApiError } from "@/types" 
import axios from "axios"


export async function clubProfileSetup(data: FormData) {
  try {
    const res = await api.post("/club/profile/add/update" , data) 
    return { success: true, data: res.data }
  } catch (err: unknown) {
    if (axios.isAxiosError<TApiError>(err)) {
      const errors = err.response?.data?.errors

      const message =
        errors
          ? Object.values(errors).flat().join(", ")
          : "Something went wrong"

      const status = err.response?.status || 500

      return { success: false, message, status }
    }

    return {
      success: false,
      message: "Unexpected error",
      status: 500,
    }
  }
}



export async function getClubDashboard() {
  try {
    const res = await api.get("/club/dashboard") 
    return { success: true, data: res.data }
  } catch (err: unknown) { 
    if (axios.isAxiosError<TApiError>(err)) { 
      return err?.response?.data
    }

    return {
      success: false,
      message: "Unexpected error",
      status: 500,
    }
  }
}




