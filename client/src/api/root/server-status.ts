import { api } from "@/shared/api";
import type { AxiosResponse } from "axios";

export async function ServerStatusEndpoint(): Promise<
  AxiosResponse<unknown>
> {
  return api.get<unknown>("/");
}
