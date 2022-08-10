/** @jsx h */
import { h } from "preact";
import { tw } from "twind";
import { asset } from "$fresh/runtime.ts";

export default function Banner() {
  return (
    <video
      class={tw`w-screen overflow-hidden max-h-[525px] object-cover object-bottom`}
      autoPlay
      loop
      muted
      src={asset("/banner.webm")}
    />
  );
}
