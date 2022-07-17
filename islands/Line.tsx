/** @jsx h */
import { h } from "preact";
import { forwardRef } from "preact/compat";
import { tw } from "twind";
import { Ref, useEffect, useState } from "preact/hooks";

interface LineProps {
  text?: string;
  prompt: string;
  live: boolean;
  onEnter?: (text: string) => void;
}

const Line = forwardRef((props: LineProps, ref: Ref<HTMLInputElement>) => {
  const [text, setText] = useState(props.text || "");

  const sBase = tw`flex-grow text-lg`;
  const sInput = tw`bg-transparent focus:outline-none`;
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
        <input
          ref={ref}
          class={`${sBase} ${sInput}`}
          type="text"
          onInput={(e) => setText((e.target as HTMLInputElement).value)}
          value={text}
        />
      ) : (
        <pre class={sBase}>{text}</pre>
      )}
    </div>
  );
});

export default Line;
