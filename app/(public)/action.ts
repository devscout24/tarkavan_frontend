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


export async function getChildProfile(id: string) {
  try {
    const res = await api.get(`/profile/player/data/${id}`) 

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

export async function getCoachProfile(id: string) {
  try {
    const res = await api.get(`/data/coach/${id}`) 
 

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

export async function getWebsiteData( ) {
  try {
    const res = await api.get(`/website/data`) 
 

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



