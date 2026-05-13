"use server"

import api from "@/lib/api-fetcher"
import { TApiError } from "@/types" 
import axios from "axios"
import { revalidatePath } from "next/cache"



export async function getProfileDetails(data: FormData) {
  try {
    const res = await api.post(`/search/explore/view/player` , data)
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




// vote to player
export async function createVote(data: FormData) {
  try {
    const res = await api.post(`/player/vote` , data)
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

export async function deleteVote(vote_id: string) {
  try {
    const res = await api.get(`/player/vote/${vote_id}`)
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

export async function endorseProfile(formData: FormData) {
  try {
    const res = await api.post(`/profile/player/strength/endorse`, formData)
    revalidatePath(`/profile/player/${formData.get("athlete_profile_id")}`)
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

export async function storeVote(formData: FormData) {
  try {
    const res = await api.post(`/player/vote`, formData)
    revalidatePath(`/profile/player/${formData.get("athlete_profile_id")}`)
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

 























