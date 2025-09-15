import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StripeService } from './stripe.service';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [StripeService],
  exports: [StripeService],
})
export class PaymentModule {}
