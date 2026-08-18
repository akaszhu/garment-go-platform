import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PageHeader } from "@/components/site/Page";
import { inr } from "@/data/catalog";
import { COD_LIMIT, checkPincode } from "@/lib/pincode";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/_site/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Aanchal" },
      { name: "description", content: "Secure checkout with UPI, cards, netbanking and cash on delivery." },
      { property: "og:title", content: "Checkout — Aanchal" },
      { property: "og:description", content: "Secure checkout for your handcrafted cotton order." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

const COUPONS: Record<string, number> = { FIRSTTEN: 0.1, AANCHAL15: 0.15 };

function CheckoutPage() {
  const { lines, subtotal, clearCart } = useShop();
  const [coupon, setCoupon] = useState("");
  const [discountRate, setDiscountRate] = useState(0);
  const [pin, setPin] = useState("");
  const [payment, setPayment] = useState("upi");
  const [gift, setGift] = useState(false);
  const [placed, setPlaced] = useState<string | null>(null);

  const pinInfo = pin.length === 6 ? checkPincode(pin) : null;
  const codAllowed = (pinInfo?.cod ?? true) && subtotal <= COD_LIMIT;
  const discount = Math.round(subtotal * discountRate);
  const shipping = subtotal >= 1999 ? 0 : 99;
  const total = Math.max(0, subtotal - discount) + shipping + (gift ? 79 : 0);

  if (placed) {
    return (
      <>
        <PageHeader title="Order confirmed" lede="Thank you — your parcel is being packed by hand." />
        <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
          <p className="eyebrow">Order number</p>
          <p className="mt-2 text-3xl">{placed}</p>
          <p className="mt-4 text-sm text-muted-foreground">
            A confirmation has been sent to your email and WhatsApp. Dispatch from Ahmedabad in 1–2
            working days, with tracking as soon as it leaves the studio.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button asChild><Link to="/track-order">Track order</Link></Button>
            <Button asChild variant="outline"><Link to="/shop">Continue shopping</Link></Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader title="Checkout" lede="Three steps — contact, address, payment." />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_340px]">
        <form
          className="space-y-10"
          onSubmit={(e) => {
            e.preventDefault();
            if (lines.length === 0) {
              toast.error("Your bag is empty");
              return;
            }
            const id = `AAN-${Math.floor(100000 + Math.random() * 899999)}`;
            clearCart();
            setPlaced(id);
          }}
        >
          <section>
            <h2 className="text-2xl">1 · Contact</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field id="email" label="Email" type="email" required />
              <Field id="phone" label="Mobile number" type="tel" required />
            </div>
          </section>

          <section>
            <h2 className="text-2xl">2 · Shipping address</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field id="first" label="First name" required />
              <Field id="last" label="Last name" required />
              <div className="sm:col-span-2">
                <Label htmlFor="addr">Address</Label>
                <Textarea id="addr" required className="mt-1.5" rows={3} />
              </div>
              <Field id="city" label="City" required />
              <Field id="state" label="State" required />
              <div>
                <Label htmlFor="pin">PIN code</Label>
                <Input
                  id="pin"
                  className="mt-1.5"
                  maxLength={6}
                  inputMode="numeric"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  required
                />
                {pinInfo && (
                  <p className="mt-1.5 text-xs text-muted-foreground">{pinInfo.message}</p>
                )}
              </div>
              <Field id="country" label="Country" defaultValue="India" required />
            </div>
            <label className="mt-4 flex items-center gap-2 text-sm">
              <input type="checkbox" checked={gift} onChange={(e) => setGift(e.target.checked)} />
              Add hand-tied gift wrap and a note card (+₹79)
            </label>
          </section>

          <section>
            <h2 className="text-2xl">3 · Payment</h2>
            <RadioGroup value={payment} onValueChange={setPayment} className="mt-4 space-y-3">
              {[
                { v: "upi", l: "UPI — GPay, PhonePe, Paytm" },
                { v: "card", l: "Credit / Debit card" },
                { v: "netbanking", l: "Netbanking" },
                { v: "wallet", l: "Wallets" },
                { v: "cod", l: `Cash on Delivery${codAllowed ? "" : " — unavailable for this order"}` },
              ].map((o) => (
                <label
                  key={o.v}
                  className="flex items-center gap-3 border border-border p-3 text-sm"
                >
                  <RadioGroupItem value={o.v} disabled={o.v === "cod" && !codAllowed} />
                  {o.l}
                </label>
              ))}
            </RadioGroup>
            <p className="mt-3 text-xs text-muted-foreground">
              Demo checkout — no payment is actually processed. Connect a gateway before going live.
            </p>
          </section>

          <Button type="submit" size="lg" className="w-full">
            Place order · {inr(total)}
          </Button>
        </form>

        <aside className="h-fit border border-border p-6">
          <p className="eyebrow">Your order</p>
          <ul className="mt-4 space-y-3 text-sm">
            {lines.map((l) => (
              <li key={`${l.slug}-${l.size}-${l.color}`} className="flex justify-between gap-3">
                <span className="text-muted-foreground">
                  {l.product.name} × {l.qty}
                  <br />
                  <span className="text-xs">{l.size} · {l.color}</span>
                </span>
                <span>{inr(l.product.price * l.qty)}</span>
              </li>
            ))}
            {lines.length === 0 && <li className="text-muted-foreground">Your bag is empty.</li>}
          </ul>

          <div className="mt-5 flex gap-2">
            <Input
              placeholder="Coupon code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value.toUpperCase())}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                const rate = COUPONS[coupon];
                if (rate) {
                  setDiscountRate(rate);
                  toast.success(`${coupon} applied — ${rate * 100}% off`);
                } else {
                  setDiscountRate(0);
                  toast.error("That code isn't valid");
                }
              }}
            >
              Apply
            </Button>
          </div>

          <dl className="mt-5 space-y-2 border-t border-border pt-4 text-sm text-muted-foreground">
            <div className="flex justify-between"><dt>Subtotal</dt><dd>{inr(subtotal)}</dd></div>
            {discount > 0 && (
              <div className="flex justify-between text-primary"><dt>Discount</dt><dd>−{inr(discount)}</dd></div>
            )}
            <div className="flex justify-between"><dt>Shipping</dt><dd>{shipping === 0 ? "Free" : inr(shipping)}</dd></div>
            {gift && <div className="flex justify-between"><dt>Gift wrap</dt><dd>{inr(79)}</dd></div>}
            <div className="flex justify-between border-t border-border pt-2 font-semibold text-foreground">
              <dt>Total</dt><dd>{inr(total)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </>
  );
}

function Field({
  id,
  label,
  type = "text",
  required,
  defaultValue,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} required={required} defaultValue={defaultValue} className="mt-1.5" />
    </div>
  );
}
