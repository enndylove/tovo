import { useQuery } from "@tanstack/react-query";
import { GetOrderEndpoint } from "@/api/booking-orders/get-order";

import type { BookingOrder } from "@tovo/database";

export function useBookingOrderQuery(
  id: BookingOrder['id']
) {
  return useQuery({
    queryKey: ["booking-order", id],
    queryFn: () => GetOrderEndpoint({ id }),
  });
}
