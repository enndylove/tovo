import { createRouter } from "@tanstack/react-router";
import { queryClient, rootRoute } from "./root";
import { ErrorComponent } from "./error";
import { IndexRoute } from "./pages/index";
import { LoginRoute } from "./pages/login";
import { RegisterRoute } from "./pages/register";

const routeTree = rootRoute.addChildren([
  IndexRoute,
  LoginRoute,
  RegisterRoute,
]);

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultErrorComponent: ({ error }: { error: Error }) => (
    <ErrorComponent error={error as Error} />
  ),
  notFoundMode: "fuzzy",
  defaultStaleTime: 10000,
  context: {
    queryClient,
    auth: undefined!,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export { router };
