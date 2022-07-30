/** @jsx h */
import { h } from "preact";
import { tw } from "twind";
import StaticLine from "../StaticLine.tsx";
import * as cv from "nickcv";

const col = "purple-300";
const langs = cv.languages;

const tabs = (lang: string) =>
  lang.length > 6 ? "\t" : lang.length < 3 ? "\t\t\t" : "\t\t";

export default function () {
  return (
    <div class={tw`grid gap-y-1`}>
      {langs.map((l) => (
        <div>
          <StaticLine
            color={col}
            text={`${l.name}:${tabs(l.name)}${"*".repeat(l.score)}`}
          />
        </div>
      ))}
    </div>
  );
}
