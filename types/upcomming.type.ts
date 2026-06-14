import { TTimeSlot } from "./club.type";

type TProgramTime = {
  id: number;
  time: string;
  slot_date: string;    
  start_time: string;   
  end_time: string;       
  is_available: boolean;
};

type TGoal = {
  id: number;
  goal: string;
};


type TSportOption = {
  id: number;
  name: string;
};

export type TProgramUpcomming = {
  id: number;
  program_type: "one_one" | "group";
  sport_option_id: number;
  sport_option: TSportOption;
  start_date: string;
  end_date: string;
  program_name: string;
  sport: string;

  price: number;
  discount_price: number;

  upto_age: number;
  age_group: string;
  from_age: number ;
  age_limit: number;

  program_location: string;
  location: string;
  program_start: string;
  program_end: string;

  photo: string;

  coach_name: string;
  club_name?: string;

  time: string;

  times: TTimeSlot[];
  goals?: TGoal[];
};