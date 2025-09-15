import { api } from "@/shared/api";
import type { AxiosResponse } from "axios";
import { BookingOrder } from "@tovo/database"

export async function GetAllOrdersEndpoint(): Promise<
  AxiosResponse<BookingOrder>
> {
  return api.get<BookingOrder>("/booking-orders");
}
