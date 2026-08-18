# Boutique Brilliance

# Women's & Girls' Boutique — E-Commerce Website Build Checklist

> Reference: **vrajbhoomi.in** — an Ahmedabad-based ethnic-wear boutique (kurtas, co-ords, dupattas, kaftans, footwear, accessories) built on **Shopify**, with a strong handcrafted/sustainable brand story. Notable things it does that are worth borrowing:

> - Sticky announcement bar with a first-order discount code

> - Multi-currency selector (INR/USD/GBP/EUR/etc.) — relevant if she expects NRI/international buyers

> - Wishlist icon in the header

> - Product cards with **hover image swap**, inline **size/color swatches**, and a **"Quick view"** popup right from the catalog grid — no need to open the full product page just to pick a size

> - Homepage sections: hero banner → "New In" collection callout → bestseller carousel → category tiles ("Bags & Pouches", "Footwear", "Wall Art", "Jewellery") → "Now Back" (restocked items) → brand story ("Our Studio") → press mentions ("As Seen In" logos) → customer testimonial gallery → brand values grid (e.g. "Pure Cotton", "Plant Dyes") → newsletter signup

> - A floating **WhatsApp chat button** (very common and effective for Indian D2C brands)

> - Dedicated **Track Your Order** page and a self-serve **Initiate Exchange/Return** flow (they use a Shopify app called EcoReturns for this)

> - A **Wholesale/B2B inquiry** page, separate from the retail store

> - Footer policy pages: Shipping & Return, Product Care, FAQ, Terms, Careers

I've woven these into the checklist below as optional-but-recommended items, marked **(from reference)**.

---

## 1. Planning & Setup

- [ ] Define target audience segments (women / girls / age groups)

- [ ] Finalize brand name, logo, color palette, fonts

- [ ] List initial product categories (e.g., ethnic wear, western wear, kidswear, accessories, footwear)

- [ ] Decide domain name & register it

- [ ] Choose tech stack (see Section 12)

- [ ] Decide hosting (Vercel/Netlify for frontend, Railway/Render/AWS for backend, or a full-stack host)

- [ ] Set up Git repo + basic project structure

- [ ] Plan for mobile-first design (most boutique shoppers browse on phone)

## 2. Home Page

- [ ] Announcement bar (free shipping above ₹X, festive sale, first-order coupon code) **(from reference)**

- [ ] Hero banner / carousel (seasonal offers, new arrivals)

- [ ] Featured/trending products section

- [ ] Category tiles (shop by category — Women / Girls / Sale, etc.)

- [ ] New arrivals section

- [ ] Best sellers section

- [ ] "Back in stock" / restocked-items section **(from reference)**

- [ ] Brand story section (who your sister is, her studio/process, why she started this) **(from reference)**

- [ ] Press/"As seen in" logo strip, if she's been featured anywhere **(from reference, optional early on)**

- [ ] Testimonials / customer reviews highlight

- [ ] Brand values grid (e.g. materials used, handmade, sustainability angle) **(from reference)**

- [ ] Newsletter signup / WhatsApp updates opt-in

- [ ] Floating WhatsApp chat button **(from reference — very effective for India-based D2C)**

- [ ] Footer: About, Contact, Policies, Social links, Payment icons

## 3. Catalog / Listing Pages

- [ ] Grid/list view toggle

- [ ] Filters: size, color, price range, fabric, occasion, category

- [ ] Sort options: price, popularity, newest, rating

- [ ] Pagination or infinite scroll

- [ ] Hover-to-swap product image on card **(from reference)**

- [ ] Inline size/color swatches on the product card, no click-through needed **(from reference)**

- [ ] "Quick View" popup — see full details/add to cart without leaving the grid **(from reference)**

- [ ] Wishlist icon on each card

- [ ] Out-of-stock indication

- [ ] Breadcrumb navigation

- [ ] SEO-friendly URLs per category

## 4. Product View Page

- [ ] Multiple product images + zoom/gallery

- [ ] Size chart / size guide

- [ ] Color/variant selector

- [ ] Price, discount %, stock availability

- [ ] Add to Cart / Buy Now

- [ ] Wishlist / Save for later

- [ ] Product description, fabric/material details, care instructions

- [ ] Delivery estimate by pincode

- [ ] Return/exchange policy summary

- [ ] Related products / "You may also like"

- [ ] Share product (social/WhatsApp)

## 5. Reviews & Comments

- [ ] Star rating + written review submission

- [ ] Photo upload with reviews (optional but great for boutique/fashion)

- [ ] Verified purchase tag

- [ ] Review moderation (admin approval before publish, spam filter)

- [ ] Sort/filter reviews (most recent, highest rated)

- [ ] Q&A section on product page (optional)

## 6. Cart & Checkout

- [ ] Persistent cart (saved even if user leaves)

- [ ] Update quantity / remove items in cart

- [ ] Apply coupon/discount code

- [ ] Guest checkout option (in addition to login)

- [ ] Address form with pincode-based serviceability check

- [ ] Order summary before payment

- [ ] Order confirmation page + email/SMS

## 7. Authentication — OTP Login

- [ ] Mobile number + OTP login flow (SMS via provider like MSG91, Twilio, Firebase Auth)

- [ ] Resend OTP with cooldown timer

- [ ] OTP expiry handling

- [ ] Optional email/password or Google login as alternative

- [ ] Session/token management (JWT or similar)

- [ ] Rate limiting on OTP requests (prevent abuse/spam)

- [ ] User profile page (saved addresses, order history, wishlist)

## 8. Payments & COD

- [ ] Integrate a payment gateway (Razorpay / PayU / Cashfree / Stripe depending on region)

- [ ] Support UPI, cards, netbanking, wallets

- [ ] Cash on Delivery (COD) option with:

  - [ ] COD availability check by pincode

  - [ ] COD order limit (amount cap) to reduce fake orders

  - [ ] OTP verification for COD orders (reduce return abuse)

- [ ] Payment failure/retry handling

- [ ] Refund flow for cancellations/returns

- [ ] Invoice generation (PDF)

## 9. Delivery & Order Tracking

- [ ] Integrate shipping partner/aggregator (Shiprocket, Delhivery, iThink Logistics, etc.)

- [ ] Auto pincode serviceability check at checkout

- [ ] Order status flow: Placed → Confirmed → Shipped → Out for Delivery → Delivered

- [ ] Tracking ID + carrier tracking link

- [ ] SMS/email/WhatsApp notifications on status change

- [ ] Order cancellation window

- [ ] Dedicated "Track Your Order" page (order ID + phone/email lookup) **(from reference)**

- [ ] Self-serve Return/Exchange request flow (either build it or use a plug-in service like EcoReturns/ClickPost if on Shopify) **(from reference)**

## 10. Admin Panel (for your sister to manage the store)

- [ ] Product management (add/edit/delete, bulk upload via CSV)

- [ ] Inventory & stock management, low-stock alerts

- [ ] Order management dashboard

- [ ] Customer management

- [ ] Coupon/discount management

- [ ] Banner/homepage content management (no-code editing of hero images etc.)

- [ ] Reviews moderation

- [ ] Sales analytics/reports (revenue, top products, returns)

- [ ] Role-based access (if more than one admin/staff)

## 11. Trust, Legal & Support

- [ ] About Us page

- [ ] Contact page (WhatsApp click-to-chat is popular for boutiques)

- [ ] Privacy Policy

- [ ] Terms & Conditions

- [ ] Shipping & Return Policy (reference site combines these into one page)

- [ ] Product Care page (fabric/handling instructions) **(from reference — nice touch for artisanal/fabric-heavy products)**

- [ ] FAQ page

- [ ] Careers page (only if she plans to hire)

- [ ] Wholesale/B2B inquiry page (only if she plans to sell to retailers too) **(from reference, optional)**

- [ ] Customer support chat widget (optional: Tawk.to, WhatsApp Business API)

## 12. Tech Stack Suggestions

- [ ] Frontend: React/Next.js (SEO-friendly, fast) or Shopify/WooCommerce if you want less custom dev

- [ ] Backend: Node.js/Express or Django, with REST/GraphQL API

- [ ] Database: PostgreSQL or MongoDB

- [ ] Image storage/CDN: Cloudinary or AWS S3 + CloudFront

- [ ] SMS/OTP: Firebase Auth, MSG91, or Twilio Verify

- [ ] Payment: Razorpay (great COD + UPI support in India) or regional equivalent

- [ ] Shipping: Shiprocket (aggregates many couriers, has tracking APIs)

- [ ] Hosting: Vercel (frontend) + Railway/Render (backend) or a managed platform

> If budget/time is tight, consider starting on **Shopify** or **WooCommerce (WordPress)** — both have ready plugins for OTP login, COD, reviews, and shipment tracking, and can get an MVP live in days instead of months. Custom build gives more control/branding but takes longer.

>

> Worth noting: **vrajbhoomi.in is itself built on Shopify**, and it already has essentially the full feature set you listed (OTP-style login via Shopify Customer Accounts, COD via checkout rules, reviews app, quick-view/wishlist apps, WhatsApp chat, order tracking, EcoReturns for returns) — all achieved through Shopify + a handful of apps, no custom backend. If close visual/functional similarity to this site is the goal, Shopify is likely the fastest and lowest-risk path. A custom-coded site makes more sense only if she needs something Shopify's app ecosystem genuinely can't do, or you want zero platform fees long-term.

## 13. SEO & Marketing Readiness

- [ ] SEO meta titles/descriptions per product & category

- [ ] Sitemap.xml & robots.txt

- [ ] Structured data (schema.org Product markup for rich search results)

- [ ] Google Analytics / Meta Pixel integration

- [ ] Instagram/Facebook shop feed integration (huge for boutique brands)

- [ ] Mobile page speed optimization (compressed images, lazy loading)

## 14. Testing & Launch

- [ ] Cross-browser & cross-device testing

- [ ] Test full OTP login flow

- [ ] Test payment gateway in sandbox + live mode

- [ ] Test COD order flow end-to-end

- [ ] Load testing for sale-day traffic spikes

- [ ] SSL certificate (https) enabled

- [ ] Soft launch / beta test with a small user group

- [ ] Backup & rollback plan before go-live

---

**Next step suggestion:** Decide early between (a) fully custom build vs (b) Shopify/WooCommerce with plugins — this single decision changes your entire timeline and budget, so it's worth locking down before writing any code.

+ add checlist for the admin ppages.

do the most possible. if you run out of token complete the most and give the pending list will do it after sometime

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d693c903-9f94-4953-b1d3-e6db36dc7d3e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
