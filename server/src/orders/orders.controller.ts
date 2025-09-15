import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.sevice';
import type { BookingOrder, NewBookingOrder } from '@tovo/database';

@Controller('booking-orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createBookingOrder(@Body() data: NewBookingOrder) {
    return this.ordersService.createBookingOrder(data);
  }

  @Delete(':id')
  async deleteBookingOrder(@Param('id') orderId: BookingOrder['id']) {
    return this.ordersService.removeBookingOrder(orderId);
  }

  @Get()
  async getBookingOrders() {
    return this.ordersService.getBookingOrders();
  }
}
