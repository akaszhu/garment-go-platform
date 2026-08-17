import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";

const columns: { title: string; links: { to: string; label: string }[] }[] = [
  {
    title: "Shop",
    links: [
      { to: "/shop", label: "All Products" },
      { to: "/wishlist", label: "Wishlist" },
      { to: "/cart", label: "Cart" },
      { to: "/account", label: "My Account" },
    ],
  },
  {
    title: "Help",
    links: [
      { to: "/track-order", label: "Track Your Order" },
      { to: "/returns", label: "Exchange / Return" },
      { to: "/shipping-returns", label: "Shipping & Returns" },
      { to: "/product-care", label: "Product Care" },
      { to: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Studio",
    links: [
      { to: "/about", label: "Our Story" },
      { to: "/contact", label: "Contact" },
      { to: "/wholesale", label: "Wholesale / B2B" },
      { to: "/careers", label: "Careers" },
    ],
  },
  {
    title: "Legal",
    links: [
      { to: "/privacy", label: "Privacy Policy" },
      { to: "/terms", label: "Terms & Conditions" },
      { to: "/shipping-returns", label: "Refund Policy" },
    ],
  },
];

export function Newsletter() {
  const [email, setEmail] = useState("");
  return (
    <section className="border-y border-border bg-[var(--sand)] paper">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-center">
        <div>
          <p className="eyebrow">Letters from the studio</p>
          <h2 className="mt-3 text-3xl md:text-4xl">
            New prints, restocks and quiet sales — first.
          </h2>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            One email a fortnight. Opt in to WhatsApp updates for drop reminders.
          </p>
        </div>
        <form
          className="flex flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
              toast.error("Please enter a valid email address.");
              return;
            }
            toast.success("You're on the list. Watch your inbox for FIRSTTEN.");
            setEmail("");
          }}
        >
          <Input
            type="email"
            value={email}
            maxLength={255}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            aria-label="Email address"
            className="h-12 bg-background"
          />
          <Button type="submit" size="lg" className="h-12 px-8">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-[var(--indigo-ink)] text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div>
          <p className="font-display text-3xl">Aanchal</p>
          <p className="mt-3 max-w-xs text-sm opacity-80">
            A small handcraft boutique in Ahmedabad. Block prints, plant dyes and pure cotton
            for women and girls.
          </p>
          <div className="mt-5 flex gap-3">
            <a href="https://instagram.com" aria-label="Instagram" className="opacity-80 hover:opacity-100">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://facebook.com" aria-label="Facebook" className="opacity-80 hover:opacity-100">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="https://youtube.com" aria-label="YouTube" className="opacity-80 hover:opacity-100">
              <Youtube className="h-5 w-5" />
            </a>
          </div>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-[0.7rem] tracking-[0.24em] uppercase opacity-70">{col.title}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="opacity-85 hover:opacity-100 hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-xs opacity-75 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} Aanchal Handcraft Boutique. GSTIN 24ABCDE1234F1Z5.</p>
          <p>UPI · Visa · Mastercard · RuPay · Net Banking · Cash on Delivery</p>
        </div>
      </div>
    </footer>
  );
}
