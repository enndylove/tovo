import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { StripeService } from './stripe.service';
import { OrdersService } from '../orders/orders.sevice';
import Stripe from 'stripe';
import type { BookingOrder } from '@tovo/database';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(
    private readonly stripeService: StripeService,
    private readonly ordersService: OrdersService,
  ) {}

  async createPaymentIntent(
    bookingId: string,
    amount: number,
    currency: string = 'usd',
    customerEmail?: string,
  ): Promise<Stripe.PaymentIntent> {
    try {
      // Convert string bookingId to number for the database query
      const numericBookingId = parseInt(bookingId, 10);
      if (isNaN(numericBookingId)) {
        throw new BadRequestException(
          `Invalid booking ID format: ${bookingId}`,
        );
      }

      // Verify booking exists
      const booking =
        await this.ordersService.getBookingOrder(numericBookingId);
      if (!booking) {
        throw new NotFoundException(`Booking with ID ${bookingId} not found`);
      }

      // Validate amount matches booking
      if (Math.abs(booking.price - amount) > 0.01) {
        throw new BadRequestException(
          `Amount mismatch. Expected: ${booking.price}, Received: ${amount}`,
        );
      }

      // Create payment intent with metadata
      const paymentIntent = await this.stripeService.createPaymentIntent(
        amount,
        currency,
        {
          bookingId: booking.id.toString(),
          customerEmail: customerEmail || booking.email,
          bookingDate: booking.date,
          status: booking.status,
        },
      );

      this.logger.log(
        `Payment intent created: ${paymentIntent.id} for booking: ${bookingId}`,
      );

      return paymentIntent;
    } catch (error) {
      this.logger.error(
        `Failed to create payment intent for booking ${bookingId}:`,
        error,
      );
      throw error;
    }
  }

  async confirmPayment(
    paymentIntentId: string,
    paymentMethodId?: string,
  ): Promise<{
    paymentIntent: Stripe.PaymentIntent;
    booking?: BookingOrder;
  }> {
    try {
      if (paymentMethodId) {
        // Attach payment method and confirm
        await this.stripeService
          .getStripe()
          .paymentIntents.update(paymentIntentId, {
            payment_method: paymentMethodId,
          });
      }

      const paymentIntent =
        await this.stripeService.confirmPaymentIntent(paymentIntentId);

      // If payment succeeded, update booking status
      if (paymentIntent.status === 'succeeded') {
        const bookingIdString = paymentIntent.metadata?.bookingId;
        if (bookingIdString) {
          const bookingId = parseInt(bookingIdString, 10);
          if (!isNaN(bookingId)) {
            await this.ordersService.updateBookingStatus(
              bookingId,
              'confirmed',
            );
            const updatedBooking =
              await this.ordersService.getBookingOrder(bookingId);

            this.logger.log(
              `Payment confirmed and booking ${bookingIdString} status updated to confirmed`,
            );

            return {
              paymentIntent,
              booking: updatedBooking,
            };
          }
        }
      }

      return { paymentIntent };
    } catch (error) {
      this.logger.error(`Failed to confirm payment ${paymentIntentId}:`, error);
      throw error;
    }
  }

  async getPaymentIntent(
    paymentIntentId: string,
  ): Promise<Stripe.PaymentIntent> {
    try {
      return await this.stripeService.retrievePaymentIntent(paymentIntentId);
    } catch (error) {
      this.logger.error(
        `Failed to retrieve payment intent ${paymentIntentId}:`,
        error,
      );
      throw new NotFoundException(
        `Payment intent ${paymentIntentId} not found`,
      );
    }
  }

  async cancelPayment(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
    try {
      const paymentIntent =
        await this.stripeService.cancelPaymentIntent(paymentIntentId);

      // Update booking status if needed
      const bookingIdString = paymentIntent.metadata?.bookingId;
      if (bookingIdString) {
        const bookingId = parseInt(bookingIdString, 10);
        if (!isNaN(bookingId)) {
          await this.ordersService.updateBookingStatus(bookingId, 'cancelled');
          this.logger.log(
            `Payment ${paymentIntentId} canceled and booking ${bookingIdString} status updated`,
          );
        }
      }

      return paymentIntent;
    } catch (error) {
      this.logger.error(`Failed to cancel payment ${paymentIntentId}:`, error);
      throw error;
    }
  }

  async handleWebhook(body: string, signature: string): Promise<void> {
    try {
      const event = this.stripeService.constructWebhookEvent(body, signature);

      this.logger.log(`Received webhook event: ${event.type}`);

      switch (event.type) {
        case 'payment_intent.succeeded':
          await this.handlePaymentSucceeded(event.data.object);
          break;

        case 'payment_intent.payment_failed':
          await this.handlePaymentFailed(event.data.object);
          break;

        case 'payment_intent.canceled':
          await this.handlePaymentCanceled(event.data.object);
          break;

        case 'payment_intent.requires_action':
          await this.handlePaymentRequiresAction(event.data.object);
          break;

        default:
          this.logger.log(`Unhandled event type: ${event.type}`);
      }
    } catch (error) {
      this.logger.error('Webhook handling failed:', error);
      throw error;
    }
  }

  private async handlePaymentSucceeded(
    paymentIntent: Stripe.PaymentIntent,
  ): Promise<void> {
    const bookingIdString = paymentIntent.metadata?.bookingId;
    if (bookingIdString) {
      const bookingId = parseInt(bookingIdString, 10);
      if (!isNaN(bookingId)) {
        await this.ordersService.updateBookingStatus(bookingId, 'confirmed');
        this.logger.log(
          `Booking ${bookingIdString} confirmed via webhook - payment succeeded`,
        );
      }
    }
  }

  private async handlePaymentFailed(
    paymentIntent: Stripe.PaymentIntent,
  ): Promise<void> {
    const bookingIdString = paymentIntent.metadata?.bookingId;
    if (bookingIdString) {
      const bookingId = parseInt(bookingIdString, 10);
      if (!isNaN(bookingId)) {
        await this.ordersService.updateBookingStatus(bookingId, 'failed');
        this.logger.log(
          `Booking ${bookingIdString} marked as failed via webhook - payment failed`,
        );
      }
    }
  }

  private async handlePaymentCanceled(
    paymentIntent: Stripe.PaymentIntent,
  ): Promise<void> {
    const bookingIdString = paymentIntent.metadata?.bookingId;
    if (bookingIdString) {
      const bookingId = parseInt(bookingIdString, 10);
      if (!isNaN(bookingId)) {
        await this.ordersService.updateBookingStatus(bookingId, 'cancelled');
        this.logger.log(
          `Booking ${bookingIdString} canceled via webhook - payment canceled`,
        );
      }
    }
  }

  private async handlePaymentRequiresAction(
    paymentIntent: Stripe.PaymentIntent,
  ): Promise<void> {
    const bookingIdString = paymentIntent.metadata?.bookingId;
    if (bookingIdString) {
      const bookingId = parseInt(bookingIdString, 10);
      if (!isNaN(bookingId)) {
        await this.ordersService.updateBookingStatus(bookingId, 'pending');
        this.logger.log(
          `Booking ${bookingIdString} requires action - payment needs authentication`,
        );
      }
    }
  }

  // Helper method to get payment status for a booking
  async getBookingPaymentStatus(bookingId: string): Promise<{
    booking: BookingOrder;
    paymentStatus?: string;
    paymentIntentId?: string;
  }> {
    const numericBookingId = parseInt(bookingId, 10);
    if (isNaN(numericBookingId)) {
      throw new BadRequestException(`Invalid booking ID format: ${bookingId}`);
    }

    const booking = await this.ordersService.getBookingOrder(numericBookingId);
    if (!booking) {
      throw new NotFoundException(`Booking ${bookingId} not found`);
    }

    // You might want to store payment intent ID in booking metadata
    // For now, we'll just return booking status
    return {
      booking,
      paymentStatus: booking.status,
    };
  }
}
