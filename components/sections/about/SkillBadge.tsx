"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Badge configurations for all technologies
const badgeConfig: Record<
  string,
  { label: string; color: string; logo?: string }
> = {
  // ===== Frontend Technologies =====
  javascript: { label: "JavaScript", color: "F7DF1E", logo: "javascript" },
  typescript: { label: "TypeScript", color: "3178C6", logo: "typescript" },
  nextjs: { label: "Next.js", color: "000000", logo: "nextdotjs" },
  react: { label: "React", color: "61DAFB", logo: "react" },
  tailwind: { label: "Tailwind", color: "06B6D4", logo: "tailwindcss" },
  redux: { label: "Redux", color: "764ABC", logo: "redux" },
  threejs: { label: "Three.js", color: "000000", logo: "threedotjs" },
  reactthreefiber: { label: "R3F", color: "000000", logo: "react" },
  framermotion: { label: "Framer Motion", color: "0055FF", logo: "framer" },
  sapfiori: { label: "SAP Fiori", color: "0FA6D6", logo: "sap" },
  sapui5: { label: "SAPUI5", color: "0FA6D6", logo: "sap" },
  fiorielements: { label: "Fiori Elements", color: "0FA6D6", logo: "sap" },
  gsap: { label: "GSAP", color: "88CE02", logo: "greensock" },
  spline: { label: "Spline", color: "FF6EFF" },
  whimsical: { label: "Whimsical", color: "FF6EFF" },
  figma: { label: "Figma", color: "F24E1E", logo: "figma" },
  adobeillustrator: {
    label: "Illustrator",
    color: "FF9A00",
    logo: "adobeillustrator",
  },
  adobephotoshop: {
    label: "Photoshop",
    color: "31A8FF",
    logo: "adobephotoshop",
  },

  // ===== Backend Technologies =====
  csharp: { label: "C#", color: "239120", logo: "csharp" },
  sapcap: { label: "SAP CAP", color: "0FA6D6", logo: "sap" },
  dotnet: { label: ".NET 9", color: "512BD4", logo: "dotnet" },
  aspnetcore: { label: "ASP.NET Core", color: "512BD4", logo: "dotnet" },
  abap: { label: "ABAP", color: "0FA6D6", logo: "sap" },
  "saps/4hana": { label: "SAP S/4HANA", color: "0FA6D6", logo: "sap" },
  nodejs: { label: "Node.js", color: "339933", logo: "nodedotjs" },
  express: { label: "Express", color: "000000", logo: "express" },
  graphql: { label: "GraphQL", color: "E10098", logo: "graphql" },

  // ===== Architecture & Patterns =====
  cleanarchitecture: { label: "Clean Architecture", color: "00ADD8" },
  cqrs: { label: "CQRS", color: "FF6B6B" },
  ddd: { label: "DDD", color: "2E7D32" },
  mediatr: { label: "MediatR", color: "512BD4" },

  // ===== Database & ORM =====
  sql: { label: "SQL", color: "4479A1", logo: "postgresql" },
  mongodb: { label: "MongoDB", color: "47A248", logo: "mongodb" },
  prisma: { label: "Prisma", color: "2D3748", logo: "prisma" },
  postgres: { label: "PostgreSQL", color: "4169E1", logo: "postgresql" },
  redis: { label: "Redis", color: "DC382D", logo: "redis" },
  efcore: { label: "Entity Framework Core", color: "512BD4", logo: "dotnet" },
  sqlserver: {
    label: "SQL Server",
    color: "CC2927",
    logo: "microsoftsqlserver",
  },

  // ===== Real-time & Messaging =====
  signalr: { label: "SignalR", color: "512BD4", logo: "dotnet" },
  rabbitmq: { label: "RabbitMQ", color: "FF6600", logo: "rabbitmq" },
  masstransit: { label: "MassTransit", color: "FF6600" },

  // ===== Payment & Services =====
  stripe: { label: "Stripe", color: "008CDD", logo: "stripe" },
  twilio: { label: "Twilio", color: "F22F46", logo: "twilio" },
  cloudinary: { label: "Cloudinary", color: "3448C5", logo: "cloudinary" },

  // ===== Authentication & Security =====
  jwt: { label: "JWT", color: "000000", logo: "jsonwebtokens" },
  oauth: { label: "OAuth 2.0", color: "EB5424" },

  // ===== Functional Programming =====
  languageext: { label: "LanguageExt", color: "512BD4" },

  // ===== API & Documentation =====
  swagger: { label: "Swagger", color: "85EA2D", logo: "swagger" },
  openapi: { label: "OpenAPI", color: "6BA539", logo: "openapiinitiative" },
  restapi: { label: "REST API", color: "009688" },

  // ===== Logging & Monitoring =====
  serilog: { label: "Serilog", color: "1E88E5" },

  // ===== Testing =====
  xunit: { label: "xUnit", color: "512BD4" },

  // ===== DevOps & Tools =====
  "ci/cd": { label: "CI/CD", color: "2088FF", logo: "githubactions" },
  docker: { label: "Docker", color: "2496ED", logo: "docker" },
  git: { label: "Git", color: "F05032", logo: "git" },
  github: { label: "GitHub", color: "181717", logo: "github" },
  visualstudio: {
    label: "Visual Studio",
    color: "5C2D91",
    logo: "visualstudio",
  },
  vscode: { label: "VS Code", color: "007ACC", logo: "visualstudiocode" },
  powershell: { label: "PowerShell", color: "5391FE", logo: "powershell" },
  bash: { label: "Bash", color: "4EAA25", logo: "gnubash" },
};

const SkillBadge = ({ skill, variants }) => {
  const getBadgeUrl = (skillName: string) => {
    const normalizedSkill = skillName.toLowerCase().replace(/\s+/g, "");

    const config = badgeConfig[normalizedSkill] || {
      label: skillName,
      color: "555555",
    };

    // Build the Shields.io URL
    const logoParam = config.logo ? `&logo=${config.logo}&logoColor=white` : "";
    return `https://img.shields.io/badge/${encodeURIComponent(config.label)}-${
      config.color
    }?style=flat${logoParam}`;
  };

  return (
    <motion.div
      variants={variants}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex justify-center items-center cursor-default"
    >
      <Image
        src={getBadgeUrl(skill)}
        alt={skill}
        width={120}
        height={28}
        className="h-auto w-auto"
        unoptimized
      />
    </motion.div>
  );
};

export default SkillBadge;
