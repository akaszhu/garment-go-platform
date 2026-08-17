import { Link } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useShop } from "@/lib/shop-store";
import { categories } from "@/data/catalog";

const nav = [
  { to: "/shop", label: "Shop All", search: undefined },
  { to: "/shop", label: "New In", search: { tag: "new" } },
  { to: "/shop", label: "Girls", search: { audience: "girls" } },
  { to: "/about", label: "Our Studio", search: undefined },
  { to: "/track-order", label: "Track Order", search: undefined },
];

export function AnnouncementBar() {
  const items = [
    "Flat 10% off your first order — code FIRSTTEN",
    "Free shipping across India above ₹1,999",
    "Handcrafted in Ahmedabad · Shipped worldwide",
  ];
  return (
    <div className="overflow-hidden bg-[var(--indigo-ink)] py-2 text-primary-foreground">
      <div className="marquee flex w-max gap-12 whitespace-nowrap text-[0.7rem] tracking-[0.22em] uppercase">
        {[...items, ...items, ...items, ...items].map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </div>
  );
}

export function Header() {
  const { cartCount, wishlist } = useShop();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="lg:hidden" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetTitle className="font-display text-2xl">Aanchal</SheetTitle>
            <nav className="mt-6 flex flex-col gap-1">
              {nav.map((n) => (
                <Link
                  key={n.label}
                  to={n.to}
                  search={n.search as never}
                  onClick={() => setOpen(false)}
                  className="rounded-sm px-2 py-2 text-sm hover:bg-secondary"
                >
                  {n.label}
                </Link>
              ))}
              <div className="mt-4 eyebrow">Categories</div>
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  to="/shop"
                  search={{ category: c.slug }}
                  onClick={() => setOpen(false)}
                  className="rounded-sm px-2 py-2 text-sm hover:bg-secondary"
                >
                  {c.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <Link to="/" className="mr-auto lg:mr-0">
          <span className="font-display text-2xl leading-none tracking-tight">Aanchal</span>
          <span className="hidden text-[0.6rem] tracking-[0.3em] uppercase text-muted-foreground sm:block">
            Handcraft Boutique
          </span>
        </Link>

        <nav className="mx-auto hidden items-center gap-7 text-sm lg:flex">
          {nav.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              search={n.search as never}
              className="relative py-1 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-3">
          <Select defaultValue="INR">
            <SelectTrigger className="hidden h-8 w-[86px] border-none bg-transparent text-xs shadow-none sm:flex">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["INR", "USD", "GBP", "EUR", "AED"].map((c) => (
                <SelectItem key={c} value={c} className="text-xs">
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Link to="/shop" aria-label="Search" className="p-2 hover:text-primary">
            <Search className="h-[18px] w-[18px]" />
          </Link>
          <Link to="/account" aria-label="Account" className="p-2 hover:text-primary">
            <User className="h-[18px] w-[18px]" />
          </Link>
          <Link to="/wishlist" aria-label="Wishlist" className="relative p-2 hover:text-primary">
            <Heart className="h-[18px] w-[18px]" />
            {wishlist.length > 0 && <Dot n={wishlist.length} />}
          </Link>
          <Link to="/cart" aria-label="Cart" className="relative p-2 hover:text-primary">
            <ShoppingBag className="h-[18px] w-[18px]" />
            {cartCount > 0 && <Dot n={cartCount} />}
          </Link>
        </div>
      </div>
    </header>
  );
}

function Dot({ n }: { n: number }) {
  return (
    <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[0.6rem] font-semibold text-primary-foreground">
      {n}
    </span>
  );
}
