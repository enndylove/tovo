import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Trash2Icon } from "lucide-react";

import { format } from "date-fns";

import { useRemoveOrderMutation } from "../mutations/remove-order.mutation";
import { useBookingOrdersQuery } from "@/hooks/booking-orders/useBookingOrdersQuery";
import { useBookingOrdersParams } from "@/hooks/booking-orders/useBookingOrdersParams";
import { useUpdateOrderStatusMutation } from "../mutations/update-order-status.mutation";

import type { ColumnDef } from "@tanstack/react-table";
import type { BookingOrder } from "@tovo/database";
import { useBookingOrderQuery } from "@/hooks/booking-orders/useBookingOrder";

export const columns: ColumnDef<BookingOrder>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "guests",
    header: "Guests",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = row.getValue("date") as string;
      return (
        <div className="flex items-center gap-2 py-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span className="text-nowrap">{format(new Date(date), "MMM dd, yyyy")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    accessorKey: "firstName",
    header: "Name",
    cell: ({ row }) => {
      const firstName = row.getValue("firstName") as string;
      const lastName = row.getValue("lastName") as string;
      return <span>{firstName} {lastName}</span>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const { data, refetch: refetchStatus } = useBookingOrderQuery(row.original.id);

      const { page, limit, orderBy, order } = useBookingOrdersParams();
      const { refetch } = useBookingOrdersQuery(
        page,
        limit,
        orderBy,
        order
      );

      const onSuccess = () => {
        refetch();
        refetchStatus();
      }

      const updateStatus = useUpdateOrderStatusMutation(onSuccess);

      return (
        <Select
          value={data?.data?.status}
          onValueChange={(value) => {
            updateStatus.mutate({ id: row.original.id, status: value as BookingOrder['status'] });
          }}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    accessorKey: "",
    header: "Actions",
    cell: ({ row }) => {
      const { page, limit, orderBy, order } = useBookingOrdersParams();
      const { refetch } = useBookingOrdersQuery(
        page,
        limit,
        orderBy,
        order
      );

      const onSuccess = () => {
        refetch();
      }

      const removeOrderMutation = useRemoveOrderMutation(onSuccess);

      const onRemove = () => {
        const id = row.getValue("id") as number;
        removeOrderMutation.mutate({ id });
      };

      return (
        <Trash2Icon
          className="cursor-pointer size-4 text-red-500 hover:text-red-700"
          onClick={onRemove}
        />
      );
    },
  }
];
