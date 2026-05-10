"use server"

import api from "@/lib/api-fetcher"
import { TApiError  } from "@/types"
import axios from "axios"
import { Form } from "radix-ui"

export async function getParentDashboard() {
  try {
    const res = await api.get("/parent/dashboard") 
    return { success: true, data: res.data }
  } catch (err: unknown) {
    if (axios.isAxiosError<TApiError>(err)) {
      const errors = err.response?.data?.errors

      const message = errors
        ? Object.values(errors).flat().join(",")
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

export async function addChild(data: FormData) {
  try {
    const res = await api.post("/parent/child/add" , data ) 
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

export async function childInvite(data: FormData) {
  try {
    const res = await api.post("/child/send/invitation" , data ) 
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

export async function removeChild(id: string) {
  try {
    const res = await api.get(`/parent/child/remove/${id}`) 
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

export async function blockChild(id: string) {
  try {
    const res = await api.get(`/parent/child/block/${id}`) 
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

export async function bookProgram(data: FormData) {
  try {
    const res = await api.post(`/program/booking`, data) 
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

export async function updateChildProfile({data , child_id}: { data: FormData, child_id: string }) {
  try {
    const res = await api.post(`/parent/child/update/${child_id}`, data) 
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
