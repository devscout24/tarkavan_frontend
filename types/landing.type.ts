export type THeroData =  {
  id: number
  baner_image: string
  baner_title: string
  baner_description: string
  logo_image: string
  created_at: string
  updated_at: string
}

export type TLandingStats = {
  id: number;
  active_athletes: number;
  certified_coaches: number;
  teams: number;
  session_booked: number;
  created_at: string;
  updated_at: string;
};

export type EcosystemHeader = {
  id: number;
  title: string;
  description: string;
  type: string;
  created_at: string;
  updated_at: string;
};

export type EcosystemCard = {
  id: number;
  title: string;
  description: string;
  type: string;
  created_at: string;
  updated_at: string;
};

export type EcosystemSection = {
  header: EcosystemHeader;
  cards: EcosystemCard[];
};


export type TStep = {
  id: number;
  title: string;
  description: string;
  image: string;
  created_at: string;
  updated_at: string;
};

export type TStepsResponse = {
  steps: TStep[];
};


export type TFeatureHeader = {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
};

export type TFeatureItem = {
  id: number;
  feature_id: number;
  title: string;
  description: string;
  icon: string;
  created_at: string;
  updated_at: string;
};

export type TFeaturesLanding = {
  header: TFeatureHeader;
  items: TFeatureItem[];
};


export type TReviewLanding = {
  id: number;
  rating: string;
  review_text: string;
  user_name: string;
  user_designation: string;
  user_image: string | null;
  created_at: string;
  updated_at: string;
};


export type TCoachAndClub = {
  user_id: number
  name: string
  last_name: string | null
  role: "coach" | "club"
  profile_id: number
  image: string
  min_price: number
  max_price: number
}

export type TLandingPageData = {
    hero: THeroData
    stats: TLandingStats
    ecosystem: EcosystemSection
    how_it_works: TStepsResponse;
    features: TFeaturesLanding;
    reviews: { items: TReviewLanding[] };
    coach_and_club: TCoachAndClub[];

}