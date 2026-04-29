export type Nullable<T> = T | null;


export type TClubItem = {
  type: "club";
  club_profile_id: number;
  club_id: number;
  club_name: string;
  sports_name: string;
  city_id: Nullable<number>;
  country_id: Nullable<number>;
  location: Nullable<string>;
  club_description: Nullable<string>;
  club_logo: string;
  profile_image: Nullable<string>;
  organization_type: string;
}


export interface SportOption {
  id: number;
  name: string;
}

export type  TClubProgramItem = {
  type: "club_program";
  program_id: number;
  club_program_id: number;
  coach_id: Nullable<number>;
  sport_option_id: Nullable<number>;
  sport_option: Nullable<SportOption>;
  program_name: string;
  sport: string;
  program_price: string;
  age_group: string;
  upto_age: number;
  location: string;
  program_start: string;
  program_end: string;
  program_photo: string;
  coach_name: string;
  club_name: string;
  team_name?: string;
  start_date?: string
}


export type TUpcomingEventItem = {
  program_name?: string;
  type: "upcoming_event";
  recruitment_id: number;
  club_id: number;
  club_team_id: number;
  team_name: string;
  recruitment_type: string;
  age_group: string;
  upto_age: number;
  end_date: Nullable<string>;
  city_id: Nullable<number>;
  country_id: Nullable<number>;
  location: string;
  player_position: Nullable<string>;
  coach_position: Nullable<string>;
  description: string;
  club_name: string;
  sports: string;
  club_logo: string;
  coach_name?: string
  start_date?: string
}

export type TPlayerItem = {
  type: "player";
  player_id: number;
  athlete_profile_id: number;
  name: string;
  age: number;
  age_group: string;
  position: Nullable<string>;
  sports: string;
  jersey_number: number;
  location: Nullable<string>;
  games: number;
  goals: number;
  assists: number;
  profile_image: Nullable<string>;
}



export type TExploreItem =
  | TClubItem
  | TClubProgramItem
  | TUpcomingEventItem
  | TPlayerItem

