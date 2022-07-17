/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { css } from "twind/css";
import Terminal from "../islands/Terminal.tsx";

export default function Home() {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <Terminal />
    </div>
  );
}
