import { useQuery } from "@tanstack/react-query";
import { GetAllOrdersEndpoint } from "@/api/booking-orders/get-all-orders";

import type { BookingOrder } from "@tovo/database";

export function useBookingOrdersQuery(
  page: number,
  limit: number,
  orderBy: keyof BookingOrder,
  order: "asc" | "desc"
) {
  return useQuery({
    queryKey: ["booking-orders", page, limit, orderBy, order],
    queryFn: () => GetAllOrdersEndpoint(page, limit, orderBy, order),
    staleTime: 5000,
  });
}
