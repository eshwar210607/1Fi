"use client";

import React from "react";
import { EMIPlan, CalculatedEMI } from "@/types";
import { calculateEMIForPlan, formatINR } from "@/lib/emiCalculator";
import { Sparkles, CheckCircle2, Circle } from "lucide-react";

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
  // Calculate EMI details for each plan dynamically based on current price
  const calculatedPlans: CalculatedEMI[] = plans.map((plan) =>
    calculateEMIForPlan(price, plan)
  );

  return (
    <div className="mt-4">
      {/* Header Matching Reference Assignment Spec */}
      <div className="mb-3">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-extrabold text-gray-950 tracking-tight">
            ₹{formatINR(price)}
          </span>
          <span className="text-xs text-gray-400 line-through font-medium">
            ₹{formatINR(mrp)}
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <Sparkles className="w-3.5 h-3.5 text-[#601CEB]" />
          <span className="text-xs font-bold text-[#601CEB] tracking-tight">
            EMI plans backed by mutual funds
          </span>
        </div>
      </div>

      {/* Plans List */}
      <div className="space-y-2.5">
        {calculatedPlans.map((calc) => {
          const isSelected = selectedPlanId === calc.planId;
          return (
            <div
              key={calc.planId}
              onClick={() => onSelectPlan(calc)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                isSelected
                  ? "bg-purple-50/60 border-[#601CEB] shadow-sm ring-1 ring-purple-200"
                  : "bg-white border-gray-200 hover:border-purple-200 hover:bg-gray-50/50"
              }`}
            >
              {/* Radio Indicator */}
              <div className="flex-shrink-0">
                {isSelected ? (
                  <CheckCircle2 className="w-5 h-5 text-[#601CEB] fill-purple-100" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-300" />
                )}
              </div>

              {/* Monthly Payment & Tenure */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span className="text-sm sm:text-base font-extrabold text-gray-900 tracking-tight">
                    ₹{formatINR(calc.monthlyPayment)}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-gray-600">
                    x {calc.tenureMonths} months
                  </span>
                </div>

                {calc.cashbackText && (
                  <p className="text-[11px] font-medium text-emerald-700 mt-0.5">
                    {calc.cashbackText}
                  </p>
                )}
              </div>

              {/* Interest Tag */}
              <div className="flex-shrink-0 text-right">
                <span
                  className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full border ${
                    calc.isNoCost || calc.interestRate === 0
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-gray-100 text-gray-700 border-gray-200"
                  }`}
                >
                  {calc.isNoCost || calc.interestRate === 0
                    ? "0% interest"
                    : `${calc.interestRate}% interest`}
                </span>
                {calc.isNoCost && (
                  <span className="block text-[9px] font-semibold text-gray-400 mt-0.5">
                    No-cost EMI
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

