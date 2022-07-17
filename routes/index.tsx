/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import Terminal from "../islands/Terminal.tsx";

export default function Home() {
  return (
    <div class={tw`h-screen max-h-96`}>
      <Terminal />
    </div>
  );
}
