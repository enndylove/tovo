import { api } from "@/shared/api";

import type { AxiosResponse } from "axios";

export async function RemoveOrderEndpoint(
  id: string
): Promise<AxiosResponse<unknown>> {
  return api.delete<unknown>(`/booking-orders/${id}`);
}
