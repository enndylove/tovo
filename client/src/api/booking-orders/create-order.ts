import { api } from "@/shared/api";

import type { AxiosResponse } from "axios";
import type { NewBookingOrder } from "@tovo/database"

export async function CreateOrderEndpoint(
  query: NewBookingOrder
): Promise<AxiosResponse<unknown>> {
  return api.post<unknown>("/booking-orders", query);
}
