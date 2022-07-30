/** @jsx h */
import { h } from "preact";
import { tw } from "twind";
import { asset } from "$fresh/runtime.ts";
import StaticLine from "./components/StaticLine.tsx";
import Me from "../src/components/cv/Me.tsx";

const defaultLines: h.JSX.Element[] = [];

export default function (input: string): h.JSX.Element[] {
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
      "   show [img,...]:   show image(s):",
      '      -"nick"        print an image of me! 🚀',
      '      -"unicorn"     print an image of my faviourite animal 🦄',
      '      -"cat"         print an image of a 🐱',
      "   cv [cmd]:         display parts of my cv:",
      '      -"all"         view my entire cv in one go',
      '      -"me"          view my personal info',
    ];

    return [
      <StaticLine text={input} prompt="$" />,
      ...lines.map((l) => (
        <StaticLine text={l} color="blue-500" smSzAdjust={true} />
      )),
    ];
  }

  const regex = /show (\w*)[ ]*(\w*)[ ]*(\w*)[ ]*(\w*)[ ]*(\w*)/;
  let m;
  if ((m = regex.exec(input)) !== null) {
    const images: string[] = [];
    m.slice(1).forEach((match) => {
      match && images.push(`${match}.png`);
    });
    return [
      <StaticLine text={input} prompt="$" />,
      ...images.map((i) => <img class={tw`w-8/12 md:w-3/12`} src={asset(i)} />),
    ];
  }

  if (input === "cv -me") {
    return [<StaticLine text={input} prompt="$" />, <Me />];
  }

  return [<StaticLine text={input} prompt="$" />];
}
