import { api } from "@/shared/api"

import { toast } from "sonner"

import { useMutation } from "@tanstack/react-query"

import type { NewBookingOrder } from "@tovo/database"
import type { AxiosResponse } from "axios";
import type { UseFormReturn } from "react-hook-form";

interface OrderMutationProps {
  form: UseFormReturn<NewBookingOrder, any, NewBookingOrder>
  onSuccess?: () => void;
}

export function bookingOrderMutation({ form, onSuccess }: OrderMutationProps) {
  return useMutation({
     mutationKey: ["create-order"],
     mutationFn: (values: NewBookingOrder): Promise<AxiosResponse<unknown>> => {
       return api.post<unknown>("/booking", values)
     },
     onSuccess: () => {
       toast.success("Transaction created", {
         description: "You can see the new transaction in the table",
       })

       onSuccess?.()

       form.reset()
     },
     onError: (err: Error) => {
       toast.error("Failed to create transaction", {
         description: err.message,
       })
     },
   })
}
