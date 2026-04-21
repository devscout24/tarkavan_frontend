// Parent Profile Types

export interface ParentProfile {
  name: string
  email: string
  profile_image: string
  privacy_settings: string | null
}

export interface ProfileResponse {
  status: boolean
  message: string
  data: ParentProfile
}

export interface ProfileApiResult {
  success: boolean
  data?: ParentProfile
  message?: string
  status?: number
}
