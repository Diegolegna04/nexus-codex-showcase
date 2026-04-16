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
    id: "anime-tracker",
    title: "Anime Tracker",
    description: "A full-featured anime tracking application inspired by MyAnimeList. Browse, search, and track your anime library with a sleek, responsive interface.",
    longDescription: "Built from the ground up with Angular, this application lets users browse an extensive anime database, manage their watch lists, rate shows, and discover recommendations. Features include real-time search, responsive grid layouts, detailed anime pages with episode tracking, and a personalized dashboard. The app consumes multiple REST APIs and handles complex state management with RxJS.",
    tech: ["Angular", "TypeScript", "REST API", "SCSS", "RxJS"],
    featured: true,
    year: "2024",
    role: "Full Stack Developer",
    links: [
      { label: "Live Demo", href: "#" },
      { label: "Source Code", href: "#" },
    ],
  },
  {
    id: "task-manager",
    title: "Task Manager",
    description: "A real-time task management app with drag-and-drop, filters, and team collaboration features.",
    longDescription: "A comprehensive project management tool featuring real-time updates via Firebase, drag-and-drop task boards (Kanban-style), advanced filtering, team workspaces, and notification systems. Built with a focus on performance and intuitive UX.",
    tech: ["Angular", "Firebase", "TypeScript"],
    year: "2024",
    role: "Frontend Developer",
    links: [
      { label: "Source Code", href: "#" },
    ],
  },
  {
    id: "weather-dashboard",
    title: "Weather Dashboard",
    description: "A clean weather dashboard fetching live data with animated charts and location search.",
    longDescription: "A weather application that provides detailed forecasts with beautiful data visualizations. Features include geo-location detection, city search with autocomplete, 7-day forecasts, hourly breakdowns, and interactive charts showing temperature trends, precipitation, and wind patterns.",
    tech: ["Angular", "Chart.js", "OpenWeather API"],
    year: "2023",
    role: "Frontend Developer",
    links: [
      { label: "Live Demo", href: "#" },
    ],
  },
  {
    id: "dev-blog",
    title: "Dev Blog",
    description: "A minimal blog platform with markdown rendering, syntax highlighting, and dark mode.",
    longDescription: "A developer-focused blogging platform with server-side rendering, markdown support with syntax highlighting, tag-based categorization, full-text search, and a clean reading experience. The CMS supports draft/publish workflows and image optimization.",
    tech: ["Angular", "Node.js", "MongoDB"],
    year: "2023",
    role: "Full Stack Developer",
    links: [
      { label: "Live Demo", href: "#" },
      { label: "Source Code", href: "#" },
    ],
  },
];

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function getFeaturedProject(): Project | undefined {
  return projects.find((p) => p.featured);
}
