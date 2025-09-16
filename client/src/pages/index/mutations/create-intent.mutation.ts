import { CreateIntentEndpoint } from "@/api/payment/create-intent";

import { toast } from "sonner"

import { useMutation } from "@tanstack/react-query"

import type { AxiosResponse } from "axios";
import type { CreatePaymentIntentDto } from "@/shared/types/request/payment.type";
import type { CreateIntentResponse } from "@/shared/types/response/payment.type";

export function useCreateIntentMutation(onSuccess?: () => void) {
  return useMutation({
     mutationKey: ["create-intent"],
     mutationFn: (
       values: CreatePaymentIntentDto
     ): Promise<AxiosResponse<CreateIntentResponse>> => {
       return CreateIntentEndpoint(values)
     },
     onSuccess: () => {
       toast.success("Successful", {
         description: "Your payment intent has been successfully created!",
       })

       onSuccess?.()
     },
     onError: (err: Error) => {
       toast.error("Failed to create payment intent. Try again.", {
         description: err.message,
       })
     },
   })
}
