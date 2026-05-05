"use server"

import api from "@/lib/api-fetcher"
import { TApiError } from "@/types" 
import axios from "axios"

export async function getPlayerProfile(id: string) {
  try {
    const res = await api.get(`/data/athlete/${id}`) 
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