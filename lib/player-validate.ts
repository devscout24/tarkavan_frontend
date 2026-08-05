import { TPlayerProfilePayload } from "@/components/common/modal/all-modals/player-setup/type"
import { toast } from "sonner"

export function validatePlayerProfilePayload(payload: TPlayerProfilePayload) {
  if (!payload.firstName) {
    toast.error("First name is required")
    return false
  }

  if (!payload.lastName) {
    toast.error("Last name is required")
    return false
  }

  if (!payload.dateOfBirth) {
    toast.error("Date of birth is required")
    return false
  }

  if (!payload.gender) {
    toast.error("Gender is required")
    return false
  }

  if (!payload.nationality) {
    toast.error("Nationality is required")
    return false
  }

  if (!payload.email) {
    toast.error("Email is required")
    return false
  }

  if (!payload.sport) {
    toast.error("Sport is required")
    return false
  }

  if (!payload.jerseyNumber) {
    toast.error("Jersey number is required")
    return false
  }

  if (!payload.dominantFoot) {
    toast.error("Dominant foot is required")
    return false
  }

  if (!payload.clubTeam) {
    toast.error("Club team is required")
    return false
  }

  if (!payload.country) {
    toast.error("Country is required")
    return false
  }

  if (!payload.city) {
    toast.error("City is required")
    return false
  }

  if (!payload.province) {
    toast.error("Province is required")
    return false
  }

  if (!payload.primaryPosition) {
    toast.error("Primary position is required")
    return false
  }

  if (!payload.secondaryPosition) {
    toast.error("Secondary position is required")
    return false
  }

//   if (!payload.seasonStats.values.gamesPlayed) {
//     toast.error("Games played is required")
//     return false
//   }

//   if (!payload.seasonStats.values.goals) {
//     toast.error("Goals is required")
//     return false
//   }

//   if (!payload.seasonStats.values.assists) {
//     toast.error("Assists is required")
//     return false
//   }

//   if (!payload.seasonStats.values.yellowCards) {
//     toast.error("Yellow cards is required")
//     return false
//   }

//   if (!payload.seasonStats.values.redCards) {
//     toast.error("Red cards is required")
//     return false
//   }
//   if (!payload.seasonStats.values.cleanSheets) {
//     toast.error("Clean sheets is required")
//     return false
//   }
//   if (!payload.seasonStats.values.totalSaves) {
//     toast.error("Total saves is required")
//     return false
//   }

  if(!payload.achievements.title){
    toast.error("Achievement title is required")
    return false
  }

  return true

}
