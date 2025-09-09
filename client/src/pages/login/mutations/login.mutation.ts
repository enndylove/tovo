import { toast } from "sonner";

import { AuthSignInEndpoint } from "@/api/auth/sign-in";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import type { AxiosError, AxiosResponse } from "axios";
import type { LoginFormValues } from "@/shared/schemas/auth/login.schema";
import type { AuthSignInResponseQuery } from "@/shared/types/response/auth.type";

export function useLoginMutation() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const onSuccess = async () => {
    queryClient.invalidateQueries({ queryKey: ["user"] });
    toast.success("Login successfully.");
    navigate({
      to: "/",
    });
  };

  return useMutation<
    AxiosResponse<AuthSignInResponseQuery>,
    AxiosError,
    LoginFormValues
  >({
    mutationFn: (values) => AuthSignInEndpoint(values),
    onError: (err) => {
      toast.error("Something went wrong.", {
        description: err.message,
      });
    },
    onSuccess,
  });
}
