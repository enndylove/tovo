import { useQuery } from "@tanstack/react-query";
import { GetStatsEndpoint } from "@/api/booking-orders/get-stats";

export function useBookingStatsQuery() {
  return useQuery({
    queryKey: ["booking-stats"],
    queryFn: () => GetStatsEndpoint(),
    staleTime: 5000,
  });
}
