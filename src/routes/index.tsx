import { createFileRoute } from "@tanstack/react-router";
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
      { title: "Diego Legnaro — Full Stack Developer" },
      { name: "description", content: "Junior full stack developer focused on Angular, TypeScript and Java/Quarkus. Portfolio, projects and skills." },
      { property: "og:title", content: "Diego Legnaro — Full Stack Developer" },
      { property: "og:description", content: "Junior full stack developer focused on Angular and TypeScript." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />
      <FeaturedProject />
      <Projects limit={3} showViewAll />
      <About />
      <Skills />
      <Contact />
    </div>
  );
}
