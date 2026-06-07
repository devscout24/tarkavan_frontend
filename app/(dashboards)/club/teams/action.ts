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

export async function getTeamDetails(team_id: string) {
  try {
    const res = await api.get(`/club/team/players/list/${team_id}`)
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

export async function releasePlayer(team_player_id: string) {
  try {
    const res = await api.get(`/club/team/player/release/data?team_player_id=${team_player_id}`) 
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


export async function TransferPlayerOrCoach(data: FormData) {
  try {
    const res = await api.post(`/club/team/player/transfer`, data) 
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

























