// Parent Dashboard Types

import { TChield } from "@/types"

export interface DashboardSummary {
  total_children: number
  total_upcoming_recruitments: number
  total_upcoming_programs: number
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
  recent_opportunities: RecruitmentDetails[]
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

type RecruitmentDetails = {
  id: number;
  club: Club;
  position: Position;
  team: Team;
  experience: string;
  description: string;
  upto_age: number;
  tryout_date: string;
  matched_children: MatchedChild[];
};

type Club = {
  id: number;
  club_name: string;
  club_logo: string;
  city: string;
  state: string | null;
  country: string;
  city_id: number | null;
  country_id: number | null;
};

type Position = {
  id: number;
  name: string;
};

type Team = {
  id: number;
  name: string;
  age_group: string;
  image: string;
  competition_level: string;
};

export type MatchedChild = {
  id: number;
  name: string;
  age: number;
  location: Location;
  primary_position: Position;
  secondary_position: Position;
};

type Location = {
  city_id: number | null;
  city: string;
  country_id: number | null;
  country: string;
};
