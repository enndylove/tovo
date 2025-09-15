import { GetAllOrdersEndpoint } from "@/api/booking-orders/get-all-orders";
import { useQuery } from "@tanstack/react-query";

export function useAllOrders() {
  const q = useQuery({
    queryKey: ["booking-orders"],
    queryFn: () => GetAllOrdersEndpoint(),
  });

  return q;
}
