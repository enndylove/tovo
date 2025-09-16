import { Inject, Injectable } from '@nestjs/common';
import { DB } from 'src/drizzle/drizzle.module';
import {
  bookingOrder,
  type NewBookingOrder,
  type BookingOrder,
} from '@tovo/database';
import { asc, count, desc, eq, sql } from 'drizzle-orm';
import { monthNames } from 'src/constants/orders.constants';

@Injectable()
export class OrdersService {
  constructor(@Inject('DB') private db: DB) {}

  async createBookingOrder(data: NewBookingOrder) {
    const [booking] = await this.db
      .insert(bookingOrder)
      .values(data)
      .returning();

    return booking;
  }

  async removeBookingOrder(id: BookingOrder['id']) {
    await this.db.delete(bookingOrder).where(eq(bookingOrder.id, id));
    return;
  }

  async updateBookingStatus(
    id: BookingOrder['id'],
    status: BookingOrder['status'],
  ) {
    await this.db
      .update(bookingOrder)
      .set({ status })
      .where(eq(bookingOrder.id, id));

    return;
  }

  async getBookingOrder(id: BookingOrder['id']) {
    const [booking] = await this.db
      .select()
      .from(bookingOrder)
      .where(eq(bookingOrder.id, id))
      .limit(1);

    return booking;
  }

  async getBookingOrders(
    page = 1,
    limit = 6,
    orderBy: keyof BookingOrder = 'id',
    order: 'asc' | 'desc' = 'asc',
  ) {
    const offset = (page - 1) * limit;

    const totalCount = await this.db
      .select({ count: count() })
      .from(bookingOrder);

    const orders = await this.db
      .select()
      .from(bookingOrder)
      .orderBy(
        order === 'desc'
          ? desc(bookingOrder[orderBy])
          : asc(bookingOrder[orderBy]),
      )
      .limit(limit)
      .offset(offset);

    return {
      data: orders,
      meta: {
        totalCount: totalCount[0].count,
        page,
        limit,
        totalPages: Math.ceil(totalCount[0].count / limit),
      },
    };
  }

  async chartStats() {
    const result = await this.db
      .select({
        monthNumber: sql<number>`EXTRACT(MONTH FROM ${bookingOrder.date}::DATE)`,
        booking: sql<number>`COUNT(*)`,
      })
      .from(bookingOrder)
      .groupBy(sql`EXTRACT(MONTH FROM ${bookingOrder.date}::DATE)`)
      .orderBy(sql`EXTRACT(MONTH FROM ${bookingOrder.date}::DATE)`);

    return result.map((r) => ({
      month: monthNames[r.monthNumber - 1],
      booking: Number(r.booking),
    }));
  }

  async getBookingStats() {
    const totalUsers = await this.db
      .selectDistinct({ email: bookingOrder.email })
      .from(bookingOrder);

    const revenueResult = await this.db
      .select({
        total: sql`sum(${bookingOrder.price})`,
      })
      .from(bookingOrder);
    const revenue = revenueResult[0]?.total || 0;

    const pendingAlertsResult = await this.db
      .select({
        count: sql`count(*)`,
      })
      .from(bookingOrder)
      .where(eq(bookingOrder.status, 'pending'));
    const pendingAlerts = pendingAlertsResult[0]?.count || 0;

    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    const bookingTodayResult = await this.db
      .select({
        count: sql`count(*)`,
      })
      .from(bookingOrder)
      .where(eq(bookingOrder.date, today));
    const bookingToday = bookingTodayResult[0]?.count || 0;

    const chartStats = await this.chartStats();

    return {
      totalUsers: totalUsers.length,
      revenue: Number(revenue),
      pendingAlerts: Number(pendingAlerts),
      bookingToday: Number(bookingToday),
      chartStats: chartStats,
    };
  }
}
