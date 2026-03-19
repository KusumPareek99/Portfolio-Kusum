import type {
  NavItem,
  Project,
  Experience,
  Skill,
  Education,
  Certificate,
  BadgeGroup,
  Stat,
  SocialLink,
} from "@/types";

// ─── NAVIGATION ───────────────────────────────────────────────────────────

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

// ─── STATS ────────────────────────────────────────────────────────────────

export const stats: Stat[] = [
  { value: "10", label: "ERP Modules", suffix: "+" },
  { value: "80", label: "Query Performance", suffix: "%" },
  { value: "200", label: "Tickets Resolved", suffix: "+" },
  { value: "9.36", label: "MCA GPA" },
];

// ─── SKILLS ───────────────────────────────────────────────────────────────

export const skills: Skill[] = [
  // Backend
  { name: "Node.js", category: "backend", color: "#68A063", level: "expert" },
  { name: "Express.js", category: "backend", color: "#8B5CF6", level: "expert" },
  { name: "Python", category: "backend", color: "#3776AB", level: "expert" },
  { name: "Flask", category: "backend", color: "#22D3EE", level: "proficient" },
  { name: "REST APIs", category: "backend", color: "#F59E0B", level: "expert" },
  { name: "TypeScript", category: "backend", color: "#3178C6", level: "proficient" },
  { name: "JavaScript", category: "backend", color: "#F7DF1E", level: "expert" },
  { name: "Java", category: "backend", color: "#ED8B00", level: "familiar" },

  // Frontend
  { name: "React.js", category: "frontend", color: "#61DAFB", level: "proficient" },
  { name: "Next.js", category: "frontend", color: "#F0F0FF", level: "proficient" },
  { name: "Tailwind CSS", category: "frontend", color: "#06B6D4", level: "proficient" },
  { name: "Material UI", category: "frontend", color: "#0081CB", level: "proficient" },
  { name: "HTML/CSS", category: "frontend", color: "#E34F26", level: "expert" },
  { name: "Bootstrap", category: "frontend", color: "#7952B3", level: "proficient" },

  // Database
  { name: "MySQL", category: "database", color: "#4479A1", level: "expert" },
  { name: "MongoDB", category: "database", color: "#4DB33D", level: "proficient" },
  { name: "PostgreSQL", category: "database", color: "#336791", level: "proficient" },
  { name: "MS SQL Server", category: "database", color: "#CC2927", level: "proficient" },
  { name: "Firebase", category: "database", color: "#FFCA28", level: "familiar" },
  { name: "SQLite", category: "database", color: "#003B57", level: "familiar" },

  // Cloud & DevOps
  { name: "Microsoft Azure", category: "cloud", color: "#0089D0", level: "proficient" },
  { name: "Azure DevOps", category: "cloud", color: "#0078D4", level: "proficient" },
  { name: "CI/CD", category: "cloud", color: "#10B981", level: "proficient" },

  // Tools
  { name: "Git / GitHub", category: "tools", color: "#F05032", level: "expert" },
  { name: "Postman", category: "tools", color: "#FF6C37", level: "expert" },
  { name: "Swagger", category: "tools", color: "#85EA2D", level: "proficient" },
  { name: "VS Code", category: "tools", color: "#007ACC", level: "expert" },
  { name: "scikit-learn", category: "tools", color: "#F89939", level: "familiar" },
];

// ─── EXPERIENCE ───────────────────────────────────────────────────────────

export const experiences: Experience[] = [
  {
    id: "dypatil",
    company: "Dr. D.Y. Patil School of Management & Research",
    role: "Software Developer",
    period: "Jun 2025 – Present",
    location: "Pune, Maharashtra",
    current: true,
    description: [
      "Designed, developed, and maintained 10+ ERP/LMS modules supporting real-time academic and administrative workflows.",
      "Architected RESTful backend APIs and optimized SQL queries, improving data-fetch performance by ~80%.",
      "Deployed multi-environment Azure applications using publish profiles and CI/CD pipelines.",
      "Improved system reliability and uptime ~40% via monitoring and rapid production fixes.",
      "Gathered requirements from Directors, HODs, and Program Heads; delivered scalable modules and conducted training sessions.",
    ],
    tags: ["Node.js", "Azure", "CI/CD", "SQL", "REST APIs"],
  },
  {
    id: "cutecode",
    company: "CuteCode Street Style Store LLP",
    role: "Software Developer Intern",
    period: "Sep 2024 – Jan 2025",
    location: "Delhi, India",
    current: false,
    description: [
      "Engineered a backend email utility service integrating third-party email APIs with logging, batching, and rate-limiting.",
      "Improved email logging accuracy by 35%, enabling reliable monitoring, debugging, and analytics.",
      "Developed 15+ dynamic email templates supporting personalization and A/B testing for marketing campaigns.",
      "Optimized API integrations to reduce email delivery latency by 25%.",
      "Automated unsubscribe and suppression list management to ensure compliance and deliverability.",
    ],
    tags: ["Node.js", "Email APIs", "Backend", "Templates", "Rate Limiting"],
  },
  {
    id: "nielseniq",
    company: "NielsenIQ Pvt. Ltd.",
    role: "Intern — EIT Technical Engineer",
    period: "Jan 2023 – May 2023",
    location: "Pune, Maharashtra",
    current: false,
    description: [
      "Resolved 200+ production support tickets with a 95% resolution rate, consistently meeting strict SLA timelines.",
      "Diagnosed and fixed backend and system-level issues, contributing to a 40% reduction in downtime.",
      "Managed an average of 150+ tickets/month while maintaining a 4.8/5 customer satisfaction score.",
      "Collaborated with senior engineers to troubleshoot and resolve complex issues within 24 hours.",
    ],
    tags: ["Production Support", "SLA", "Debugging", "Backend"],
  },
];

// ─── PROJECTS ─────────────────────────────────────────────────────────────

export const projects: Project[] = [
  // Web Projects
  {
    id: "reelx",
    title: "ReelX",
    description: "AI-Powered Movie Recommendation System",
    longDescription:
      "Flask-based backend generating content-based recommendations using cosine similarity. Integrated TMDB API for real-time metadata on 5,000+ titles.",
    category: "web",
    tags: ["Flask", "Python", "scikit-learn", "React", "TMDB API", "Tailwind"],
    featured: true,
  },
  {
    id: "shopbazaar",
    title: "ShopBazaar",
    description: "Full-Stack E-Commerce Platform",
    longDescription:
      "Complete e-commerce with product search, JWT auth, Braintree payments, and admin dashboard for order management.",
    category: "web",
    tags: ["Node.js", "Express", "JWT", "Braintree", "MongoDB"],
    projectUrl: "https://shopbazaar-app.onrender.com/",
    githubUrl: "https://github.com/KusumPareek99",
    featured: true,
  },
  {
    id: "basketboost",
    title: "Basket Boost",
    description: "Market Basket Analysis Tool",
    longDescription:
      "Data science project applying association rule mining to retail transaction data.",
    category: "web",
    tags: ["Python", "ML", "Data Science", "React"],
    githubUrl: "https://github.com/KusumPareek99/basket-boost-website",
  },
  {
    id: "forecastpro",
    title: "Forecast Pro",
    description: "Real-Time Weather Application",
    longDescription: "Weather app fetching live data from OpenWeather API with dynamic backgrounds.",
    category: "web",
    tags: ["React", "OpenWeather API", "CSS"],
  },
  {
    id: "intellicraft",
    title: "IntelliCraft",
    description: "GPT-3 Powered Content App",
    longDescription: "AI-powered app leveraging GPT-3 for intelligent content generation.",
    category: "web",
    tags: ["React", "GPT-3", "OpenAI API", "Node.js"],
  },
  {
    id: "traplaca",
    title: "TraPlaCa",
    description: "Training, Placement & Career Guide",
    longDescription:
      "Platform guiding students through training, placement prep, and career resources.",
    category: "web",
    tags: ["React", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/KusumPareek99/trapalaca-final",
  },
  {
    id: "stackoverflow",
    title: "StackOverflow Clone",
    description: "Clone App with Innovative Touch",
    longDescription: "Full-stack StackOverflow clone with Q&A, voting, and auth systems.",
    category: "web",
    tags: ["React", "Node.js", "MongoDB", "Redux"],
    githubUrl: "https://github.com/KusumPareek99/StackOverflow-Clone",
  },

  // Mobile
  {
    id: "befit",
    title: "BeFit",
    description: "Android Fitness Tracker App",
    longDescription: "Android fitness app for workout tracking, goal setting, and progress monitoring.",
    category: "mobile",
    tags: ["Android", "Java", "SQLite"],
    githubUrl: "https://github.com/KusumPareek99/be-fit-app",
  },

  // Frontend UI
  {
    id: "qrcomponent",
    title: "QR Component",
    description: "Frontend Mentor Challenge",
    longDescription: "Pixel-perfect QR code component from Frontend Mentor.",
    category: "frontend",
    tags: ["HTML", "CSS"],
    githubUrl: "https://github.com/KusumPareek99/qr-code-component/tree/master",
  },
  {
    id: "recipepage",
    title: "Recipe Page",
    description: "Clean Recipe Layout UI",
    longDescription: "Clean and accessible recipe page layout with typography focus.",
    category: "frontend",
    tags: ["HTML", "CSS"],
  },
];

// ─── EDUCATION ────────────────────────────────────────────────────────────

export const education: Education[] = [
  {
    id: "mca",
    degree: "Master of Computer Applications (MCA)",
    institution: "Dr. D.Y. Patil Institute of Management & Research",
    period: "Nov 2021 – Sep 2023",
    score: "9.36 GPA",
  },
  {
    id: "bca",
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Lachoo Memorial College of Science & Technology",
    period: "Jul 2018 – Sep 2021",
    score: "90.29%",
    achievement: "Gold Medalist 🥇",
  },
];

// ─── CERTIFICATES ─────────────────────────────────────────────────────────

export const certificates: Certificate[] = [
  {
    id: "hr-sql",
    title: "SQL (Basic & Intermediate)",
    issuer: "hackerrank",
    issuerLabel: "HackerRank",
    link: "https://www.hackerrank.com/certificates/bef45a343bfc",
  },
  {
    id: "hr-css",
    title: "CSS (Basic)",
    issuer: "hackerrank",
    issuerLabel: "HackerRank",
    link: "https://www.hackerrank.com/certificates/fecdadacd8e1",
  },
  {
    id: "fcc-responsive",
    title: "Responsive Web Design",
    issuer: "freecodecamp",
    issuerLabel: "freeCodeCamp",
    link: "https://www.freecodecamp.org/certification/Kusum-Pareek/responsive-web-design",
  },
  {
    id: "fcc-dsa",
    title: "JS Algorithms & Data Structures",
    issuer: "freecodecamp",
    issuerLabel: "freeCodeCamp",
    link: "https://www.freecodecamp.org/certification/Kusum-Pareek/javascript-algorithms-and-data-structures",
  },
  {
    id: "fcc-frontend",
    title: "Front End Development Libraries",
    issuer: "freecodecamp",
    issuerLabel: "freeCodeCamp",
    link: "https://www.freecodecamp.org/certification/Kusum-Pareek/front-end-development-libraries",
  },
  {
    id: "fcc-backend",
    title: "Back End Development & APIs",
    issuer: "freecodecamp",
    issuerLabel: "freeCodeCamp",
    link: "https://www.freecodecamp.org/certification/Kusum-Pareek/back-end-development-and-apis",
  },
  {
    id: "coursera-python",
    title: "Python for Everybody",
    issuer: "coursera",
    issuerLabel: "Coursera",
    link: "https://coursera.org/share/6937b5571b980e1c1865f459f062e0da",
  },
  {
    id: "coursera-git",
    title: "Introduction to Git and GitHub",
    issuer: "coursera",
    issuerLabel: "Coursera",
    link: "https://coursera.org/share/d2dd389a0e64aa0dd6ed0218f0fcdd5b",
  },
  {
    id: "coursera-ux",
    title: "Foundations of UX Design",
    issuer: "coursera",
    issuerLabel: "Coursera",
    link: "https://coursera.org/share/cd403cb3dfdd728df604e6d73ff5cd10",
  },
  {
    id: "google-genai",
    title: "Introduction to Generative AI",
    issuer: "google",
    issuerLabel: "Google",
    link: "https://www.cloudskillsboost.google/public_profiles/66e4999b-a22c-414f-8172-af8bba664f0e/badges/4485518",
  },
  {
    id: "google-llm",
    title: "Introduction to Large Language Models",
    issuer: "google",
    issuerLabel: "Google",
    link: "https://www.cloudskillsboost.google/public_profiles/66e4999b-a22c-414f-8172-af8bba664f0e/badges/5011798",
  },
  {
    id: "google-responsible",
    title: "Responsible AI Fundamentals",
    issuer: "google",
    issuerLabel: "Google",
    link: "https://www.cloudskillsboost.google/public_profiles/66e4999b-a22c-414f-8172-af8bba664f0e/badges/5011798",
  },
  {
    id: "jpmorgan",
    title: "Software Engineering Virtual Experience",
    issuer: "jpmorgan",
    issuerLabel: "J.P. Morgan",
    link: "#",
  },
  {
    id: "deloitte",
    title: "Technology Job Simulation",
    issuer: "deloitte",
    issuerLabel: "Deloitte Australia",
    link: "#",
    date: "July 2025",
  },
];

// ─── BADGES (GSSOC + HACKTOBERFEST) ───────────────────────────────────────

export const badgeGroups: BadgeGroup[] = [
  {
    title: "GSSoC '24 Badges",
    leaderboardLink: "https://gssoc.girlscript.tech/leaderboard",
    badges: [
      {
        name: "Postman Challenge",
        imageUrl:
          "https://raw.githubusercontent.com/GSSoC24/Postman-Challenge/main/docs/assets/Postman%20White.png",
      },
      {
        name: "Badge 1",
        imageUrl:
          "https://raw.githubusercontent.com/GSSoC24/Postman-Challenge/main/docs/assets/1.png",
      },
      {
        name: "Badge 2",
        imageUrl:
          "https://raw.githubusercontent.com/GSSoC24/Postman-Challenge/main/docs/assets/2.png",
      },
      {
        name: "Badge 3",
        imageUrl:
          "https://raw.githubusercontent.com/GSSoC24/Postman-Challenge/main/docs/assets/3.png",
      },
      {
        name: "Badge 4",
        imageUrl:
          "https://raw.githubusercontent.com/GSSoC24/Postman-Challenge/main/docs/assets/4.png",
      },
      {
        name: "Badge 5",
        imageUrl:
          "https://raw.githubusercontent.com/GSSoC24/Postman-Challenge/main/docs/assets/5.png",
      },
    ],
  },
  {
    title: "Hacktoberfest Badges",
    badges: [
      {
        name: "Holopin Board",
        imageUrl: "https://holopin.me/kusumpareek",
        link: "https://holopin.io/@kusumpareek",
      },
    ],
  },
];

// ─── SOCIAL LINKS ─────────────────────────────────────────────────────────

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/KusumPareek99",
    icon: "Github",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/kusum-pareek",
    icon: "Linkedin",
  },
  {
    label: "Email",
    href: "mailto:kusumpareek7620@gmail.com",
    icon: "Mail",
  },
];