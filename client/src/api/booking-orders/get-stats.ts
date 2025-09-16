import { api } from "@/shared/api";

import type { AxiosResponse } from "axios";

type BookingStatsResponse = {
  totalUsers: number,
  revenue: number,
  pendingAlerts: number,
  bookingToday: number,
  chartStats: {
      month: string;
      booking: number;
  }[]
}

export async function GetStatsEndpoint(): Promise<AxiosResponse<BookingStatsResponse>> {
  return api.get<BookingStatsResponse>("/booking-orders/stats");
}
