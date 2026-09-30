import { createFileRoute, Link } from "@tanstack/react-router";
import studio from "@/assets/studio.jpg";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_site/about")({
  head: () => ({ meta: [
    { title: "Our Studio — Shoge" },
    { name: "description", content: "Discover Shoge's small-batch, hand block-printed cotton collection and the people behind it." },
    { property: "og:title", content: "Our Studio — Shoge" },
    { property: "og:description", content: "Small-batch cotton clothing made by hand in Ahmedabad." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: About,
});

function About() {
  return <main className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:items-center">
    <img src={studio} alt="Artisan hand block-printing cotton" className="w-full object-cover" />
    <div><p className="eyebrow">Our studio</p><h1 className="mt-3 text-5xl">Made slowly, worn often.</h1>
      <p className="mt-6 leading-relaxed text-muted-foreground">At Shoge, every print begins with a carved block and a length of cotton. Our small-batch pieces celebrate the hands and traditions behind each garment.</p>
      <Button asChild className="mt-8"><Link to="/shop">Explore the collection</Link></Button>
    </div>
  </main>;
}