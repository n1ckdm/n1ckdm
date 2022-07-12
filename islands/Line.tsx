/** @jsx h */
import { h } from "preact";

interface LineProps {
  default: string;
  prompt: string;
}

export default function Counter(props: LineProps) {
  return (
    <div>
      <span class="${tw``}">
        {props.prompt}
        <pre>{props.default}</pre>
      </span>
    </div>
  );
}
