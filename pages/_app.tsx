import type { AppProps } from "next/app";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Provider } from "jotai";

import Head from "next/head";
import "../styles/globals.css";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      {process.env.NODE_ENV !== "production" ? (
        <ReactQueryDevtools initialIsOpen={false} />
      ) : null}
      <Provider>
        <Head>
          <title>포켓몬스터</title>
          <meta name="description" content="next.js연습을 위한 포켓몬 도감" />
          <link rel="icon" href="/favico.ico" />
        </Head>
        <Component {...pageProps} />
      </Provider>
    </QueryClientProvider>
  );
}
