export type CreatePaymentIntentDto = {
  bookingId: string;
  amount: number;
  currency?: string;
  customerEmail?: string;
}

export type ConfirmPaymentDto = {
  paymentIntentId: string;
  paymentMethodId?: string;
}
