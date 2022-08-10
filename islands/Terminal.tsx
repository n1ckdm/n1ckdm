/** @jsx h */
import { tw } from "twind";
import { h } from "preact";
import { MutableRef, useEffect, useRef, useState } from "preact/hooks";
import TerminalInputLine from "./TerminalInputLine.tsx";
import { inputHandler, defaultLines } from "../src/inputHandler.tsx";
import StaticLine from "../src/components/StaticLine.tsx";
import {
  addQuestion,
  addAnswer,
  Question,
  get_bot_answer,
} from "../src/server.ts";

let historyIndex = 0;
const initCmdHist: string[] = [];
const initQuestions: Question[] = [];

export default function Terminal() {
  const liveLine = useRef<HTMLInputElement>(null);
  const [staticLines, setLines] = useState(defaultLines);
  const [liveText, setLiveText] = useState("");
  const [questions, setQuestions] = useState(initQuestions);
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

  async function handleEnter(text: string) {
    setLiveText("");
    text && setCommandHistory([...commandHistory, text]);
    historyIndex = 0;

    if (text == "clear") {
      setLines(defaultLines);
    } else if (text.includes("?")) {
      setLines([
        ...staticLines,
        <StaticLine text={text} prompt="$" />,
        <StaticLine text={"Getting response..."} />,
      ]);
      let newQuestions = addQuestion(text, questions);
      const answer = await get_bot_answer(newQuestions);
      newQuestions = addAnswer(answer, newQuestions);
      setQuestions(newQuestions);
      setLines([
        ...staticLines,
        <StaticLine text={text} prompt="$" />,
        <StaticLine text={answer} color="blue-400" />,
      ]);
    } else {
      setLines([
        ...staticLines,
        ...inputHandler(text),
        <StaticLine text={" "} />,
      ]);
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
