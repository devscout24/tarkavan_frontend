export interface SportOption {
  id: number;
  name: string;
  audience: string;
  status: string;
}

export interface SportOptionsResponse {
  status: boolean;
  message: string;
  data: SportOption[];
}
