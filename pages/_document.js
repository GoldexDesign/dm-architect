import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="sr">
      <Head>
        {/* Google Font: Crimson Text (fallback for srpska slova) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
