/** @jsx h */
import { h } from "preact";
import { tw } from "twind";
import { MutableRef, useEffect, useRef, useState } from "preact/hooks";
import Line from "./Line.tsx";
import useKeyPress from "./useKeyPress.tsx";

const title = [
  ``,
  `     _   __ ____ ______ __ __    __  ___ ___     ____  ______ ____ _   __`,
  `    / | / //  _// ____// //_/   /  |/  //   |   / __ \\/_  __//  _// | / /`,
  `   /  |/ / / / / /    / ,<     / /|_/ // /| |  / /_/ / / /   / / /  |/ / `,
  `  / /|  /_/ / / /___ / /| |   / /  / // ___ | / _, _/ / /  _/ / / /|  /  `,
  ` /_/ |_//___/ \\____//_/ |_|  /_/  /_//_/  |_|/_/ |_| /_/  /___//_/ |_/   `,
  ``,
];

const initCmdHist: string[] = [];

export default function CommandLineInterface() {
  const defaultLines = <Line text="" live={false} />;
  let historyIndex = 0;

  const liveLine = useRef<HTMLInputElement>(null);
  const [lines, setLines] = useState([defaultLines]);
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
        console.log([commandHistory, historyIndex]);
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
    console.log("command" + text);
    setLiveText("");
    setCommandHistory([...commandHistory, text]);
    historyIndex = 0;
    setLines([...lines, <Line text={text} live={false} />]);
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
        <Line text={t} live={false} />
      ))}
      {lines}
      <Line
        ref={liveLine}
        key={`${liveText}:${commandHistory.length}`}
        live={true}
        text={liveText}
        onEnter={handleEnter}
      />
    </div>
  );
}
