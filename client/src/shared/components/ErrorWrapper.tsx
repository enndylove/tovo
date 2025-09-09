import { Button } from "@/components/ui/button";
import { Error } from "./Error";

import { useServerStatusQuery } from "@/hooks/root/useServerStatus"
import { useCanGoBack, useRouter } from "@tanstack/react-router";

interface ErrorWrapperProps {
  children: React.ReactNode,
}

export function ErrorWrapper({ children }: ErrorWrapperProps) {
  const { isError, isLoading, isPending, refetch } = useServerStatusQuery();
  const router = useRouter();
  const canGoBack = useCanGoBack();

  if(isError && !isLoading && !isPending) {
    return (
      <Error
        status={"500"}
        title={"500 Server Error"}
        description="Something went wrong. Please try again or contact support."
      >
        <div className="flex flex-col gap-2">
          <Button
            onClick={() => refetch()}
            className="py-5 font-normal px-10 text-[1rem]"
            variant={"default"}
          >
            Retry
          </Button>

          {canGoBack ? (
            <Button onClick={() => router.history.back()}
              className="text-primary font-normal py-3 px-5 text-[1rem]"
              variant={"ghost"}
            >
              Back
            </Button>
          ) : null}
        </div>
      </Error>
    )
  }

  return children
}
