import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../hooks/useAuth";

interface AuthGuardProps {
  children: React.ReactNode,
  redirect?: string,
}

export const AuthGuard = ({ children, redirect }: AuthGuardProps) => {
  const navigate = useNavigate();
  const { isLoading, isLoggedIn } = useAuth();

  if (!isLoading && !isLoggedIn) {
    if (redirect) {
      navigate({
        to: redirect
      })
    }
    return null;
  }

  return <>{children}</>;
};
