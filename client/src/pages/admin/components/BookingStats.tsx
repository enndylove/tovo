import { BellIcon, CalendarIcon, DollarSignIcon, UsersIcon } from "lucide-react";

import { BookingStatsTitle } from "../ui/BookingStatsTitle";
import { BookingStatsDescription } from "../ui/BookingStatsDescription";

import { useBookingStatsQuery } from "@/hooks/booking-orders/useBookingStats";

export function BookingStats() {
  const { data } = useBookingStatsQuery();

  if(!data) {
    return;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
        <UsersIcon className="size-6 text-blue-500" />
        <div>
          <BookingStatsTitle>Total Users</BookingStatsTitle>
          <BookingStatsDescription>{data.data.totalUsers}</BookingStatsDescription>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
        <CalendarIcon className="size-6 text-green-500" />
        <div>
          <BookingStatsTitle>Bookings Today</BookingStatsTitle>
          <BookingStatsDescription>{data.data.bookingToday}</BookingStatsDescription>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
        <DollarSignIcon className="size-6 text-yellow-500" />
        <div>
          <BookingStatsTitle>Revenue</BookingStatsTitle>
          <BookingStatsDescription>{data.data.revenue} NOK</BookingStatsDescription>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
        <BellIcon className="size-6 text-red-500" />
        <div>
          <BookingStatsTitle>Pending Alerts</BookingStatsTitle>
          <BookingStatsDescription>{data.data.pendingAlerts}</BookingStatsDescription>
        </div>
      </div>
    </div>
  )
}
