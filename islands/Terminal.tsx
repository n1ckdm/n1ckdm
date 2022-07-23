/** @jsx h */
import { h } from "preact";
import { tw } from "twind";
import { asset } from "$fresh/runtime.ts";
import { MutableRef, useEffect, useRef, useState } from "preact/hooks";
import TerminalInputLine from "./TerminalInputLine.tsx";
import StaticLine from "../src/components/StaticLine.tsx";

let historyIndex = 0;
const initCmdHist: string[] = [];
const defaultLines: h.JSX.Element[] = [];

export default function Terminal() {
  const liveLine = useRef<HTMLInputElement>(null);
  const [staticLines, setLines] = useState(defaultLines);
  const [liveText, setLiveText] = useState("");
  const [commandHistory, setCommandHistory] = useState(initCmdHist);

  useEffect(() => {
    focusLiveLine();
  }, []);

  useEffect(() => {
    function upArrowHandler({ key }: { key: string }): void {
      if (key === "ArrowUp" || key === "ArrowDown") {
        historyIndex = key === "ArrowUp" ? historyIndex - 1 : historyIndex + 1;
        historyIndex === commandHistory.length && (historyIndex = 0);
        historyIndex < 0 && (historyIndex = commandHistory.length - 1);
        if (commandHistory.length > 0) {
          setLiveText(commandHistory[historyIndex]);
        }
      }
    }
    globalThis.addEventListener("keydown", upArrowHandler);
    return () => {
      globalThis.removeEventListener("keydown", upArrowHandler);
    };
  }, [commandHistory]);

  function handleEnter(text: string) {
    setLiveText("");
    text && setCommandHistory([...commandHistory, text]);
    historyIndex = 0;

    if (text === "clear") {
      setLines(defaultLines);
    } else {
      setLines([...staticLines, <StaticLine text={text} prompt="$" />]);
    }

    if (text === "help") {
      const lines = [
        "Commands:",
        "   clear:            clear the terminal",
        "   help:             show this help",
        "   show -l:          list all available images to show",
        "   show [img,...]:   show image(s):",
        '      -"nick"        print an image of me! 🚀',
        '      -"unicorn"     print an image of my favourite animal 🦄',
        "   cv [cmd]:         display parts of my cv:",
        '      -"all"         view my entire cv in one go',
      ];

      setLines([
        ...staticLines,
        <StaticLine text={text} prompt="$" />,
        ...lines.map((l) => (
          <StaticLine text={l} color="blue-500" smSzAdjust={true} />
        )),
      ]);
    }

    if (text === "show -l") {
      const lines = ["nick", "unicorn", "flamingo", "7up"];
      setLines([
        ...staticLines,
        <StaticLine text={text} prompt="$" />,
        ...lines.map((l) => (
          <StaticLine text={l} color="blue-500" smSzAdjust={true} />
        )),
      ]);
    } else {
      const regex = /show (\w*)[ ]*(\w*)[ ]*(\w*)[ ]*(\w*)[ ]*(\w*)/;
      let m;
      if ((m = regex.exec(text)) !== null) {
        const images: string[] = [];
        m.slice(1).forEach((match) => {
          match && images.push(`${match}.png`);
        });
        setLines([
          ...staticLines,
          <StaticLine text={text} prompt="$" />,
          ...images.map((i) => (
            <img class={tw`w-8/12 md:w-3/12`} src={asset(i)} />
          )),
        ]);
      }
    }

    setTimeout(focusLiveLine, 10);
  }

  function focusLiveLine() {
    if (liveLine.current) {
      (liveLine as MutableRef<HTMLInputElement>).current.focus();
    }
  }

  return (
    <div class={tw`h-full`}>
      {staticLines}
      <TerminalInputLine
        ref={liveLine}
        prompt="$"
        key={`${liveText}:${commandHistory.length}`}
        text={liveText}
        onEnter={handleEnter}
      />
    </div>
  );
}
