import { api } from "@/shared/api";

import type { AxiosResponse } from "axios";
import type { ConfirmPaymentDto } from "@/shared/types/request/payment.type";
import type { ConfirmResponse } from "@/shared/types/response/payment.type";

export async function CreateIntentEndpoint(
  query: ConfirmPaymentDto
): Promise<AxiosResponse<ConfirmResponse>> {
  return api.post<ConfirmResponse>(`/payments/confirm`, query);
}
