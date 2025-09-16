import { api } from "@/shared/api";

import type { AxiosResponse } from "axios";
import type { BookingOrder } from "@tovo/database";

export async function GetOrderEndpoint({
  id
}: Pick<BookingOrder, 'id'>): Promise<AxiosResponse<BookingOrder>> {
  return api.get<BookingOrder>(`/booking-orders/${id}`);
}
