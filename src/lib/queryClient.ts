import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 15 * 60 * 1_000,   // data stays fresh for 15 min
      gcTime: 30 * 60 * 1_000,      // kept in cache for 30 min
      refetchOnWindowFocus: false,   // no refetch on tab switch
      retry: 2,
    },
  },
});
