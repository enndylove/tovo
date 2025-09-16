import { api } from "@/shared/api";

import type { AxiosResponse } from "axios";
import type { BookingOrder } from "@tovo/database";

export async function RemoveOrderEndpoint({
  id
}: Pick<BookingOrder, 'id'>): Promise<AxiosResponse<unknown>> {
  return api.delete<unknown>(`/booking-orders/${id}`);
}
