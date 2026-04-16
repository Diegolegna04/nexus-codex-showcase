import { createFileRoute } from "@tanstack/react-router";
import { NerdModeProvider } from "@/components/NerdModeContext";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FeaturedProject from "@/components/FeaturedProject";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Your Name — Full Stack Developer" },
      { name: "description", content: "Full Stack Developer specializing in Angular. Portfolio showcasing projects, skills, and passion for modern web development." },
      { property: "og:title", content: "Your Name — Full Stack Developer" },
      { property: "og:description", content: "Full Stack Developer specializing in Angular." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <NerdModeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <Hero />
        <FeaturedProject />
        <Projects />
        <About />
        <Skills />
        <Contact />
      </div>
    </NerdModeProvider>
  );
}
