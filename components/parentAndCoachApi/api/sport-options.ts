import api from "@/lib/api-fetcher";
import { SportOptionsResponse } from "../type/sport-options.type";

export async function fetchSportOptions(): Promise<SportOptionsResponse> {
  const response = await api.get<SportOptionsResponse>("/sport/options");
  return response.data;
}
