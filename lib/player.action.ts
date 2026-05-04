"use server"

import { TPlayerProfileForm } from "@/types/player.type"

export async function updatePlayerProfile(formData: FormData) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/player/profile`, {
      method: "PUT",
      headers: {
        // Add your auth header here, e.g.:
        // Authorization: `Bearer ${token}`,
      },
      body: formData,
    })

    const data = await res.json()

    if (!res.ok) {
      return { success: false, message: data?.message || "Failed to update profile" }
    }

    return { success: true, data }
  } catch (error) {
    console.error("updatePlayerProfile error:", error)
    return { success: false, message: "Something went wrong" }
  }
}

export async function buildPlayerFormData(values: TPlayerProfileForm): Promise<FormData> {
  const fd = new FormData()

  // Basic fields
  const basic: (keyof TPlayerProfileForm)[] = [
    "name", "last_name", "dob", "gender", "nationality", "email",
    "sports_selection", "jersey_number", "dominant_foot", "club_team",
    "primary_position", "secondary_position", "athlete_biography",
    "privacy_settings", "total_played_games", "goals", "assist",
    "yellow_cards", "red_cards", "clean_sheets", "total_saves",
  ]
  basic.forEach((key) => {
    if (values[key] !== undefined && values[key] !== null) {
      fd.append(key, values[key] as string)
    }
  })

  // Strengths as indexed array
  values.strengths.forEach((s, i) => {
    fd.append(`strengths[${i}][strength_type]`, s.strength_type)
    fd.append(`strengths[${i}][strength_name]`, s.strength_name)
  })

  // Achievements as indexed array
  values.achievements.forEach((a, i) => {
    fd.append(`description[${i}]`, a.description)
    fd.append(`date_earned[${i}]`, a.date_earned)
    fd.append(`title[${i}]`, a.title)
    if (a.link) fd.append(`link[${i}]`, a.link)
    if (a.link_status) fd.append(`link_status[${i}]`, a.link_status)
    if (a.image) fd.append(`image[${i}]`, a.image)
  })

  // Files
  if (values.profile_image) fd.append("profile_image", values.profile_image)
  values.profile_gallery?.forEach((f, i) => fd.append(`profile_gallery[${i}]`, f))
  values.reels?.forEach((f, i) => fd.append(`reels[${i}]`, f))

  return fd
}