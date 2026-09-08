"use client";

import React, { useState } from "react";
import { EMIPlan, CalculatedEMI } from "@/types";
import { calculateEMIForPlan, getPayInFullPlan, formatINR } from "@/lib/emiCalculator";
import { Sparkles, CheckCircle2, Circle, Calendar, CreditCard } from "lucide-react";

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
  const [paymentMode, setPaymentMode] = useState<"emi" | "full">("emi");

  // Calculate standard multi-month plans
  const calculatedPlans: CalculatedEMI[] = plans.map((plan) =>
    calculateEMIForPlan(price, plan)
  );

  const fullPlan = getPayInFullPlan(price);

  const handleModeChange = (mode: "emi" | "full") => {
    setPaymentMode(mode);
    if (mode === "full") {
      onSelectPlan(fullPlan);
    } else {
      onSelectPlan(calculatedPlans[0]);
    }
  };

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
            Payment options backed by mutual funds
          </span>
        </div>
      </div>

      {/* Payment Mode Switcher (EMIs vs Pay in Full) */}
      <div className="flex items-center p-1 bg-gray-100/80 rounded-2xl mb-3.5 text-xs font-bold">
        <button
          type="button"
          onClick={() => handleModeChange("emi")}
          className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
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
          className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
            paymentMode === "full"
              ? "bg-white text-[#601CEB] shadow-sm"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Pay in Full (30 Days)</span>
        </button>
      </div>

      {/* Mode 1: Pay in Full (Single 30-Day Payment) */}
      {paymentMode === "full" && (
        <div
          onClick={() => onSelectPlan(fullPlan)}
          className="p-4 rounded-2xl border border-[#601CEB] bg-purple-50/60 shadow-sm transition-all cursor-pointer space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#601CEB] fill-purple-100" />
              <div>
                <h4 className="text-sm font-extrabold text-gray-900">
                  Single Full Payment (30-Day Settlement)
                </h4>
                <p className="text-[11px] text-gray-500 font-medium">
                  Pay full amount after 30 days · No bank debit today
                </p>
              </div>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              0% Interest
            </span>
          </div>

          <div className="pt-2 border-t border-purple-100/80 flex items-baseline justify-between">
            <div>
              <span className="text-[11px] text-gray-500">Amount Due:</span>
              <div className="text-xl font-black text-gray-950">
                ₹{formatINR(price)}
              </div>
            </div>
            <div className="text-right text-[11px] text-gray-500">
              <span>Due in 30 Days</span>
              <span className="block font-semibold text-purple-900">Zero Processing Fee</span>
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Pay in Multi-Month EMIs */}
      {paymentMode === "emi" && (
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
      )}
    </div>
  );
};
