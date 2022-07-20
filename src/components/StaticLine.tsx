/** @jsx h */
import { h } from "preact";
import { tw } from "twind";

interface LineProps {
  text?: string;
  color?: string;
  prompt?: string;
  smSzAdjust?: boolean;
}

const Line = (props: LineProps) => {
  if (!props.prompt) {
    props.prompt = " ";
  }

  if (!props.smSzAdjust) {
    props.smSzAdjust = false;
  }
  
  const color = props.color || "pink-400";
  const sBase = tw`flex-grow break-all ${props.smSzAdjust ? "text-xs" : " "} lg:text-lg text-${color}`;
  const sPara = tw`whitespace-pre-wrap align-middle`;
  const sPrompt = tw`px-1 text-green-600 font-bold flex-none text-lg`;

  return (
    <div class={tw`flex flex-row`}>
      <div class={sPrompt}>{props.prompt}</div>
      <p class={`${sBase} ${sPara}`}>{props.text}</p>
    </div>
  );
};

export default Line;
