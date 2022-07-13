/** @jsx h */
import { h } from "preact";
import { tw } from "twind";
import { useState } from "preact/hooks";
import useKeyPress from "./useKeyPress.tsx";

interface LineProps {
  text: string;
  prompt: string;
  live: boolean;
  onInput: (text: string) => void;
}

export default function Line(props: LineProps) {
  const [live, setLive] = useState(props.live);
  useKeyPress("Enter", () => setLive(false));

  const sInput = tw`
    flex-grow
    px-1
    bg-transparent
    focus:outline-none
  `;

  const sPrompt = tw`
    px-1
    text-green-600
    flex-none
  `;

  return (
    <div class={tw`flex flex-row`}>
      <div class={sPrompt}>{props.prompt}</div>
      {h("input", {
        type: "text",
        class: sInput,
        value: props.text,
        onInput: (e) => props.onInput((e.target as HTMLInputElement).value),
        readOnly: !live,
      })}
    </div>
  );
}
