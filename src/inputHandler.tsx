/** @jsx h */
import { h } from "preact";
import { tw } from "twind";
import { asset } from "$fresh/runtime.ts";
import StaticLine from "./components/StaticLine.tsx";
import Me from "./components/cv/Me.tsx";
import Languages from "./components/cv/Languages.tsx";
import Skills from "./components/cv/Skills.tsx";
import Work from "./components/cv/Work.tsx";
import Education from "./components/cv/Education.tsx";
import Awards from "./components/cv/Awards.tsx";
import All from "./components/cv/All.tsx";
import * as cv from "nickcv";

const defaultLines: h.JSX.Element[] = [];

const cvMap = new Map<string, h.JSX.Element>();
cvMap.set("me", <Me />);
cvMap.set("languages", <Languages />);
cvMap.set("skills", <Skills />);
cvMap.set("work", <Work />);
cvMap.set("education", <Education />);
cvMap.set("awards", <Awards />);
cvMap.set("all", <All />);

function inputHandler(input: string): h.JSX.Element[] {
  if (input === "about") {
    const lines = [
      "This website was created by me 😁!",
      "It uses Fresh.js, which I was learning at the time.",
      "This terminal emulator 👩‍💻 is build from the ground up with Preact components - and some fairly dodgy code 💩.",
    ];
    return [
      <StaticLine text={input} prompt="$" />,
      ...lines.map((l) => (
        <StaticLine text={l} color="blue-500" smSzAdjust={true} />
      )),
    ];
  }

  if (input === "help") {
    const lines = [
      "Commands:",
      "   about:            info about this site",
      "   clear:            clear the terminal",
      "   help:             show this help",
      " ",
      "   open [link]       open a link in a new tab",
      '      links:  "dev", "twitter", "github", "linkedIn"',
      " ",
      "   show [img,...]:   show image(s):",
      '      imgs:   "nick", "unicorn", "cat"',
      " ",
      "   cv [cmd]:         display parts of my cv:",
      `      cmds:  ${Array.from(cvMap.keys())
        .map((k) => `"${k}"`)
        .join(", ")}`,
    ];

    return [
      <StaticLine text={input} prompt="$" />,
      ...lines.map((l) => (
        <StaticLine text={l} color="blue-500" smSzAdjust={true} />
      )),
    ];
  }

  const regExImage = /show (\w*)[ ]*(\w*)[ ]*(\w*)[ ]*(\w*)[ ]*(\w*)/;
  let m;
  if ((m = regExImage.exec(input)) !== null) {
    const images: string[] = [];
    m.slice(1).forEach((match) => {
      match && images.push(`${match}.png`);
    });
    return [
      <StaticLine text={input} prompt="$" />,
      ...images.map((i) => <img class={tw`w-8/12 md:w-3/12`} src={asset(i)} />),
    ];
  }

  const regExCv = /cv (\w+)/;
  if ((m = regExCv.exec(input)) !== null) {
    const cvEelement = cvMap.get(m.slice(1)[0]);
    if (cvEelement !== undefined) {
      return [<StaticLine text={input} prompt="$" />, cvEelement];
    }
  }

  const regExOpen = /open (\w+)/;
  if ((m = regExOpen.exec(input)) !== null) {
    type ObjectKey = keyof typeof cv.social;
    const link = cv.social[m.slice(1)[0] as ObjectKey];

    const res = [<StaticLine text={input} prompt="$" />];

    if (link !== undefined) {
      window.open(link, "_blank");
      res.push(<StaticLine color="green-400" text={"Link opened!"} />);
    } else {
      res.push(<StaticLine color="red-400" text={"Link not found!"} />);
    }
    return res;
  }

  return [
    <StaticLine text={input} prompt="$" />,
    <StaticLine color="red-600" text={"Command not recognised!"} />,
  ];
}
export { defaultLines, inputHandler };
