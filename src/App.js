import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "styled-components";
import Router from "./shares/Router";
import GlobalStyle from "./styles/GlobalStyle";
import theme from "./styles/config/defaultTheme";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Router />
        </ThemeProvider>
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </>
  );
}

export default App;
