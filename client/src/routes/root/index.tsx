import { Button } from "@/components/ui/button";
import { Error } from "@/shared/components/Error";
import { ErrorWrapper } from "@/shared/components/ErrorWrapper";
import { useAuth } from "@/shared/hooks/useAuth";
import { QueryClient } from "@tanstack/react-query";
import { Link, Outlet, createRootRouteWithContext, useRouter, useCanGoBack } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

type MyRouterContext = {
  queryClient: typeof queryClient;
  auth: ReturnType<typeof useAuth>;
};

const rootRoute = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
  notFoundComponent: () => {
    const router = useRouter()
    const canGoBack = useCanGoBack()

    return (
      <Error
        status={"404"}
        title={"404 – Page not found"}
        description="Looks like this page doesn’t exist."
      >
        {canGoBack ? (
          <Button onClick={() => router.history.back()}
            className="text-primary font-normal py-3 px-5 text-base"
            variant={"ghost"}
          >
            Go back
          </Button>
        ) : null}
      </Error>
    )
  },
});

function RootComponent() {
  return (
    <div className="min-h-svh items-center max-h-screen pt-16 flex gap-14 flex-col">
      <Link className="mx-auto" to="/404">
        <img className="max-h-8" src="/logo.svg" />
      </Link>
      <ErrorWrapper>
        <main className="max-w-sm w-full flex-1 bg-background">
          {/* This is where child routes will render */}
          <Outlet />
        </main>
      </ErrorWrapper>

      {import.meta.env.MODE === "development" && (
        <TanStackRouterDevtools position="bottom-left" />
      )}
    </div>
  );
}

export { rootRoute };
