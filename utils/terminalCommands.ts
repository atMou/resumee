import { Dispatch, SetStateAction } from "react";

export interface HistoryEntry {
  type: "command" | "output" | "error" | "welcome";
  content: string | string[];
  timestamp?: string;
}

export interface TerminalFaq {
  question: string;
  answer: string[];
}

export type TerminalFaqs = Record<
  "profile" | "skills" | "certifications" | "education" | "experience" | "projects" | "contact",
  TerminalFaq
>;

export interface TerminalLabels {
  availableQuestions: string;
  question: string;
  answer: string;
  notFound: string;
  helpPrompt: string;
}

export type Commands = Record<string, () => string[]>;

const normalizeCommand = (command: string): string =>
  command.trim().toLocaleLowerCase().replace(/[?!.]+$/u, "");

export const createCommands = (
  setHistory: Dispatch<SetStateAction<HistoryEntry[]>>,
  faqs: TerminalFaqs,
  labels: TerminalLabels
): Commands => {
  const faqCommand = ({ question, answer }: TerminalFaq): (() => string[]) => () => [
    `${labels.question} ${question}`,
    `${labels.answer}`,
    ...answer,
    "",
  ];

  const topicCommands = Object.fromEntries(
    Object.entries(faqs).map(([topic, faq]) => [topic, faqCommand(faq)])
  );
  const questionCommands = Object.fromEntries(
    Object.values(faqs).map((faq) => [faq.question, faqCommand(faq)])
  );

  return {
    help: () => [
      labels.availableQuestions,
      "",
      ...Object.entries(faqs).map(
        ([topic, faq]) => `  ${topic.padEnd(16)} ${faq.question}`
      ),
      "  whoami           profile",
      "  about            profile",
      "  help             help",
      "  clear            clear terminal",
      "",
    ],
    ...topicCommands,
    ...questionCommands,
    whoami: faqCommand(faqs.profile),
    about: faqCommand(faqs.profile),
    clear: () => {
      setHistory([]);
      return [];
    },
  };
};

export const executeCommand = (
  cmd: string,
  commands: Commands,
  setHistory: Dispatch<SetStateAction<HistoryEntry[]>>,
  labels: TerminalLabels
): void => {
  const normalizedCommand = normalizeCommand(cmd);
  const matchedCommand =
    commands[normalizedCommand] ??
    Object.entries(commands).find(
      ([key]) => normalizeCommand(key) === normalizedCommand
    )?.[1];
  const timestamp = new Date().toLocaleTimeString();

  const commandEntry: HistoryEntry = {
    type: "command",
    content: `user@portfolio:~$ ${cmd}`,
    timestamp,
  };

  if (matchedCommand) {
    const output = matchedCommand();
    if (normalizedCommand === "clear") {
      return;
    }

    setHistory((prev) => [
      ...prev,
      commandEntry,
      { type: "output", content: output, timestamp },
    ]);
  } else {
    setHistory((prev) => [
      ...prev,
      commandEntry,
      {
        type: "error",
        content: [
          labels.notFound.replace("{{command}}", cmd),
          labels.helpPrompt,
          "",
        ],
        timestamp,
      },
    ]);
  }
};

export const getCommandSuggestions = (
  input: string,
  commands: Commands
): string[] => {
  const normalizedInput = normalizeCommand(input);
  return Object.keys(commands)
    .filter((command) => !command.includes(" ") && !command.includes("?"))
    .filter((command) => command.startsWith(normalizedInput));
};
