/** @jsx h */
import { h } from "preact";
import { tw } from "twind";
import { asset } from "$fresh/runtime.ts";
import StaticLine from "../../components/StaticLine.tsx";
import Me from "../../components/cv/Me.tsx";
import Languages from "../../components/cv/Languages.tsx";
import Skills from "../../components/cv/Skills.tsx";
import Work from "../../components/cv/Work.tsx";
import Education from "../../components/cv/Education.tsx";
import Awards from "../../components/cv/Awards.tsx";

const items = [
  <Me />,
  <Languages />,
  <Work />,
  <Education />,
  <Awards />,
  <Skills />,
];

export default function () {
  return (
    <div class={tw`grid gap-y-1`}>
      {items.map((Comp) => (
        <div>
          {Comp}
          <StaticLine color="purple-200" text="-------------------" />
        </div>
      ))}
    </div>
  );
}
