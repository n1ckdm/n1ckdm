import { bio, examples, importantInfo } from "nickcv";

export interface Question {
  question: string;
  answer?: string;
}

export function addQuestion(
  question: string,
  questions: Question[]
): Question[] {
  questions.push({ question });
  return questions;
}

export function addAnswer(answer: string, questions: Question[]): Question[] {
  questions[questions.length - 1].answer = answer;
  return questions;
}

export function buildPrompt(questions: Question[]) {
  let prompt = "";
  const info = importantInfo.map((i) => `- ${i}`).join("\n");
  examples.forEach((example) => {
    prompt += `${bio}\n${info}\n\n`;
    prompt += example.questions
      .map((q) => `Person: ${q.question}\nNick: ${q.answer}`)
      .join("\n");
    prompt += "\n\n##\n\n";
  });
  prompt += questions
    .map((q) => `Person: ${q.question}\nNick:${q.answer || " "}`)
    .join("\n");
  return prompt;
}

export async function get_bot_answer(questions: Question[]): Promise<string> {
  const res = await fetch("api/nick_bot", {
    body: JSON.stringify(questions),
    method: "POST",
  });
  let answer = "Hmmm.. I'm not sure I understood that";
  try {
    answer = (await res.json()).completions[0].data.text.replace(/\n/g, "");
  } catch (error) {
    console.error(error);
  }
  return answer;
}
