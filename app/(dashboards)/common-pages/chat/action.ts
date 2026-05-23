"use server"

import api from "@/lib/api-fetcher"
import { TApiError } from "@/types"
import axios from "axios"

export async function sendMessage(data: FormData) {
  try {
    const res = await api.post("/chat/send", data)
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


export async function getChatList() {
  try {
    const res = await api.get("/chat/list/data")
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

export async function getConversation(conversation_id: string) {
  try {
    const res = await api.get(`/chat/get/${conversation_id}`)
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
