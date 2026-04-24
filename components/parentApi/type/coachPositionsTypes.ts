// Coach Positions Types

export interface CoachPosition {
  id: number
  name: string
}

export interface CoachPositionsResponse {
  status: boolean
  message: string
  data: CoachPosition[]
}

export interface CoachPositionsApiResult {
  success: boolean
  data?: CoachPosition[]
  message?: string
  status?: number
}
