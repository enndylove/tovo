import { z } from "zod";

export const guestSelectionSchema = z.object({
  guests: z.number().min(1, 'Please select number of guests'),
});

export type GuestFormData = z.infer<typeof guestSelectionSchema>;
