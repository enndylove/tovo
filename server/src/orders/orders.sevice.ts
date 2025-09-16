import { Inject, Injectable } from '@nestjs/common';
import { DB } from 'src/drizzle/drizzle.module';
import {
  bookingOrder,
  type NewBookingOrder,
  type BookingOrder,
} from '@tovo/database';
import { asc, count, desc, eq, sql } from 'drizzle-orm';

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

    // отримуємо загальну кількість для пагінації
    const totalCount = await this.db
      .select({ count: count() })
      .from(bookingOrder);

    // отримуємо сторінку ордерів
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

  async getBookingStats() {
    // Get unique users by email
    const totalUsers = await this.db
      .selectDistinct({ email: bookingOrder.email })
      .from(bookingOrder);

    // Calculate total revenue
    const revenueResult = await this.db
      .select({
        total: sql`sum(${bookingOrder.price})`,
      })
      .from(bookingOrder);
    const revenue = revenueResult[0]?.total || 0;

    // Count pending alerts
    const pendingAlertsResult = await this.db
      .select({
        count: sql`count(*)`,
      })
      .from(bookingOrder)
      .where(eq(bookingOrder.status, 'pending'));
    const pendingAlerts = pendingAlertsResult[0]?.count || 0;

    // Get today's bookings count
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    const bookingTodayResult = await this.db
      .select({
        count: sql`count(*)`,
      })
      .from(bookingOrder)
      .where(eq(bookingOrder.date, today));
    const bookingToday = bookingTodayResult[0]?.count || 0;

    return {
      totalUsers: totalUsers.length,
      revenue: Number(revenue),
      pendingAlerts: Number(pendingAlerts),
      bookingToday: Number(bookingToday),
    };
  }
}
