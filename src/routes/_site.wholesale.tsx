import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { InfoPage } from "@/components/site/InfoPage";

export const Route = createFileRoute("/_site/wholesale")({
  head: () => ({ meta: [
    { title: "Wholesale Enquiries — Shoge" },
    { name: "description", content: "Wholesale and retail partnership information for Shoge Handcraft Boutique." },
    { property: "og:title", content: "Wholesale Enquiries — Shoge" },
    { property: "og:description", content: "Learn about wholesale enquiries for Shoge handcrafted collections." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: WholesalePage,
});

function WholesalePage() {
  return <>
    <InfoPage title="Wholesale & partnerships" lede="For shops interested in carrying Shoge's handcrafted collections." notice="Wholesale availability, minimum quantities, and commercial terms have not yet been confirmed by the owner." sections={[
      { title: "What to include", body: "A useful enquiry should include your shop name, location, sales channel, the categories you are interested in, and an estimated first order." },
      { title: "Availability", body: "Partnerships depend on collection availability and production capacity. No wholesale order can be placed through this preview." },
      { title: "Contact", body: "Verified business contact details will be added when the Shoge owner provides them." },
    ]} />
    <div className="mx-auto max-w-3xl px-4 pb-12 sm:px-6"><Button variant="outline" asChild><Link to="/contact">View contact information</Link></Button></div>
  </>;
}