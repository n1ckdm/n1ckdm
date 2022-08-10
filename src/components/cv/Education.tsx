/** @jsx h */
import { h } from "preact";
import { tw } from "twind";
import StaticLine from "../StaticLine.tsx";
import * as cv from "nickcv";

const col = "purple-300";
const col2 = "green-300";

interface education {
  institution: string;
  subject: string;
  level: string;
  grade: string;
  startDate: string;
  finishDate: string;
}

const comp = (item: education) => (
  <div>
    <StaticLine
      color="purple-200"
      text={`${item.institution} (${item.startDate} - ${item.finishDate})`}
    />
    <StaticLine color={col2} text={item.level} />
    <StaticLine color="purple-400" text={`${item.subject} : ${item.grade}`} />
    <StaticLine color={col} text=" " />
  </div>
);

export default function () {
  return (
    <div class={tw`grid gap-y-1`}>
      {cv.education.reverse().map((item) => comp(item))}
    </div>
  );
}
