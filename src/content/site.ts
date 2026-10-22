/**
 * Single source of public site copy.
 * Blog post bodies live as MDX in src/content/posts and are registered in
 * src/content/posts.ts.
 *
 * Leave `resumeUrl` and `email` empty to hide them.
 * Do not add a phone number anywhere.
 */

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  name: string;
  context: string;
  summary: string;
  featured?: boolean;
  quote?: string;
  pointsLabel?: string;
  points: string[];
  stack?: string[];
  links?: ProjectLink[];
  badges?: string[];
  note?: string;
};

export type Role = {
  company: string;
  title: string;
  location?: string;
  start: string;
  end: string;
  current?: boolean;
  /** Paragraph shown instead of a bullet list. */
  summary?: string;
  bullets?: string[];
  technologies?: string[];
};

export const site = {
  name: "Roshan Shikhare",
  fullName: "Roshan Namdev Shikhare",
  role: "Senior Fullstack Engineer",
  headline:
    "Senior Frontend / Fullstack Engineer | React, Next.js, Node.js | Enterprise & Product Web Applications",
  location: "Mumbai, India",
  description:
    "Senior Fullstack Engineer in Mumbai with 5+ years shipping end-to-end products using React, Next.js, Node.js, PostgreSQL, and MongoDB.",
  /**
   * Public URL of a resume PDF hosted outside this repo.
   * The button stays hidden while this is empty. Do not commit the PDF.
   */
  resumeUrl: "",
  /**
   * Optional contact email. Hidden everywhere while empty.
   */
  email: "",
  socials: {
    github: "https://github.com/Roshan190",
    linkedin: "https://www.linkedin.com/in/roshan-shikhare-83320820a",
  },
  keywords: [
    "Roshan Shikhare",
    "Senior Fullstack Engineer",
    "React",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "MongoDB",
    "React Native",
    "Expo",
    "Supabase",
    "Mumbai",
  ],
  about: {
    paragraphs: [
      "Senior Fullstack Engineer with 5+ years of experience delivering end-to-end web applications using React, Next.js, Node.js, PostgreSQL, and MongoDB. I take ownership from requirements to production, including independent client delivery and modular systems that scale across products.",
      "I am a Senior Software Engineer — IT, MarTech & GenAI, Technology at Bajaj Finserv, building web experiences for that technology team. Before this, at DEPT® Agency, I built configurable, CMS-driven platforms and integrated backend services for real-world business use cases.",
    ],
  },
  education: {
    degree: "B.Sc. in Computer Science and Technology",
    school: "Mumbai University",
    dates: "2018 – 2021",
    score: "CGPA 7.57 / 10",
  },
  certification: {
    name: "The Complete 2024 Web Development Bootcamp",
    issuer: "Udemy",
    year: "2021",
    display: "The Complete 2024 Web Development Bootcamp, Udemy (2021)",
  },
  experience: [
    // Roshan will add details later. Until then this role is one honest sentence:
    // no bullet list, and no invented achievements, metrics, or product names.
    {
      company: "Bajaj Finserv",
      title: "Senior Software Engineer - IT, MarTech & GenAI, Technology",
      start: "Apr 2026",
      end: "Present",
      current: true,
      summary:
        "Building web experiences for Bajaj Finserv's IT, MarTech & GenAI technology team.",
    },
    {
      company: "DEPT® Agency",
      title: "Senior Software Engineer",
      location: "Mumbai",
      start: "Aug 2023",
      end: "Apr 2026",
      bullets: [
        "Delivered end-to-end web applications combining React and Next.js frontends with backend integrations and CMS-driven architectures.",
        "Designed configurable insurance journeys that enable rapid product launches without requiring code changes or production deployments.",
        "Worked across frontend and backend boundaries to integrate REST and GraphQL APIs, data flows, and third-party services, including KYC-based data prefill and secure document collection workflows.",
        "Owned feature development from requirements through production, with a focus on scalability, maintainability, and reliability.",
        "Contributed to Angular-based enterprise insurance platforms integrated with AEM and backend APIs, applying frontend design principles and best practices.",
      ],
      technologies: [
        "React",
        "Angular",
        "Next.js",
        "Node.js",
        "PostgreSQL",
        "JavaScript",
        "TypeScript",
        "Adobe Experience Manager (AEM)",
        "REST APIs",
        "GraphQL",
      ],
    },
    {
      company: "Tekno Point",
      title: "Software Engineer",
      location: "Mumbai",
      start: "Jul 2021",
      end: "Jul 2023",
      bullets: [
        "Contributed to frontend and backend development across multiple production web applications.",
        "Built an internal hiring portal automating candidate workflows and reducing operational overhead.",
        "Developed utilities to convert Figma designs into production-ready HTML/CSS.",
        "Worked closely with backend teams on data-driven insurance journeys.",
      ],
    },
  ] satisfies Role[],
  projects: [
    {
      name: "HealthShield",
      context: "Solo product · India",
      featured: true,
      summary:
        "Solo-built, mobile-first personal health and insurance companion for India. The marketing site and a doctor visit portal are on Vercel.",
      quote:
        "If something related to health happens, HealthShield is the first app you open.",
      pointsLabel: "Shipped",
      points: [
        "Health tracking for vitals, medications, and Health Connect",
        "Emergency SOS",
        "Household invite and sharing",
        "AI summaries",
        "Policy-PDF field extraction",
        "Document Q&A",
        "Nearby hospitals with Mapbox, plus a cashless hospitals hub with insurer deep links",
        "Claims assist checklist",
        "Doctor visit portal",
      ],
      stack: [
        "Expo SDK 57",
        "Expo Router",
        "NativeWind",
        "Zustand",
        "Zod",
        "React Hook Form",
        "Supabase (Postgres, auth, Edge Functions)",
        "OpenAI via Edge Functions",
        "Mapbox",
        "Vercel",
      ],
      links: [
        { label: "Public site", href: "https://health-shield.in" },
        {
          label: "Source",
          href: "https://github.com/Roshan190/health-shield",
        },
      ],
      badges: ["Source-available · All rights reserved · Not open source"],
      note: "Public Android APK 1.1.1 is on the site. Not on the Play Store. iOS is parked.",
    },
    {
      name: "India First Life",
      context: "Client work · DEPT® Agency",
      summary: "Configurable insurance journeys for multiple products from a single codebase.",
      points: [
        "Built configurable insurance workflows supporting multiple products from a single codebase.",
        "Integrated KYC prefill and secure document handling systems.",
        "Reduced time-to-market through modular and scalable architecture.",
      ],
    },
    {
      name: "IFB — E-Commerce & Spice Secret",
      context: "Client work · DEPT® Agency",
      summary: "CMS-driven e-commerce and brand websites.",
      points: [
        "Delivered CMS-driven e-commerce and brand websites using React and AEM.",
        "Integrated frontend applications with backend services and APIs.",
      ],
      stack: ["React", "Adobe Experience Manager (AEM)"],
    },
    {
      name: "Palfinger",
      context: "Client work · DEPT® Agency",
      summary: "Enterprise web application templates in a cross-functional team.",
      points: [
        "Developed frontend templates using AEM and Nunjucks within a cross-functional enterprise team.",
        "Integrated data-driven UI components in collaboration with backend engineers.",
      ],
      stack: ["Adobe Experience Manager (AEM)", "Nunjucks"],
    },
    {
      name: "MumbaiFilter",
      context: "Freelance",
      summary:
        "Production web application with an admin dashboard for products, quotes, and customer contacts.",
      points: [
        "Independently delivered a production-ready web application with an admin dashboard for managing products, quotes, and customer contacts.",
        "Handled frontend, backend integrations, deployment, and post-launch support.",
        "Worked directly with business stakeholders to gather requirements and make technical decisions.",
      ],
    },
    {
      name: "Form Ninja",
      context: "npm library",
      summary:
        "A customizable JavaScript and TypeScript form validation library published on npm.",
      points: [
        "Built and published a customizable JavaScript/TypeScript form validation library on npm.",
        "Designed a flexible API supporting built-in and custom validation rules.",
        "Maintained documentation and incorporated user feedback.",
      ],
      stack: ["JavaScript", "TypeScript"],
      links: [
        { label: "GitHub", href: "https://github.com/Roshan190/form-ninja" },
        { label: "npm", href: "https://www.npmjs.com/package/form-ninja" },
      ],
    },
  ] satisfies Project[],
  skillGroups: [
    {
      name: "Frontend Engineering",
      items: [
        "React",
        "Next.js",
        "React Native",
        "Expo",
        "Angular",
        "TypeScript",
        "JavaScript",
      ],
    },
    {
      name: "Backend & Data",
      items: [
        "Node.js",
        "Supabase",
        "PostgreSQL",
        "MongoDB",
        "REST APIs",
        "GraphQL",
      ],
    },
    {
      name: "CMS & Integrations",
      items: [
        "Adobe Experience Manager (AEM)",
        "API & third-party integrations",
      ],
    },
    {
      name: "Ownership & Delivery",
      items: [
        "End-to-end ownership",
        "Production deployments",
        "Client-facing development",
      ],
    },
  ],
  writing: {
    heading: "Writing",
    intro:
      "Longer notes will live here. The entry below is a placeholder draft, marked so it is obvious it is not a published article.",
    draftNotice:
      "Placeholder draft. This is not a published article. It exists so the MDX blog can be replaced with real writing.",
  },
  contact: {
    heading: "Let's talk",
    body: "The best way to reach me is LinkedIn. I use it for roles and for conversations about the work.",
  },
  nav: [
    { href: "/work", label: "Projects" },
    { href: "/work#about", label: "About" },
    { href: "/work#experience", label: "Experience" },
    { href: "/work#skills", label: "Skills" },
    { href: "/work#writing", label: "Writing" },
    { href: "/work#contact", label: "Contact" },
  ],
} as const;
