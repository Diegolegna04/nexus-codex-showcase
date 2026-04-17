export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  featured?: boolean;
  year: string;
  role: string;
  links?: { label: string; href: string }[];
}

export const projects: Project[] = [
  {
    id: "myanimelist-clone",
    title: "MyAnimeList Clone",
    description: "Full-stack anime catalog with user accounts, custom profiles and personal watchlists. Built end-to-end as a personal project.",
    longDescription:
      "A complete reimagining of MyAnimeList, built from scratch to explore full-stack architecture. The Angular frontend handles browsing, search, ratings and personalized profile pages, while a Java backend powered by Quarkus exposes a REST API backed by MongoDB. The project covers authentication, user management, complex data modeling and a responsive, content-heavy UI — a deliberate exercise in owning the entire stack.",
    tech: ["Angular", "TypeScript", "Java", "Quarkus", "MongoDB", "REST API"],
    featured: true,
    year: "2024",
    role: "Full Stack Developer",
    links: [
      { label: "Source Code", href: "#" },
    ],
  },
  {
    id: "course-deadline-manager",
    title: "Course Deadline Manager",
    description: "Internal web app to track training course deadlines and renewals, built during my internship at Graffi Design.",
    longDescription:
      "Designed and developed during my internship at Graffi Design Pubblicità, this PHP-based web application manages a registry of training courses, expiration dates and renewal alerts. The tool replaced a manual spreadsheet workflow and gave the team a single source of truth for compliance tracking, with a focus on clarity, speed and ease of data entry.",
    tech: ["PHP", "MySQL", "HTML", "CSS"],
    year: "2025",
    role: "Web Developer Intern",
  },
  {
    id: "shopify-storefront",
    title: "Shopify Storefront",
    description: "Content and product management on a live e-commerce storefront during my first internship at Global Brand Communication.",
    longDescription:
      "Hands-on work on a production Shopify store: maintaining product catalogs, updating page content, configuring collections and ensuring a consistent customer experience. The role was my first exposure to a real-world client environment and to the operational side of running an online store.",
    tech: ["Shopify", "Liquid", "HTML", "CSS"],
    year: "2024",
    role: "Web Developer Intern",
  },
];

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function getFeaturedProject(): Project | undefined {
  return projects.find((p) => p.featured);
}
