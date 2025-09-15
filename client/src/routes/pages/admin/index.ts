import { AdminPage } from "@/pages/admin";
import { rootRoute } from "@/routes/root";
import { createRoute } from "@tanstack/react-router";

export const AdminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});
