import { z } from "zod";

export const timeSelectionSchema = z.object({
  time: z.string().min(1, 'Please select a time'),
});

export type TimeFormData = z.infer<typeof timeSelectionSchema>;
