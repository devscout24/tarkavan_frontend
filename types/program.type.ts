export type TProgramDetailsParentAndPlayer = {
  id: number;
  program_name: string;
  program_type: string;
  sport: string;
  sport_option: {
    id: number;
    name: string;
  };
  price: number;
  discount_price: number;
  location: string;
  start_date: string; // ISO date string
  end_date: string;   // ISO date string
  photo: string;
  about: string;
  age_limit: number;
  age_group: string;
  provider: {
    type: string;
    id: number;
    user_id: number;
    name: string;
    logo: string;
    city: string;
    country: string;
    is_verified: boolean;
    email: string;
    is_program_maker: boolean;
  };
  times: {
    id: number;
    time: string;
    slot_date: string | null;
    start_time: string | null;
    end_time: string | null;
    is_available: boolean;
  }[];
  goals: {
    id: number;
    goal: string;
  }[];
  review_summary: {
    average_rating: number;
    total_reviews: number;
    rating_breakdown: {
      star: number;
      total: number;
      percent: number;
    }[];
  };
  recent_feedback: string[]; // You can refine this if structure is known
};