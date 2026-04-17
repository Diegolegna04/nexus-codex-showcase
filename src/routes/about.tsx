import { createFileRoute } from "@tanstack/react-router";
import Navigation from "@/components/Navigation";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Diego Legnaro" },
      { name: "description", content: "Junior full stack developer based in Italy. Background, education at ITS INCOM, and focus on Angular and the modern web stack." },
      { property: "og:title", content: "About — Diego Legnaro" },
      { property: "og:description", content: "Background, education and focus on Angular and the modern web stack." },
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
