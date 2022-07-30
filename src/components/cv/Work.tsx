/** @jsx h */
import { h } from "preact";
import { tw } from "twind";
import StaticLine from "../StaticLine.tsx";
import * as cv from "nickcv";

const col = "purple-300";

interface work {
  company: string;
  role: string;
  startDate: string;
  finishDate: string | null;
  description: string;
}

const workComp = (workItem: work) => (
  <div>
    <StaticLine
      color="purple-200"
      text={`${workItem.company} (${workItem.startDate} - ${
        workItem.finishDate || "Present"
      })`}
    />
    <StaticLine color="purple-400" text={`${workItem.role}`} />
    <StaticLine color={col} text={workItem.description} />
    <StaticLine color={col} text=" " />
  </div>
);

export default function () {
  return (
    <div class={tw`grid gap-y-1`}>
      {cv.work.reverse().map((item) => workComp(item))}
    </div>
  );
}
