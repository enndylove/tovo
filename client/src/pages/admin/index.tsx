import { BookingOrdersTable } from "./components/BookingOrdersTable";
import { BookingStats } from "./components/BookingStats";

export function AdminPage() {
  return (
    <div className="flex flex-col gap-6 p-4">
      {/* KPI cards */}
      <BookingStats />

      <h1 className="text-3xl font-bold mt-5">
        Booking Table
      </h1>
      {/* Table */}
      <div className="bg-white rounded-lg shadow p-4">
        <BookingOrdersTable />
      </div>
    </div>
  );
}
