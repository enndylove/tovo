import LoginPage from "@/pages/login";
import { rootRoute } from "@/routes/root";
import { createRoute } from "@tanstack/react-router";

export const LoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});
