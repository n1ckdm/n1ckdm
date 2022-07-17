/** @jsx h */
import { h } from "preact";
import { tw } from "twind";
import { MutableRef, useEffect, useRef, useState } from "preact/hooks";
import Line from "./Line.tsx";
import useKeyPress from "./useKeyPress.tsx";

const title = [
  `  _______  .__        __        _____                 __  .__         `,
  `  \\      \\ |__| ____ |  | __   /     \\ _____ ________/  |_|__| ____   `,
  `  /   |   \\|  |/ ___\\|  |/ /  /  \\ /  \\\\__  \\\\_  __ \\   __\\  |/    \\  `,
  ` /    |    \\  \\  \\___|    <  /    Y    \\/ __ \\|  | \\/|  | |  |   |  \\ `,
  ` \\____|__  /__|\\___  >__|_ \\ \\____|__  (____  /__|   |__| |__|___|  / `,
  `         \\/        \\/     \\/         \\/     \\/                    \\/  `,
  " ",
  "nickdmartin.com",
  "Personal website v0.0.1",
  " ",
  " ",
  "# Hint: Type help to get started...",
];

let historyIndex = 0;
const initCmdHist: string[] = [];
const defaultLines: string[] = [];

export default function Terminal() {
  const liveLine = useRef<HTMLTextAreaElement>(null);
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
      (liveLine as MutableRef<HTMLTextAreaElement>).current.focus();
    }
  }

  return (
    <div class={tw`p-4 h-full`}>
      <div class={tw`mx-auto`}>
        {title.map((t) => (
          <Line prompt="" text={t} live={false} />
        ))}
      </div>
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
