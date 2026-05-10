import { TPlayerPosition } from "./player.type";

 

export type TChield = {
  block_status: boolean;
  invitation_status: boolean;
  id: number;
  user_id: number;
  name: string;
  last_name: string;
  dob: string;
  profile_picture: string;
  primary_position: TPlayerPosition;
  secondary_position: TPlayerPosition;
  jersey_number: number;
  tolal_played_games: number;
  total_played_time: number;
  goals: number;
  assist: number;
  age: number;
  parent_control: string;
  privacy_settings: string;
  city: string;
  country: string;
};

 