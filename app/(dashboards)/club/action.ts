"use server"

import api from "@/lib/api-fetcher"
import { TApiError } from "@/types"
import axios from "axios"
import { revalidatePath } from "next/cache"

export async function clubProfileSetup(data: FormData) {
  try {
    const res = await api.post("/club/profile/add/update", data)
    return { success: true, data: res.data }
  } catch (err: unknown) {
    if (axios.isAxiosError<TApiError>(err)) {
      const errors = err.response?.data?.errors

      const message = errors
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

export async function getClubDashboard() {
  try {
    const res = await api.get("/club/dashboard") 
    return { success: true, data: res.data.data }
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


export async function getProfile() {
  try {
    const res = await api.get("/club/profile")
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




// club subscription action

export async function getSubscribeClubPlan() {
  try {
    const res = await api.get("/subscription/plans")
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

export async function purchaseSubscription(plan_id: string) {  
  try {
    const res = await api.post("/club/subscription/purchase" , {plan_id} ) 
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


export async function updateSubscription(plan_id: string) {  
  try {
    const res = await api.post("/club/subscription/update" , {plan_id} )
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



// club profile actions
export async function getClubProfile() {  
  try {
    const res = await api.get("/club/profile")
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




// club my team actions
export async function createTeam(data: FormData) {
  
  try {
    const res = await api.post("/club/team/add", data)
    // revalidatePath 
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

export async function deleteTeam(team_id: string) {
  
  try {
    const res = await api.delete(`/club/team/delete/${team_id}`)
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

export async function updateTeam(team_id: string) {
  
  try {
    const res = await api.post(`/club/team/update/${team_id}`)
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

export async function teamPlayerList(team_id: string) {
  
  try {
    const res = await api.get(`/club/team/players/list/${team_id}`)
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



// club program actions
export async function createProgram(data: FormData) {
    try {
    const res = await api.post(`/club/program/add`, data)
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

export async function updateProgram({ program_id, data}: {program_id: string, data: FormData}) {
    try {
    const res = await api.post(`/club/program/update/${program_id}`, data)
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

export async function getProgramList() {
    try {
    const res = await api.get(`/club/program/list`)
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



export async function getProgramDetails(program_id: string) {
    try {
    const res = await api.get(`/club/program/view/${program_id}`)
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

export async function deleteProgram(program_id: string) {
    try {
    const res = await api.post(`/club/program/delete/${program_id}`)
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



export async function requestMatch({match_id , requested_club_id }: {match_id: string, requested_club_id: string}) {
    try {
    const res = await api.post(`/match/bid`, {
        match_id,
        requested_club_id
    })
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




export async function updateClubSetting(data: FormData) {
  try {
    const res = await api.post(`/club/settings/update`, data)
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
