import { api } from "@/shared/api";

import type { AxiosResponse } from "axios";
import type { BookingOrder } from "@tovo/database";
import type { PaginationMeta } from "@/shared/types/pagination";

type GetAllOrdersResponse = {
  data: BookingOrder[];
  meta: PaginationMeta;
}

export async function GetAllOrdersEndpoint(
  page = 1,
  limit = 6,
  orderBy: keyof BookingOrder = "id",
  order: "asc" | "desc" = "asc"
): Promise<AxiosResponse<GetAllOrdersResponse>> {
  return api.get<GetAllOrdersResponse>("/booking-orders", {
    params: { page, limit, orderBy, order },
  });
}
