import { createFileRoute } from "@tanstack/react-router";
import Navigation from "@/components/Navigation";
import Contact from "@/components/Contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Your Name" },
      { name: "description", content: "Get in touch for collaboration, projects, or just to say hello." },
      { property: "og:title", content: "Contact — Your Name" },
      { property: "og:description", content: "Get in touch for collaboration or projects." },
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
