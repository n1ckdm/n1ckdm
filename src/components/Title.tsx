/** @jsx h */
import { h } from "preact";
import { tw } from "twind";
import StaticLine from "./StaticLine.tsx";
import version from "nickcv";

const title = [
  `  _______  .__        __        _____                 __  .__         `,
  `  \\      \\ |__| ____ |  | __   /     \\ _____ ________/  |_|__| ____   `,
  `  /   |   \\|  |/ ___\\|  |/ /  /  \\ /  \\\\__  \\\\_  __ \\   __\\  |/    \\  `,
  ` /    |    \\  \\  \\___|    <  /    Y    \\/ __ \\|  | \\/|  | |  |   |  \\ `,
  ` \\____|__  /__|\\___  >__|_ \\ \\____|__  (____  /__|   |__| |__|___|  / `,
  `         \\/        \\/     \\/         \\/     \\/                    \\/  `,
  " ",
];

const titleSm = [
  `  _______  .__        __        `,
  `  \\      \\ |__| ____ |  | __  `,
  `  /   |   \\|  |/ ___\\|  |/ /  `,
  ` /    |    \\  \\  \\___|    <  `,
  ` \\____|__  /__|\\___  >__|_ \\ `,
  `         \\/        \\/     \\/ `,
  " ",
  `    _____                 __  .__         `,
  `   /     \\ _____ ________/  |_|__| ____   `,
  `  /  \\ /  \\\\__  \\\\_  __ \\   __\\  |/    \\  `,
  ` /    Y    \\/ __ \\|  | \\/|  | |  |   |  \\ `,
  ` \\____|__  (____  /__|   |__| |__|___|  / `,
  `         \\/     \\/                    \\/  `,
  " ",
];

const termHeader = [
  `nickdmartin.com ${version}`,
  " ",
  " ",
  "Hint: Type 'help' to get started or use a '?' to ask me (my AI bot) a question",
  " ",
];

export default function Title() {
  return (
    <div class={tw`mx-auto`}>
      <div class={tw`h-0 invisible md:visible md:h-full font-bold`}>
        {title.map((t) => (
          <StaticLine text={t} />
        ))}
      </div>
      <div class={tw`visible md:invisible md:h-0 font-bold`}>
        {titleSm.map((t) => (
          <StaticLine text={t} smSzAdjust={true} />
        ))}
      </div>
      {termHeader.map((t) => (
        <StaticLine text={t} />
      ))}
    </div>
  );
}
