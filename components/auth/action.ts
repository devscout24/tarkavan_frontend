"use server"

import api from "@/lib/api-fetcher"
import type { AxiosError } from "axios"

export async function registerUser(data: FormData) {
  try {
    const res = await api.post("/parent/register", data)
    return { success: true, data: res.data }
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>
    const message =
      error.response?.data?.message || error.message || "Something went wrong"
    const status = error.response?.status || 500

    return { success: false, message, status }
  }
}
