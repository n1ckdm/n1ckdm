/** @jsx h */
import { h } from "preact";
import { forwardRef } from "preact/compat";
import { tw } from "twind";
import { Ref, useEffect, useState } from "preact/hooks";

interface LineProps {
  text?: string;
  color?: string;
  prompt: string;
  live: boolean;
  onEnter?: (text: string) => void;
}

const Line = forwardRef((props: LineProps, ref: Ref<HTMLTextAreaElement>) => {
  const [text, setText] = useState(props.text || "");

  const color = props.color || "pink-400";
  const sBase = tw`flex-grow break-all text-lg text-${color}`;
  const sInput = tw`bg-transparent h-full focus:outline-none resize-none`;
  const sPara = tw`whitespace-pre-wrap -my-0.5`;
  const sPrompt = tw`px-1 text-green-600 font-bold flex-none text-lg`;

  if (props.live) {
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
  }

  return (
    <div class={tw`flex flex-row`}>
      <div class={sPrompt}>{props.prompt}</div>
      {props.live ? (
        <textarea
          ref={ref}
          spellcheck={false}
          data-gramm={false}
          data-gramm_editor={false}
          data-enable-grammarly={false}
          class={`${sBase} ${sInput}`}
          type="text"
          onInput={(e) => setText((e.target as HTMLInputElement).value)}
          value={text}
        ></textarea>
      ) : (
        <p class={`${sBase} ${sPara}`}>{text}</p>
      )}
    </div>
  );
});

export default Line;
