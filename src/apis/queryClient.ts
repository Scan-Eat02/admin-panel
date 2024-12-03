import { QueryClient } from "react-query";

const onError = (error: unknown) => {
  console.log(error);
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      cacheTime: 5 * 60 * 1000,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchInterval: false,
      refetchIntervalInBackground: false,
      retry: 0,
      keepPreviousData: false,
      onError,
    },
    mutations: {
      retry: 0,
      onError,
    },
  },
});

export default queryClient;
