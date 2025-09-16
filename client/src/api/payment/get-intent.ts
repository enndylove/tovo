import { api } from "@/shared/api";

import type { AxiosResponse } from "axios";
import type { GetIntentResponse } from "@/shared/types/response/payment.type";

export async function GetIntentEndpoint(
  id: string
): Promise<AxiosResponse<GetIntentResponse>> {
  return api.get<GetIntentResponse>(`/payments/intent/${id}`);
}
