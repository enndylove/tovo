import { RemoveOrderEndpoint } from "@/api/booking-orders/remove-order";

import { toast } from "sonner"

import { useMutation } from "@tanstack/react-query"

import type { AxiosResponse } from "axios";
import type { BookingOrder } from "@tovo/database";

export function useRemoveOrderMutation(onSuccess?: () => void) {
  return useMutation({
     mutationKey: ["remove-order"],
     mutationFn: (values: { id: BookingOrder["id"] }): Promise<AxiosResponse<unknown>> => {
       return RemoveOrderEndpoint(values)
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
