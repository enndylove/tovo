import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../hooks/useAuth";

interface UnAuthGuardProps {
  children: React.ReactNode,
  redirect?: string,
}

export const UnAuthGuard = ({ children, redirect }: UnAuthGuardProps) => {
  const navigate = useNavigate();
  const { isLoading, isLoggedIn } = useAuth();

  if (!isLoading && isLoggedIn) {
    if (redirect) {
      navigate({
        to: redirect
      })
    }

    return null;
  }

  return <>{children}</>;
};
