"use server"

import api from "@/lib/api-fetcher"
import { TApiError } from "@/types" 
import axios from "axios"



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

 























