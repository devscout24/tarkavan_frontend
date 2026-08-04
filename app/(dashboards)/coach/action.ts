"use server"

import api from "@/lib/api-fetcher"
import { TApiError } from "@/types"
import axios from "axios"

export async function getCoachDashboard() {
  try {
    const res = await api.get(`/coach/dashboard`)
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

export async function getCoachOverview() {
  try {
    const res = await api.get(`/coach/dashboard`)
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

export async function createCoachProgram(data: FormData) {
  try {
    const res = await api.post(`/coach/program/add`, data)
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

export async function getCoachProgramList(filter: { program_type?: string, status?: string , page?: number }) {
  try {
    const res = await api.get(`/coach/program/list?program_type=${filter.program_type}&filter=${filter.status}&page=${filter.page}`)
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
      return err?.response?.data
    }
  
    return {
      success: false,
      message: "Unexpected error",
      status: 500,
    }
  }
}


export async function applyRecruitment(data: FormData) {
  try {
    const res = await api.post(`/recruitment/apply` , data)
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

export async function getCoachEditData() {
  try {
    const res = await api.get(`/coach/profile/data/edit`)
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


export async function submitStripeData(data: FormData) {
  try {
    const res = await api.post(`/stripe/account/set`, data)
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

export async function getStripeData() {
  try {
    const res = await api.post(`/stripe/data/get`)
    return res.data
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

export async function resetStripeData() {
  try{
    const res = await api.post(`/stripe/data/get` , { reset: true })
    return res.data
  }catch (err: unknown) {
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