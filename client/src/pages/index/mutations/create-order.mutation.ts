import { CreateOrderEndpoint } from "@/api/booking-orders/create-order";

import { toast } from "sonner"

import { useMutation } from "@tanstack/react-query"

import type { BookingOrder, NewBookingOrder } from "@tovo/database"
import type { AxiosResponse } from "axios";
import type { UseFormReturn } from "react-hook-form";

interface OrderMutationProps {
  form: UseFormReturn<NewBookingOrder, any, NewBookingOrder>
  onSuccess?: () => void;
}

export function useCreateOrderMutation({ form, onSuccess }: OrderMutationProps) {
  return useMutation({
     mutationKey: ["create-order"],
     mutationFn: (values: NewBookingOrder): Promise<AxiosResponse<BookingOrder>> => {
       return CreateOrderEndpoint(values)
     },
     onSuccess: () => {
       toast.success("Successful", {
         description: "Your reservation has been successfully created!",
       })

       onSuccess?.()

       form.reset()
     },
     onError: (err: Error) => {
       toast.error("Failed to create reservation. Try again.", {
         description: err.message,
       })
     },
   })
}
