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

export default function CommandLineInterface() {
  const defaultLines = <Line text="" live={false} />;
  const commandHistory: string[] = [];
  let historyIndex = 0;

  const [lines, setLines] = useState([defaultLines]);
  const liveLine = useRef<HTMLInputElement>(null);
  const [liveText, setLiveText] = useState("");

  useEffect(() => {
    focusLiveLine();
  }, []);

  useKeyPress("ArrowUp", () => {
    console.log([commandHistory, historyIndex]);
    if (commandHistory.length > 0 && historyIndex === 0) {
      historyIndex = commandHistory.length - 1;
    } else if (commandHistory.length > 0 && historyIndex > 0) {
      historyIndex = historyIndex - 1;
    } else {
      historyIndex = 0;
    }
    if (commandHistory.length > 0) {
      setLiveText(commandHistory[historyIndex]);
    }
  });

  function handleEnter(text: string) {
    setLiveText("");
    commandHistory.push(text);
    historyIndex = 0;
    setLines([...lines, <Line text={text} live={false} />]);
    setTimeout(focusLiveLine, 200);
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
        key={commandHistory.length}
        live={true}
        text={liveText}
        onEnter={handleEnter}
      />
    </div>
  );
}
