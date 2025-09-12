import { z } from "zod";

export const dateSelectionSchema = z.object({
  date: z.string().min(1, 'Please select a date'),
});

export type DateFormData = z.infer<typeof dateSelectionSchema>;
