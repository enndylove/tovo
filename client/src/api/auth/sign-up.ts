import { api } from "@/shared/api";
import { AuthSignUpRequestQuery } from "@/shared/types/request/auth.type";
import type { AxiosResponse } from "axios";

export async function AuthSignUpEndpoint({
  name,
  email,
  password,
}: AuthSignUpRequestQuery): Promise<AxiosResponse<unknown>> {
  return await api.post<unknown>("/auth/sign-up", {
    name,
    email,
    password,
  });
}
