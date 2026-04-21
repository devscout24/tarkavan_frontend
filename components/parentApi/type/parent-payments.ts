export interface PaymentSummary {
  total_paid: number
  pending_payments: number
  refunded_payments: number
  total_transactions: number
}

export interface PaymentPagination {
  current_page: number
  per_page: number
  total: number
  last_page: number
}

export interface ParentPaymentItem {
  id?: string | number
  program_name?: string
  programName?: string
  child_name?: string
  childName?: string
  player_name?: string
  amount?: number | string
  hst?: number | string
  discount?: number | string
  total?: number | string
  total_amount?: number | string
  date?: string
  payment_date?: string
  status?: string | number
  payment_status?: string
  [key: string]: unknown
}

export interface ParentPaymentsData {
  summary: PaymentSummary
  payments: ParentPaymentItem[]
  pagination: PaymentPagination
}

export interface ParentPaymentsResponse {
  status: boolean
  message: string
  data: ParentPaymentsData
}
