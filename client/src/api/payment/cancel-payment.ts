import { api } from "@/shared/api";

import type { AxiosResponse } from "axios";
import type { CancelPaymentResponse } from "@/shared/types/response/payment.type";

export async function CancelPaymentEndpoint(
  id: string
): Promise<AxiosResponse<CancelPaymentResponse>> {
  return api.post<CancelPaymentResponse>(`/payments/cancel/${id}`);
}
