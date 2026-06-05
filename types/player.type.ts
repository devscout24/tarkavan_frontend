export type TPlayerDashboard = {
  player_info: PlayerInfo
  summary: TPlayerStatsSummary
  scouting_status: ScoutingStatus
  recent_opportunities: Opportunity[]
  upcoming_training: any[] // later refine if structure known
}


// ------------------ SCOUTING ------------------
export type ScoutingStatus = {
  profile_completeness: number
  total_recruitments_applied: number
  scouts_viewing: number
}

// ------------------ PLAYER INFO ------------------
export type PlayerInfo = {
  id: number
  name: string
  image: string | null
  position: Position
  secondary_position: Position
  age: number
  jersey_number: number
  city: string
  country: string
  city_id: number
  country_id: number
  location: Location
  privacy_setting: string | null
}

export type TPlayerStatsSummary = {
  profile_visibility: string | null
  total_programs: number
  upcoming_sessions: number
  recent_payments: number
  videos_uploaded: number
}

export type Position = {
  id: number
  name: string
}


// ------------------ OPPORTUNITY ------------------
export type Opportunity = {
  id: number
  club: Club
  position: Position
  team: Team
  experience: string
  description: string
  upto_age: number
  tryout_date: string
  application_status: string
}


export type Location = {
  city_id: number
  city: string
  country_id: number
  country: string
}

// ------------------ SUMMARY ------------------





export type Club = {
  id: number
  club_name: string
  logo: string
  club_logo: string
  city: string
  state: string | null
  country: string
  city_id: number
  country_id: number
}

export type Team = {
  id: number
  name: string
  age_group: string | null
  image: string
  competition_level: string
  formatted_age: string
}

// ================= BASIC INFO =================
export type TPlayerSportOption = {
  id: number
  name: string
}

export type TPlayerBasicInfo = {
  id: number
  name: string
  last_name: string
  full_name: string
  country: string
  city: string
  dob: string
  age: number
  gender: "male" | "female" | "other" | string
  nationality: string
  email: string
  image: string | null
  biography: string
  privacy_settings: "public" | "private" | string
  sports: string
  sport_option_id: number
  sport_option: TPlayerSportOption
  facebook_link: string
  twitter_link: string
  whatsapp_link: string
}

// ================= POSITION INFO =================
export type TPlayerPosition = {
  id: number
  name: string
  type: string
}

export type TPlayerPositionInfo = {
  primary_position: TPlayerPosition
  secondary_position: TPlayerPosition
  jersey_number: number
  dominant_foot: "left" | "right" | "both" | string
  club_team: string
  sports_selection: string
}

// ================= STATS =================
export type TPlayerStats = {
  total_matches: number
  total_played_time: number
  goals: number
  assists: number
  yellow_cards: number
  red_cards: number
  clean_sheets: number
  total_saves: number
}

// ================= STRENGTHS =================
export type TPlayerStrength = {
  id: number
  strength_type: string
  strength_name: string
  endorse_count: number
  endorsed: boolean
}

// ================= ACHIEVEMENTS =================
export type TPlayerAchievement = {
  id: number
  title: string
  description: string
  date_earned: string
  image: string | null
}

// ================= SEASON STATS =================
export type TSeasonStats = {
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

// ================= ROOT DASHBOARD =================
export type TPlayerProfile = {
  basic_info: TPlayerBasicInfo
  position_info: TPlayerPositionInfo
  player_stats: TPlayerStats
  strengths: TPlayerStrength[]
  achievements: TPlayerAchievement[]
  gallery: {
    id: number | string
    image: string
    uploaded_at?: string
  }[]
  videos: {
    id: number
    video_url: string
    status?: string
    uploaded_at?: string
  }[]
  media_links: string[]
  season_stats_last_five_years: TSeasonStats[]
  professional_votes: number
  provencial_votes: number
}

export type TStrength = {
  strength_type: "technical" | "physical" | "tactical" | "mental" | "attacking"
  strength_name: string
}

export type TAchievement = {
  description: string
  date_earned: string
  title: string
  link?: string
  link_status?: "youtube" | "external" | ""
  image?: File | null
}

export type TPlayerProfileForm = {
  name: string
  last_name: string
  dob: string
  gender: string
  nationality: string
  email: string
  sports_selection: string
  jersey_number: string
  dominant_foot: string
  club_team: string
  primary_position: string
  secondary_position: string
  athlete_biography: string
  privacy_settings: string
  total_played_games: string
  goals: string
  assist: string
  yellow_cards: string
  red_cards: string
  clean_sheets: string
  total_saves: string
  strengths: TStrength[]
  achievements: TAchievement[]
  profile_image?: File | null
  profile_gallery?: File[]
  reels?: File[]
}

export type TPlayerProfileSetting = {
  name: string
  email: string
  profile_image: string
  country_id: number | null
  city_id: number | null
  country: string | null
  city: string | null
  privacy_settings: "public" | "private" | "friends" | string
}

export type TCompletePlayerData = {
  // Core Identity
  firstName: string
  lastName: string
  city: string
  country: string
  email: string
  dateOfBirth?: string
  gender: string
  nationality: string
  sport: string
  jerseyNumber: string
  dominantFoot: string
  clubTeam: string
  profilePhotoNames: string[]

  // Position Map
  primaryPosition: string
  secondaryPosition: string

  // Season Stats
  seasonStats: {
    activeTab: "outfield" | "goalkeeper"
    values: {
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
  }

  // Strengths
  strengths: {
    activeCategoryId: string
    selectedByCategory: Record<string, string>
  }

  // Biography
  biography: string

  // Highlights
  highlights: {
    showcaseValue: string
    selectedShowcaseSource: "youtube" | "hudl" | "vimeo" | null
    facebook_link: string
    whatsapp_link: string
    twitter_link: string
    uploadedItems: Array<{
      id: string
      title: string
      type: "video" | "link"
      source?: "youtube" | "hudl" | "vimeo"
      file?: File
    }>
  }

  // Achievements
  achievements: {
    uploadedAssets: Array<{
      id: string
      name: string
      type: string
      file?: File
    }>
    title: string
    dateEarned?: string
    description: string
  }

  // Privacy Settings
  privacySettings: {
    visibility: string
  }
}
