# 1Fi
# 1Fi Marketplace — SDE Intern Assignment

A pixel-perfect full-stack implementation of the **1Fi Marketplace** feature integrated directly into the **Shop** page of the **1Fi** application.

Built in accordance with the 1Fi design system, fintech mechanics (mutual-fund-backed no-cost EMIs), responsive mobile architecture, and dynamic RESTful API endpoints.

---

## 🌟 Live Demo & Preview

* **Live Demo**: [Deploy to Vercel / Render Link](https://vercel.com)
* **Demo Video**: [Google Drive / YouTube Walkthrough Link](https://drive.google.com)

---

## 📱 Features & Highlights

### 1. 1Fi Shop Page Integration
* **3-Tab Segmented Navigation**:
  * **Top Brands**: Reference placeholder as specified in the assignment document.
  * **Nearby Stores**: Reference placeholder as specified in the assignment document.
  * **1Fi Marketplace**: Fully designed, engineered, and interactive product experience.
* **1Fi Dark Indigo Hero Banner**:
  * Gradient backdrop (`#1B0645` → `#340974` → `#5210AD`) matching the mobile application.
  * Taglines: *"Shop today, Pay later using Mutual funds"*, *"No credit score required. No interest. Backed by your investments"*.
  * Micro-badges: `✦ NO-COST EMIs`, RBI regulated, Instant approval.
* **5-Tab Docked Bottom Navigation Bar**:
  * `Home`, `Shop` (active indicator), `EMI Dues`, `Limit`, and `Profile`.
* **Mobile & Desktop Dual Viewport**:
  * Features a built-in preview switcher allowing interviewers/reviewers to evaluate the experience in an authentic **Mobile App Device Frame** or in **Fluid Responsive Web** layout.

### 2. Marketplace Discovery & Browsing
* **Dynamic Search**: Live real-time search across product titles, brands, and categories with empty states.
* **Category Filtering**: Filter chips (`All`, `Smartphones`, `Laptops`, `Audio`, `Tablets`) dynamically fetched from `/api/categories`.
* **Shimmer Skeleton Loaders**: Fluid shimmer placeholder states during data loading to prevent layout shifts.
* **Fintech Value Badges**: Highlights 0% Interest EMIs, Zero Paperwork, and Mutual Fund collateral guarantees.

### 3. Dynamic Product Details & Variant Selection
* **Dynamic Routing**:
  * In-app seamless navigation on the Shop page.
  * Dedicated unique URLs for each product: `/products/iphone-17-pro`, `/products/samsung-s24-ultra`, etc.
* **Variant Customization**:
  * **Color / Finish**: Live color swatch selection (e.g., Desert Titanium, Natural Titanium, Black, White) with tick indicators.
  * **Storage / Size**: Selectable storage options (e.g., 256GB, 512GB, 1TB).
  * **Dynamic Price Recalculation**: Switching storage or color immediately updates product images, MRP, selling price, and recalculates the entire EMI schedule in real-time.

### 4. EMI Matrix Backed by Mutual Funds
* **Exact Assignment Reference Implementation**:
  * Formatted list of EMI tenures: **3, 6, 12, 24, 36, 48, and 60 months**.
  * **0% Interest No-Cost EMIs** vs **Flat APR plans** (e.g., 10.5%).
  * **Cashback Information**: Dynamic tags (e.g., *"Additional cashback of ₹7,500"*).
  * **Interactive Plan Selection**: Radio cards highlighting the chosen plan with active violet styling.

### 5. Proceed & Mutual Fund Pledge Flow
* **"Proceed with Selected Plan" CTA**:
  * Displays sticky bottom installment summary (e.g., `₹22,483/mo for 6 months · 0% Interest`).
* **Pledge Summary Modal**:
  * Calculates estimated Mutual Fund collateral needed based on safe LTV ratios (`₹1,65,620`).
  * Explains mutual fund retention: *"Your mutual fund units remain invested and keep compounding! Zero liquidation, no capital gains tax, zero exit load"*.
  * Investor detail collection (PAN name and phone number).
  * Submits to `/api/order` and generates a confirmed 1Fi Order ID with scheduled due dates.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | **Next.js 14 (App Router)** |
| **Language** | **TypeScript** |
| **Styling** | **Tailwind CSS** (customized with 1Fi design tokens) |
| **Icons** | **Lucide React** |
| **Backend & APIs** | Next.js API Route Handlers (`/api/...`) |
| **Data Layer** | Dynamic in-memory JSON data layer with Prisma-compatible schema |
| **Code Quality** | ESLint, TypeScript Strict Mode |

---

## 📐 Data Schema & Models

The application strictly avoids hardcoded UI data by structuring dynamic models:

```typescript
// Product Model
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
  mfPledgeRatio: number; // e.g. 1.25x collateral required in mutual fund units
  inStock: boolean;
}

// Product Variant Model
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

// EMI Plan Model
export interface EMIPlan {
  id: string;
  tenureMonths: number;
  interestRate: number; // 0 for no-cost, e.g. 10.5 for interest bearing
  isNoCost: boolean;
  cashbackAmount?: number;
  cashbackText?: string;
  processingFee: number;
}
```

---

## 🔌 API Endpoints & Example Responses

### 1. List Products
* **Endpoint**: `GET /api/products`
* **Query Parameters**:
  * `category` (optional): Filter by category ID (`smartphones`, `laptops`, `audio`, etc.)
  * `search` (optional): Search query matching name, brand, or tagline
  * `sort` (optional): `price-low`, `price-high`, or `popular`
* **Example Response**:
```json
{
  "success": true,
  "total": 6,
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
      "variants": [...],
      "emiPlans": [...]
    }
  ]
}
```

### 2. Get Product By ID or Slug
* **Endpoint**: `GET /api/products/:id`
* **Example**: `GET /api/products/iphone-17-pro`
* **Example Response**:
```json
{
  "success": true,
  "data": {
    "id": "iphone-17-pro",
    "name": "Apple iPhone 17 Pro",
    "basePrice": 127400,
    "availableStorage": ["256GB", "512GB", "1TB"],
    "emiPlans": [
      {
        "id": "plan-3m",
        "tenureMonths": 3,
        "interestRate": 0,
        "isNoCost": true,
        "cashbackAmount": 7500,
        "cashbackText": "Additional cashback of ₹7,500"
      },
      {
        "id": "plan-6m",
        "tenureMonths": 6,
        "interestRate": 0,
        "isNoCost": true,
        "cashbackAmount": 7500,
        "cashbackText": "Additional cashback of ₹7,500"
      }
    ]
  }
}
```

### 3. List Categories
* **Endpoint**: `GET /api/categories`
* **Example Response**:
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

### 4. Create Order / Confirm Mutual Fund Pledge
* **Endpoint**: `POST /api/order`
* **Payload**:
```json
{
  "productId": "iphone-17-pro",
  "variantId": "ip17p-256-desert",
  "planId": "plan-6m",
  "tenureMonths": 6,
  "monthlyPayment": 22483,
  "totalAmount": 127400,
  "pledgedMutualFundEstimate": 165620,
  "customerName": "Eshwar",
  "customerPhone": "9876543210"
}
```
* **Example Response**:
```json
{
  "success": true,
  "data": {
    "orderId": "1FI-8K39P1",
    "status": "PLEDGE_CONFIRMED",
    "loanAmount": 127400,
    "tenureMonths": 6,
    "monthlyEMI": 22483,
    "firstDueDate": "8 Oct 2026",
    "pledgedMutualFundEstimate": 165620,
    "message": "Your mutual fund pledge lock is confirmed. 0% credit pull initiated."
  }
}
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: v18.17.0+ or v20+ (LTS recommended)
* **npm**: v9+ or v10+

### Installation & Run

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd 1Fi
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000).

5. **Build for production**:
   ```bash
   npm run build
   npm run start
   ```

---

## 🎨 UI/UX Design System Alignment

| Element | Specification in 1Fi App | Implementation |
| :--- | :--- | :--- |
| **Primary Color** | Royal Violet (`#601CEB`) | Used in main CTAs, active indicators, highlights |
| **Hero Background** | Dark Indigo Gradient (`#1B0645` → `#5210AD`) | Hero banner with sparkles, 3D accents, and badges |
| **Card Styling** | Rounded 16px–20px (`rounded-2xl`) | Flat card surface, subtle border `#F0F1F5`, soft shadow |
| **Typography** | Modern geometric sans-serif | Inter font with high-contrast text hierarchy |
| **EMI Display** | Monthly installments + tenure | `₹22,483 x 6 months` with 0% interest tags |
| **Bottom Navigation** | 5 Docked Tabs | `Home`, `Shop` (active), `EMI Dues`, `Limit`, `Profile` |

---

## 📄 Submission Checklist

- [x] Explored and matched existing 1Fi app UI, components, colors, and navigation.
- [x] Added 3-tab segmented control to Shop (`Top Brands`, `Nearby Stores`, `1Fi Marketplace`).
- [x] Fully designed and implemented the `1Fi Marketplace` section.
- [x] Products display name, variant (color/storage), MRP, selling price, and high-res image.
- [x] Real-time EMI schedule calculation with 0% no-cost options, tenures, and cashback information.
- [x] Selectable EMI plans with active checkmarks and dynamic monthly amounts.
- [x] Functional "Proceed with selected plan" CTA with Mutual Fund pledge collateral confirmation.
- [x] Dynamic backend REST APIs (`/api/products`, `/api/products/:id`, `/api/categories`, `/api/order`) — zero hardcoded UI data.
- [x] Unique URLs for each product (`/products/iphone-17-pro`, etc.).
- [x] Clean, maintainable TypeScript code, modular components, and error/skeleton loading states.