export type SeasonStatsValues = {
  outfieldGamesPlayed: string
  outfieldGoals: string
  outfieldAssists: string
  outfieldYellowCards: string
  outfieldRedCards: string
  goalkeeperGamesPlayed: string
  goalkeeperGoals: string
  goalkeeperAssists: string
  goalkeeperYellowCards: string
  goalkeeperRedCards: string
  goalkeeperCleanSheets: string
  goalkeeperTotalSaves: string
}

export type WizardState = {
  currentStep: number
  forms: {
    coreIdentity: {
      profilePhotoNames: string[]
      firstName: string
      lastName: string
      dateOfBirth?: string
      gender: string
      nationality: string
      email: string
      sport: string
      jerseyNumber: string
      dominantFoot: string
      clubTeam: string
    }
    positionMap: {
      primaryPosition: string
      secondaryPosition: string
    }
    seasonStats: {
      activeTab: "outfield" | "goalkeeper"
      values: SeasonStatsValues
    }
    strengths: {
      activeCategoryId: string
      selectedByCategory: Record<string, string>
    }
    biography: {
      biography: string
    }
    highlights: {
      showcaseValue: string
      selectedShowcaseSource: "youtube" | "hudl" | "vimeo" | null
      uploadedItems: Array<{
        id: string
        title: string
        type: "video" | "link"
        source?: "youtube" | "hudl" | "vimeo"
      }>
    }
    achievements: {
      uploadedAssets: Array<{
        id: string
        name: string
        type: string
      }>
      title: string
      dateEarned?: string
      description: string
    }
    privacySettings: {
      visibility: "public" | "coaches-teams" | "private"
    }
  }
}

export const defaultWizardState: WizardState = {
  currentStep: 1,
  forms: {
    coreIdentity: {
      profilePhotoNames: [],
      firstName: "",
      lastName: "",
      dateOfBirth: undefined,
      gender: "",
      nationality: "",
      email: "",
      sport: "soccer",
      jerseyNumber: "",
      dominantFoot: "",
      clubTeam: "",
    },
    positionMap: {
      primaryPosition: "LW",
      secondaryPosition: "RCB",
    },
    seasonStats: {
      activeTab: "outfield",
      values: {
        outfieldGamesPlayed: "0",
        outfieldGoals: "0",
        outfieldAssists: "0",
        outfieldYellowCards: "0",
        outfieldRedCards: "0",
        goalkeeperGamesPlayed: "0",
        goalkeeperGoals: "0",
        goalkeeperAssists: "0",
        goalkeeperYellowCards: "0",
        goalkeeperRedCards: "0",
        goalkeeperCleanSheets: "0",
        goalkeeperTotalSaves: "0",
      },
    },
    strengths: {
      activeCategoryId: "technical",
      selectedByCategory: {},
    },
    biography: {
      biography: "",
    },
    highlights: {
      showcaseValue: "",
      selectedShowcaseSource: null,
      uploadedItems: [],
    },
    achievements: {
      uploadedAssets: [],
      title: "",
      dateEarned: undefined,
      description: "",
    },
    privacySettings: {
      visibility: "public",
    },
  },
}
