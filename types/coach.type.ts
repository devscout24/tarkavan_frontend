type Position = {
  id: number | null;
  name: string | null;
};

type Location = {
  city_id: number;
  city: string;
  country_id: number;
  country: string;
};

type CoachInfo = {
  id: number;
  name: string;
  image: string | null;
  position: Position;
  years_of_experience: string;
  city: string;
  country: string;
  city_id: number;
  country_id: number;
  location: Location;
};

type Summary = {
  active_programs: number;
  upcoming_programs: number;
  net_earnings_month: number;
  platform_fee_month: number;
  platform_fee_rate: number;
  platform_fee_type: string; // you can make this "percentage" | "fixed" if needed
};

type Club = {
  id: number;
  club_name: string;
  club_logo: string;
  city: string;
  state: string;
  country: string;
  city_id: number | null;
  country_id: number | null;
};

type Team = {
  id: number;
  name: string;
  age_group: string;
  image: string;
  competition_level: string;
};

type Opportunity = {
  id: number;
  club: Club;
  headline: string;
  position: Position;
  team: Team;
  meta: string;
  tryout_date: string;
  description: string;
  is_applied: boolean;
};

export type TDashboardResponse = {
  coach_info: CoachInfo;
  summary: Summary;
  recent_opportunities: Opportunity[];
};


export type TCoachPublicProfile  = {
  coach_id: number
  visibility: "public" | "private"

  profile: {
    name: string
    dob: string
    age: number
    gender: string

    sport_option_id: number | null
    sport_option: string | null

    sports: string

    email: string
    nationality: string

    city_id: number | null
    country_id: number | null

    city: string
    country: string

    profile_image: string
    bio: string

    facebook_link: string | null
    twitter_link: string | null
    instagram_link: string | null
    tiktok_link: string | null
    whatsapp_link: string | null

    current_role: {
      id: number
      name: string
    }

    years_of_experience: string
    highest_education: string
    coaching_education: string

    player_centric_approach: boolean
    data_driving_training: boolean
    visible_reviews: boolean
    allow_parent_player_reviews: boolean

    overall_avg_rating: number
    total_reviews: number

    preview: string | null
  }

  coaching_titles: string[]

  coach_media: unknown[]

  experience_education: {
    title: string
    duration?: string
    description: string
  }[]

  badges: string[]
}