import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.sevice';
import { type NewBookingOrder } from '@tovo/database';

@Controller('booking-orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createBookingOrder(@Body() data: NewBookingOrder) {
    return this.ordersService.createBookingOrder(data);
  }

  @Get()
  async getAllBookingOrders() {
    return this.ordersService.getAllOrders();
  }
}
