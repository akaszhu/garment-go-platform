import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Minus, Plus, Truck, RefreshCcw, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Stars } from "@/components/shop/Stars";
import { ProductCard } from "@/components/shop/ProductCard";
import { bySlug, inr, products, reviews } from "@/data/catalog";
import { checkPincode, type PincodeResult } from "@/lib/pincode";
import { useShop } from "@/lib/shop-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_site/product/$slug")({
  loader: ({ params }) => {
    const product = bySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Unavailable — Aanchal" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.product;
    return {
      meta: [
        { title: `${p.name} — Aanchal` },
        { name: "description", content: p.description.slice(0, 155) },
        { property: "og:title", content: `${p.name} — Aanchal` },
        { property: "og:description", content: p.description.slice(0, 155) },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addToCart, toggleWish, isWished } = useShop();
  const [image, setImage] = useState(0);
  const [size, setSize] = useState(product.sizes[0]!);
  const [color, setColor] = useState(product.colors[0]!.name);
  const [qty, setQty] = useState(1);
  const [pin, setPin] = useState("");
  const [pinResult, setPinResult] = useState<PincodeResult | null>(null);

  const list = reviews.filter((r) => r.productSlug === product.slug && r.status === "published");
  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);
  const off = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <nav className="mb-6 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link> /{" "}
          <Link to="/shop" className="hover:text-primary">Shop</Link> /{" "}
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex gap-4">
            <div className="hidden flex-col gap-3 sm:flex">
              {product.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setImage(i)}
                  className={cn(
                    "h-20 w-16 overflow-hidden border",
                    i === image ? "border-primary" : "border-border",
                  )}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
            <div className="flex-1 overflow-hidden bg-secondary">
              <img
                src={product.images[image] ?? product.images[0]}
                alt={product.name}
                className="aspect-[3/4] w-full object-cover"
              />
            </div>
          </div>

          <div>
            <p className="eyebrow">{product.fabric} · {product.occasion}</p>
            <h1 className="mt-2 text-3xl md:text-4xl">{product.name}</h1>
            <div className="mt-3 flex items-center gap-3 text-sm">
              <Stars value={product.rating} />
              <span className="text-muted-foreground">
                {product.rating.toFixed(1)} · {product.reviewCount} reviews
              </span>
            </div>

            <div className="mt-5 flex items-end gap-3">
              <span className="text-2xl">{inr(product.price)}</span>
              <span className="text-sm text-muted-foreground line-through">{inr(product.mrp)}</span>
              {off > 0 && <span className="text-sm font-semibold text-primary">{off}% off</span>}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Inclusive of all taxes</p>

            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

            <div className="mt-6">
              <p className="eyebrow mb-2">Colour · {color}</p>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    aria-label={c.name}
                    onClick={() => setColor(c.name)}
                    style={{ backgroundColor: c.hex }}
                    className={cn(
                      "h-8 w-8 rounded-full border border-border",
                      color === c.name && "ring-2 ring-primary ring-offset-2",
                    )}
                  />
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="eyebrow mb-2">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={cn(
                      "border border-border px-3 py-2 text-xs hover:border-primary",
                      size === s && "border-primary bg-primary text-primary-foreground",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Model is 5'6" and wears a size M. Cotton may shrink up to 2% on first wash.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="flex items-center border border-border">
                <button className="p-3" aria-label="Decrease" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-8 text-center text-sm">{qty}</span>
                <button className="p-3" aria-label="Increase" onClick={() => setQty((q) => q + 1)}>
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <Button
                size="lg"
                disabled={product.stock === 0}
                onClick={() => {
                  addToCart({ slug: product.slug, size, color, qty });
                  toast.success(`${product.name} added to bag`);
                }}
              >
                {product.stock === 0 ? "Sold out" : "Add to bag"}
              </Button>
              <Button variant="outline" size="lg" onClick={() => toggleWish(product.slug)}>
                <Heart className={cn("mr-2 h-4 w-4", isWished(product.slug) && "fill-current")} />
                {isWished(product.slug) ? "Saved" : "Wishlist"}
              </Button>
            </div>
            {product.stock > 0 && product.stock <= 5 && (
              <p className="mt-3 text-xs text-primary">Only {product.stock} left in this batch</p>
            )}

            <div className="mt-8 border border-border p-4">
              <p className="eyebrow mb-2">Delivery & COD check</p>
              <div className="flex gap-2">
                <Input
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="6-digit PIN code"
                  maxLength={6}
                  inputMode="numeric"
                />
                <Button variant="outline" onClick={() => setPinResult(checkPincode(pin))}>
                  Check
                </Button>
              </div>
              {pinResult && (
                <p className={cn("mt-2 text-xs", pinResult.ok ? "text-muted-foreground" : "text-destructive")}>
                  {pinResult.message}
                </p>
              )}
            </div>

            <div className="mt-6 grid gap-3 text-xs text-muted-foreground sm:grid-cols-3">
              <span className="flex items-center gap-2"><Truck className="h-4 w-4" /> Free shipping over ₹1,999</span>
              <span className="flex items-center gap-2"><RefreshCcw className="h-4 w-4" /> 7-day easy returns</span>
              <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Secure payments</span>
            </div>

            <Accordion type="single" collapsible className="mt-8">
              <AccordionItem value="care">
                <AccordionTrigger>Fabric & care</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {product.care.map((c) => (
                      <li key={c} className="ml-4 list-disc">{c}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="ship">
                <AccordionTrigger>Shipping & returns</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Dispatched from Ahmedabad in 1–2 working days. Returns accepted within 7 days of
                  delivery on unworn pieces with tags. Sale items are exchange-only.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <section className="mt-16 border-t border-border pt-10">
          <h2 className="text-2xl">Reviews</h2>
          {list.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">No reviews yet — be the first.</p>
          ) : (
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {list.map((r) => (
                <article key={r.id} className="border border-border p-5">
                  <Stars value={r.rating} />
                  <h3 className="mt-2 text-lg">{r.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{r.body}</p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    {r.author} · {r.date}{r.verified ? " · Verified buyer" : ""}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl">You may also like</h2>
            <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
