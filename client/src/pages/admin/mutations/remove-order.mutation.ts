import { RemoveOrderEndpoint } from "@/api/booking-orders/remove-order";

import { toast } from "sonner"

import { useMutation } from "@tanstack/react-query"

import type { AxiosResponse } from "axios";

export function useRemoveOrderMutation(onSuccess?: () => void) {
  return useMutation({
     mutationKey: ["remove-order"],
     mutationFn: (values: { id: string }): Promise<AxiosResponse<unknown>> => {
       return RemoveOrderEndpoint(values.id)
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
