import { api } from "@/shared/api";
import type { AuthLogoutResponseQuery } from "@/shared/types/response/auth.type";
import type { AxiosResponse } from "axios";

export async function AuthLogoutEndpoint(): Promise<
  AxiosResponse<AuthLogoutResponseQuery>
> {
  return api.get<AuthLogoutResponseQuery>("/auth/logout");
}
