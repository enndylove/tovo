import { Inject, Injectable } from '@nestjs/common';
import { DB } from 'src/drizzle/drizzle.module';
import { bookingOrder, type NewBookingOrder } from '@tovo/database';

@Injectable()
export class OrdersService {
  constructor(@Inject('DB') private db: DB) {}

  async createBookingOrder(data: NewBookingOrder) {
    await this.db.insert(bookingOrder).values(data);
    return;
  }

  async getAllOrders() {
    return this.db.select().from(bookingOrder);
  }
}
