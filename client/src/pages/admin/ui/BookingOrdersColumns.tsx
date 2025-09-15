import type { ColumnDef } from "@tanstack/react-table";
import { BookingOrder } from "@tovo/database";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
          <span>{format(new Date(date), "MMM dd, yyyy")}</span>
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
    cell: ({ row, table }) => {
      const status = row.getValue("status") as string;

      return (
        <Select
          value={status}
          onValueChange={(value) => {
            // для фронта: оновлюємо статус локально
            const rowIndex = table.getRowModel().rows.findIndex(r => r.id === row.id);
            if (rowIndex !== -1) {
              table.options.data[rowIndex].status = value;
            }
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
];
