import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { InfoPage } from "@/components/site/InfoPage";

export const Route = createFileRoute("/_site/returns")({
  head: () => ({ meta: [
    { title: "Returns & Exchanges — Shoge" },
    { name: "description", content: "Information about returns and exchanges for Shoge purchases." },
    { property: "og:title", content: "Returns & Exchanges — Shoge" },
    { property: "og:description", content: "Learn about Shoge return and exchange support." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: ReturnsPage,
});

function ReturnsPage() {
  return <>
    <InfoPage title="Returns & exchanges" lede="We want you to feel good about the pieces you choose." notice="Self-serve return processing is not connected yet. Preview orders are not real purchases and cannot be submitted for return." sections={[
      { title: "Before you begin", body: "A live request will need an order number, the item, and the reason for the request. Eligibility and timing must follow Shoge's final approved policy." },
      { title: "Exchange or refund", body: "The available resolution depends on the item, stock, and the final policy. This preview cannot reserve replacement stock or issue a refund." },
      { title: "Need help?", body: "Visit the contact page for the current support information." },
    ]} />
    <div className="mx-auto max-w-3xl px-4 pb-12 sm:px-6"><Button variant="outline" asChild><Link to="/shipping-returns">Read shipping & returns</Link></Button></div>
  </>;
}