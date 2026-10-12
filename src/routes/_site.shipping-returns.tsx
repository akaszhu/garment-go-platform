import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/site/InfoPage";

export const Route = createFileRoute("/_site/shipping-returns")({
  head: () => ({ meta: [
    { title: "Shipping & Returns — Shoge" },
    { name: "description", content: "Shipping, returns, and exchanges information for Shoge orders." },
    { property: "og:title", content: "Shipping & Returns — Shoge" },
    { property: "og:description", content: "Read about shipping and return support for Shoge purchases." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: ShippingReturnsPage,
});

function ShippingReturnsPage() {
  return <InfoPage title="Shipping & returns" lede="The information customers need before placing an order." notice="This policy page is a launch draft, not a final promise. Shipping zones, delivery times, fees, eligibility, and return windows need owner approval." sections={[
    { title: "Shipping", body: "The final policy should state where Shoge delivers, the dispatch and delivery estimates, applicable charges, and how delays are communicated." },
    { title: "Returns and exchanges", body: "The final policy should explain which items qualify, the request deadline, item condition requirements, and how refunds or exchanges are handled." },
    { title: "Damaged or incorrect items", body: "Customers should have a clear, verified support channel and a reasonable deadline for reporting an issue. The Shoge owner must confirm the process before launch." },
    { title: "Preview orders", body: "Orders placed in this preview are not transmitted to a store team or delivery partner." },
  ]} />;
}