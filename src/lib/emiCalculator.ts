import { CalculatedEMI, EMIPlan } from "@/types";

/**
 * Calculates accurate EMI details for a given principal price and plan.
 * Matches 1Fi's fintech logic:
 * - 0% interest no-cost EMIs (interest waived or subsidized)
 * - Flat / Reducing interest options for extended tenures (36m, 48m, 60m)
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

  return {
    planId: plan.id,
    tenureMonths: plan.tenureMonths,
    monthlyPayment,
    interestRate: plan.interestRate,
    isNoCost: plan.isNoCost,
    totalPayment,
    cashbackAmount: 0,
    effectiveMonthlyPayment: monthlyPayment,
  };
}

/**
 * Generates a 1-Month Full Payment / Single Settlement option (0% interest, pay next month)
 */
export function getPayInFullPlan(price: number): CalculatedEMI {
  return {
    planId: "pay-in-full-30d",
    tenureMonths: 1,
    monthlyPayment: price,
    interestRate: 0,
    isNoCost: true,
    totalPayment: price,
    cashbackAmount: 0,
    effectiveMonthlyPayment: price,
  };
}

/**
 * Calculates lowest monthly EMI across multi-month plans for product display cards.
 */
export function getStartingMonthlyEMI(price: number, plans: EMIPlan[]): number {
  if (!plans || plans.length === 0) {
    return Math.round(price / 24);
  }
  // Filter for multi-month installment plans
  const installmentPlans = plans.filter((p) => p.tenureMonths > 1);
  const emiValues = (installmentPlans.length > 0 ? installmentPlans : plans).map(
    (plan) => calculateEMIForPlan(price, plan).monthlyPayment
  );
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
