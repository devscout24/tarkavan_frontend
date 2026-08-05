"use server"

import moment from "moment"
import api from "@/lib/api-fetcher"
import { TApiError } from "@/types"
import axios from "axios"
import { TPlayerProfilePayload } from "../player-setup/type"

export async function addPlayer(data: TPlayerProfilePayload) {
  const formData = await convertToFormData(data)
  try {
    const res = await api.post(`/player/profile/add`, formData)
    return res.data
  } catch (err: unknown) {
    if (axios.isAxiosError<TApiError>(err)) {
      return err?.response?.data
    }
    return {
      success: false,
      message: "Unexpected error",
      status: 500,
    }
  }
}
export async function addChild(data: TPlayerProfilePayload) {
  const formData = await convertToFormData(data)
  try {
    const res = await api.post(`/parent/child/add`, formData)
    return res.data
  } catch (err: unknown) {
    if (axios.isAxiosError<TApiError>(err)) {
      return err?.response?.data
    }
    return {
      success: false,
      message: "Unexpected error",
      status: 500,
    }
  }
}


export async function updatePlayer(data: TPlayerProfilePayload) {

  const formData = await convertToFormData(data)
 
  try {
    const res = await api.post(`/player/profile/update`, formData )
    return res.data
  } catch (err: unknown) {
    if (axios.isAxiosError<TApiError>(err)) {
      return err?.response?.data
    }
    return {
      success: false,
      message: "Unexpected error",
      status: 500,
    }
  }
}





export async function convertToFormData(data: TPlayerProfilePayload) {
   

  const formData = new FormData()

  formData.append("name", data.firstName || "")
  formData.append("last_name", data.lastName || "")
  formData.append("city", data.city || "")
  formData.append("country", data.country || "")
  formData.append("province", data.province || "")
  formData.append("dob", data.dateOfBirth || "")
  formData.append("gender", data.gender || "")
  formData.append("nationality", data.nationality || "")
  formData.append("email", data.email || "")
  formData.append("sports_selection", data.sport || "")
  formData.append("jersey_number", data.jerseyNumber || "")
  formData.append("dominant_foot", data.dominantFoot || "")
  formData.append("club_team", data.clubTeam || "")
  formData.append("primary_position", data.primaryPosition || "")
  formData.append("secondary_position", data.secondaryPosition || "")
  formData.append("athlete_biography", data.biography || "")
  formData.append("privacy_settings", data.privacySettings.visibility || "")
  formData.append(
    "total_played_games",
    data.seasonStats.values.gamesPlayed || ""
  )
  formData.append("goals", data.seasonStats.values.goals || "")
  formData.append("assist", data.seasonStats.values.assists || "")
  formData.append("yellow_cards", data.seasonStats.values.yellowCards || "")
  formData.append("red_cards", data.seasonStats.values.redCards || "")
  formData.append("clean_sheets", data.seasonStats.values.cleanSheets || "")
  formData.append("total_saves", data.seasonStats.values.totalSaves || "")
  Object.entries(data.strengths.selectedByCategory).forEach(
    ([strengthType, strengthName], index) => {
      formData.append(`strengths[${index}][strength_type]`, strengthType)
      formData.append(`strengths[${index}][strength_name]`, strengthName)
    }
  )

  formData.append("title[0]", data.achievements.title)
  formData.append("description[0]", data.achievements.description)
  formData.append(
    "date_earned[0]",
    moment(data.achievements.dateEarned).format("YYYY/MM/DD")
  )

  const achievementFile = data?.achievements?.uploadedAssets?.file
  if (achievementFile != null) {
    formData.append("image[0]", achievementFile as Blob)
  }

  const profileImageFile = data?.profilePhoto
  if (profileImageFile instanceof File) {
    formData.append("profile_image", profileImageFile)
  }

  data?.highlights?.uploadedItems
    .filter((item) => item.type === "video" && item.file instanceof File)
    .forEach((item, index) => {
      formData.append(`reels[${index}]`, item.file as File)
    })

  formData.append("facebook_link", data.highlights.facebook_link)
  formData.append("whatsapp_link", data.highlights.whatsapp_link)
  formData.append("twitter_link", data.highlights.twitter_link)

  return formData
}
