import { Controller } from '@nestjs/common';
import { OrdersService } from './orders.sevice';

@Controller('auth')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
}
