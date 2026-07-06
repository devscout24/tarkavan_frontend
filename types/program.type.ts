export type TProgramDetailsParentAndPlayer = {
  id: number;
  program_name: string;
  program_type: string;
  booking_status: string;
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
  from_age: number | null;
  age_group: string;
  provider: {
    type: string;
    id: number;
    user_id: number;
    name: string;
    image: string;
    city: string;
    country: string;
    is_verified: boolean;
    email: string;
    is_program_maker: boolean;
    updated_at: string; // ISO date string
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
  recent_feedback: TProgramReview[]; // You can refine this if structure is known
};



export type TRatingBreakdownItem = {
  star: number
  total: number
  percent: number
}

 
export type TProgramRatingSummary = {
  average_rating: number | string
  total_reviews: number
  rating_breakdown: TRatingBreakdownItem[]
}


export type TReviewReviewer = {
  id: number
  name: string
  profile_image: string | null
}

export type TProgramReview = {
  id: number
  rating: number
  review: string
  created_at: string
  reviewer: TReviewReviewer
}