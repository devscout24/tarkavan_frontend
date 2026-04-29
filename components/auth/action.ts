"use server"

import api from "@/lib/api-fetcher"
import { TApiError } from "@/types"
import type { AxiosError } from "axios" 
import axios from "axios"

export async function registerUser(data: FormData) {
  try {
    const res = await api.post("/parent/register", data)
    
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

export async function getForgetPassCode(data: string) {
  try {
    const res = await api.post("/auth/forget/password", { email: data })
    return { success: true, data: res.data }
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>
    const message =
      error.response?.data?.message || error.message || "Something went wrong"
    const status = error.response?.status || 500

    return { success: false, message, status }
  }
}


export async function verifyOPT (data: { email: string; otp: string | number }) {
  try {
    const res = await api.post("/auth/check-otp", data)
    return { success: true, data: res.data }
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>
    const message =
      error.response?.data?.message || error.message || "Something went wrong"
    const status = error.response?.status || 500

    return { success: false, message, status }
  }
}


export async function setNewPassword (data: { email: string;  password: string; reset_password_token: string , password_confirmation: string }) {
  try {
    const res = await api.post("/auth/reset-password", data)
    return { success: true, data: res.data }
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>
    const message =
      error.response?.data?.message || error.message || "Something went wrong"
    const status = error.response?.status || 500

    return { success: false, message, status }
  }
}


export async function loginUser (data: { email: string;  password: string; }) {
  try {
    const res = await api.post("/auth/login", data)
    return { success: true, data: res.data }
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>
    const message =
      error.response?.data?.message || error.message || "Something went wrong"
    const status = error.response?.status || 500

    return { success: false, message, status }
  }
}
