import { toast } from "sonner";

import { AuthSignUpEndpoint } from "@/api/auth/sign-up";

import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import type { AxiosError, AxiosResponse } from "axios";
import type { RegisterFormValues } from "@/shared/schemas/auth/register.schema";

export function useRegisterMutation() {
  const navigate = useNavigate();

  const onSuccess = () => {
    toast.success("Register successfully.");
    navigate({
      to: "/login",
    });
  };

  return useMutation<AxiosResponse<unknown>, AxiosError, RegisterFormValues>({
    mutationFn: (values) => AuthSignUpEndpoint(values),
    onError: (err) => {
      toast.error("Something went wrong.", {
        description: err.message,
      });
    },
    onSuccess,
  });
}
