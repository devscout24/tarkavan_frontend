export type TUser = {
  id: number;
  name: string;
  last_name: string | null;
  email: string;
  role: "parent" | "player" | "club" | "coach" ; 
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  status?: string;
};