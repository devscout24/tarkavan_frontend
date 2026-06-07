


"use server"

import api from "@/lib/api-fetcher"
import { TApiError } from "@/types" 
import axios from "axios"

export async function getUpcomingEvents() {
  try {
    const res = await api.get("/user/upcoming/events") 
    return { success: true, data: res.data }
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




export async function programReview(program_id: string , data: FormData) {
  try {
    const res = await api.post(`/coach/program/review/${program_id}` , data) 
    return { success: true, data: res.data }
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




