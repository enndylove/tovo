import { api } from "@/shared/api";

import type { AxiosResponse } from "axios";
import type { CreatePaymentIntentDto } from "@/shared/types/request/payment.type";
import type { CreateIntentResponse } from "@/shared/types/response/payment.type";

export async function CreateIntentEndpoint(
  query: CreatePaymentIntentDto
): Promise<AxiosResponse<CreateIntentResponse>> {
  return api.post<CreateIntentResponse>("/payments/create-intent", query);
}
