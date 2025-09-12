import { IndexPage } from "@/pages/index";
import { rootRoute } from "@/routes/root";
import { createRoute } from "@tanstack/react-router";

export const IndexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: IndexPage,
});
