import { api } from "@/shared/api";
import type { AxiosResponse } from "axios";
import type { BookingOrder } from "@tovo/database"

export async function UpdateOrderStatusEndpoint(
  id: BookingOrder['id'],
  status: BookingOrder['status']
): Promise<AxiosResponse<unknown>> {
  return api.patch<unknown>(`/booking-orders/${id}`, { status });
}
