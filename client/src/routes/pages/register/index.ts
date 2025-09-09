import RegisterPage from "@/pages/register";
import { rootRoute } from "@/routes/root";
import { createRoute } from "@tanstack/react-router";

export const RegisterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterPage,
});
