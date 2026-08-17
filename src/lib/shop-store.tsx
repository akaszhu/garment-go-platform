import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "@/data/catalog";

export type CartLine = {
  slug: string;
  size: string;
  color: string;
  qty: number;
};

type ShopState = {
  cart: CartLine[];
  wishlist: string[];
  addToCart: (line: CartLine) => void;
  setQty: (index: number, qty: number) => void;
  removeLine: (index: number) => void;
  clearCart: () => void;
  toggleWish: (slug: string) => void;
  isWished: (slug: string) => boolean;
  cartCount: number;
  subtotal: number;
  lines: (CartLine & { product: Product })[];
};

const ShopContext = createContext<ShopState | null>(null);
const KEY = "aanchal.shop.v1";

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setCart(parsed.cart ?? []);
        setWishlist(parsed.wishlist ?? []);
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(KEY, JSON.stringify({ cart, wishlist }));
  }, [cart, wishlist, hydrated]);

  const value = useMemo<ShopState>(() => {
    const lines = cart
      .map((l) => ({ ...l, product: products.find((p) => p.slug === l.slug)! }))
      .filter((l) => Boolean(l.product));
    return {
      cart,
      wishlist,
      lines,
      cartCount: cart.reduce((s, l) => s + l.qty, 0),
      subtotal: lines.reduce((s, l) => s + l.product.price * l.qty, 0),
      addToCart: (line) =>
        setCart((prev) => {
          const i = prev.findIndex(
            (l) => l.slug === line.slug && l.size === line.size && l.color === line.color,
          );
          if (i === -1) return [...prev, line];
          const next = [...prev];
          next[i] = { ...next[i], qty: next[i].qty + line.qty };
          return next;
        }),
      setQty: (index, qty) =>
        setCart((prev) =>
          prev.map((l, i) => (i === index ? { ...l, qty: Math.max(1, qty) } : l)),
        ),
      removeLine: (index) => setCart((prev) => prev.filter((_, i) => i !== index)),
      clearCart: () => setCart([]),
      toggleWish: (slug) =>
        setWishlist((prev) =>
          prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
        ),
      isWished: (slug) => wishlist.includes(slug),
    };
  }, [cart, wishlist]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}
