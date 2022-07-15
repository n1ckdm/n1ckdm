/** @jsx h */
import { h } from "preact";
import { asset, Head } from "$fresh/runtime.ts";
import { AppProps } from "$fresh/src/server/types.ts";

export default function App({ Component }: AppProps) {
  return (
    <html data-custom="data">
      <Head>
        <title>Nick Martin</title>
        <link rel="stylesheet" href={asset("style.css")} />
      </Head>
      <body>
        <Component />
      </body>
    </html>
  );
}
