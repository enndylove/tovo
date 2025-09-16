import { api } from "@/shared/api";

import type { AxiosResponse } from "axios";
import type { BookingOrder, NewBookingOrder } from "@tovo/database"

export async function CreateOrderEndpoint(
  query: NewBookingOrder
): Promise<AxiosResponse<BookingOrder>> {
  return api.post<BookingOrder>("/booking-orders", query);
}
