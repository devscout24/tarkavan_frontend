"use client"

import api from "@/lib/api-fetcher"
import type { AxiosError } from "axios"
import type { CoachDashboardData } from "../type/coachDashboardTypes"
import { TDashboardResponse } from "@/types";

export interface CoachDashboardApiResult {
  success: boolean;
  data?: CoachDashboardData;
  message?: string;
  status?: number;
}

 