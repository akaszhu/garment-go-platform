import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/site/Page";
import { ProductCard } from "@/components/shop/ProductCard";
import { products } from "@/data/catalog";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/_site/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist — Aanchal" },
      { name: "description", content: "The handcrafted pieces you have saved for later." },
      { property: "og:title", content: "Wishlist — Aanchal" },
      { property: "og:description", content: "Saved pieces from the Aanchal collection." },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist } = useShop();
  const saved = products.filter((p) => wishlist.includes(p.slug));

  return (
    <>
      <PageHeader title="Wishlist" lede="Saved on this device. Batches are small, so don't wait too long." />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        {saved.length === 0 ? (
          <div className="border border-border p-10 text-center">
            <p className="text-sm text-muted-foreground">Nothing saved yet.</p>
            <Button asChild className="mt-4">
              <Link to="/shop">Browse the collection</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {saved.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
