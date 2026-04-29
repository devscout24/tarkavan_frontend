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
 