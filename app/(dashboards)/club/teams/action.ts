"use server"

import api from "@/lib/api-fetcher"
import { TApiError } from "@/types"
import axios from "axios"
import { revalidatePath } from "next/cache"



export async function getTeams() {
  try {
    const res = await api.get("/club/team/list")
    revalidatePath("/club/teams", "page")
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

























