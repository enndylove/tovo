import { api } from "@/shared/api";

import type { AxiosResponse } from "axios";

export async function StripeWebhookEndpoint(): Promise<AxiosResponse<unknown>> {
  return api.post<unknown>("/payments/webhook");
}
