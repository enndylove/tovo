import { Inject, Injectable } from '@nestjs/common';
import { DB } from 'src/drizzle/drizzle.module';

@Injectable()
export class OrdersService {
  constructor(@Inject('DB') private db: DB) {}

  async getAllOrders() {}
}
