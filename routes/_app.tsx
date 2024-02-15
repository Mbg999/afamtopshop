import { type AppProps } from "$fresh/server.ts";
import { Head, asset } from "$fresh/runtime.ts";
export default function App({ Component }: AppProps) {
  return (
    <html>
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>afamtopshop</title>
        <link href={asset("/css/bootstrap.min.css")} rel="stylesheet" />
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <body>
        <Component />
        <script src={asset("/js/bootstrap.bundle.min.js")}></script>
      </body>
    </html>
  );
}
