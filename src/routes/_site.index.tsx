import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import hero from "@/assets/hero.jpg";
import studio from "@/assets/studio.jpg";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/shop/ProductCard";
import { Stars } from "@/components/shop/Stars";
import {
  brandValues,
  byTag,
  categories,
  products,
  testimonials,
} from "@/data/catalog";

export const Route = createFileRoute("/_site/")({
  head: () => ({
    meta: [
      { title: "Aanchal — Hand Block-Printed Boutique for Women & Girls" },
      {
        name: "description",
        content:
          "Handcrafted kurta sets, co-ords, dupattas and accessories in pure cotton and plant dyes. Made in Ahmedabad, shipped across India and worldwide.",
      },
      { property: "og:title", content: "Aanchal — Handcraft Boutique for Women & Girls" },
      {
        property: "og:description",
        content:
          "Small-batch block prints, plant dyes and pure cotton. Free shipping in India above ₹1,999.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const newIn = byTag("new");
  const bestsellers = byTag("bestseller");
  const restocked = byTag("restocked");

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <img
          src={hero}
          alt="Woman wearing a hand block-printed cotton kurta set in a sunlit courtyard"
          width={1600}
          height={1104}
          className="h-[70vh] min-h-[460px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
        <div className="absolute inset-0">
          <div className="mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6">
            <div className="max-w-xl">
              <p className="eyebrow">Monsoon Collection 2026</p>
              <h1 className="mt-4 text-5xl leading-[1.05] md:text-7xl">
                Hand printed,
                <br />
                plant dyed,
                <br />
                made to be lived in.
              </h1>
              <p className="mt-5 max-w-md text-muted-foreground">
                Small-batch cotton pieces for women and girls, printed metre by metre in our
                Ahmedabad studio.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" asChild>
                  <Link to="/shop">Shop the collection</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/about">Meet the studio</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New In callout */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 text-center sm:grid-cols-3 sm:px-6 sm:text-left">
          {[
            ["Free shipping", "On all India orders above ₹1,999"],
            ["Easy exchange", "7-day self-serve size exchange"],
            ["Cash on Delivery", "Available on most PIN codes"],
          ].map(([t, s]) => (
            <div key={t}>
              <p className="text-sm font-semibold">{t}</p>
              <p className="text-xs text-muted-foreground">{s}</p>
            </div>
          ))}
        </div>
      </section>

      <Section
        eyebrow="Just arrived"
        title="New In"
        href="/shop"
        hrefLabel="See everything new"
        items={newIn}
      />

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <p className="eyebrow">Shop by category</p>
        <h2 className="mt-2 text-3xl md:text-4xl">Find your kind of handmade</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/shop"
              search={{ category: c.slug }}
              className="group relative overflow-hidden"
            >
              <img
                src={c.image}
                alt={c.name}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
              <div className="absolute bottom-0 p-5 text-background">
                <p className="font-display text-2xl">{c.name}</p>
                <p className="text-xs opacity-85">{c.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Section
        eyebrow="Loved most"
        title="Bestsellers"
        href="/shop"
        hrefLabel="Shop bestsellers"
        items={bestsellers}
        tinted
      />

      <Section
        eyebrow="Back on the shelf"
        title="Now Back"
        href="/shop"
        hrefLabel="See restocked pieces"
        items={restocked.length ? restocked : products.slice(0, 4)}
      />

      {/* Brand story */}
      <section className="border-y border-border bg-[var(--sand)]">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 md:grid-cols-2">
          <img
            src={studio}
            alt="Artisan hand block-printing indigo dye onto cotton in the studio"
            loading="lazy"
            width={1200}
            height={900}
            className="w-full object-cover shadow-[var(--shadow-soft)]"
          />
          <div>
            <p className="eyebrow">Our studio</p>
            <h2 className="mt-3 text-4xl">Twelve hands, one long table, no shortcuts.</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Aanchal began in 2021 in a two-room studio off Ashram Road, with one carved teak
              block and a pot of indigo. Today a team of twelve women print, dye, cut and finish
              every piece we sell — in batches small enough that we still know which metre came
              off which table.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              We never blend our cotton, never use azo dyes, and never print more than we can
              sell. That is the whole business plan.
            </p>
            <Button variant="outline" className="mt-7" asChild>
              <Link to="/about">
                Read our story <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Press */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <p className="eyebrow text-center">As seen in</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-60">
          {["VOGUE INDIA", "The Hindu", "Elle", "Architectural Digest", "Verve"].map((n) => (
            <span key={n} className="font-display text-xl tracking-[0.18em] uppercase">
              {n}
            </span>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <p className="eyebrow">Kind words</p>
          <h2 className="mt-2 text-3xl md:text-4xl">4.8 average from 1,240 reviews</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="border border-border bg-background p-6">
                <Stars value={5} />
                <blockquote className="mt-4 text-sm leading-relaxed">“{t.quote}”</blockquote>
                <figcaption className="mt-4 text-xs text-muted-foreground">
                  {t.name} · {t.city}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <p className="eyebrow">Why it costs what it costs</p>
        <h2 className="mt-2 text-3xl md:text-4xl">Our promises</h2>
        <div className="mt-8 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {brandValues.map((v) => (
            <div key={v.title} className="bg-background p-7">
              <p className="font-display text-2xl">{v.title}</p>
              <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Section({
  eyebrow,
  title,
  items,
  href,
  hrefLabel,
  tinted,
}: {
  eyebrow: string;
  title: string;
  items: typeof products;
  href: string;
  hrefLabel: string;
  tinted?: boolean;
}) {
  return (
    <section className={tinted ? "border-y border-border bg-card" : ""}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="mt-2 text-3xl md:text-4xl">{title}</h2>
          </div>
          <Link to={href} className="text-sm underline underline-offset-4 hover:text-primary">
            {hrefLabel}
          </Link>
        </div>
        <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {items.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
