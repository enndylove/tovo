import { DataTable } from "@/components/data-table/data-table";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Pagination } from "@/components/pagination/pagination"; // import your real Pagination component
import { PaginationSkeleton } from "@/components/pagination/pagination-skeleton";

import { useBookingOrdersQuery } from "@/hooks/booking-orders/useBookingOrdersQuery";
import { useBookingOrdersParams } from "@/hooks/booking-orders/useBookingOrdersParams";

import { columns } from "../ui/BookingOrdersColumns";

export function BookingOrdersTable() {
  const { page, limit, orderBy, order, setPage } = useBookingOrdersParams();
  const { data, isLoading, isError } = useBookingOrdersQuery(
    page,
    limit,
    orderBy,
    order
  );

  if (isLoading) {
    return (
      <div className="mt-6 flex-1 flex flex-col gap-4">
        <div className="flex-1">
          <DataTableSkeleton columnCount={7} rowCount={limit} />
        </div>
        <PaginationSkeleton className="justify-start" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-md border p-6 text-center">
        <p className="text-red-500">
          Error loading booking orders. Please try again later.
        </p>
      </div>
    );
  }

  const orders = data?.data?.data ?? [];
  const pageCount = data?.data?.meta?.totalPages ?? 1;

  return (
    <div className="mt-6 flex-1 flex flex-col gap-4">
      <div className="flex-1">
        <DataTable columns={columns} data={orders} />
      </div>

      <Pagination
        className="justify-start"
        page={page}
        pageCount={pageCount}
        siblings={1}
        boundaries={1}
        onPageChange={setPage}
      />
    </div>
  );
}
