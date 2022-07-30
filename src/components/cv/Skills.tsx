/** @jsx h */
import { h } from "preact";
import { tw } from "twind";
import StaticLine from "../StaticLine.tsx";
import * as cv from "nickcv";

const col = "purple-300";
const skills = cv.skills;

const tabs = (skill: string) =>
  skill.length > 27
    ? "\t"
    : skill.length < 6
    ? "\t\t\t\t\t\t\t"
    : skill.length > 18
    ? "\t\t\t"
    : skill.length > 16
    ? "\t\t\t\t"
    : "\t\t\t\t\t";

export default function () {
  return (
    <div class={tw`grid gap-y-1`}>
      {skills.map((l) => (
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
