import type { BookingOrder } from "@tovo/database";

export type CreatePaymentIntentDto = {
  bookingId: BookingOrder['id'];
  amount: BookingOrder['price'];
  currency?: string;
  customerEmail?: BookingOrder['email'];
}

export type ConfirmPaymentDto = {
  paymentIntentId: string;
  paymentMethodId?: string;
}
