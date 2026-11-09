// Terminal user data and information
export interface UserData {
  name: string;
  title: string;
  location: string;
  email: string;
  github: string;
  // linkedin: string;
  experience: string;
  specialization: string;
}

export const userData: UserData = {
  name: "Moustafa Ahmed",
  title: "Full-Stack Developer",
  location: "Berlin, Germany",
  email: "mustafaamaar@yahoo.com",
  github: "github.com/atMou",
  // linkedin: "linkedin.com/in/moustafa-ahmed",
  experience: "1.5 years",
  specialization: ".NET, ASP.NET Core, TypeScript, React, Next.js",
};

// Projects data for terminal display
export interface Project {
  name: string;
  tech: string;
  description: string;
}

export const projects: Project[] = [
  {
    name: "Store Backend - Enterprise E-Commerce Platform",
    tech: ".NET 9, C# 13, LanguageExt, MassTransit, SignalR, EF Core 9",
    description:
      "Enterprise e-commerce backend with DDD, functional programming, and Vertical Slice Architecture, Domain-Driven Design, event-driven architecture",
  },
  {
    name: "Store Frontend - Modern React E-Commerce Client",
    tech: "Next.js 16, React 19, TypeScript, Redux Toolkit, SignalR, Stripe",
    description:
      "E-commerce frontend with real-time updates and Feature-Sliced Design",
  },
];

// Skills organized by category
export interface Skills {
  frontend: string[];
  backend: string[];
  tools: string[];
}

export const skills: Skills = {
  frontend: [
    "React, Next.js, TypeScript",
    "Tailwind CSS, Framer Motion, Redux",
    "HTML, CSS, XAML",
  ],
  backend: [
    "C#, .NET, ASP.NET Core",
    "Node.js, Express, SignalR",
    "EF Core, Prisma, GraphQL",
    "SQL Server, PostgreSQL, Redis, MongoDB",
  ],
  tools: ["Docker, Git, GitHub, CI/CD"],
};

// About section content
export const aboutContent: string[] = [
  "Hey! I'm a full-stack developer based in Berlin, Germany",
  "with a love for creating digital experiences that matter. I specialize",
  "in building modern web applications using .NET, React, and TypeScript.",
  "",
  "I focus on Domain-Driven Design, Clean Architecture, and",
  "Functional Programming patterns to build robust solutions.",
  "",
  "I believe in writing clean, maintainable code and creating",
  "user-centered applications that solve real problems.",
];
