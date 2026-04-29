type Position = {
  id: number | null;
  name: string | null;
};

type Location = {
  city_id: number;
  city: string;
  country_id: number;
  country: string;
};

type CoachInfo = {
  id: number;
  name: string;
  image: string | null;
  position: Position;
  years_of_experience: string;
  city: string;
  country: string;
  city_id: number;
  country_id: number;
  location: Location;
};

type Summary = {
  active_programs: number;
  upcoming_programs: number;
  net_earnings_month: number;
  platform_fee_month: number;
  platform_fee_rate: number;
  platform_fee_type: string; // you can make this "percentage" | "fixed" if needed
};

type Club = {
  id: number;
  club_name: string;
  club_logo: string;
  city: string;
  state: string;
  country: string;
  city_id: number | null;
  country_id: number | null;
};

type Team = {
  id: number;
  name: string;
  age_group: string;
  image: string;
  competition_level: string;
};

type Opportunity = {
  id: number;
  club: Club;
  headline: string;
  position: Position;
  team: Team;
  meta: string;
  tryout_date: string;
  description: string;
  is_applied: boolean;
};

export type TDashboardResponse = {
  coach_info: CoachInfo;
  summary: Summary;
  recent_opportunities: Opportunity[];
};