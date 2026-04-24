import { ParentChildListResponse } from "../type/child-list.type";
import api from "@/lib/api-fetcher";

export async function fetchParentChildList(): Promise<ParentChildListResponse> {
  const response = await api.get<ParentChildListResponse>("/parent/child/list");
  return response.data;
}
