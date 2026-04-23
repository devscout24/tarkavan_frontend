"use server"

import api from "@/lib/api-fetcher"
import { TApiError } from "@/types"
import axios from "axios"

export async function addRecruitment(data: FormData) {
  try {
    const res = await api.post("/club/recruitments/store", data)
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


export async function updateRecruitment({ data, recruitment_id }: { data: FormData, recruitment_id: string }) {
  try {
    const res = await api.post(`/club/recruitments/update/${recruitment_id}`, data)
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

export async function getRecruitmentDetails(recruitment_id: string) {
  try {
    const res = await api.get(`/club/recruitments/view/${recruitment_id}`)
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

export async function deleteRecruitment(recruitment_id: string) {
  try {
    const res = await api.post(`/club/recruitments/delete/${recruitment_id}`)
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


export async function getRecruitmentList( ) {
  try {
    const res = await api.get(`/club/recruitments/list`)
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



































