"use server"

import api from "@/lib/api-fetcher"
import { TApiError } from "@/types"
import axios from "axios"

export async function createCoachProgram(data: FormData) {
  try {
    const res = await api.post(`/coach/program/add`, data)
    return { success: true, data: res.data }
  } catch (err: unknown) {
    if (axios.isAxiosError<TApiError>(err)) {
      console.log("Error creating coach program:", err?.response?.data)
      return err?.response?.data
    }
  
    return {
      success: false,
      message: "Unexpected error",
      status: 500,
    }
  }
}

export async function getCoachProgramList(filter: string = "active") {
  try {
    const res = await api.get(`/coach/program/list?filter=${filter}`)
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

export async function updateCoachProgram(programId: number | string, data: FormData) {
  try {
    const res = await api.post(`/coach/program/update/${programId}`, data)
    return { success: true, data: res.data }
  } catch (err: unknown) {
    if (axios.isAxiosError<TApiError>(err)) {
      console.log(`Error updating coach program ${programId}:`, err?.response?.data)
      return err?.response?.data
    }
  
    return {
      success: false,
      message: "Unexpected error",
      status: 500,
    }
  }
}

export async function getCoachProgramDetails(programId: number | string) {
  try {
    const res = await api.get(`/coach/program/view/${programId}`)
    return { success: true, data: res.data }
  } catch (err: unknown) {
    if (axios.isAxiosError<TApiError>(err)) {
      console.log(`Error fetching coach program details ${programId}:`, err?.response?.data)
      return err?.response?.data
    }
  
    return {
      success: false,
      message: "Unexpected error",
      status: 500,
    }
  }
}

