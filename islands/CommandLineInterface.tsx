/** @jsx h */
import { h } from "preact";
import { tw } from "twind";
import { useState } from "preact/hooks";
import Line from "./Line.tsx";

export default function CommandLineInterface() {
  const [text, setText] = useState("test test test");

  return (
    <div>
      <Line prompt="$" text={text} live={true} onInput={setText} />
    </div>
  );
}
