import { ServerStatusEndpoint } from "@/api/root/server-status";
import { useQuery } from "@tanstack/react-query";

export function useServerStatusQuery() {
  const q = useQuery({
    queryKey: ["server-status"],
    queryFn: () => ServerStatusEndpoint(),
    staleTime: 5000,
  });

  return q;
}
