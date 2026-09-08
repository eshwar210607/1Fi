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

export interface EMIPlan {
  id: string;
  tenureMonths: number;
  interestRate: number; // 0 for no-cost, e.g. 10.5 for interest bearing
  isNoCost: boolean;
  cashbackAmount?: number;
  cashbackText?: string;
  processingFee: number;
}

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
  badge?: string; // e.g. "NEW", "POPULAR", "BESTSELLER"
  baseMrp: number;
  basePrice: number;
  defaultImage: string;
  availableColors: { name: string; hex: string }[];
  availableStorage: string[];
  variants: ProductVariant[];
  emiPlans: EMIPlan[];
  highlights: string[];
  specs: Record<string, string>;
  mfPledgeRatio: number; // e.g., 1.3x collateral required in mutual fund units
  inStock: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export interface CalculatedEMI {
  planId: string;
  tenureMonths: number;
  monthlyPayment: number;
  interestRate: number;
  isNoCost: boolean;
  totalPayment: number;
  cashbackAmount: number;
  cashbackText?: string;
  effectiveMonthlyPayment: number;
}

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
