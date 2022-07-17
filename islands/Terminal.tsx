/** @jsx h */
import { h } from "preact";
import { tw } from "twind";
import { MutableRef, useEffect, useRef, useState } from "preact/hooks";
import Line from "./Line.tsx";
import useKeyPress from "./useKeyPress.tsx";

const title = [
  ` `,
  `     _   __ ____ ______ __ __    __  ___ ___     ____  ______ ____ _   __`,
  `    / | / //  _// ____// //_/   /  |/  //   |   / __ \\/_  __//  _// | / /`,
  `   /  |/ / / / / /    / ,<     / /|_/ // /| |  / /_/ / / /   / / /  |/ / `,
  `  / /|  /_/ / / /___ / /| |   / /  / // ___ | / _, _/ / /  _/ / / /|  /  `,
  ` /_/ |_//___/ \\____//_/ |_|  /_/  /_//_/  |_|/_/ |_| /_/  /___//_/ |_/   `,
  ` `,
];

let historyIndex = 0;
const initCmdHist: string[] = [];
const defaultLines: string[] = [];

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
    console.log("command: " + text);
    setLiveText("");
    text && setCommandHistory([...commandHistory, text]);
    historyIndex = 0;

    if (text === "clear") {
      setLines(defaultLines);
    } else {
      setLines([...staticLines, text]);
    }

    setTimeout(focusLiveLine, 10);
  }

  function focusLiveLine() {
    if (liveLine.current) {
      (liveLine as MutableRef<HTMLInputElement>).current.focus();
    }
  }

  return (
    <div>
      {title.map((t) => (
        <Line prompt="" text={t} live={false} />
      ))}
      {staticLines.map((l) => (
        <Line prompt="$" text={l} live={false} />
      ))}
      <Line
        ref={liveLine}
        prompt="$"
        key={`${liveText}:${commandHistory.length}`}
        live={true}
        text={liveText}
        onEnter={handleEnter}
      />
    </div>
  );
}
