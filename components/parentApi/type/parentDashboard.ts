// Parent Dashboard Types

export interface DashboardSummary {
  total_children: number
  total_upcoming_recruitments: number
  total_upcoming_programs: number
}

export interface RecentOpportunity {
  id: string
  title?: string
  description?: string
  team_name?: string
  age_group?: string
  tryout_date?: string
  positions?: string
  image_url?: string
  created_at?: string
}

export interface UpcomingProgramReminder {
  id: string
  title?: string
  description?: string
  program_date?: string
  reminder_date?: string
  program_type?: string
  created_at?: string
}

export interface DashboardData {
  summary: DashboardSummary
  recent_opportunities: RecentOpportunity[]
  upcoming_program_reminders: UpcomingProgramReminder[]
}

export interface DashboardResponse {
  status: boolean
  message: string
  data: DashboardData
}

export interface DashboardApiResult {
  success: boolean
  data?: DashboardData
  message?: string
  status?: number
}
