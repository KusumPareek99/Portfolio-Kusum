// ─── NAVIGATION ───────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────

export type ProjectCategory = "web" | "mobile" | "frontend";

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: ProjectCategory;
  tags: string[];
  imgUrl?: string;
  projectUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  wip?: boolean;
}

// ─── EXPERIENCE ───────────────────────────────────────────────────────────

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  current: boolean;
  description: string[];
  tags: string[];
}

// ─── SKILLS ───────────────────────────────────────────────────────────────

export type SkillCategory =
  | "backend"
  | "frontend"
  | "database"
  | "cloud"
  | "tools";

export interface Skill {
  name: string;
  category: SkillCategory;
  color: string; // Official tech color for dot indicator
  level?: "expert" | "proficient" | "familiar";
}

// ─── EDUCATION ────────────────────────────────────────────────────────────

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  score: string;
  achievement?: string;
}

// ─── CERTIFICATES ─────────────────────────────────────────────────────────

export type CertIssuer =
  | "hackerrank"
  | "freecodecamp"
  | "google"
  | "coursera"
  | "jpmorgan"
  | "deloitte";

export interface Certificate {
  id: string;
  title: string;
  issuer: CertIssuer;
  issuerLabel: string;
  link: string;
  date?: string;
}

// ─── BADGES ───────────────────────────────────────────────────────────────

export interface Badge {
  name: string;
  imageUrl: string;
  link?: string;
}

export interface BadgeGroup {
  title: string;
  badges: Badge[];
  leaderboardLink?: string;
}

// ─── STATS ────────────────────────────────────────────────────────────────

export interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

// ─── SOCIAL LINKS ─────────────────────────────────────────────────────────

export interface SocialLink {
  label: string;
  href: string;
  icon: string; // Lucide icon name
}