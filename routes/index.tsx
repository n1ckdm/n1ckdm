/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import Terminal from "../islands/Terminal.tsx";
import Title from "../src/components/Title.tsx";
import Banner from "../src/components/Banner.tsx";

export default function Home() {
  return (
    <div>
      <Banner />
      <div class={tw`h-screen p-2 md:p-4`}>
        <Title />
        <Terminal />
      </div>
    </div>
  );
}
