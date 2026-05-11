"use server"

import api from "@/lib/api-fetcher"
import { TApiError } from "@/types"
import axios from "axios"

export async function getParentPaymentList(status: string) {
  try {
    const res = await api.post(`/player/payment/list${status ? `?status=${status}` : ""}`)
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

export async function getPaymentExport(booking_id: string) {
  try {
    // Request binary data as arraybuffer on server, then convert to base64
    const res = await api.post(`/player/payment/dowload/${booking_id}`, undefined, {
      responseType: "arraybuffer",
    })

    const base64 = Buffer.from(res.data).toString("base64")
    const contentType = res.headers?.["content-type"] || "application/pdf"

    return { success: true, data: base64, contentType }
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