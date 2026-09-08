"use client";

import React, { useState } from "react";
import { EMIPlan, CalculatedEMI } from "@/types";
import { calculateEMIForPlan, getPayInFullPlan, formatINR } from "@/lib/emiCalculator";
import {
  ChevronUp,
  ChevronDown,
  CheckCircle2,
  Circle,
  Calendar,
  CreditCard,
} from "lucide-react";

interface EMIPlanSelectorProps {
  price: number;
  mrp: number;
  plans: EMIPlan[];
  selectedPlanId: string;
  onSelectPlan: (plan: CalculatedEMI) => void;
}

export const EMIPlanSelector: React.FC<EMIPlanSelectorProps> = ({
  price,
  mrp,
  plans,
  selectedPlanId,
  onSelectPlan,
}) => {
  const [showPlans, setShowPlans] = useState<boolean>(true);
  const [paymentMode, setPaymentMode] = useState<"emi" | "full">("emi");

  // Generate 1Fi standard tenures: 3, 6, 9, 12, 18, 24, 36, 48, 60 months
  const standardTenures = [
    { months: 3, rate: 0, isNoCost: true },
    { months: 6, rate: 0, isNoCost: true },
    { months: 9, rate: 0, isNoCost: true },
    { months: 12, rate: 0, isNoCost: true },
    { months: 18, rate: 0, isNoCost: true },
    { months: 24, rate: 0, isNoCost: true },
    { months: 36, rate: 7.49, isNoCost: false },
    { months: 48, rate: 7.99, isNoCost: false },
    { months: 60, rate: 8.49, isNoCost: false },
  ];

  const calculatedPlans: CalculatedEMI[] = standardTenures.map((item) => {
    let monthly = 0;
    let total = 0;
    if (item.rate === 0) {
      monthly = Math.round(price / item.months);
      total = price;
    } else {
      const annualRate = item.rate / 100;
      const totalInterest = price * annualRate * (item.months / 12);
      total = Math.round(price + totalInterest);
      monthly = Math.round(total / item.months);
    }

    return {
      planId: `plan-${item.months}m`,
      tenureMonths: item.months,
      monthlyPayment: monthly,
      interestRate: item.rate,
      isNoCost: item.isNoCost,
      totalPayment: total,
      cashbackAmount: 0,
      effectiveMonthlyPayment: monthly,
    };
  });

  const fullPlan = getPayInFullPlan(price);
  const lowestMonthly = calculatedPlans[calculatedPlans.length - 1]?.monthlyPayment || 1026;

  const handleModeChange = (mode: "emi" | "full") => {
    setPaymentMode(mode);
    if (mode === "full") {
      onSelectPlan(fullPlan);
    } else {
      onSelectPlan(calculatedPlans[1] || calculatedPlans[0]);
    }
  };

  return (
    <div className="space-y-3">
      {/* Price Header Section */}
      <div className="text-center pt-1 pb-1">
        <p className="text-xs font-semibold text-gray-500">
          Up to 60 months EMIs
        </p>
        <p className="text-[11px] font-medium text-gray-400 mt-0.5">
          Enter the purchase amount · ₹1,000 – ₹10,00,000
        </p>

        {/* Large Amount Display matching Image 1 */}
        <div className="pt-2 pb-1 flex items-baseline justify-center gap-2">
          <span className="text-2xl sm:text-3xl font-semibold text-gray-400">
            ₹
          </span>
          <span className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight">
            {formatINR(price)}
          </span>
          {mrp > price && (
            <span className="text-xs text-gray-400 line-through font-medium ml-1">
              ₹{formatINR(mrp)}
            </span>
          )}
        </div>
      </div>

      {/* Mode Switcher: EMIs vs Pay in Full */}
      <div className="flex items-center p-1 bg-gray-100/90 rounded-2xl text-xs font-bold">
        <button
          type="button"
          onClick={() => handleModeChange("emi")}
          className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
            paymentMode === "emi"
              ? "bg-white text-[#601CEB] shadow-sm"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>Pay in EMIs (3–60 mos)</span>
        </button>

        <button
          type="button"
          onClick={() => handleModeChange("full")}
          className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
            paymentMode === "full"
              ? "bg-white text-[#601CEB] shadow-sm"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Pay in Full (30 Days)</span>
        </button>
      </div>

      {/* Mode 1: Pay in Full */}
      {paymentMode === "full" && (
        <div
          onClick={() => onSelectPlan(fullPlan)}
          className="p-4 rounded-2xl border border-[#601CEB] bg-purple-50/60 shadow-sm transition-all cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#601CEB] fill-purple-100" />
              <div>
                <h4 className="text-sm font-extrabold text-gray-900">
                  Single Full Payment (30 Days)
                </h4>
                <p className="text-[11px] text-gray-500 font-medium">
                  Settle after 30 days · Backed by Mutual Funds
                </p>
              </div>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              0% Interest
            </span>
          </div>
          <div className="pt-2 border-t border-purple-100 flex items-baseline justify-between">
            <span className="text-xs text-gray-500 font-medium">Amount Due in 30 Days:</span>
            <span className="text-lg font-black text-gray-950">₹{formatINR(price)}</span>
          </div>
        </div>
      )}

      {/* Mode 2: Collapsible EMI Accordion matching Image 1 & 2 */}
      {paymentMode === "emi" && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-4">
          {/* Header Row: Starts at ₹X,XXX/mo + Hide plans ^ / Show plans ▾ */}
          <div
            onClick={() => setShowPlans(!showPlans)}
            className="flex items-center justify-between cursor-pointer select-none py-1"
          >
            <div className="text-xs font-medium text-gray-500">
              Starts at{" "}
              <strong className="text-sm font-black text-gray-900">
                ₹{formatINR(lowestMonthly)}/mo
              </strong>
            </div>

            <button
              type="button"
              className="flex items-center gap-1 text-xs font-bold text-[#601CEB] hover:text-[#4E12C8]"
            >
              <span>{showPlans ? "Hide plans" : "Show plans"}</span>
              {showPlans ? (
                <ChevronUp className="w-4 h-4 stroke-[2.5]" />
              ) : (
                <ChevronDown className="w-4 h-4 stroke-[2.5]" />
              )}
            </button>
          </div>

          {/* Plan Rows (When Expanded) - Exact layout from Image 1 */}
          {showPlans && (
            <div className="mt-3 pt-2 border-t border-gray-100 divide-y divide-gray-100">
              {calculatedPlans.map((plan) => {
                const isSelected = selectedPlanId === plan.planId;
                return (
                  <div
                    key={plan.planId}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectPlan(plan);
                    }}
                    className={`py-3 px-2 flex items-center justify-between transition-colors cursor-pointer rounded-xl ${
                      isSelected
                        ? "bg-purple-50/80 font-bold"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    {/* Left: Radio + Tenure & Rate */}
                    <div className="flex items-center gap-2.5">
                      <div className="flex-shrink-0">
                        {isSelected ? (
                          <CheckCircle2 className="w-4 h-4 text-[#601CEB] fill-purple-100" />
                        ) : (
                          <Circle className="w-4 h-4 text-gray-300" />
                        )}
                      </div>
                      <div>
                        <span className="text-xs sm:text-[13px] font-medium text-gray-800">
                          {plan.tenureMonths} months · {plan.interestRate === 0 ? "0% p.a." : `${plan.interestRate}% p.a.`}
                        </span>
                      </div>
                    </div>

                    {/* Right: Monthly Amount */}
                    <div className="text-right">
                      <strong className="text-xs sm:text-[13px] font-extrabold text-gray-950">
                        ₹{formatINR(plan.monthlyPayment)}
                      </strong>{" "}
                      <span className="text-gray-400 font-normal text-[11px]">/mo</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
