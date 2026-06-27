export type TChatHeadItem = {
  chat_id: number
  conversation_id: string | null
  latest_time: string
  message: string
  user_name: string
  receiver_id: number
  user_image: string
  my_image: string
  chat_image: string | null
  image_id: string | null
  unread_count: number
}


export type TChatMessage = {
  id: number
  sender_id: number
  receiver_id: number
  conversation_id: string
  is_read: number
  message: string | null
  image: string | null
  created_at: string
  updated_at: string

  sender_image: string | null
  receiver_image: string | null

  image_url: string | null
  image_id: string | null
  chatimage: string | null

  sender: TChatUser
  sender_name: string // IGNORE
  receiver_name: string // IGNORE
  receiver: TChatUser
}


export type TChatUser = {
  id: number
  name: string 
  username: string | null
  last_name: string | null
  dob: string | null
  address: string | null
  country_id: number | null
  city_id: number | null
  phone: string | null
  cover_image: string | null
  profile_image: string | null
  email: string
  email_verified_at: string | null
  fcm_token: string | null
  status: string
  post_code: string | null
  is_agree: number
  role: string
  google_id: string | null
  facebook_id: string | null
  apple_id: string | null
  reset_password_token: string | null
  reset_password_token_expires_at: string | null
  latitude: number | null
  longitude: number | null
  otp: string | null
  otp_expires_at: string | null
  otp_verified_at: string | null
  is_verified: boolean
  account_delete_comment: string | null
  account_delete_reason: string | null
  created_at: string
  updated_at: string
  deleted_at: string | null

  coach_profile: TChatCoachProfile | null
  athlete_profile: TAthleteProfile | null
  club: null
}

export type TChatCoachProfile = {
  id: number
  preview: string | null
  name: string
  last_name: string
  dob: string
  gender: string
  status: string
  nationality: string
  email: string
  sports: string
  sport_option_id: number | null
  coach_profile_pic: string | null
  user_id: number
  coaching_title: string | null

  current_role: {
    id: number
    name: string
  }

  years_of_experience: string
  highest_education: string
  coaching_education: string
  coaching_philosophy: string

  player_centric_approach: boolean
  data_driving_training: boolean

  facebook_link: string | null
  twitter_link: string | null
  instagram_link: string | null
  tiktok_link: string | null
  whatsapp_link: string | null

  province: string
  privacy_settings: string
  visible_reviews: boolean
  allow_parent_player_reviews: boolean

  city: string | null
  country: string | null
  country_id: number | null
  city_id: number | null

  created_at: string
  updated_at: string
}

export type TAthleteProfile = {
  id: number
  name: string
  last_name: string
  dob: string
  gender: string
  nationality: string
  email: string
  sports: string
  sport_option_id: number
  jersey_number: number
  dominant_foot: string
  club_team: string
  parent_id: number | null
  user_id: number
  image: string

  primary_position: {
    id: number
    name: string
  }

  secondary_position: {
    id: number
    name: string
  }

  athlete_biography: string
  privacy_settings: string

  total_played_games: number
  total_played_time: number
  goals: number
  assist: number
  yellow_cards: number
  red_cards: number
  clean_sheets: number
  total_saves: number

  status: string
  is_blocked: number

  city: string | null
  country: string | null
  province: string

  country_id: number | null
  city_id: number | null

  preview: string | null

  facebook_link: string | null
  twitter_link: string | null
  instagram_link: string | null
  tiktok_link: string | null
  whatsapp_link: string | null

  created_at: string
  updated_at: string
}