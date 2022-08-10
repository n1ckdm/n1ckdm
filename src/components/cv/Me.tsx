/** @jsx h */
import { h } from "preact";
import { tw } from "twind";
import { asset } from "$fresh/runtime.ts";
import StaticLine from "../StaticLine.tsx";
import * as cv from "nickcv";

const col = "purple-300";
const me = cv.me;

export default function () {
  return (
    <div class={tw`grid gap-y-1`}>
      <img class={tw`rounded ml-2.5`} src={asset("grav.png")} />
      <StaticLine color={col} text={`Hi, my name is ${me.preferredName} 👋`} />
      <StaticLine
        color={col}
        text={`Fullname: ${me.firstName} ${me.middleName} ${me.lastName} (${me.pronouns})`}
      />
      <StaticLine color={col} text={`Location: ${me.city}, ${me.country}`} />
      <StaticLine color={col} text={`Contact: ${me.email}`} />
      <StaticLine color={col} text={`About Me: ${me.bio}`} />
    </div>
  );
}
