export type TApiError = {
  status: boolean
  message: number | string
  errors?: Record<string, string[]>
}

