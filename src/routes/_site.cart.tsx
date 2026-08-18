import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/site/Page";
import { inr } from "@/data/catalog";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/_site/cart")({
  head: () => ({
    meta: [
      { title: "Your Bag — Aanchal" },
      { name: "description", content: "Review the handcrafted pieces in your shopping bag before checkout." },
      { property: "og:title", content: "Your Bag — Aanchal" },
      { property: "og:description", content: "Review your handcrafted cotton pieces before checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines, setQty, removeLine, subtotal } = useShop();
  const shipping = subtotal === 0 || subtotal >= 1999 ? 0 : 99;

  return (
    <>
      <PageHeader title="Your Bag" lede="Pieces are held for 30 minutes, not reserved." />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_340px]">
        <div>
          {lines.length === 0 ? (
            <div className="border border-border p-10 text-center">
              <p className="text-sm text-muted-foreground">Your bag is empty.</p>
              <Button asChild className="mt-4">
                <Link to="/shop">Start shopping</Link>
              </Button>
            </div>
          ) : (
            <ul className="divide-y divide-border border-y border-border">
              {lines.map((l, i) => (
                <li key={`${l.slug}-${l.size}-${l.color}`} className="flex gap-4 py-5">
                  <img src={l.product.images[0]} alt={l.product.name} className="h-28 w-24 object-cover" />
                  <div className="flex-1">
                    <Link
                      to="/product/$slug"
                      params={{ slug: l.slug }}
                      className="text-lg hover:text-primary"
                    >
                      {l.product.name}
                    </Link>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {l.size} · {l.color}
                    </p>
                    <div className="mt-3 flex items-center gap-4">
                      <div className="flex items-center border border-border">
                        <button className="p-2" aria-label="Decrease" onClick={() => setQty(i, l.qty - 1)}>
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm">{l.qty}</span>
                        <button className="p-2" aria-label="Increase" onClick={() => setQty(i, l.qty + 1)}>
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive"
                        onClick={() => removeLine(i)}
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>
                  </div>
                  <p className="text-sm">{inr(l.product.price * l.qty)}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <aside className="h-fit border border-border p-6">
          <p className="eyebrow">Order summary</p>
          <dl className="mt-4 space-y-2 text-sm">
            <Row label="Subtotal" value={inr(subtotal)} />
            <Row label="Shipping" value={shipping === 0 ? "Free" : inr(shipping)} />
            <div className="border-t border-border pt-3">
              <Row label="Total" value={inr(subtotal + shipping)} bold />
            </div>
          </dl>
          <Button asChild size="lg" className="mt-6 w-full" disabled={lines.length === 0}>
            <Link to="/checkout">Proceed to checkout</Link>
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Free shipping in India above ₹1,999
          </p>
        </aside>
      </div>
    </>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between ${bold ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
