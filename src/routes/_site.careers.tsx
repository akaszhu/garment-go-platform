import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/site/InfoPage";

export const Route = createFileRoute("/_site/careers")({
  head: () => ({ meta: [
    { title: "Careers — Shoge Handcraft Boutique" },
    { name: "description", content: "Career and collaboration enquiries for Shoge's Ahmedabad studio." },
    { property: "og:title", content: "Careers — Shoge Handcraft Boutique" },
    { property: "og:description", content: "Learn how to enquire about opportunities with Shoge." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: CareersPage,
});

function CareersPage() {
  return <InfoPage title="Careers & studio collaborations" lede="We value thoughtful craft, careful making, and the people who bring a collection to life." notice="There are no confirmed openings or verified application channel to share at this time." sections={[
    { title: "Future opportunities", body: "When roles are open, this page should list the responsibilities, location, working arrangement, and application deadline." },
    { title: "Artisan and creative collaborations", body: "Shoge welcomes thoughtful collaboration enquiries. Availability and terms must be confirmed directly by the studio." },
    { title: "Stay in touch", body: "A verified contact channel will be added once supplied by the Shoge owner." },
  ]} />;
}