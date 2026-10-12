import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/site/InfoPage";

export const Route = createFileRoute("/_site/product-care")({
  head: () => ({ meta: [
    { title: "Product Care — Shoge" },
    { name: "description", content: "Care guidance for Shoge's handcrafted cotton clothing and accessories." },
    { property: "og:title", content: "Product Care — Shoge" },
    { property: "og:description", content: "Keep handcrafted Shoge pieces looking their best." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: ProductCarePage,
});

function ProductCarePage() {
  return <InfoPage title="Product care" lede="A little care helps handcrafted cotton pieces last." sections={[
    { title: "Before the first wash", body: "Follow the care label supplied with your exact garment. Hand-dyed and block-printed fabrics may benefit from a separate first wash." },
    { title: "Washing", body: "Use cool water and a gentle detergent. Avoid bleach and harsh stain treatments unless the garment label specifically permits them." },
    { title: "Drying and ironing", body: "Dry away from strong direct sunlight and iron inside out on a setting suited to the fabric." },
    { title: "The garment label comes first", body: "Care needs can vary by fabric, trim, and dye. Follow the label attached to your piece if it differs from this general guidance." },
  ]} />;
}