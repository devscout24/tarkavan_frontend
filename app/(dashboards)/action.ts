"use server"

import api from "@/lib/api-fetcher"
import { TApiError } from "@/types"
import axios from "axios"

export async function getSportOptions() {
  try {
    const res = await api.get("/sport/options")
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


export async function getCompetitionLabel() {
  try {
    const res = await api.get(`/competition/club`)
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



export async function getCities() {
  try {
    const res = await api.get(`/locations/cities`)
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


export async function getCountries() {
  try {
    const res = await api.get(`/locations/countries`)
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









export async function getOrganizationsTypes() {
  try {
    const res = await api.get("/organization/types")
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



export async function getSearchList({ data, currentPage }: { data: FormData, currentPage: string }) {
  try {
    const res = await api.post(`/search/explore/list?page=${currentPage}`, data)
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


export async function addChildOrPlayer(data: FormData) {
  try {
    const res = await api.post(`/player/profile/add`, data)
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


export async function getPlayerPosition() {
  try {
    const res = await api.get(`/player/positions`)
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


export async function getCoachPositions() {
  try {
    const res = await api.get(`/coach/positions`)
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


export async function getPlayerDashboard() {
  try {
    const res = await api.get(`/player/dashboard`)
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




export async function getDateForMonth({ program_id, month }: { program_id: string, month: string }) {

  try {
    const res = await api.get(`/program/${program_id}/available-slots?month=${month}`)
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


export async function getAvailableTimes({ program_id, date }: { program_id: string, date: string }) {
  try {
    const res = await api.get(`/program/${program_id}/available-times?date=${date}`)
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



export async function setPlayerOG({ id, data }: { id: string, data: FormData }) {
  try {
    const res = await api.post(`/preview/athlete/${id}`, data)
    // console.log(res)
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



export async function deleteAccount() {
  try {

    const res = await api.delete(`/auth/delete-account`)
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





























