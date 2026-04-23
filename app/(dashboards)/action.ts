"use server"

import api from "@/lib/api-fetcher"
import { TApiError } from "@/types" 
import axios from "axios"

export async function getSportOptions() {
  try {
    const res = await api.get("/sport/options") 
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


export async function getCompetitionLabel() {
    try {
    const res = await api.get(`/competition/club`)
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









export async function getOrganizationsTypes() {
  try {
    const res = await api.get("/organization/types") 
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



export async function getSearchList(data: FormData) {
  try {
    const res = await api.post(`/search/explore/list` , data)
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

 





























