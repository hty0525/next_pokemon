import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Head from "next/head";

const client = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      {process.env.NODE_ENV !== "production" ? (
        <ReactQueryDevtools initialIsOpen={false} />
      ) : null}
      <Head>
        <title>포켓몬!</title>
      </Head>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
