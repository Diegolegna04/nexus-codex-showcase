import { createFileRoute } from "@tanstack/react-router";
import Navigation from "@/components/Navigation";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Your Name" },
      { name: "description", content: "Learn more about my background, skills, and passion for Angular and modern web development." },
      { property: "og:title", content: "About — Your Name" },
      { property: "og:description", content: "Full Stack Developer focused on Angular and modern web technologies." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="pt-20">
        <About expanded />
        <Skills />
        <Contact />
      </div>
    </div>
  );
}
