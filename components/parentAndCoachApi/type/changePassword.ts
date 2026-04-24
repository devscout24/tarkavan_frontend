// Change Password Types

export interface ChangePasswordData {
  current_password: string
  new_password: string
  new_password_confirmation: string
}

export interface ChangePasswordResponse {
  status: boolean
  message: string
  data: null
}

export interface ChangePasswordApiResult {
  success: boolean
  message?: string
  status?: number
}
