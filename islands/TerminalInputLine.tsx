/** @jsx h */
import { h } from "preact";
import { forwardRef } from "preact/compat";
import { tw } from "twind";
import { Ref, useEffect, useState } from "preact/hooks";

interface LineProps {
  text?: string;
  color?: string;
  prompt: string;
  onEnter?: (text: string) => void;
}

const TerminalInputLine = forwardRef((props: LineProps, ref: Ref<HTMLTextAreaElement>) => {
  const [text, setText] = useState(props.text || "");

  const color = props.color || "pink-400";
  const sBase = tw`flex-grow break-all text-lg text-${color}`;
  const sInput = tw`bg-transparent h-full focus:outline-none resize-none align-middle`;
  const sPrompt = tw`px-1 text-green-600 font-bold flex-none text-lg`;

  useEffect(() => {
    function enterHandler({ key }: { key: string }): void {
      if (key === "Enter") {
        props.onEnter && props.onEnter(text);
        setText("");
      }
    }

    globalThis.addEventListener("keydown", enterHandler);
    return () => {
      globalThis.removeEventListener("keydown", enterHandler);
    };
  }, [text]);

  return (
    <div class={tw`flex flex-row`}>
      <div class={sPrompt}>{props.prompt}</div>
      <textarea
        ref={ref}
        class={`${sBase} ${sInput}`}
        rows={5}
        type="text"
        onInput={(e) => setText((e.target as HTMLInputElement).value)}
        value={text}
      ></textarea>
    </div>
  );
});

export default TerminalInputLine;
