# FerryBooking — Jubilant Infrastructure

A premium ferry ticket booking platform built with **React + TypeScript + Vite** (frontend) and **Node.js + Razorpay** (backend/serverless). Supports dual payment modes: **Razorpay** (cards, netbanking, wallets) and **UPI QR Code** (Google Pay, PhonePe, Paytm, BHIM).

---

## 📑 Table of Contents

1. [Website Architecture](#-website-architecture)
2. [Route Map](#-route-map)
3. [UI Overview — All Pages](#-ui-overview--all-pages)
   - [Navbar (Global)](#navbar-global)
   - [Footer (Global)](#footer-global)
   - [Home Page (`/`)](#home-page-)
   - [About Page (`/about`)](#about-page-about)
   - [Payment Page (`/payment`)](#payment-page-payment)
   - [Ticket Page (`/ticket`)](#ticket-page-ticket)
   - [Validate Ticket (`/validate`)](#validate-ticket-validate)
   - [Admin Pages (`/admin/login`, `/admin/dashboard`)](#admin-pages-admin)
   - [404 Not Found](#404-not-found)
4. [Payment Integration](#-payment-integration)
   - [Razorpay (Card / Netbanking / Wallet)](#razorpay-card--netbanking--wallet)
   - [UPI QR Code](#upi-qr-code)
5. [Price Calculation](#-price-calculation)
6. [Animations & Transitions](#-animations--transitions)
7. [Environment Variables](#-environment-variables)
8. [Testing](#-testing)
9. [Dependencies](#-dependencies)
10. [Deployment](#-deployment)
11. [Production Migration Checklist](#-production-migration-checklist)

---

## 🏗 Website Architecture

```
ferry-booking-app/
├── frontend/                          # Vite + React + TypeScript
│   └── src/
│       ├── App.tsx                    # Router setup (wouter)
│       ├── main.tsx                   # Entry point
│       ├── index.css                  # Global styles + Tailwind
│       ├── components/
│       │   ├── layout/
│       │   │   ├── Navbar.tsx         # Global navigation bar
│       │   │   ├── Footer.tsx         # Global footer
│       │   │   └── PageWrapper.tsx    # Wraps pages with Navbar + Footer
│       │   ├── ui/                    # shadcn/ui components
│       │   │   ├── button.tsx
│       │   │   ├── card.tsx
│       │   │   ├── input.tsx
│       │   │   ├── label.tsx
│       │   │   ├── select.tsx
│       │   │   ├── toaster.tsx
│       │   │   └── tooltip.tsx
│       │   └── UPIQRCode.tsx          # UPI QR code payment component
│       ├── pages/
│       │   ├── index.tsx              # Home page (hero + booking + features + routes + FAQ)
│       │   ├── about.tsx              # About page (story + stats + fleet + testimonials)
│       │   ├── payment.tsx            # Payment page (summary + price + method selection)
│       │   ├── ticket.tsx             # Boarding pass / ticket preview
│       │   ├── validate.tsx           # Ticket validation scanner
│       │   ├── not-found.tsx          # 404 page
│       │   └── admin/                 # Admin pages
│       │       ├── login.tsx
│       │       └── dashboard.tsx
│       ├── services/
│       │   ├── razorpay.ts            # Razorpay integration service
│       │   └── mockData.ts            # Mock routes, schedules, vehicles, testimonials, fleet
│       ├── hooks/
│       │   ├── use-mobile.tsx
│       │   └── use-toast.ts
│       ├── lib/
│       │   └── utils.ts               # Utility functions (cn)
│       └── types/
│           └── razorpay.d.ts          # Razorpay TypeScript declarations
├── api/                               # Vercel serverless functions
│   ├── create-order.js                # Creates Razorpay payment order
│   └── verify-payment.js              # Verifies Razorpay payment signature
├── backend/                           # Alternative Express backend
│   ├── index.js                       # Express server
│   └── package.json
├── package.json                       # Root (scripts for dev, build, deploy)
├── vercel.json                        # Vercel deployment config
├── .env.example                       # Environment variables template
└── vite.config.ts                     # Vite configuration with proxy
```

---

## 🗺 Route Map

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `Home` | Landing page with hero, booking form, features, popular routes, FAQ |
| `/about` | `About` | Company story, stats, fleet, testimonials |
| `/payment` | `Payment` | Payment page (query params: from, to, date, passengers, vehicle) |
| `/ticket` | `TicketPreview` | Boarding pass (query params: from, to, date, passengers, vehicle, paymentId, orderId) |
| `/validate` | `ValidateTicket` | Ticket validation scanner |
| `/admin/login` | `AdminLogin` | Admin login panel |
| `/admin/dashboard` | `AdminDashboard` | Admin dashboard |
| `*` | `NotFound` | 404 fallback |

---

## 🎨 UI Overview — All Pages

---

### Navbar (Global)

**File:** `frontend/src/components/layout/Navbar.tsx`

```
┌──────────────────────────────────────────────────────────────┐
│ 🚢 FerryBooking   Home │ About │ Validate Ticket    [👤][Book Now]│
│    from Jubilant                                               │
└──────────────────────────────────────────────────────────────┘
```

**States:**
| State | Behavior |
|-------|----------|
| **Scrolled down** | `bg-background/95 backdrop-blur-lg border-b border-border shadow-sm py-3` |
| **At top (hero pages: `/`, `/about`)** | `bg-transparent py-5` — transparent, white text on dark hero images |
| **At top (non-hero pages)** | `bg-transparent` with dark-adapted text colors |

**Logo:**
- Ship icon in circle + "FerryBooking" (font-serif, bold) + "from Jubilant Infrastructure" subtitle
- Hero pages: white icon/text | Non-hero: teal icon / dark text

**Desktop Nav:**
- Links: Home, About, Validate Ticket
- Active link: primary color + bottom underline (`h-0.5 bg-primary rounded-full`)
- Right side: User icon (links to `/admin/login`) + "Book Now" button (teal, rounded-full)

**Mobile Menu:**
- Hamburger icon → animated dropdown (`AnimatePresence` + height animation)
- Links stack vertically with rounded corners
- Divider + Admin Login + full-width "Book Now" button
- `backdrop-blur-xl bg-background/98`

**Animation:** Slide down from top (`initial: y: -100 → animate: y: 0`, 0.6s)

---

### Footer (Global)

**File:** `frontend/src/components/layout/Footer.tsx`

```
┌──────────────────────────────────────────────────────────────┐
│  🚢 FerryBooking          Explore     Legal        Contact   │
│     from Jubilant        Destinations  Terms &    Gateway of │
│                          Our Fleet     Privacy    India Term.│
│  Premium ocean transport  About Us     Cancell.   +91 22... │
│  platform...              Schedule     Cookie     reservat. │
│                          Validate                          │
│  [Facebook] [Twitter] [Instagram]                            │
├──────────────────────────────────────────────────────────────┤
│ © 2026 FerryBooking — Jubilant Infrastructure Pvt. Ltd.     │
│                                      Mumbai Coastal Ferry    │
└──────────────────────────────────────────────────────────────┘
```

- **Grid:** 4 columns (Brand, Explore, Legal, Contact)
- **Social icons:** Facebook, Twitter, Instagram in circular muted backgrounds
- **Contact details:** MapPin (address), Phone, Mail with teal icons
- **Bottom bar:** Copyright + tagline, border-top separator
- **Colors:** `bg-muted/40`, `border-t border-border`, text `text-muted-foreground`

---

### Home Page (`/`)

**File:** `frontend/src/pages/index.tsx`

#### Section 1: Hero + Booking Card

```
┌──────────────────────────────────────────────────────────────┐
│  [BACKGROUND IMAGE: Gateway of India with dark gradient]     │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  🚢 Mumbai Coastal Ferry Service                       │  │
│  │                                                        │  │
│  │  Journey Beyond                                        │  │
│  │  The Horizon     (gradient text: teal → cyan)          │  │
│  │                                                        │  │
│  │  Premium ferry crossings across Mumbai's coast...      │  │
│  │                                                        │  │
│  │  [Explore Routes]  [View Fleet]                        │  │
│  │                                          ┌──────────┐  │  │
│  │                                          │ 🚢 Book  │  │  │
│  │                                          │  Your    │  │  │
│  │                                          │ Voyage   │  │  │
│  │                                          │          │  │  │
│  │                                          │ From: ──│  │  │
│  │                                          │ To:   ──│  │  │
│  │                                          │ Date: ──│  │  │
│  │                                          │ Pax: ── │  │  │
│  │                                          │ Veh: ── │  │  │
│  │                                          │          │  │  │
│  │                                          │[Search S│  │  │
│  │                                          │ Sched.] │  │  │
│  │                                          └──────────┘  │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

**Hero Background:**
- Image: `/images/gateway.jpg` (Gateway of India)
- Dark overlay: `bg-gradient-to-b from-black/65 via-black/40 to-black/70`
- Teal bottom bleed: `from-primary/20 to-transparent`
- Full viewport height: `min-h-screen`

**Badge:** "Mumbai Coastal Ferry Service" — white/15 bg, backdrop-blur, rounded-full, top

**Heading:**
```
Journey Beyond
The Horizon
```
- "The Horizon" uses `bg-clip-text bg-gradient-to-r from-primary to-cyan-300 text-transparent`
- Font: `font-serif`, sizes: `text-4xl sm:text-5xl md:text-6xl lg:text-7xl`

**Subtitle:** `text-white/80`, max-w-xl, leading-relaxed

**Hero Buttons:**
- "Explore Routes" → solid teal, rounded-full
- "View Fleet" → white/10 bg, white border/30, backdrop-blur-sm, rounded-full

**Booking Card (Right Side):**
- Card: `bg-white/95 backdrop-blur-2xl border-white/40 shadow-2xl`
- Top gradient bar: `from-primary via-cyan-400 to-primary`
- Floating animation: `y: [0, -6, 0]` (gentle bob, 6s loop)
- Title: "Book Your Voyage" with Ship icon
- **Form fields (2-column grid):**
  - From: Select dropdown (populated from routes)
  - To: Select dropdown (disabled until "From" is selected)
  - Date: Input type="date"
  - Passengers: Select (1-6 Pax)
  - Vehicle: Select (populated from vehicles data)
- **Error state:** "No rides available" — red alert card with `bg-destructive/15 border-destructive/30`
- Submit: "Search Schedules" button, full-width, `rounded-xl`, with Search icon

#### Section 2: Features (3 cards)

```
┌──────────────────────────────────────────────────────────────┐
│              The FerryBooking Standard                       │
│  We elevate ocean travel with world-class amenities...       │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ 🛡️ Safety   │  │     ⭐      │  │  ⏰ On-Time │      │
│  │ Uncompromis. │  │  Premium    │  │  Reliabilit. │      │
│  │ Our fleet    │  │  Enjoy      │  │  We pride    │      │
│  │ exceeds...   │  │  spacious   │  │  ourselves   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└──────────────────────────────────────────────────────────────┘
```

- Icons: ShieldCheck, Star, Clock (in teal circles, 12-14md size)
- Cards: `bg-card border-border rounded-2xl p-6 md:p-8 hover:shadow-md`
- Animation: fade in + slide up (staggered 0.2s delay each)
- Background: `bg-background`, `py-16 md:py-24`

#### Section 3: Popular Routes

```
┌──────────────────────────────────────────────────────────────┐
│  Popular Crossings                              [View All]  │
│  Discover our most requested routes...                      │
│                                                              │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐                    │
│  │Daily │  │Daily │  │Daily │  │Daily │                    │
│  │From   │  │From   │  │From   │  │From   │                    │
│  │₹350   │  │₹280   │  │₹420   │  │₹350   │                    │
│  │● Colaba│  │● Gate.│  │● Gate.│  │● Elep.│                    │
│  ││       │  ││       │  ││       │  ││       │                    │
│  │● Eleph.│  │● Cola.│  │● Alib.│  │● Gate.│                    │
│  │        │  │        │  │        │  │        │                    │
│  │⏰ 45m  │  │⏰ 1h   │  │⏰ 1.5h │  │⏰ 50m  │                    │
│  │────────│  │────────│  │────────│  │────────│                    │
│  │Select  │  │Select  │  │Select  │  │Select  │                    │
│  │  Route→│  │  Route→│  │  Route→│  │  Route→│                    │
│  └──────┘  └──────┘  └──────┘  └──────┘                    │
└──────────────────────────────────────────────────────────────┘
```

- Background: `bg-muted/40 border-y border-border`
- Decorative: absolute glow blob `bg-primary/5 blur-[150px]` top-right
- Route cards: 4-column grid, `hover:border-primary/50 hover:shadow-md`
- Route visualization: dot (teal) → dashed line → dot (accent)
- Footer strip: teal bg, hidden by default, slides up on hover (`opacity-0 → 1`, `translate-y-4 → 0`)
- Each card shows: frequency badge, price, route diagram, duration + time

#### Section 4: FAQ

```
┌──────────────────────────────────────────────────────────────┐
│             Frequently Asked Questions                       │
│  Everything you need to know before you sail.               │
│                                                              │
│  ❓ How early should I arrive before departure?          ▶  │
│  ❓ Can I bring my pet on board?                         ▶  │
│  ❓ Is there Wi-Fi available during the crossing?        ▶  │
│  ❓ What if my crossing is delayed due to weather?       ▶  │
└──────────────────────────────────────────────────────────────┘
```

- `FAQItem` component: accordion with `ChevronRight` rotation animation
- Open state: `height: auto`, `opacity: 1`
- Closed state: `height: 0`, `opacity: 0`
- Borders: `border-b border-border` between items

---

### About Page (`/about`)

**File:** `frontend/src/pages/about.tsx`

#### Section 1: Hero

```
┌──────────────────────────────────────────────────────────────┐
│  [BACKGROUND IMAGE: /images/story.png with dark gradient]    │
│                                                              │
│          Navigating the Future of Ocean Travel               │
│                                                              │
│  For over two decades, FerryBooking — Jubilant               │
│  Infrastructure has redefined maritime transport...          │
└──────────────────────────────────────────────────────────────┘
```

- Background: `/images/story.png`
- Overlay: `from-black/60 via-black/40 to-black/75`
- Centered text, `font-serif text-3xl md:text-5xl lg:text-6xl`

#### Section 2: Stats Bar

```
┌──────────────────────────────────────────────────────────────┐
│  1.2M+     │    4    │    12    │    25                     │
│  PASSENGERS│  ACTIVE │  FLEET   │  YEARS                    │
│  YEARLY    │  ROUTES │  VESSELS │  EXPERIENCE               │
└──────────────────────────────────────────────────────────────┘
```

- 4-column grid with `divide-x divide-border`
- Large numbers: `text-3xl md:text-5xl font-bold text-primary`
- Labels: uppercase, tracking-widest, tiny text
- Animation: scale in (staggered)

#### Section 3: Fleet

```
┌──────────────────────────────────────────────────────────────┐
│                     Meet Our Fleet                           │
│  State-of-the-art vessels...                                │
│                                                              │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │ [Vessel    │  │ [Vessel    │  │ [Vessel    │            │
│  │  Image]    │  │  Image]    │  │  Image]    │            │
│  │            │  │            │  │            │            │
│  │  Catamaran │  │  Catamaran │  │  High-Speed│            │
│  │ MV Sea     │  │ MV Ocean   │  │ MV Jet     │            │
│  │ Whisper    │  │ King       │  │ Stream     │            │
│  │ 🚢 Cap: 450│  │ 🚢 Cap: 350│  │ 🚢 Cap: 600│            │
│  └────────────┘  └────────────┘  └────────────┘            │
└──────────────────────────────────────────────────────────────┘
```

- 3-column grid, images scale 1.1x on hover
- Card content overlaps image (`-mt-10 z-10`)
- Type badge: teal rounded-full, `border-primary/20`
- Image gradient overlay: `from-black/60 via-black/20 to-transparent`

#### Section 4: Company Story

```
┌──────────────────────────────────────────────────────────────┐
│  ⚓ Our Story          ┌──────┐ ┌──────┐                    │
│                        │  4   │ │  12  │                    │
│  Built on Mumbai's     │Routes│ │Vessel│                    │
│  Waters                └──────┘ └──────┘                    │
│                        ┌──────┐ ┌──────┐                    │
│  Founded in 1999...     │ 98%  │ │ 1999 │                    │
│                        │On-Time│ │  Est.│                    │
│  Today, we operate...   └──────┘ └──────┘                    │
└──────────────────────────────────────────────────────────────┘
```

- 2-column layout (text left, stats grid right)
- Badge: "Our Story" in teal
- Stats grid: 2×2 cards with value + label + sub

#### Section 5: Testimonials

```
┌──────────────────────────────────────────────────────────────┐
│                    Voyager Stories                           │
│  Hear from those who have experienced...                    │
│                                                              │
│  ┌────────────────────────┐  ┌────────────────────────┐    │
│  │ "Amazing experience..." │  │ "The service was..."  │    │
│  │                        │  │                        │    │
│  │ 👤 Maria Santos        │  │ 👤 Rajesh Patel       │    │
│  │    Frequent Traveler   │  │    Business Executive  │    │
│  └────────────────────────┘  └────────────────────────┘    │
└──────────────────────────────────────────────────────────────┘
```

- Background glow: `bg-primary/5 blur-[120px]` centered
- 2-column grid, stagger animation (left from -30, right from +30)
- Star icon watermark top-right of each card
- Avatar: initial letter in teal circle

---

### Payment Page (`/payment`)

**File:** `frontend/src/pages/payment.tsx`

Full UI breakdown including all states is detailed in [Payment Integration](#-payment-integration) section below.

**Query Parameters:** `?from=X&to=Y&date=Z&passengers=N&vehicle=V`

---

### Ticket Page (`/ticket`)

**File:** `frontend/src/pages/ticket.tsx`

```
┌──────────────────────────────────────────────────────────────┐
│  ← Back to Home                                              │
│  ✅ Booking Confirmed                                         │
│  Your Digital Boarding Pass                                  │
│  Present this QR code at the terminal for scanning.          │
│                                                              │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ ════════════════════════════════════════════════════════ │ │
│  │                                                         │ │
│  │ 🚢 FERRYBOOKING               Ticket Number             │ │
│  │    Jubilant Infrastructure     AQV-XXXXXXXX             │ │
│  │                                                         │ │
│  │     COL                         ELE                     │ │
│  │    Colaba                      Elephanta                │ │
│  │         ─── 🚢 ───                                      │ │
│  │              Direct Route                               │ │
│  │                                                         │ │
│  │ ─────────────────────────────────────────────────────── │ │
│  │ 📅 Date       ⏰ Boarding   👥 Pax       🚗 Vehicle   │ │
│  │ Nov 15, 2023  05:15 AM     2 Adult(s)  Sedan          │ │
│  │                                          ┌───────────┐ │ │
│  │                                          │  QR CODE  │ │ │
│  │                                          │           │ │ │
│  │                                          │  Scan at  │ │ │
│  │                                          │ terminal  │ │ │
│  │                                          │           │ │ │
│  │                                          │ Boarding  │ │ │
│  │                                          │ Group A   │ │ │
│  │                                          └───────────┘ │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                              │
│          [Download PDF]  [Print Ticket]                      │
└──────────────────────────────────────────────────────────────┘
```

**Loading State:**
```
┌──────────────────────────────────────────────────────────────┐
│                  ◌ (spinning ring)                           │
│              Generating your boarding pass...                │
│              Finalizing booking details                      │
└──────────────────────────────────────────────────────────────┘
```

- `animate-spin` border spinner (primary color, `border-t-transparent`)

**Ticket Card Details:**
- `rounded-[2rem]` (extra rounded)
- Top pattern: SVG diagonal stripe pattern, `opacity-30`
- **Left side:** Destination codes (3-letter uppercase acronyms), route line with Ship icon, details grid (Date, Boarding, Pax, Vehicle)
- **Right side:** QR code (160px, `qrcode.react`), cutout circles for realistic ticket look, boarding group letter
- Watermark: large Ship icon at `opacity-5`
- QR code value: `https://ferrybooking.in/validate?ticket={ticketId}`
- Animation: `spring` type with `bounce: 0.4`

**Action Buttons:**
- "Download PDF" — primary teal, rounded-full
- "Print Ticket" — outline, rounded-full

---

### Validate Ticket (`/validate`)

**File:** `frontend/src/pages/validate.tsx`

#### Idle State (Scanner)

```
┌──────────────────────────────────────────────────────────────┐
│                     🛡️                                      │
│                Ticket Validation                            │
│            Verify boarding passes securely                  │
│                                                              │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  ┌─┐                              ┌─┐                   │ │
│  │  │ │   ─── (scanning line anim.)  │ │                   │ │
│  │  │ │                              │ │                   │ │
│  │  │ │   📷 Click to mock scan      │ │                   │ │
│  │  └─┘                              └─┘                   │ │
│  │                                                         │ │
│  │                    ─── OR ───                           │ │
│  │                                                         │ │
│  │  [Enter Ticket ID...]                           [🔍]   │ │
│  └─────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

- Scanner frame: 4 corner brackets (top-left, top-right, bottom-left, bottom-right) with teal border
- Scanning line: `animate: top ["10%", "90%", "10%"]` (3s loop, linear)
- Click to mock scan: fills in "AQV-123456"
- OR divider: horizontal lines with "OR" text
- Input + search button

#### Loading State

```
┌──────────────────────────────────────────────────────────────┐
│                 ◌ (spinning ring)                            │
│                   Verifying Ticket...                        │
│                Checking encrypted database                   │
└──────────────────────────────────────────────────────────────┘
```

#### Valid State

```
┌──────────────────────────────────────────────────────────────┐
│      ◉ (ping animation ring + CheckCircle2 icon)            │
│                                                              │
│               Valid Boarding Pass                            │
│                                                              │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ TICKET ID                                               │ │
│  │ AQV-123456                                              │ │
│  │                                                         │ │
│  │ STATUS         CLASS                                   │ │
│  │ ✅ Confirmed   Premium                                 │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                              │
│              [Scan Next Ticket]                              │
└──────────────────────────────────────────────────────────────┘
```

- Success ring: `animate-ping opacity-20` on emerald green circle
- Ticket info card: black/30 bg, monospace ticket ID
- Button: teal "Scan Next Ticket" → resets to idle

#### Invalid State

```
┌──────────────────────────────────────────────────────────────┐
│              ❌ (XCircle icon in red circle)                 │
│                                                              │
│                  Invalid Ticket                              │
│                                                              │
│  The ticket ID AQV-999999 could not be verified in the      │
│  system or has already been used.                           │
│                                                              │
│              [Try Again]                                     │
└──────────────────────────────────────────────────────────────┘
```

- Red destructive colored circle and text
- Ticket ID shown in monospace
- "Try Again" outline button → resets to idle

---

### Admin Pages (`/admin`)

#### Admin Login (`/admin/login`)

Standard login form with admin credentials.

#### Admin Dashboard (`/admin/dashboard`)

Admin management interface.

---

### 404 Not Found

```
┌──────────────────────────────────────────────────────────────┐
│  ⚠️  404 Page Not Found                                     │
│                                                              │
│  Did you forget to add the page to the router?              │
└──────────────────────────────────────────────────────────────┘
```

- Centered card, `AlertCircle` icon in red

---

## 💳 Payment Integration

### Payment Page UI — State Machine

```
                    idle (no UPI QR)
                    │
         ┌──────────┼────────────────┐
         │          │                │
     selects    selects           user clicks
       UPI       Card             Cancel on QR
         │          │                │
         ▼          ▼                ▼
    showUPIQR   processing ◄─────── idle (back)
         │          │
    user clicks     │ (Razorpay modal opens)
    "Completed"     │
         │     ┌────┴────┐
         ▼     │         │
      success  │    ┌────┴────┐
         │    success │  failed │
         │      │     │        │
         │      ▼     ▼ Try Again
         │  Redirect ───────► idle
         │  to /ticket
         ▼
    View Boarding Pass
```

### Payment Page Layout

```
PageWrapper (bg-background)
  └── Container (max-w-2xl, mx-auto, px-4, py-12 md:py-20)
       │
       ├── Back Button (ghost variant, ArrowLeft + "Back to Search")
       │
       ├── Heading
       │    ├── Wallet icon + "Complete Payment" (font-serif, 3xl-4xl)
       │    └── "Secure your ferry booking with a single payment"
       │
       ├── Booking Summary Card ──────────────────────────────
       │   🚢 Booking Summary
       │   ├── Route: [From] → [To]                     [Time]
       │   ├── Date: [Formatted]     Passengers: [N] Adult(s)
       │   └── Vehicle: [Type]       Duration: [Time]
       │
       ├── Price Breakdown Card ──────────────────────────────
       │   💰 Price Breakdown
       │   ├── Ticket (N × ₹X)                         ₹XX,XXX
       │   ├── Vehicle surcharge                        ₹XXX   (conditional)
       │   ├── Service fee                              Free ✅
       │   ├── GST (5%)                                 ₹XXX
       │   ├──────────────────────────────────────────────────
       │   └── Total                                   ₹XX,XXX (teal, bold)
       │
       ├── Payment Status (AnimatePresence) ─────────────────
       │   ├── [SUCCESS] Green card with CheckCircle2 + Payment ID + CTA
       │   ├── [FAILED]  Red card with XCircle + error msg + Try Again
       │   └── [null]    (hidden when idle)
       │
       ├── Payment Method Selection (shown when idle + !showUPIQR) ──
       │   ┌────────────────────────────────────────────────────┐
       │   │ 🔒 Secured by Razorpay                           │
       │   │                                                  │
       │   │  Choose Payment Method                           │
       │   │                                                  │
       │   │  ┌─────────────────┐  ┌─────────────────┐       │
       │   │  │  💳             │  │  📱             │       │
       │   │  │ Credit / Debit  │  │     UPI         │       │
       │   │  │      Card       │  │                 │       │
       │   │  │ Visa, Mastercard│  │ GPay, PhonePe,  │       │
       │   │  │  RuPay & Amex   │  │ Paytm & BHIM    │       │
       │   │  └─────────────────┘  └─────────────────┘       │
       │   │            ▲                      ▲              │
       │   │       selected="card"        selected="upi"     │
       │   │       border-primary         border-primary     │
       │   │       bg-primary/10          bg-primary/10      │
       │   │                                                  │
       │   │  ┌────────────────────────────────────────────┐  │
       │   │  │  💳 Pay with Card — ₹XX,XXX                │  │
       │   │  │           OR                                │  │
       │   │  │  📱 Pay with UPI — ₹XX,XXX                 │  │
       │   │  └────────────────────────────────────────────┘  │
       │   │                                                  │
       │   │  📱 UPI     💳 Card     🛡️ Secured              │
       │   └────────────────────────────────────────────────────┘
       │
       └── 🛡️ 256-bit SSL encrypted · PCI DSS compliant · Powered by Razorpay
```

**Method Option Visual States:**
| State | Card Style | Icon Background |
|-------|-----------|-----------------|
| **Selected** | `border-primary bg-primary/10 text-primary shadow-sm` | `bg-primary/15` |
| **Unselected** | `border-border text-muted-foreground` | `bg-muted` |
| **Hover** | `hover:border-primary/40 hover:text-foreground` | — |

**Pay Button States:**
| State | Content |
|-------|---------|
| **Default** | Method icon + "Pay with Card/UPI — ₹XX,XXX" |
| **Processing** | `<Loader2 className="animate-spin" />` + "Redirecting to Razorpay..." |
| **Disabled** | When `isProcessing === true` |

---

### Razorpay (Card / Netbanking / Wallet)

**Service file:** `frontend/src/services/razorpay.ts`

**Flow:**
```
1. User clicks "Pay with Card"
2. loadRazorpayScript() → dynamic <script> load from CDN
3. POST /api/create-order → creates Razorpay order
   └── api/create-order.js
       └── razorpay.orders.create({
             amount: Math.round(amount),  // in paise
             currency: "INR",
             receipt: `receipt_${Date.now()}_${random}`
           })
4. Open Razorpay checkout modal with:
   ┌──────────────────────────────────────┐
   │         Razorpay Checkout            │
   │                                      │
   │  🚢 FerryBooking                     │
   │  Colaba → Elephanta | 2 Passenger(s) │
   │                                      │
   │  Amount: ₹XXX                        │
   │                                      │
   │  [Card Number] ___________           │
   │  [Expiry] __/__  [CVV] ___          │
   │  [Cardholder Name] ___________      │
   │                                      │
   │         [Pay ₹XXX]                   │
   └──────────────────────────────────────┘
5. User completes → handler receives:
   { razorpay_payment_id, razorpay_order_id, razorpay_signature }
6. (Optional) POST /api/verify-payment → HMAC SHA256 verification
```

**TypeScript Interfaces:**
```typescript
interface PaymentDetails {
  amount: number;
  name: string;
  description: string;
  prefill?: { name?: string; email?: string; contact?: string; method?: string };
  method?: "card" | "netbanking" | "wallet" | "upi";
  themeColor?: string;
  image?: string;
}

interface PaymentResult {
  success: boolean;
  paymentId?: string;    // razorpay_payment_id
  orderId?: string;      // razorpay_order_id
  signature?: string;    // razorpay_signature
  error?: string;
}
```

**Backend (create-order):**
```javascript
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
const order = await razorpay.orders.create({
  amount: Math.round(amount),
  currency: "INR",
  receipt: `receipt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
});
// Returns { id, amount, currency }
```

**Backend (verify-payment):**
```javascript
const expectedSignature = crypto
  .createHmac("sha256", keySecret)
  .update(`${orderId}|${paymentId}`)
  .digest("hex");
const isValid = (expectedSignature === signature);
// Returns { valid: true/false }
```

---

### UPI QR Code

**Component file:** `frontend/src/components/UPIQRCode.tsx`

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│        ┌──────────────┐                                      │
│        │     📱       │  (Smartphone icon, teal circle)      │
│        └──────────────┘                                      │
│                                                              │
│           Scan to Pay with UPI                               │
│       Use any UPI app to scan this QR code                   │
│                                                              │
│      ⏰ Expires in 04:32                                     │
│          (or 🔄 "QR Code Expired" in red)                    │
│                                                              │
│        ┌──────────────────────┐                              │
│        │                      │                              │
│        │      🔲 QR CODE      │  200×200px, white bg         │
│        │                      │  rounded-xl, shadow-inner    │
│        │      ┌──────┐        │  Error level: H              │
│        │      │ UPI  │        │  Fg: #1e293b                │
│        │      └──────┘        │  Logo overlay: center        │
│        └──────────────────────┘                              │
│                                                              │
│           Amount to Pay                                      │
│           ₹XX,XXX                    (text-3xl, bold, teal) │
│                                                              │
│    Or send to UPI ID:                                        │
│    ┌────────────────────────────────────────────────────┐   │
│    │ ferrybooking@oksbi                        [Copy]   │   │
│    └────────────────────────────────────────────────────┘   │
│                                                              │
│    Transaction Ref: FBOOK36789125XG7K                        │
│                                                              │
│    Supported Apps                                            │
│    [GPay] [PhonePe] [Paytm] [BHIM] [Amazon Pay]             │
│                                                              │
│    ┌────────────────────────────────────────────────────┐   │
│    │  ✅ I've Completed the Payment                     │   │
│    └────────────────────────────────────────────────────┘   │
│    ┌────────────────────────────────────────────────────┐   │
│    │                   Cancel                           │   │
│    └────────────────────────────────────────────────────┘   │
│                                                              │
│    This is a demo payment. No real money will be charged.    │
└──────────────────────────────────────────────────────────────┘
```

**UPI Deep Link Format:**
```
upi://pay?pa={upiId}
         &pn={merchantName}
         &am={amount}
         &cu=INR
         &tn={note} - Ref: {transactionId}
```

**Transaction ID:**
```
FBOOK{dateNumeric(8 chars)}{random(4 chars).toUpperCase()}
Example: FBOOK36789125XG7K
```

**Timer:** 5-minute countdown (MM:SS format), auto-expires QR code

**Expired State:**
- QR area shows: 🔄 Refresh icon + "QR Code has expired" + "Please try again"
- Timer text turns red
- "I've Completed the Payment" button disabled
- Copy UPI ID button disabled

**Component Props:**
```typescript
interface UPIQRCodeProps {
  amount: number;
  upiId?: string;          // default: "ferrybooking@oksbi"
  name?: string;           // default: "FerryBooking"
  note?: string;           // default: "Ferry ticket booking payment"
  onSuccess: () => void;   // user clicked "I've Completed the Payment"
  onCancel: () => void;    // user clicked Cancel
}
```

---

### Payment Status — Success

```
┌──────────────────────────────────────────────────────────────┐
│              ┌──────────────┐                                 │
│              │     ✅       │  (CheckCircle2, green)          │
│              └──────────────┘                                 │
│                                                               │
│           Payment Successful! 🎉                              │
│         Your booking has been confirmed                       │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ Payment ID                                             │  │
│  │ pay_xxxxxxxxxxxxxxxxxxxx                  (monospace)   │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  View Your Boarding Pass                          →    │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

- Card: `bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800`
- Circle: 64px, `bg-green-100`, centered
- Animation: Scale in (0.9→1.0) + fadeIn
- CTA: Teal button, rounded-full, ArrowLeft rotated 180° (→)

### Payment Status — Failed

```
┌──────────────────────────────────────────────────────────────┐
│              ┌──────────────┐                                 │
│              │     ❌       │  (XCircle, red)                │
│              └──────────────┘                                 │
│                                                               │
│                Payment Failed                                 │
│  [Error message or "Something went wrong. Please try again."] │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                    Try Again                           │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

- Card: `bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800`
- Button: outline variant, resets to idle

---

## 🧮 Price Calculation

```
pricePerPerson    = schedule?.price || 350
vehiclePrice      = vehicleId === "v1" ? 0 : 200
totalAmount       = pricePerPerson × passengers + vehiclePrice
gst               = totalAmount × 5%
finalAmount       = totalAmount + gst
```

**Price Breakdown Card:**
```
  Ticket (2 × ₹350)                         ₹700
  Vehicle surcharge                         ₹200     (hidden if v1)
  Service fee                               Free ✅
  GST (5%)                                   ₹45
  ───────────────────────────────────────────────
  Total                                    ₹945     (teal, bold)
```

---

## ✨ Animations & Transitions

All powered by **framer-motion**:

| Element | Animation | Timing |
|---------|-----------|--------|
| Navbar | Slide down (y: -100→0) | 0.6s easeOut |
| Home hero text | Slide left (x: -30→0) + fade | 0.8s, delay 0.2s |
| Home booking card | Slide up (y: 30→0) + fade + float | 0.8s, delay 0.4s, then 6s loop bob |
| Feature cards | Slide up (y: 30→0) + fade | 0.6s, staggered 0.2s each |
| Route cards | Slide up + fade (on scroll) | 0.6s, staggered 0.15s |
| FAQ items | Height transition (auto↔0) + opacity | Accordion |
| About hero text | Slide up + fade | 0.8s |
| Stats | Scale in (0.9→1) | 0.5s, staggered 0.1s |
| Fleet cards | Slide up + fade (on scroll) | 0.6s, staggered 0.2s |
| Story section | Slide left/right + fade | 0.7s |
| Testimonials | Slide left/right + fade | 0.6s |
| Payment heading/pricing | Slide up + fade | 0.5s, staggered 0.1-0.2s |
| Payment method card | Slide up + fade | 0.5s, delay 0.3s |
| Security badge | Fade in | delay 0.5s |
| Success/Failed | Scale (0.9→1) + fade | AnimatePresence |
| UPI QR show | Scale (0.95→1) + fade | 0.3s |
| UPI QR exit | Scale down + slide down | 0.3s |
| Validate scanner line | Top bounce (10%↔90%) | 3s loop, linear |
| Validate status | Scale (0.9→1) + fade | 0.3s |
| Ticket | Spring scale (0.95→1, 40px up) + fade | 0.7s, spring bounce 0.4 |

---

## 🔐 Environment Variables

```
# Razorpay — used by Vercel serverless functions (api/*.js)
RAZORPAY_KEY_ID=rzp_test_SrIH6Gs6BvTmUN
RAZORPAY_KEY_SECRET=39RAa9QpNfevOziKyYhsSNm3

# Razorpay — used by frontend (Vite exposes via VITE_ prefix)
VITE_RAZORPAY_KEY_ID=rzp_test_SrIH6Gs6BvTmUN
```

> Current values are **Razorpay test keys**. Replace with live keys for production.

---

## 🧪 Testing

### Razorpay Test Cards

| Card Type | Number | Expiry | CVV |
|-----------|--------|--------|-----|
| Success | `4111 1111 1111 1111` | Any future | Any 3 digits |
| Failure | `4000 0000 0000 0002` | Any future | Any 3 digits |

### UPI Test
- QR code uses test UPI ID: `ferrybooking@oksbi`
- Click "I've Completed the Payment" to simulate success
- Security notice: "This is a demo payment. No real money will be charged."

### Ticket Validation Test
- Enter `AQV-` prefix followed by any digits (e.g., `AQV-123456`) for valid
- Any other format shows invalid

---

## 📦 Dependencies

```json
{
  "razorpay": "^2.9.0",         // Backend: Razorpay Node.js SDK
  "qrcode.react": "^4.0.0",    // Frontend: QR code rendering
  "framer-motion": "^11.0.0",  // Animations
  "lucide-react": "^0.400.0",  // Icons
  "wouter": "^3.0.0",          // Routing
  "@tanstack/react-query": "^5.0.0",  // Data fetching
}
```

---

## 🚦 Deployment (Vercel)

- `api/create-order.js` → `/api/create-order` (Vercel serverless)
- `api/verify-payment.js` → `/api/verify-payment` (Vercel serverless)
- Frontend proxies `/api/*` via Vite proxy during development
- Environment variables must be configured in Vercel dashboard:
  - `RAZORPAY_KEY_ID`
  - `RAZORPAY_KEY_SECRET`
  - `VITE_RAZORPAY_KEY_ID`

---

## 📋 Production Migration Checklist

- [ ] Replace test Razorpay keys with live keys (RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, VITE_RAZORPAY_KEY_ID)
- [ ] Replace test UPI ID (`ferrybooking@oksbi`) with actual merchant UPI ID
- [ ] Add server-side order validation (verify amount against database)
- [ ] Implement Razorpay webhook handler for payment events
- [ ] Store payment details in a database
- [ ] Remove "demo payment" disclaimer from UPI QR component
- [ ] Add payment retry/refund logic
- [ ] Replace placeholder images (`/images/gateway.jpg`, `/images/story.png`) with actual assets
- [ ] Add proper error logging and monitoring
- [ ] Implement analytics tracking#   F e r r y _ b o o k i n g  
 