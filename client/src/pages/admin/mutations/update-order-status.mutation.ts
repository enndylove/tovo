import { UpdateOrderStatusEndpoint } from "@/api/booking-orders/update-order-status";

import { toast } from "sonner"

import { useMutation } from "@tanstack/react-query"

import type { AxiosResponse } from "axios";
import type { BookingOrder } from "@tovo/database";

type UpdateStatusRequest = {
  id: BookingOrder['id'],
  status: BookingOrder['status']
}

export function useUpdateOrderStatusMutation(onSuccess?: () => void) {
  return useMutation({
     mutationKey: ["update-order-status"],
     mutationFn: (values: UpdateStatusRequest): Promise<AxiosResponse<unknown>> => {
       return UpdateOrderStatusEndpoint(values)
     },
     onSuccess: () => {
      toast.success("Successful", {
         description: "This reservation has been deleted!",
      });

      onSuccess?.()
     },
     onError: (err: Error) => {
       toast.error("Failed to delete reservation. Try again.", {
         description: err.message,
       })
     },
   })
}
