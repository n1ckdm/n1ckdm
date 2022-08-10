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

const TerminalInputLine = forwardRef(
  (props: LineProps, ref: Ref<HTMLInputElement>) => {
    const [text, setText] = useState(props.text || "");

    const color = props.color || "pink-400";
    const sBase = tw`flex-grow break-all text-lg text-${color} text-lowercase`;
    const sInput = tw`bg-transparent focus:outline-none pt-0.5`;
    const sPrompt = tw`px-1 text-green-600 font-bold flex-none text-lg`;

    useEffect(() => {
      function enterHandler({ key, which }: KeyboardEvent): void {
        const currentCode = which;
        if (!key) {
          key = String.fromCharCode(currentCode);
        }
        if (key === "Enter") {
          props.onEnter && props.onEnter(text.toLocaleLowerCase());
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
        <input
          ref={ref}
          class={`${sBase} ${sInput}`}
          type="text"
          onInput={(e) => setText((e.target as HTMLInputElement).value)}
          value={text}
        ></input>
      </div>
    );
  }
);

export default TerminalInputLine;
