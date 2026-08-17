import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { LayoutGrid, Rows3, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductCard } from "@/components/shop/ProductCard";
import { categories, products, type Product } from "@/data/catalog";
import { cn } from "@/lib/utils";

type Search = {
  category?: string;
  audience?: string;
  tag?: string;
  sort?: string;
};

export const Route = createFileRoute("/_site/shop")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    category: typeof s.category === "string" ? s.category : undefined,
    audience: typeof s.audience === "string" ? s.audience : undefined,
    tag: typeof s.tag === "string" ? s.tag : undefined,
    sort: typeof s.sort === "string" ? s.sort : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop All — Handcrafted Cotton Wear | Aanchal" },
      {
        name: "description",
        content:
          "Browse hand block-printed kurta sets, co-ords, dupattas, kaftans, girls' wear, juttis and accessories. Filter by size, colour, fabric and occasion.",
      },
      { property: "og:title", content: "Shop All — Aanchal Handcraft Boutique" },
      {
        property: "og:description",
        content: "Small-batch cotton pieces for women and girls, filterable by size and fabric.",
      },
    ],
  }),
  component: Shop,
});

const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "Free Size", "One Size"];
const FABRICS = [...new Set(products.map((p) => p.fabric))];
const OCCASIONS = [...new Set(products.map((p) => p.occasion))];
const COLORS = [...new Map(products.flatMap((p) => p.colors).map((c) => [c.name, c])).values()];
const PER_PAGE = 8;

function Shop() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [fabrics, setFabrics] = useState<string[]>([]);
  const [occasions, setOccasions] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const sort = search.sort ?? "newest";

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (search.category && p.category !== search.category) return false;
      if (search.audience && p.audience !== search.audience) return false;
      if (search.tag && !p.tags.includes(search.tag as Product["tags"][number])) return false;
      if (sizes.length && !p.sizes.some((s) => sizes.includes(s))) return false;
      if (colors.length && !p.colors.some((c) => colors.includes(c.name))) return false;
      if (fabrics.length && !fabrics.includes(p.fabric)) return false;
      if (occasions.length && !occasions.includes(p.occasion)) return false;
      if (p.price > maxPrice) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "popular") return b.reviewCount - a.reviewCount;
      return b.createdAt.localeCompare(a.createdAt);
    });
    return list;
  }, [search, sizes, colors, fabrics, occasions, maxPrice, sort]);

  const visible = filtered.slice(0, page * PER_PAGE);
  const activeCategory = categories.find((c) => c.slug === search.category);

  const toggle = (
    value: string,
    list: string[],
    set: (v: string[]) => void,
  ) => set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  return (
    <>
      <header className="border-b border-border bg-[var(--sand)] paper">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <nav className="mb-3 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>{" "}
            / <Link to="/shop" className="hover:text-primary">Shop</Link>
            {activeCategory && (
              <>
                {" "}/ <span className="text-foreground">{activeCategory.name}</span>
              </>
            )}
          </nav>
          <h1 className="text-4xl md:text-5xl">{activeCategory?.name ?? "Shop All"}</h1>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            {activeCategory?.blurb ??
              "Everything we currently have on the shelf — printed, dyed and finished by hand."}
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[240px_1fr]">
        {/* Filters */}
        <aside className={cn("space-y-7", !showFilters && "hidden lg:block")}>
          <FilterGroup title="Category">
            {categories.map((c) => (
              <Link
                key={c.slug}
                to="/shop"
                search={(prev) => ({ ...prev, category: c.slug })}
                className={cn(
                  "block py-1 text-sm hover:text-primary",
                  search.category === c.slug && "font-semibold text-primary",
                )}
              >
                {c.name}
              </Link>
            ))}
            <Link
              to="/shop"
              search={{}}
              className="mt-2 block text-xs underline underline-offset-4"
            >
              Clear category
            </Link>
          </FilterGroup>

          <FilterGroup title="Size">
            <div className="flex flex-wrap gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => toggle(s, sizes, setSizes)}
                  className={cn(
                    "border border-border px-2 py-1 text-xs hover:border-primary",
                    sizes.includes(s) && "border-primary bg-primary text-primary-foreground",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title="Colour">
            <div className="flex flex-wrap gap-2">
              {COLORS.map((c) => (
                <button
                  key={c.name}
                  aria-label={c.name}
                  onClick={() => toggle(c.name, colors, setColors)}
                  className={cn(
                    "h-6 w-6 rounded-full border border-border",
                    colors.includes(c.name) && "ring-2 ring-primary ring-offset-2",
                  )}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title={`Price · up to ₹${maxPrice}`}>
            <Slider
              value={[maxPrice]}
              min={500}
              max={5000}
              step={100}
              onValueChange={([v]) => setMaxPrice(v ?? 5000)}
            />
          </FilterGroup>

          <FilterGroup title="Fabric">
            {FABRICS.map((f) => (
              <label key={f} className="flex items-center gap-2 py-1 text-sm">
                <Checkbox
                  checked={fabrics.includes(f)}
                  onCheckedChange={() => toggle(f, fabrics, setFabrics)}
                />
                {f}
              </label>
            ))}
          </FilterGroup>

          <FilterGroup title="Occasion">
            {OCCASIONS.map((o) => (
              <label key={o} className="flex items-center gap-2 py-1 text-sm">
                <Checkbox
                  checked={occasions.includes(o)}
                  onCheckedChange={() => toggle(o, occasions, setOccasions)}
                />
                {o}
              </label>
            ))}
          </FilterGroup>
        </aside>

        {/* Grid */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
            <p className="text-sm text-muted-foreground">{filtered.length} pieces</p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden"
                onClick={() => setShowFilters((v) => !v)}
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
              </Button>
              <div className="hidden overflow-hidden border border-border sm:flex">
                <button
                  aria-label="Grid view"
                  onClick={() => setView("grid")}
                  className={cn("p-2", view === "grid" && "bg-secondary")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  aria-label="List view"
                  onClick={() => setView("list")}
                  className={cn("p-2", view === "list" && "bg-secondary")}
                >
                  <Rows3 className="h-4 w-4" />
                </button>
              </div>
              <Select
                value={sort}
                onValueChange={(v) => navigate({ search: (prev) => ({ ...prev, sort: v }) })}
              >
                <SelectTrigger className="h-9 w-[170px] text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest first</SelectItem>
                  <SelectItem value="popular">Most popular</SelectItem>
                  <SelectItem value="rating">Highest rated</SelectItem>
                  <SelectItem value="price-asc">Price: low to high</SelectItem>
                  <SelectItem value="price-desc">Price: high to low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {visible.length === 0 ? (
            <p className="py-20 text-center text-sm text-muted-foreground">
              Nothing matches those filters yet. Try widening the price or size range.
            </p>
          ) : (
            <div
              className={cn(
                "mt-8 grid gap-x-6 gap-y-12",
                view === "grid" ? "sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1",
              )}
            >
              {visible.map((p) => (
                <ProductCard key={p.id} product={p} view={view} />
              ))}
            </div>
          )}

          {visible.length < filtered.length && (
            <div className="mt-12 text-center">
              <Button variant="outline" size="lg" onClick={() => setPage((p) => p + 1)}>
                Load more ({filtered.length - visible.length} left)
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow mb-3">{title}</p>
      {children}
    </div>
  );
}
