import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/site/InfoPage";

export const Route = createFileRoute("/_site/size-guide")({
  head: () => ({ meta: [
    { title: "Size Guide — Shoge" },
    { name: "description", content: "A practical guide to choosing a size for Shoge clothing." },
    { property: "og:title", content: "Size Guide — Shoge" },
    { property: "og:description", content: "Measure a well-fitting garment to find your Shoge size." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: SizeGuidePage,
});

function SizeGuidePage() {
  return <InfoPage title="Size guide" lede="Compare measurements with a garment you already love for a more confident fit." notice="Product-specific garment measurements are not available in the current catalog yet." sections={[
    { title: "Measure a garment", body: "Lay a similar garment flat and measure the chest, waist, hip, and length where relevant. Compare those measurements with the individual product details when they are available." },
    { title: "Between sizes?", body: "Consider the fit you prefer and the garment's cut. For a close-fitting style, the smaller size may feel different than a relaxed style in the same size." },
    { title: "Need a hand?", body: "Ask Shoge for the actual garment measurements before ordering. Verified support details will be added once provided by the owner." },
  ]} />;
}