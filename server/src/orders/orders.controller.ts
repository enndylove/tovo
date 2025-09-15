import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OrdersService } from './orders.sevice';
import type { BookingOrder, NewBookingOrder } from '@tovo/database';

@Controller('booking-orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createBookingOrder(@Body() data: NewBookingOrder) {
    return this.ordersService.createBookingOrder(data);
  }

  @Get('stats')
  async getBookingStats() {
    return this.ordersService.getBookingStats();
  }

  @Get(':id')
  async getBookingOrder(@Param('id') orderId: BookingOrder['id']) {
    return this.ordersService.getBookingOrder(orderId);
  }

  @Delete(':id')
  async deleteBookingOrder(@Param('id') orderId: BookingOrder['id']) {
    return this.ordersService.removeBookingOrder(orderId);
  }

  @Patch(':id')
  async updateBookingOrderStatus(
    @Param('id') orderId: BookingOrder['id'],
    @Body('status') status: BookingOrder['status'],
  ) {
    return this.ordersService.updateBookingStatus(orderId, status);
  }

  @Get()
  async getBookingOrders() {
    return this.ordersService.getBookingOrders();
  }
}
