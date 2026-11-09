"use client";

import { useState, useEffect, useRef, FormEvent, KeyboardEvent } from "react";
import { useTranslation } from "react-i18next";
import englishProjects from "../data/projects.en.json";
import germanProjects from "../data/projects.de.json";
import { contactDetails } from "../data/contact";
import { portfolioSkills } from "../data/portfolioSkills";
import {
  createCommands,
  executeCommand,
  getCommandSuggestions,
  HistoryEntry,
  TerminalFaqs,
  TerminalLabels,
} from "../utils/terminalCommands";

interface EducationItem {
  degree: string;
  institution: string;
  period: string;
}

interface ExperienceItem {
  position: string;
  company: string;
  period: string;
}

interface TrainingItem {
  degree: string;
  institution: string;
  period: string;
}

interface ProjectItem {
  title: string;
  tech: string;
  desc: string;
}

export interface UseTerminalReturn {
  input: string;
  setInput: (input: string) => void;
  history: HistoryEntry[];
  inputRef: React.RefObject<HTMLInputElement | null>;
  terminalRef: React.RefObject<HTMLDivElement | null>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export const useTerminal = (): UseTerminalReturn => {
  const { t, i18n } = useTranslation();
  const [input, setInput] = useState<string>("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const educationItems = t("education.items", {
    returnObjects: true,
  }) as EducationItem[];
  const experienceItems = t("experience.items", {
    returnObjects: true,
  }) as ExperienceItem[];
  const trainingItems = t("professionalDevelopment.items", {
    returnObjects: true,
  }) as TrainingItem[];
  const projects = (
    i18n.language.startsWith("de") ? germanProjects : englishProjects
  ) as ProjectItem[];
  const profileDescription = t("hero.description").replace(/<\/?sap>/g, "");
  const skillCategories = Object.entries(portfolioSkills) as [
    keyof typeof portfolioSkills,
    readonly string[],
  ][];
  const certificateTitles = [
    t("certificate.items.sapAbap.title"),
    t("certificate.items.sapImplementation.title"),
    t("certificate.items.mcsa.title"),
    t("certificate.items.azure.title"),
  ];

  const faqs: TerminalFaqs = {
    profile: {
      question: t("terminal.questions.profile"),
      answer: [`${t("hero.subtitle")} ${t("hero.title")}`, profileDescription],
    },
    skills: {
      question: t("terminal.questions.skills"),
      answer: skillCategories.flatMap(([category, skills]) => [
        `${t(`about.${category}`)}:`,
        ...skills.map((skill) => `  • ${skill}`),
        "",
      ]),
    },
    certifications: {
      question: t("terminal.questions.certifications"),
      answer: [
        ...certificateTitles,
        "",
        ...trainingItems.map(
          (item) => `${item.degree} — ${item.institution} (${item.period})`
        ),
      ],
    },
    education: {
      question: t("terminal.questions.education"),
      answer: educationItems.map(
        (item) => `${item.degree} — ${item.institution} (${item.period})`
      ),
    },
    experience: {
      question: t("terminal.questions.experience"),
      answer: experienceItems.map(
        (item) => `${item.position} — ${item.company} (${item.period})`
      ),
    },
    projects: {
      question: t("terminal.questions.projects"),
      answer: projects.flatMap((project, index) => [
        `${index + 1}. ${project.title}`,
        `   ${project.tech}`,
        `   ${project.desc.trim()}`,
        "",
      ]),
    },
    contact: {
      question: t("terminal.questions.contact"),
      answer: [t("contact.email") + ": " + contactDetails.email, t("terminal.phone") + ": " + contactDetails.phone],
    },
  };
  const terminalLabels: TerminalLabels = {
    availableQuestions: t("terminal.availableQuestions"),
    question: t("terminal.questionLabel"),
    answer: t("terminal.answerLabel"),
    notFound: t("terminal.notFound"),
    helpPrompt: t("terminal.helpPrompt"),
  };
  const commands = createCommands(setHistory, faqs, terminalLabels);

  // Handle command submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (input.trim()) {
      executeCommand(input, commands, setHistory, terminalLabels);
      setInput("");
    }
  };

  // Handle tab completion
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Tab") {
      e.preventDefault();
      const suggestions = getCommandSuggestions(input, commands);
      if (suggestions.length === 1) {
        setInput(suggestions[0]);
      }
    }
  };

  // Auto-focus input
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Auto-scroll to bottom when history updates
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Initialize with welcome message
  useEffect(() => {
    setHistory([
      {
        type: "welcome",
        content: [
          t("terminal.welcome"),
          "",
          t("terminal.helpPrompt"),
          t("terminal.questionPrompt"),
          "",
        ],
      },
    ]);
  }, [t]);

  return {
    input,
    setInput,
    history,
    inputRef,
    terminalRef,
    handleSubmit,
    handleKeyDown,
  };
};
