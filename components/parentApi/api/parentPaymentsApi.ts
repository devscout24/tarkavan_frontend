import api from "@/lib/api-fetcher"
import type { AxiosError } from "axios"
import type { ParentPaymentsResponse } from "../type/parent-payments"

export interface FetchParentPaymentsParams {
  page?: number
  per_page?: number
  status?: string
}

export async function fetchParentPayments(
  params?: FetchParentPaymentsParams
): Promise<ParentPaymentsResponse> {
  try {
    const response = await api.post<ParentPaymentsResponse>(
      "/player/payment/list",
      params ?? {}
    )

    return response.data
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message?: string }>

    return {
      status: false,
      message:
        axiosError.response?.data?.message ??
        axiosError.message ??
        "Failed to load payments.",
      data: {
        summary: {
          total_paid: 0,
          pending_payments: 0,
          refunded_payments: 0,
          total_transactions: 0,
        },
        payments: [],
        pagination: {
          current_page: 1,
          per_page: 15,
          total: 0,
          last_page: 1,
        },
      },
    }
  }
}
