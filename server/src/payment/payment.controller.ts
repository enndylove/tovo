import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Headers,
  RawBodyRequest,
  Req,
  BadRequestException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Request } from 'express';

interface CreatePaymentIntentDto {
  bookingId: string;
  amount: number;
  currency?: string;
  customerEmail?: string;
}

interface ConfirmPaymentDto {
  paymentIntentId: string;
  paymentMethodId?: string;
}

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-intent')
  async createPaymentIntent(
    @Body() createPaymentIntentDto: CreatePaymentIntentDto,
  ) {
    try {
      const {
        bookingId,
        amount,
        currency = 'usd',
        customerEmail,
      } = createPaymentIntentDto;

      const paymentIntent = await this.paymentService.createPaymentIntent(
        bookingId,
        amount,
        currency,
        customerEmail,
      );

      return {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      };
    } catch (error: any) {
      throw new BadRequestException(
        `Failed to create payment intent: ${error.message}`,
      );
    }
  }

  @Post('confirm')
  async confirmPayment(@Body() confirmPaymentDto: ConfirmPaymentDto) {
    try {
      const { paymentIntentId, paymentMethodId } = confirmPaymentDto;

      const result = await this.paymentService.confirmPayment(
        paymentIntentId,
        paymentMethodId,
      );

      return result;
    } catch (error: any) {
      throw new BadRequestException(
        `Failed to confirm payment: ${error.message}`,
      );
    }
  }

  @Get('intent/:id')
  async getPaymentIntent(@Param('id') paymentIntentId: string) {
    try {
      const paymentIntent =
        await this.paymentService.getPaymentIntent(paymentIntentId);

      return {
        id: paymentIntent.id,
        status: paymentIntent.status,
        amount: paymentIntent.amount / 100, // Convert from cents
        currency: paymentIntent.currency,
        metadata: paymentIntent.metadata,
      };
    } catch (error: any) {
      throw new BadRequestException(
        `Failed to retrieve payment intent: ${error.message}`,
      );
    }
  }

  @Post('cancel/:id')
  async cancelPayment(@Param('id') paymentIntentId: string) {
    try {
      const canceledPayment =
        await this.paymentService.cancelPayment(paymentIntentId);

      return {
        id: canceledPayment.id,
        status: canceledPayment.status,
        message: 'Payment successfully canceled',
      };
    } catch (error: any) {
      throw new BadRequestException(
        `Failed to cancel payment: ${error.message}`,
      );
    }
  }

  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  async handleStripeWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature: string,
  ) {
    try {
      if (!signature) {
        throw new BadRequestException('Missing Stripe signature header');
      }

      const rawBody = req.rawBody;
      if (!rawBody) {
        throw new BadRequestException('Missing request body');
      }

      await this.paymentService.handleWebhook(rawBody.toString(), signature);

      return { received: true };
    } catch (error: any) {
      console.error('Webhook error:', error.message);
      throw new BadRequestException(`Webhook error: ${error.message}`);
    }
  }
}
