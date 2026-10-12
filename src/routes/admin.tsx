import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Circle, ShieldCheck } from "lucide-react";
import { ShellLogo } from "@/components/site/BrandLogo";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [
    { title: "Store Admin Checklist — Shoge" },
    { name: "description", content: "Owner setup checklist for Shoge's store management tools." },
    { property: "og:title", content: "Store Admin Checklist — Shoge" },
    { property: "og:description", content: "Review the owner setup checklist for Shoge store management." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "robots", content: "noindex" },
  ] }),
  component: AdminChecklistPage,
});

const groups = [
  { title: "Dashboard", items: ["Sales and order overview", "Top products and low-stock alerts", "Returns and sales reports"] },
  { title: "Products & inventory", items: ["Add, edit, archive, and import products", "Manage variants, prices, and stock", "Review low-stock items"] },
  { title: "Orders & customers", items: ["Find orders and update fulfillment status", "View customer order history", "Process cancellation and return requests"] },
  { title: "Storefront & campaigns", items: ["Manage discount codes", "Edit homepage banners and collection content", "Moderate customer reviews"] },
  { title: "Staff & settings", items: ["Grant separate staff roles", "Manage store and delivery settings", "Review payment and notification status"] },
];

function AdminChecklistPage() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-5 sm:px-8">
          <ShellLogo className="h-9 w-9" />
          <div>
            <p className="eyebrow">Shoge · Owner setup</p>
            <h1 className="mt-1 text-2xl">Store admin checklist</h1>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="flex gap-4 border-l-2 border-primary bg-secondary p-5">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div>
            <h2 className="font-semibold">Owner access is not assigned</h2>
            <p className="mt-1 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              This page contains a setup checklist only; it does not show or change store, order, or customer records. Secure admin tools stay disabled until a verified owner account is assigned.
            </p>
          </div>
        </div>
        <div className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {groups.map((group) => (
            <section key={group.title} className="border-t border-border pt-4">
              <h2 className="text-xl">{group.title}</h2>
              <ul className="mt-4 space-y-3">
                {group.items.map((item, index) => {
                  const complete = group.title === "Dashboard" && index === 0;
                  const Icon = complete ? CheckCircle2 : Circle;
                  return (
                    <li key={item} className="flex items-start gap-3 text-sm">
                      <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${complete ? "text-primary" : "text-muted-foreground"}`} />
                      <span className={complete ? "text-foreground" : "text-muted-foreground"}>{item}</span>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}