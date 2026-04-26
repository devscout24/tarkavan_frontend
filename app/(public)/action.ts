"use server"

import api from "@/lib/api-fetcher"
import { TApiError } from "@/types"
import axios from "axios"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PlayerBasicInfo {
  id: number
  name: string
  last_name: string
  full_name: string
  dob: string
  age: number
  gender: string
  nationality: string
  email: string
  image: string | null
  biography: string
  privacy_settings: string
  sports: string
  sport_option_id: number | null
  sport_option: string | null
}

export interface PlayerPositionInfo {
  primary_position: string | null
  secondary_position: string | null
  jersey_number: number
  dominant_foot: string
  club_team: string
  sports_selection: string
}

export interface PlayerStats {
  total_matches: number
  total_played_time: number
  goals: number
  assists: number
  yellow_cards: number
  red_cards: number
  clean_sheets: number
  total_saves: number
}

export interface Achievement {
  id: number
  title: string
  description: string
  date_earned: string
  image: string | null
}

export interface PlayerStrength {
  id: number
  strength_type: string
  strength_name: string
  endorse_count: number
  endorsed: boolean
}

export interface PlayerVideo {
  id: number
  video_url: string
  status: string
  uploaded_at: string
}

export interface PlayerSeasonStats {
  season_year: number
  total_played_games: number
  total_played_time: number
  goals: number
  assist: number
  yellow_cards: number
  red_cards: number
  clean_sheets: number
  total_saves: number
  penalty_saves: number
}

export interface PlayerRootData {
  basic_info: PlayerBasicInfo
  position_info: PlayerPositionInfo
  player_stats: PlayerStats
  achievements: Achievement[]
  strengths: PlayerStrength[]
  gallery: string[]
  videos: PlayerVideo[]
  media_links: string[]
  season_stats_last_five_years: PlayerSeasonStats[]
}

// What the Laravel API actually returns:
// { success: true, message: "...", data: PlayerRootData }
export interface ProfileApiResponse {
  success: boolean
  message: string
  data: PlayerRootData
}

// What getPublicProfile returns on success:
// axios wraps it as res.data → ProfileApiResponse
// so res.data.data → PlayerRootData  ← this is the problem, there is NO double .data
// axios response: AxiosResponse<ProfileApiResponse>
// res.data = ProfileApiResponse  (axios unwraps one level)
// so getPublicProfile returns { success: true, data: ProfileApiResponse }
//                                                    ↑ this .data is ProfileApiResponse
//                                                      and ProfileApiResponse.data is PlayerRootData

export type GetPublicProfileResult =
  | { success: true; data: ProfileApiResponse }
  | TApiError
  | { success: false; message: string; status: number }

// ─── Action ───────────────────────────────────────────────────────────────────

export async function getPublicProfile({
  id,
}: {
  id: string
}): Promise<GetPublicProfileResult> {
  try {
    const res = await api.get<ProfileApiResponse>(`/data/athlete/${id}`)
    //          res.data is ProfileApiResponse (axios unwraps automatically)
    return { success: true, data: res.data }
  } catch (err: unknown) {
    if (axios.isAxiosError<TApiError>(err)) {
      return (
        err?.response?.data ?? {
          success: false,
          message: "No response",
          status: 500,
        }
      )
    }
    return {
      success: false,
      message: "Unexpected error",
      status: 500,
    }
  }
}
