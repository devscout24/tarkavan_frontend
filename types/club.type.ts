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
  current_period_end: string
}

export type TDashboardSummary = {
  active_teams: number
  player_applications: number
  coach_applications: number
  upcoming_matches: number
  programs: number
}

export type TClubDashboardData = {
  club_info: TClubInfo
  subscription: TSubscriptionStatus
  summary: TDashboardSummary
  recent_opportunities: unknown[]
  recent_programs: unknown[]
}

export type TClubDashboardResponse = {
  success: boolean
  data: TClubDashboardData
}
