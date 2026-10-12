import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { InfoPage } from "@/components/site/InfoPage";

export const Route = createFileRoute("/_site/contact")({
  head: () => ({ meta: [
    { title: "Contact Shoge — Handcraft Boutique" },
    { name: "description", content: "Contact Shoge for questions about handcrafted clothing and orders." },
    { property: "og:title", content: "Contact Shoge — Handcraft Boutique" },
    { property: "og:description", content: "Find support for Shoge products and orders." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: ContactPage,
});

function ContactPage() {
  return <>
    <InfoPage title="Contact Shoge" lede="We’re here to help with your Shoge order or a piece you have your eye on." notice="The owner has not supplied a verified support email or phone number yet, so none is shown here." sections={[
      { title: "Order questions", body: "Keep your order number handy when contacting the Shoge team. Preview orders are demonstrations and are not sent to a fulfillment team." },
      { title: "Product questions", body: "Include the product name, preferred size, and colour so the team can check the right piece." },
      { title: "Support details", body: "Verified business contact details will appear here once provided by the Shoge owner." },
    ]} />
    <div className="mx-auto max-w-3xl px-4 pb-12 sm:px-6"><Button variant="outline" asChild><Link to="/shop">Browse the collection</Link></Button></div>
  </>;
}