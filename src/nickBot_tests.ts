#!/usr/bin/env -S deno test

import {
  assertEquals,
  assertExists,
} from "https://deno.land/std@0.151.0/testing/asserts.ts";
import { buildPrompt, Question } from "./nickBot.ts";

Deno.test("url test", () => {
  const url = new URL("./foo.js", "https://deno.land/");
  assertEquals(url.href, "https://deno.land/foo.js");
});

Deno.test("create prompt", () => {
  const questions: Question[] = [
    {
      question: "What is your name?",
      answer: "Hi, my name is Nick",
    },
    {
      question: "What is your favorite color?",
    },
  ];
  const prompt = buildPrompt(questions);
  console.log(prompt);
  assertExists(prompt);
});
