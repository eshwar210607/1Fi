import { CalculatedEMI, EMIPlan } from "@/types";

/**
 * Calculates accurate EMI details for a given principal price and plan.
 * Matches 1Fi's fintech logic:
 * - 0% interest no-cost EMIs (interest waived or subsidized)
 * - Flat / Reducing interest options for extended tenures (36m, 48m, 60m)
 * - Cashback breakdown
 */
export function calculateEMIForPlan(price: number, plan: EMIPlan): CalculatedEMI {
  let monthlyPayment = 0;
  let totalPayment = 0;

  if (plan.interestRate === 0 || plan.isNoCost) {
    // 0% Interest No-Cost EMI
    monthlyPayment = Math.round(price / plan.tenureMonths);
    totalPayment = price;
  } else {
    // Standard flat APR calculation as used in Indian consumer durables financing
    const annualRate = plan.interestRate / 100;
    const totalInterest = price * annualRate * (plan.tenureMonths / 12);
    totalPayment = Math.round(price + totalInterest);
    monthlyPayment = Math.round(totalPayment / plan.tenureMonths);
  }

  const cashbackAmount = plan.cashbackAmount || 0;
  const effectivePrice = Math.max(0, price - cashbackAmount);
  const effectiveMonthlyPayment = Math.round(effectivePrice / plan.tenureMonths);

  return {
    planId: plan.id,
    tenureMonths: plan.tenureMonths,
    monthlyPayment,
    interestRate: plan.interestRate,
    isNoCost: plan.isNoCost,
    totalPayment,
    cashbackAmount,
    cashbackText: plan.cashbackText,
    effectiveMonthlyPayment,
  };
}

/**
 * Calculates lowest monthly EMI across all available plans for product display cards.
 */
export function getStartingMonthlyEMI(price: number, plans: EMIPlan[]): number {
  if (!plans || plans.length === 0) {
    return Math.round(price / 24);
  }
  const emiValues = plans.map((plan) => calculateEMIForPlan(price, plan).monthlyPayment);
  return Math.min(...emiValues);
}

/**
 * Formats a number into standard Indian Rupee notation (e.g., 1,27,400)
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(amount);
}
