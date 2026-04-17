import { createFileRoute } from "@tanstack/react-router";
import Navigation from "@/components/Navigation";
import Contact from "@/components/Contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Diego Legnaro" },
      { name: "description", content: "Get in touch with Diego Legnaro for full stack roles, internships or Angular collaboration." },
      { property: "og:title", content: "Contact — Diego Legnaro" },
      { property: "og:description", content: "Open to junior full stack roles, internships and Angular collaborations." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="pt-20">
        <Contact expanded />
      </div>
    </div>
  );
}
