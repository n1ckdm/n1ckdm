/** @jsx h */
import { h } from "preact";
import { tw } from "twind";
import { asset } from "$fresh/runtime.ts";

export default function Banner() {
    return (
        <div class={tw`bg-gradient-to-b from-transparent to-gray-800`}>
            <video
                class={tw`z-10 w-screen overflow-hidden max-h-64 object-cover object-top`}
                autoPlay loop
                muted
                src={asset("/banner.webm")}
            />
        </div>
    );
}