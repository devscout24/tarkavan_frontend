export interface Child {
  id: string;
  imageUrl: string;
  name: string;
  age: number;
  position: string;
  jerseyNumber: number;
  location: string;
  isPublic: boolean;
  stats: {
    games: number;
    goals: number;
    assists: number;
  };
}

export interface ParentChildListResponse {
  status: boolean;
  message: string;
  data: Child[];
}
