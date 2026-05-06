export type TProgramTime = {
  id: number;
  time: string;
  slot_date: string | null;
  start_time: string | null;
  end_time: string | null;
  is_available: boolean;
};

export type TProgramGoal = {
  id: number;
  goal: string;
};

export type TProgramPlayerAndParent = {
  id: number;
  program_name: string;
  program_type: string;
  sport: string;
  program_price: number;
  discount_price: number;
  upto_age: number;
  program_location: string;
  program_start: string;
  program_end: string;
  program_photo: string;
  status: string;
  about_program: string;
  times: TProgramTime[];
  goals: TProgramGoal[];
};

export type TCoach = {
  id: number;
  name: string;
  email: string;
  profile_image: string;
  bio: string | null;
  title: string[];
};

export type TClubPlayerParent = {
  id: number;
  club_name: string;
  club_logo: string;
  city: string;
  country: string;
};

export type RatingBreakdown = {
  star: number;
  total: number;
  percent: number;
};

export type TReviewSummary = {
  average_rating: number;
  total_reviews: number;
  rating_breakdown: RatingBreakdown[];
};

export type TProgramDetailsParentAndPlayer = {
  program: TProgramPlayerAndParent;
  coach: TCoach;
  club: TClubPlayerParent;
  review_summary: TReviewSummary;
  recent_feedback: string[];  
};