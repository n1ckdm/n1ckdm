/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import Line from "../islands/Line.tsx";

export default function Home() {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <Line prompt="$" default="test test test" />
    </div>
  );
}
