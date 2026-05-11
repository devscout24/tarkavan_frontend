type Profile = {
  name: string;
  image: string | null;
  type: string;
};

type Recruitment = {
  id: number;
  type: string;
  team_name: string;
  player_position: string | null;
  coach_position: string | null;
  end_date: string | null;
};

 export  type TCoachApplication = {
  application_id: number;
  profile_id: number;
  type: string;
  status: string;
  name: string;
  role: string;
  user_id: number;
  child_id: number | null;
  profile: Profile;
  recruitment: Recruitment;
  profile_image: string | null;
};
 

type TCompetitionLevel = {
  id: number
  name: string
}

export type TTeamData = {
  id: number
  club_id: number
  name: string
  age_group: string
  image: string
  competition_level_id: number
  gender: "male" | "female" | "other"
  created_at: string
  updated_at: string
  total_players: number
  total_coaches: number
  competition_level: TCompetitionLevel
}