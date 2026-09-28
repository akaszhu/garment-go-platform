import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/site/Page";

export const Route = createFileRoute("/_site/track-order")({
  head: () => ({ meta: [
    { title: "Track Your Order — Aanchal" },
    { name: "description", content: "Order tracking information for Aanchal boutique purchases." },
    { property: "og:title", content: "Track Your Order — Aanchal" },
    { property: "og:description", content: "Find out about tracking your Aanchal order." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: TrackOrder,
});

function TrackOrder() {
  return <><PageHeader title="Track Your Order" lede="Tracking is not available for demo orders." />
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6"><p className="text-sm text-muted-foreground">Orders placed in this preview are not sent to a courier. Live tracking will be available once ordering is connected.</p>
      <Button asChild className="mt-6"><Link to="/shop">Continue shopping</Link></Button>
    </div></>;
}