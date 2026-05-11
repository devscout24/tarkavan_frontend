export type TTeamDetails = {
  team: Team;
  coaches: Coach[];
  players: TPlayerTeam[];
  summary: Summary;
};

type Team = {
  id: number;
  name: string;
  age_group: string;
  image: string;
};

type Coach = {
  team_player_id: number;
  user_id: number;
  profile_id: number;
  name: string;
  role: string;
  age: number;
  position: string;
  experience: string;
  phone: string | null;
  address: string | null;
  profile_image: string;
};

export type TPlayerTeam = {
  team_player_id: number;
  user_id: number | null;
  child_id: number | null;
  name: string;
  role: string;
  is_parent_child: boolean;
  age: number;
  position: string;
  jersey_number: number;
  games: number;
  total_played_time: number;
  goals: number;
  assists: number;
  profile_image: string;
  city: string;
  country: string;
};

type Summary = {
  total_coaches: number;
  total_players: number;
};







export type TTeamDetailsForClub = {
  id: number;
  club_id: number;
  name: string;
  age_group: string;
  image: string;
  competition_level_id: number;
  gender: string;
  created_at: string;
  updated_at: string;
  total_players: number;
  total_coaches: number;
  competition_level: CompetitionLevel;
};

type CompetitionLevel = {
  id: number;
  name: string;
};