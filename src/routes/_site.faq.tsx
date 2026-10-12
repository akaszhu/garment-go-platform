import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/site/InfoPage";

export const Route = createFileRoute("/_site/faq")({
  head: () => ({ meta: [
    { title: "Frequently Asked Questions — Shoge" },
    { name: "description", content: "Answers to common questions about Shoge sizes, products, delivery, and orders." },
    { property: "og:title", content: "Frequently Asked Questions — Shoge" },
    { property: "og:description", content: "Product, size, delivery, and order guidance for Shoge shoppers." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: FaqPage,
});

function FaqPage() {
  return <InfoPage title="Frequently asked questions" lede="Quick answers about the Shoge collection and shopping experience." notice="Order and delivery services shown in this preview are not connected to fulfillment yet." sections={[
    { title: "How do I choose a size?", body: "Use the size guide and compare the measurements with a garment that fits you comfortably. Contact Shoge if you need help with a specific piece." },
    { title: "Can I check delivery by PIN code?", body: "The product and checkout pages offer a preview serviceability check. It is not connected to a courier and cannot confirm a real delivery commitment." },
    { title: "Can I change or cancel an order?", body: "Orders cannot be changed or cancelled from this preview because no live order is created." },
    { title: "How can I track a parcel?", body: "Live courier tracking will be available when Shoge connects its order system and shipping partner." },
    { title: "How do I contact the studio?", body: "Verified support contact details have not yet been provided by the Shoge owner." },
  ]} />;
}