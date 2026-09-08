# 1Fi Marketplace — SDE Intern Assignment

> A pixel-perfect, full-stack implementation of the **1Fi Marketplace** feature integrated directly into the **Shop** page of the **1Fi** application. Built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**, strictly adhering to 1Fi's fintech mechanics (Loan Against Mutual Funds / LAMF), design system, and dynamic API architecture.

---

## 🔗 Live Links

* **Live Demo Hosted on Vercel**: `https://1fi-marketplace.vercel.app` *(Replace with your deployed URL)*
* **Demo Video Walkthrough**: `https://drive.google.com/file/d/...` *(Replace with your Google Drive / YouTube link)*
* **GitHub Repository**: `https://github.com/<your-username>/1Fi`

---

## 🎯 Assignment Objective & Scope

The objective of this assignment is to evaluate the ability to **understand an existing product, work within an existing design system/codebase, and build a new feature while maintaining 100% consistency with the existing 1Fi app experience**.

### Deliverables Checklist (per 1Fi SDE Assignment Brief):
- [x] **Shop Page Integration**: 3 options in segmented navigation:
  - **A. Top Brands** (Reference placeholder per specification).
  - **B. Nearby Stores** (Reference placeholder per specification).
  - **C. 1Fi Marketplace** (**Fully designed, engineered, and interactive**).
- [x] **Product Discovery**: Product listing, high-res images, pricing (MRP vs offer price), dynamic search, and category filter chips.
- [x] **Dynamic Variants**: Color swatches (with active checkmarks) and storage options (`256GB`, `512GB`, `1TB`) that recalculate pricing and EMI tenures in real-time.
- [x] **Collapsible EMI Accordion**: Interactive `Starts at ₹X,XXX/mo` with `Hide plans ^` / `Show plans ▾` matching the live 1Fi app screens.
- [x] **Fintech Mechanics**:
  - Flexible EMI tenures: **3, 6, 9, 12, 18, 24, 36, 48, and 60 months**.
  - **0% Interest No-Cost EMIs** vs **Flat APR plans** (7.49% to 8.49% p.a.).
  - **Single 30-Day Payment ("Pay in Full")**: 0% interest, full settlement on the next billing cycle.
- [x] **Redemption & Policy Information**:
  - **How to Use**: Numbered step-by-step redemption guide.
  - **Terms & Conditions**: Checklist with `View All ›` opening an authentic **Slide-Up Bottom Sheet Modal** with `Got it` button.
- [x] **Proceed with Selected Plan CTA**: Sticky bottom installment bar + **Mutual Fund Pledge Summary Modal** calculating collateral units (`₹1,65,620` at 1.3x safe LTV), CAMS/KFintech investor verification, and order confirmation.
- [x] **Dynamic Backend APIs**: REST API endpoints (`/api/products`, `/api/products/:id`, `/api/categories`, `/api/order`) — **zero hardcoded UI data**.
- [x] **Unique Product URLs**: Dynamic Next.js routing supporting direct links (e.g., `/products/iphone-17-pro`).

---

## 🏆 Alignment with 1Fi Evaluation Criteria

| Evaluation Criteria | How It Was Addressed in this Implementation |
| :--- | :--- |
| **1. Product Understanding** | Deeply understood 1Fi's core business model: **Loan Against Mutual Funds (LAMF)**. Purchases are not immediate bank debits; they are backed by mutual fund units that remain invested and keep compounding. Implemented collateral calculations, pledge locking, and tenure options. |
| **2. UI/UX Consistency** | Reverse-engineered the exact 1Fi design system from the mobile app recording: deep indigo gradient hero banner (`#1B0645` → `#5210AD`), royal violet accents (`#601CEB`), card radiuses (`rounded-2xl`), collapsible accordion (`Starts at ₹X,XXX/mo`), and docked bottom navigation. |
| **3. Engineering Quality** | Clean, modular Next.js 14 App Router architecture with strict TypeScript types, reusable UI components, centralized mathematical utilities (`emiCalculator.ts`), zero linting errors, and an automated build pipeline. |
| **4. Functionality** | End-to-end user flow: Browse products → Search & filter → Select color/storage variants → View live recalculated EMI tenures → Expand/collapse plan accordion → Review Terms in bottom sheet → Confirm mutual fund pledge → Receive order confirmation ID. |
| **5. Data & API Handling** | All data is served dynamically from backend REST route handlers (`/api/products`, `/api/products/:id`, `/api/categories`, `/api/order`). Supports server-side query filtering, search debouncing, and payload validation. |
| **6. Attention to Detail** | Included shimmer skeleton loaders during data fetch, graceful empty search states (`"No matching products found"`), dual-mode viewport frame (`📱 Mobile App` vs `🖥️ Responsive Web`), and toast notifications. |

---

## 💻 Tech Stack & Architectural Rationale

| Technology | Purpose in this Project | Why It Was Chosen |
| :--- | :--- | :--- |
| **Next.js 14 (App Router)** | Full-Stack Web Framework | Provides server-rendered frontend components and serverless REST API route handlers (`/api/...`) in a unified repository. Ensures 1-click zero-config deployment to Vercel. |
| **TypeScript (Strict Mode)** | Type Safety & Modeling | Strongly typed models for products, variants, EMI schedules, categories, and order payloads. Eliminates runtime errors and provides self-documenting code. |
| **Tailwind CSS** | Styling & Design System | Configured with 1Fi's exact color tokens (`fi.primary`, `fi.dark`, `fi.bannerStart`). Enables rapid, responsive layout development with zero CSS bloat. |
| **Lucide React** | Iconography | Lightweight, high-precision SVG icons matching 1Fi's mobile icons (Search, Sparkles, ShieldCheck, Wallet, ChevronDown, CheckCircle2, Share2). |
| **In-Memory Seed Data Layer** | Dynamic Data Store | Structured, relational-ready seed dataset with multi-variant products (Apple iPhone 17 Pro, Samsung S24 Ultra, MacBook Pro M3, Sony XM5, etc.) ready for Prisma/PostgreSQL migration. |

---

## 📱 Feature Walkthrough

### 1. Dual-Mode Viewport Container (`MobileFrame.tsx`)
Recruiters evaluating on desktop or laptops can toggle between:
* **`📱 Mobile App`**: Emulates the authentic mobile application experience complete with an Android status bar (battery, wifi, signal, time), 1Fi bottom navigation dock, and rounded device frame.
* **`🖥️ Responsive Web`**: Expands into a fluid, wide layout for multi-column desktop evaluation.

### 2. Shop Page 3-Tab Segmented Control (`TabNavigation.tsx`)
* **`Top Brands`**: Reference placeholder tab matching the assignment document.
* **`Nearby Stores`**: Reference placeholder tab matching the assignment document.
* **`1Fi Marketplace`**: The core interactive assignment feature, selected by default with a vibrant `NEW` badge.

### 3. Real-Time Search, Filtering & Skeletons (`ProductCatalog.tsx`)
* **Dynamic Search Bar**: Filters products in real-time by title, brand, category, or specifications.
* **Category Filter Pills**: Dynamically fetched from `/api/categories` (`All`, `Smartphones`, `Laptops`, `Audio`, `Tablets`).
* **Sort Dropdown**: Sort by `Featured`, `Price: Low to High`, `Price: High to Low`, or `Highest Rated` (powered by `/api/products?sort=...`).
* **Credit Limit Card**: Displays a simulated 1Fi credit status: `Available MF Limit: ₹2,50,000 / ₹4,20,000 Portfolio (CAMS Verified)`.
* **Shimmer Skeleton Grid**: Smooth pulse and shimmer animations prevent layout shift during API fetching.

### 4. Live Variant Customization & Dynamic Recalculation (`VariantSelector.tsx`)
* **Color Swatches**: Color circles with active checkmarks (e.g., Desert Titanium, Natural Titanium, Black, White).
* **Storage Chips**: Selectable storage options (`256GB`, `512GB`, `1TB`).
* **Real-time Recalculation**: Switching storage or color instantly updates product images, MRP, selling price, and recalculates all EMI monthly amounts in real-time.

### 5. Collapsible EMI Accordion (`EMIPlanSelector.tsx`)
* **Header**:
  * Left: `Starts at ₹3,238/mo` (dynamically determined from lowest tenure).
  * Right: `Hide plans ^` / `Show plans ▾` interactive toggle button in purple (`#601CEB`).
* **Expanded State**:
  * Lists all 9 standard 1Fi tenures: `3, 6, 9, 12, 18, 24, 36, 48, and 60 months`.
  * Left: `${tenure} months · ${rate}% p.a.`
  * Right: `₹${monthly} /mo` in bold typography.
  * Radio checkmark to select the active plan.
* **Payment Mode Switcher**:
  * `[ Pay in EMIs (3–60 mos) ]`: Flexible monthly installments backed by mutual funds.
  * `[ Pay in Full (30 Days) ]`: Single full settlement after 30 days at 0% interest with zero immediate bank debit.

### 6. Redemption Guide & Terms Bottom Sheet (`TermsBottomSheet.tsx`)
* **How to Use Card**: 7-step instructional breakdown with numbered lavender badges (`1`, `2`, `3`...).
* **Terms and Conditions Card**: Bulleted guarantees with purple checkmarks.
* **Slide-Up Bottom Sheet Modal**: Triggered by clicking `View All ›`. Features a top drag handle, policy clauses (`1` to `8`), external store link, and full-width purple `Got it` button.

### 7. Proceed CTA & Mutual Fund Pledge Flow (`PledgeSummaryModal.tsx`)
* **Sticky Bottom Bar**: Displays active monthly payment (`₹21,233/mo`) with a `Continue →` button.
* **Mutual Fund Pledge Modal**:
  * Calculates estimated mutual fund units to pledge (`₹1,65,620` at 1.3x safe LTV).
  * Explains 1Fi guarantees: *No credit score pull, no portfolio liquidation, 0% capital gains tax/exit load, units continue compounding*.
  * Captures investor name and mobile number for CAMS/KFintech verification.
  * Submits to `/api/order` and generates a confirmed 1Fi Order ID (`1FI-XXXXXX`) with scheduled first due dates.

---

## 🗄️ Database Schema & Data Models

All data structures are typed in `src/types/index.ts`:

```typescript
// Product Entity
export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  categoryId: string;
  tagline: string;
  rating: number;
  reviewCount: number;
  badge?: string; // "NEW" | "POPULAR" | "BESTSELLER"
  baseMrp: number;
  basePrice: number;
  defaultImage: string;
  availableColors: { name: string; hex: string }[];
  availableStorage: string[];
  variants: ProductVariant[];
  emiPlans: EMIPlan[];
  highlights: string[];
  specs: Record<string, string>;
  mfPledgeRatio: number; // e.g., 1.25x - 1.35x collateral required in MF units
  inStock: boolean;
}

// Product Variant Entity
export interface ProductVariant {
  id: string;
  name: string;
  colorName: string;
  colorHex: string;
  storage?: string;
  mrp: number;
  price: number;
  image: string;
  inStock: boolean;
}

// EMI Plan Entity
export interface EMIPlan {
  id: string;
  tenureMonths: number;
  interestRate: number; // 0 for no-cost, e.g. 7.49 to 10.5 for interest-bearing
  isNoCost: boolean;
  processingFee: number;
}

// Order & Pledge Entity
export interface OrderPledgeRequest {
  productId: string;
  variantId: string;
  planId: string;
  tenureMonths: number;
  monthlyPayment: number;
  totalAmount: number;
  pledgedMutualFundEstimate: number;
  customerName: string;
  customerPhone: string;
}
```

---

## 📡 REST API Documentation

### 1. `GET /api/products`
Retrieves the list of marketplace products with optional filtering and sorting.

* **Query Parameters**:
  * `category` *(string, optional)*: Filter by category ID (`smartphones`, `laptops`, `audio`, `tablets`).
  * `search` *(string, optional)*: Search query matching product name, brand, or tagline.
  * `sort` *(string, optional)*: Sort by `price-low`, `price-high`, or `popular`.
* **Sample Request**:
  ```bash
  curl -X GET "http://localhost:3000/api/products?category=smartphones&sort=popular"
  ```
* **Sample Response**:
  ```json
  {
    "success": true,
    "total": 3,
    "data": [
      {
        "id": "iphone-17-pro",
        "slug": "apple-iphone-17-pro",
        "name": "Apple iPhone 17 Pro",
        "brand": "Apple",
        "category": "Smartphones",
        "baseMrp": 134900,
        "basePrice": 127400,
        "badge": "NEW",
        "rating": 4.9,
        "variants": [ ... ],
        "emiPlans": [ ... ]
      }
    ]
  }
  ```

---

### 2. `GET /api/products/:id`
Retrieves full details, variant options, and EMI schedules for a specific product by ID or slug.

* **Sample Request**:
  ```bash
  curl -X GET "http://localhost:3000/api/products/iphone-17-pro"
  ```
* **Sample Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": "iphone-17-pro",
      "name": "Apple iPhone 17 Pro",
      "basePrice": 127400,
      "availableStorage": ["256GB", "512GB", "1TB"],
      "variants": [
        {
          "id": "ip17p-256-desert",
          "name": "iPhone 17 Pro 256GB Desert Titanium",
          "colorName": "Desert Titanium",
          "colorHex": "#D4B996",
          "storage": "256GB",
          "price": 127400,
          "mrp": 134900
        }
      ]
    }
  }
  ```

---

### 3. `GET /api/categories`
Returns all available product categories with live product counts.

* **Sample Request**:
  ```bash
  curl -X GET "http://localhost:3000/api/categories"
  ```
* **Sample Response**:
  ```json
  {
    "success": true,
    "data": [
      { "id": "all", "name": "All", "slug": "all", "count": 6 },
      { "id": "smartphones", "name": "Smartphones", "slug": "smartphones", "count": 3 },
      { "id": "laptops", "name": "Laptops", "slug": "laptops", "count": 1 },
      { "id": "audio", "name": "Audio", "slug": "audio", "count": 1 },
      { "id": "tablets", "name": "Tablets", "slug": "tablets", "count": 1 }
    ]
  }
  ```

---

### 4. `POST /api/order`
Processes mutual fund pledge lock and confirms order placement.

* **Sample Request**:
  ```bash
  curl -X POST "http://localhost:3000/api/order" \
    -H "Content-Type: application/json" \
    -d '{
      "productId": "iphone-17-pro",
      "variantId": "ip17p-256-desert",
      "planId": "plan-6m",
      "tenureMonths": 6,
      "monthlyPayment": 21233,
      "totalAmount": 127400,
      "pledgedMutualFundEstimate": 165620,
      "customerName": "Eshwar",
      "customerPhone": "9876543210"
    }'
  ```
* **Sample Response**:
  ```json
  {
    "success": true,
    "data": {
      "orderId": "1FI-8A92K1",
      "status": "PLEDGE_CONFIRMED",
      "loanAmount": 127400,
      "tenureMonths": 6,
      "monthlyEMI": 21233,
      "firstDueDate": "8 Oct 2026",
      "pledgedMutualFundEstimate": 165620,
      "message": "Your mutual fund pledge lock is confirmed. 0% credit pull initiated."
    }
  }
  ```

---

## 🎨 UI/UX Design System Specification

| Design Element | Specification in 1Fi App | Implementation in Code |
| :--- | :--- | :--- |
| **Primary Brand Violet** | `#601CEB` / `#6C27DF` | Main CTAs, active segmented tabs, links, radio accents |
| **Hero Dark Gradient** | `#1B0645` → `#340974` → `#5210AD` | Top Shop promo banner with sparkles badge and micro-tags |
| **Canvas Background** | `#F8F9FB` | Soft off-white canvas preventing harsh eye strain |
| **Card Surface** | `#FFFFFF` with `rounded-2xl` (16px) | Flat, subtle border `#F0F1F5`, soft elevation `shadow-card` |
| **Typography** | Modern geometric sans-serif | Clean system typography (`system-ui`, `Inter`) with high-contrast weights |
| **Collapsible Accordion** | `Starts at ₹X,XXX/mo` + `Hide plans ^` | Toggles expanded plan list with clean dividers (`divide-y`) |
| **Terms Bottom Sheet** | Slide-up modal from bottom | Rounded top corners (`rounded-t-[28px]`), drag handle, `Got it` button |
| **Bottom Navigation** | 5-Tab Dock | `Home`, `Shop` (active purple indicator), `EMI Dues`, `Limit`, `Profile` |

---

## 🚀 Local Setup & Quickstart

### Prerequisites
* **Node.js**: v18.17.0+ or v20+ (LTS recommended)
* **npm**: v9+ or v10+

### Installation & Run

1. **Clone the repository**:
   ```bash
   git clone https://github.com/<your-username>/1Fi.git
   cd 1Fi
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```
   Open **[http://localhost:3000](http://localhost:3000)** in your browser.

4. **Build & Run Production Mode**:
   ```bash
   npm run build
   npm start
   ```

---

## 🌐 Deploy to Vercel (1-Click Guide)

1. Push your code to your GitHub repository:
   ```bash
   git push origin main
   ```
2. Go to [vercel.com](https://vercel.com) and log in with GitHub.
3. Click **"Add New Project"** and import the `1Fi` repository.
4. Next.js preset will be automatically detected. Leave build settings as default.
5. Click **"Deploy"**.
6. Copy your live deployment URL (e.g., `https://1fi-marketplace.vercel.app`) and paste it into the **Live Links** section at the top of this `README.md`.

---

## 📁 Repository Directory Structure

```text
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── categories/route.ts       # GET category filters
│   │   │   ├── order/route.ts            # POST order & pledge submission
│   │   │   ├── products/
│   │   │   │   ├── route.ts              # GET products (search & category query)
│   │   │   │   └── [id]/route.ts         # GET single product by ID or slug
│   │   ├── products/[id]/page.tsx        # Dedicated dynamic product detail route
│   │   ├── globals.css                   # Tailwind styles, custom utilities & shimmer keyframes
│   │   ├── layout.tsx                    # Root HTML layout with metadata
│   │   └── page.tsx                      # Master Shop page container (3-tab segmented control)
│   ├── components/
│   │   ├── brand-voucher/
│   │   │   ├── BrandVoucherDetailView.tsx# Voucher detail view
│   │   │   └── TermsBottomSheet.tsx      # Slide-up Terms & Conditions bottom sheet
│   │   ├── layout/
│   │   │   ├── BottomNavBar.tsx          # 5-tab docked bottom navigation bar
│   │   │   ├── HeaderBanner.tsx          # 1Fi hero dark gradient banner
│   │   │   ├── MobileFrame.tsx           # Dual-mode container (Mobile App vs Responsive Web)
│   │   │   └── TabNavigation.tsx         # 3-tab segmented switch (Top Brands | Nearby | Marketplace)
│   │   ├── marketplace/
│   │   │   ├── CategoryPills.tsx         # Filter chips (All, Smartphones, Laptops, Audio, Tablets)
│   │   │   ├── EmptyState.tsx            # Graceful empty search state
│   │   │   ├── ProductCard.tsx           # 1Fi product card with pricing and EMI callouts
│   │   │   ├── ProductCatalog.tsx        # Main marketplace catalog container with sort dropdown
│   │   │   ├── ProductSkeleton.tsx       # Shimmer placeholder loaders
│   │   │   └── SearchBar.tsx             # Real-time search bar with clear button
│   │   ├── product-detail/
│   │   │   ├── EMIPlanSelector.tsx       # Collapsible EMI plan accordion with Hide/Show plans
│   │   │   ├── PledgeSummaryModal.tsx    # Order review & Mutual Fund pledge confirmation
│   │   │   ├── ProductDetailView.tsx     # Full product detail view
│   │   │   └── VariantSelector.tsx       # Color swatches and storage selectors
│   │   └── tabs/
│   │       ├── NearbyStoresView.tsx      # Nearby stores tab component
│   │       └── TopBrandsView.tsx         # Top brands tab component
│   ├── data/
│   │   └── seedProducts.ts               # Relational seed dataset with variants and specifications
│   ├── lib/
│   │   └── emiCalculator.ts              # Mathematical utility for standard & 0% EMI schedules
│   └── types/
│       └── index.ts                      # Core TypeScript domain models
├── tailwind.config.ts                    # Custom 1Fi design tokens
├── tsconfig.json                         # Strict TypeScript configuration
├── package.json                          # Dependencies & scripts
└── README.md                             # Comprehensive project documentation
```

---

## 👥 Author
* **Candidate**: Eshwar
* **Role**: 1Fi SDE Intern
* **Submission Date**: September 2026