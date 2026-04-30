export type TPrivacyOption = {
  value: string
  title: string
  description: string
}

export type TChangePasswordData = {
  current_password: string
  new_password: string
  new_password_confirmation: string
}