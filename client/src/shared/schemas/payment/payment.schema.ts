import { z } from "zod";

export const paymentSchema = z.object({
  cardNumber: z
    .string()
    .regex(/^\d{16}$/, "Card number must be 16 digits"),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry must be in MM/YY format"),
  cvc: z.string().regex(/^\d{3}$/, "CVC must be 3 digits"),
});

export type PaymentFormValues = z.infer<typeof paymentSchema>;
