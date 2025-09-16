import type { Metadata, PaymentIntent } from '@stripe/stripe-js';
import type { BookingOrder } from "@tovo/database";

export type CreateIntentResponse = {
  clientSecret: string | null,
  paymentIntentId: string,
}

export type ConfirmResponse = {
  paymentIntent: PaymentIntent;
  booking?: BookingOrder;
}

export type GetIntentResponse = {
  id: string,
  status: PaymentIntent.Status,
  amount: number, // Convert from cents
  currency: string,
  metadata: Metadata,
}

export type CancelPaymentResponse = {
  id: string,
  status: PaymentIntent.Status,
  message: string,
}
