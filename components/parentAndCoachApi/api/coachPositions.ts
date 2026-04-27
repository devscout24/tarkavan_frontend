"use server"

import api from "@/lib/api-fetcher"
import { TApiError } from "@/types" 
import axios from "axios"
 
export async function getCoachPositions()  {
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
  }  catch (err: unknown) {
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
