import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/site/InfoPage";

export const Route = createFileRoute("/_site/terms")({
  head: () => ({ meta: [
    { title: "Terms & Conditions — Shoge" },
    { name: "description", content: "Terms for browsing and purchasing from Shoge Handcraft Boutique." },
    { property: "og:title", content: "Terms & Conditions — Shoge" },
    { property: "og:description", content: "Review the draft terms for Shoge customers." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: TermsPage,
});

function TermsPage() {
  return <InfoPage title="Terms & conditions" lede="The rules that should be clear before a customer buys from Shoge." notice="Draft for review: this is not legal advice. Shoge must confirm its business details and have the final terms reviewed before launch." sections={[
    { title: "Orders and availability", body: "The final terms should explain when an order is accepted, how product availability is confirmed, and what happens if an item cannot be supplied." },
    { title: "Prices and payment", body: "State the currency, applicable taxes, payment methods, and the process for payment failures or refunds." },
    { title: "Product descriptions", body: "Describe how product colours, handmade variations, and sizing are represented, including reasonable differences between screens and finished pieces." },
    { title: "Changes and contact", body: "Add the verified legal business identity, governing terms, effective date, and customer contact details before launch." },
  ]} />;
}