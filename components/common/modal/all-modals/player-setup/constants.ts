import { TPlayerProfilePayload } from "./type"

export const INITIAL_PLAYER_PAYLOAD: TPlayerProfilePayload = {
  // Core Identity
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  nationality: "",
  email: "",
  sport: "",
  jerseyNumber: "",
  dominantFoot: "",
  clubTeam: "",
  country: "",
  city: "",
  province: "",

  profilePhoto: null,
  profilePhotoPreview: "",
  profilePhotoNames: [],

  // Position
  primaryPosition: "",
  secondaryPosition: "",

  // Biography
  biography: "",

  // Season Stats
  seasonStats: {
    activeTab: "outfield",
    values: {
      gamesPlayed: "",
      goals: "",
      assists: "",
      yellowCards: "",
      redCards: "",
      cleanSheets: "",
      totalSaves: "",
    },
  },

  // Strengths
  strengths: {
    activeCategoryId: "technical",
    selectedByCategory: {
      technical: "",
      tactical: "",
      mental: "",
      physical: "",
      attacking: "",
      defending: "",
      aerial: "",
    },
  },

  // Highlights
  highlights: {
    showcaseValue: "",
    selectedShowcaseSource: null,
    facebook_link: "",
    whatsapp_link: "",
    twitter_link: "",
    uploadedItems: [],
  },

  // Achievement
  achievements: {
    title: "",
    description: "",
    dateEarned: "",
    uploadedAssets: {
      id: "",
      name: "",
      type: "image",
      file: undefined,
    },
  },

  // Privacy
  privacySettings: {
    visibility: "public",
  },
}

export type SetupStepId = "identity" | "position_skills" | "stats" | "media_awards"

export interface SetupStep {
  id: SetupStepId
  stepNumber: number
  title: string
  shortLabel: string
  description: string
}

export const SETUP_STEPS: SetupStep[] = [
  {
    id: "identity",
    stepNumber: 1,
    title: "Identity & Bio",
    shortLabel: "Identity",
    description: "Personal details, athletic profile & biography",
  },
  {
    id: "position_skills",
    stepNumber: 2,
    title: "Positions & Skills",
    shortLabel: "Positions & Skills",
    description: "Field positioning & top 7 athletic strengths",
  },
  {
    id: "stats",
    stepNumber: 3,
    title: "Season Stats",
    shortLabel: "Season Stats",
    description: "Current season performance and match records",
  },
  {
    id: "media_awards",
    stepNumber: 4,
    title: "Media & Awards",
    shortLabel: "Media & Awards",
    description: "Reels, social links & major athletic achievements",
  },
]
