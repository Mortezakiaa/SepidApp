import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type propsType = {
  children: React.ReactNode;
};
const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } } });
declare module '@tanstack/react-query' {
  interface Register {
    defaultError: ResponseModel<any>;
  }
}
export default function ReactQueryProvider({ children }: propsType) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
