// Coach Profile Types

export interface CoachProfileFormData {
  name: string
  last_name: string
  dob: string
  gender: 'male' | 'female' | 'other'
  nationality: string
  email: string
  sports: string
  coach_profile_pic?: File
  current_role?: string
  years_of_experience: string
  highest_education: string
  coaching_education: string
  coaching_philosophy: string
  player_centric_approach: boolean
  data_driving_training: boolean
  coaching_title: string[]
  images: File[]
  privacy_settings: {
    visible_reviews: boolean
    allow_parent_player_reviews: boolean
  }
  city: string
  country: string
}

export interface CurrentRole {
  id: number
  name: string
}

export interface CoachingTitle {
  id: number
  coach_id: number
  user_id: number
  title: string
  created_at: string
  updated_at: string
}

export interface Media {
  id: number
  // Add media properties as needed
}

export interface User {
  id: number
  name: string
  username?: string
  last_name?: string
  dob?: string
  address?: string
  country_id?: number
  city_id?: number
  phone?: string
  cover_image?: string
  profile_image?: string
  email: string
  email_verified_at?: string
  fcm_token?: string
  status: string
  post_code?: string
  is_agree: number
  role: string
  google_id?: string
  facebook_id?: string
  apple_id?: string
  reset_password_token?: string
  reset_password_token_expires_at?: string
  latitude?: number
  longitude?: number
  otp?: string
  otp_expires_at?: string
  otp_verified_at?: string
  is_verified: boolean
  account_delete_comment?: string
  account_delete_reason?: string
  created_at: string
  updated_at: string
  deleted_at?: string
}

export interface CoachProfileData {
  user_id: number
  name: string
  last_name: string
  dob: string
  gender: string
  status: string
  nationality: string
  email: string
  sport_option_id?: number
  sports: string
  city: string
  city_id?: number
  country: string
  country_id?: number
  coach_profile_pic?: string
  current_role?: CurrentRole
  years_of_experience: string
  highest_education: string
  coaching_education: string
  coaching_philosophy: string
  facebook_link?: string
  twitter_link?: string
  instagram_link?: string
  tiktok_link?: string
  whatsapp_link?: string
  player_centric_approach: boolean
  data_driving_training: boolean
  visible_reviews: boolean
  allow_parent_player_reviews: boolean
  updated_at: string
  created_at: string
  id: number
  user: User
  coaching_titles: CoachingTitle[]
  media: Media[]
  current_position?: CurrentRole
}

export interface CoachProfileResponse {
  status: boolean
  message: string
  data: CoachProfileData
}

export interface CoachProfileApiResult {
  success: boolean
  data?: CoachProfileData
  message?: string
  status?: number
}
