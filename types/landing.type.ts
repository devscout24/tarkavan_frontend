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


export type TLandingPageData = {
    hero: THeroData
    stats: TLandingStats
    ecosystem: EcosystemSection
    how_it_works: TStepsResponse;
}