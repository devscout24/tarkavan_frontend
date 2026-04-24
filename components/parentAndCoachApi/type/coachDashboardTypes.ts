export interface CoachInfo {
  id: number;
  name: string;
  image: string;
  position: string;
  years_of_experience: string;
  city: string;
  country: string;
}

export interface CoachDashboardSummary {
  active_programs: number;
  upcoming_programs: number;
  net_earnings_month: number;
  platform_fee_month: number;
  platform_fee_rate: number;
  platform_fee_type: string;
}

export interface Opportunity {
  id: number | string;
  image_url?: string;
  positions?: string;
  team_name?: string;
  age_group?: string;
  tryout_date?: string;
  description?: string;
}

export interface CoachDashboardData {
  coach_info: CoachInfo;
  summary: CoachDashboardSummary;
  recent_opportunities: Opportunity[];
}

export interface CoachDashboardResponse {
  status: boolean;
  message: string;
  data: CoachDashboardData;
}
