import { Module } from '@nestjs/common';
import { OrdersService } from './orders.sevice';
import { OrdersController } from './orders.controller';

@Module({
  imports: [],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
