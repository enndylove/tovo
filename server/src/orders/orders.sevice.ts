import { Inject, Injectable } from '@nestjs/common';
import { DB } from 'src/drizzle/drizzle.module';
import {
  bookingOrder,
  type NewBookingOrder,
  type BookingOrder,
} from '@tovo/database';
import { asc, count, desc } from 'drizzle-orm';

@Injectable()
export class OrdersService {
  constructor(@Inject('DB') private db: DB) {}

  async createBookingOrder(data: NewBookingOrder) {
    await this.db.insert(bookingOrder).values(data);
    return;
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
}
