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

type TProgramUpcomming = {
  id: number;
  program_type: "one_one" | "group";
  sport_option_id: number;
  sport_option: TSportOption;

  program_name: string;
  sport: string;

  program_price: number;
  discount_price: number;

  upto_age: number;
  age_group: string;

  program_location: string;
  program_start: string;
  program_end: string;

  program_photo: string;

  coach_name: string;
  club_name?: string;

  time: string;

  times: TProgramTime[];
  goals?: TGoal[];
};