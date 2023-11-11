import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
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
          content="bBEaUXPzeMoRRxDBuOPdzl1DXv83xIGaPt64UJGkj8c"
        />
        <link rel="icon" href="/favico.ico" />
      </Head>
      <body style={{ background: "url(/image/bg_pattern2.jpg)" }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
