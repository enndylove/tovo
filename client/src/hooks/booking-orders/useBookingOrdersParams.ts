import { useState } from "react";

import type { BookingOrder } from "@tovo/database";

export function useBookingOrdersParams(initialLimit = 6) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);
  const [orderBy, setOrderBy] = useState<keyof BookingOrder>("id");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const updateSorting = (column: keyof BookingOrder) => {
    if (column === orderBy) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setOrderBy(column);
      setOrder("asc");
    }
  };

  return {
    page,
    limit,
    orderBy,
    order,
    setPage,
    setLimit,
    setOrderBy,
    setOrder,
    updateSorting,
  };
}
