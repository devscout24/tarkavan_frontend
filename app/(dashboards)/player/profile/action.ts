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


export async function playerProfileUpdate(data: FormData) {
  try {
    const res = await api.post(`/player/profile/update` , data) 
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

 

export async function playerSettingUpdate(data: FormData) {
  try {
    const res = await api.post(`/parent/profile/update` , data) 
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
 

export async function PlayerVideoUploader(data: FormData) {
  try {
    const res = await api.post(`/parent/profile/update` , data) 
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

 