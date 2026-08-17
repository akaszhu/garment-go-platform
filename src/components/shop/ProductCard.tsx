import { Link } from "@tanstack/react-router";
import { Heart, Eye } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Stars } from "@/components/shop/Stars";
import { inr, type Product } from "@/data/catalog";
import { useShop } from "@/lib/shop-store";
import { cn } from "@/lib/utils";

export function ProductCard({ product, view = "grid" }: { product: Product; view?: "grid" | "list" }) {
  const { toggleWish, isWished, addToCart } = useShop();
  const [size, setSize] = useState(product.sizes[0]!);
  const [color, setColor] = useState(product.colors[0]!.name);
  const [quick, setQuick] = useState(false);
  const off = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const soldOut = product.stock === 0;

  const swatches = (
    <div className="flex flex-wrap items-center gap-2">
      {product.colors.map((c) => (
        <button
          key={c.name}
          type="button"
          aria-label={c.name}
          onClick={() => setColor(c.name)}
          className={cn(
            "h-4 w-4 rounded-full border border-border ring-offset-2 ring-offset-background",
            color === c.name && "ring-1 ring-primary",
          )}
          style={{ backgroundColor: c.hex }}
        />
      ))}
      <span className="mx-1 h-3 w-px bg-border" />
      {product.sizes.slice(0, 5).map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => setSize(s)}
          className={cn(
            "min-w-7 rounded-sm border border-border px-1.5 py-0.5 text-[0.65rem] transition-colors hover:border-primary",
            size === s && "border-primary bg-primary text-primary-foreground",
          )}
        >
          {s}
        </button>
      ))}
    </div>
  );

  return (
    <article
      className={cn(
        "group relative",
        view === "list" && "grid gap-6 sm:grid-cols-[220px_1fr] sm:items-center",
      )}
    >
      <div className="relative overflow-hidden bg-secondary">
        <Link to="/product/$slug" params={{ slug: product.slug }}>
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            width={900}
            height={1200}
            className="aspect-[3/4] w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
          />
          <img
            src={product.images[1] ?? product.images[0]}
            alt={`${product.name} alternate view`}
            loading="lazy"
            width={900}
            height={1200}
            className="absolute inset-0 aspect-[3/4] w-full scale-105 object-cover opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100"
          />
        </Link>

        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {soldOut && <Tag className="bg-foreground text-background">Sold out</Tag>}
          {!soldOut && product.tags.includes("new") && <Tag>New in</Tag>}
          {!soldOut && off > 0 && <Tag className="bg-[var(--marigold)] text-foreground">{off}% off</Tag>}
          {product.tags.includes("restocked") && !soldOut && <Tag>Now back</Tag>}
        </div>

        <button
          type="button"
          aria-label="Add to wishlist"
          onClick={() => {
            toggleWish(product.slug);
            toast(isWished(product.slug) ? "Removed from wishlist" : "Saved to wishlist");
          }}
          className="absolute top-3 right-3 rounded-full bg-background/85 p-2 backdrop-blur transition-colors hover:text-primary"
        >
          <Heart
            className={cn("h-4 w-4", isWished(product.slug) && "fill-primary text-primary")}
          />
        </button>

        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Button
            variant="secondary"
            size="sm"
            className="w-full gap-2 bg-background/95"
            onClick={() => setQuick(true)}
          >
            <Eye className="h-4 w-4" /> Quick view
          </Button>
        </div>
      </div>

      <div className="pt-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link
              to="/product/$slug"
              params={{ slug: product.slug }}
              className="font-display text-lg leading-tight hover:text-primary"
            >
              {product.name}
            </Link>
            <p className="mt-0.5 text-xs text-muted-foreground">{product.fabric}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold">{inr(product.price)}</p>
            {off > 0 && (
              <p className="text-xs text-muted-foreground line-through">{inr(product.mrp)}</p>
            )}
          </div>
        </div>
        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
          <Stars value={product.rating} /> {product.rating} ({product.reviewCount})
        </div>
        <div className="mt-3">{swatches}</div>
      </div>

      <Dialog open={quick} onOpenChange={setQuick}>
        <DialogContent className="max-w-3xl overflow-hidden p-0">
          <div className="grid md:grid-cols-2">
            <img
              src={product.images[0]}
              alt={product.name}
              loading="lazy"
              className="hidden h-full w-full object-cover md:block"
            />
            <div className="p-6">
              <DialogTitle className="font-display text-2xl">{product.name}</DialogTitle>
              <DialogDescription className="mt-1 text-xs">
                {product.fabric} · {product.occasion}
              </DialogDescription>
              <p className="mt-3 text-lg font-semibold">
                {inr(product.price)}{" "}
                {off > 0 && (
                  <span className="ml-2 text-sm font-normal text-muted-foreground line-through">
                    {inr(product.mrp)}
                  </span>
                )}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">{product.description}</p>
              <div className="mt-5">{swatches}</div>
              <p className="mt-4 text-xs text-muted-foreground">
                {soldOut ? "Out of stock — join the restock list" : `Only ${product.stock} left`}
              </p>
              <div className="mt-5 flex gap-3">
                <Button
                  className="flex-1"
                  disabled={soldOut}
                  onClick={() => {
                    addToCart({ slug: product.slug, size, color, qty: 1 });
                    setQuick(false);
                    toast.success(`${product.name} added to bag`);
                  }}
                >
                  Add to bag
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/product/$slug" params={{ slug: product.slug }}>
                    Full details
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </article>
  );
}

function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "w-fit bg-primary px-2 py-1 text-[0.6rem] tracking-[0.16em] uppercase text-primary-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
