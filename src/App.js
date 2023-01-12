import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Router from "./shares/Router";
import GlobalStyle from "./styles/GlobalStyle";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <Router />
        <ReactQueryDevtools />
      </QueryClientProvider>

    </>
  );
}

export default App;
