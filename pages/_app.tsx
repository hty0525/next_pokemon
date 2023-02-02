import type { AppProps } from "next/app";
import Head from "next/head";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Provider } from "jotai";

import Layout from "../components/Layout";

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
          <title>HTY의 포켓몬 도감</title>
          <meta
            name="description"
            content="next.js로 배포한 한글패치 된 포켓몬 도감"
          />
          <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <meta property="og:title" content="HTY의 포켓몬 도감" />
          <meta
            property="og:description"
            content="next.js로 배포한 한글패치 된 포켓몬 도감"
          />
          <meta
            property="og:url"
            content="https://next-pokemon-hty0525.vercel.app/"
          />
          <meta property="og:image" content="/image/ogImg.png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta
            name="google-site-verification"
            content="XyesrM_C06HGRkv9gazbBnLJtF_bGlZd7keCo0aJEgk"
          />
          <link rel="icon" href="/favico.ico" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </QueryClientProvider>
  );
}
