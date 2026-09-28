import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/site/Page";

export const Route = createFileRoute("/_site/account")({
  head: () => ({ meta: [
    { title: "Your Account — Aanchal" },
    { name: "description", content: "Your Aanchal account and saved pieces." },
    { property: "og:title", content: "Your Account — Aanchal" },
    { property: "og:description", content: "View your Aanchal saved pieces." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: Account,
});

function Account() {
  return <><PageHeader title="Your Account" lede="Your saved pieces are kept on this device." />
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6"><p className="text-sm text-muted-foreground">Account sign-in and order history are not available yet.</p>
      <Button asChild className="mt-6"><Link to="/wishlist">View wishlist</Link></Button>
    </div></>;
}