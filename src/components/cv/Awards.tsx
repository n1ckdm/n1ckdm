/** @jsx h */
import { h } from "preact";
import { tw } from "twind";
import StaticLine from "../StaticLine.tsx";
import * as cv from "nickcv";

const col = "purple-300";

export default function () {
  return (
    <div class={tw`grid gap-y-1`}>
      {cv.awards.map((a) => (
        <div>
          <StaticLine color={col} text={`🏆 ${a}`} />
        </div>
      ))}
    </div>
  );
}
