export type TSubscriptionPlan = {
  id: number
  name: string
  slug: string
  description: string | null
  price: string
  discount_price: string
  billing_period: string
  trial_days: number
  stripe_product_id: string
  stripe_price_id: string
  is_stripe_synced: boolean
  features: string[]
  status: string
  created_at: string
  updated_at: string
}

export type TSubscriptionPlanListResponse = {
  status: boolean
  message: string
  data: TSubscriptionPlan[]
}

export type SubscriptionPlanCardProps = {
  title: string
  price: string
  period: string
  features: string[]
  ctaLabel: string
  highlighted?: boolean
  savingsLabel?: string
  onCtaClick?: () => void
  className?: string
  id?: string | number
}

export type TClubInfo = {
  id: number
  club_name: string
  club_logo: string
  city: string
  state: string
  country: string
}

export type TSubscriptionStatus = {
  id: number
  status: "active" | "inactive" | "expired"
  plan: {
    id: number
    name: string
    price: string
  }
  current_period_end: string | null
}

export type TDashboardSummary = {
  active_teams: number
  player_applications: number
  coach_applications: number
  upcoming_matches: number
  programs: number
}

export type TClubRecentProgram = {
  id: number
  sport: string
  program_name: string
  program_start: string
  program_end: string
  about_program: string
  upto_age: number
  program_photo: string | null
}

export type TClubDashboardData = {
  club_info: TClubInfo
  subscription: TSubscriptionStatus
  summary: TDashboardSummary
  recent_opportunities: unknown[]
  recent_programs: TClubRecentProgram[]
}

export type TClubDashboardResponse = {
  success: boolean
  data: TClubDashboardData
}



export type TOrganizationType = {
  id: number;
  name: string;
  status: "active" | "inactive"; // you can extend if needed
};

export type TClubProfile = {
  id: number;
  club_name: string;
  city: string | null;
  city_id: number | null;
  state: string | null;
  country: string | null;
  country_id: number | null;
  phone: string | null;
  club_description: string | null;
  sport_option_id: number | null;
  sport_option: string | null;
  sports_name: string | null;
  privacy_settings:
    | "public"
    | "private"
    | "players"
    | "coach_and_players"
    | "players_and_teams"
    | "coach_and_team"
    | "only_player";
  club_logo_url: string | null;
  organization_types: TOrganizationType[];
};



export type TMatchRequestStatus = "pending" | "accepted" | "rejected"; // extend if needed

export type TOwner = {
  id: number;
  name: string;
  email: string;
};

export type TClubBasic = {
  id: number;
  club_name: string;
};

export type TTeam = {
  id: number;
  name: string;
  age_group: string | null;
  image: string | null;
  competition_level: string;
};

export type TTeamWithClub = TTeam & {
  club: TClubBasic;
};

export type TMatch = {
  id: number;
  available_date: string; // you can convert to Date later
  location: string;
  field_opportunity: "we-have-a-field" | "need-opponent-field";
  team: TTeamWithClub;
  opponent_club: TClubBasic | null;
};

export type TClubFull = {
  id: number;
  club_name: string;
  email: string | null;
  phone: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  club_logo: string | null;
  owner: TOwner;
  team: TTeam;
};

export type TMatchRequestByOthersClub = {
  id: number;
  status: TMatchRequestStatus;
  match: TMatch;
  created_club: TClubFull;
  requested_club: TClubFull;
};