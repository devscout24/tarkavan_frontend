// Sport Options Types

export interface SportOption {
  id: number
  name: string
}

export interface SportOptionsResponse {
  status: boolean
  message: string
  data: SportOption[]
}

export interface SportOptionsApiResult {
  success: boolean
  data?: SportOption[]
  message?: string
  status?: number
}
