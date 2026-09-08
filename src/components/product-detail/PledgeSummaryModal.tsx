"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product, ProductVariant, CalculatedEMI } from "@/types";
import { formatINR } from "@/lib/emiCalculator";
import {
  X,
  ShieldCheck,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Lock,
  Calendar,
  AlertCircle,
} from "lucide-react";

interface PledgeSummaryModalProps {
  product: Product;
  variant: ProductVariant;
  emiPlan: CalculatedEMI;
  onClose: () => void;
  onSuccess: () => void;
}

export const PledgeSummaryModal: React.FC<PledgeSummaryModalProps> = ({
  product,
  variant,
  emiPlan,
  onClose,
  onSuccess,
}) => {
  const [customerName, setCustomerName] = useState("Eshwar");
  const [customerPhone, setCustomerPhone] = useState("9876543210");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderResult, setOrderResult] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const pledgeAmount = Math.round(variant.price * product.mfPledgeRatio);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      setErrorMessage("Please fill in your name and phone number");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          variantId: variant.id,
          planId: emiPlan.planId,
          tenureMonths: emiPlan.tenureMonths,
          monthlyPayment: emiPlan.monthlyPayment,
          totalAmount: variant.price,
          pledgedMutualFundEstimate: pledgeAmount,
          customerName,
          customerPhone,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setOrderResult(json.data);
      } else {
        setErrorMessage(json.error || "Failed to confirm pledge");
      }
    } catch (err) {
      setErrorMessage("Network error during order confirmation");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-t-[32px] sm:rounded-3xl shadow-2xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-purple-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-purple-100 text-[#601CEB] flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-gray-900">
                1Fi Mutual Fund Pledge Summary
              </h3>
              <p className="text-[11px] text-gray-500 font-medium">
                No credit score pull · Zero liquidation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {orderResult ? (
            /* Order Success State */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle className="w-9 h-9 stroke-[2.5]" />
              </div>

              <div>
                <span className="text-xs font-bold text-[#601CEB] tracking-wider uppercase">
                  Pledge Confirmed
                </span>
                <h4 className="text-xl font-extrabold text-gray-950 mt-1">
                  Order Successfully Placed!
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  Order ID: <span className="font-mono font-bold text-gray-800">{orderResult.orderId}</span>
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 text-left space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Item:</span>
                  <span className="font-bold text-gray-800">{variant.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Monthly EMI:</span>
                  <span className="font-bold text-[#601CEB]">
                    ₹{formatINR(orderResult.monthlyEMI)} / mo ({orderResult.tenureMonths} mos)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">First Due Date:</span>
                  <span className="font-semibold text-gray-800">{orderResult.firstDueDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Mutual Fund Units Pledged:</span>
                  <span className="font-semibold text-emerald-700">
                    ₹{formatINR(orderResult.pledgedMutualFundEstimate)}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start gap-2 text-left">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-emerald-800 leading-relaxed">
                  Your mutual fund portfolio will continue earning returns while locked. You can release your pledged units anytime by prepaying with zero penalties.
                </p>
              </div>

              <button
                onClick={() => {
                  onSuccess();
                  onClose();
                }}
                className="w-full py-3.5 rounded-full bg-[#601CEB] hover:bg-[#4E12C8] text-white text-xs font-bold shadow-md transition-all"
              >
                Back to 1Fi Marketplace
              </button>
            </div>
          ) : (
            /* Order Review Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Product Card Row */}
              <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-gray-50 border border-gray-200">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white flex-shrink-0 border border-gray-100">
                  <Image
                    src={variant.image || product.defaultImage}
                    alt={variant.name}
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                    {variant.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-500">
                    <span>{variant.colorName}</span>
                    {variant.storage && <span>· {variant.storage}</span>}
                  </div>
                  <div className="text-xs font-extrabold text-gray-900 mt-1">
                    ₹{formatINR(variant.price)}
                  </div>
                </div>
              </div>

              {/* Chosen EMI Plan Box */}
              <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-900">
                    Selected EMI Plan:
                  </span>
                  <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-[#601CEB] text-white">
                    {emiPlan.isNoCost ? "0% Interest" : `${emiPlan.interestRate}% Interest`}
                  </span>
                </div>
                <div className="flex items-baseline justify-between pt-1">
                  <div className="text-xl font-black text-gray-900">
                    ₹{formatINR(emiPlan.monthlyPayment)}{" "}
                    <span className="text-xs font-semibold text-gray-500">
                      / month
                    </span>
                  </div>
                  <span className="text-xs font-bold text-gray-700">
                    {emiPlan.tenureMonths} Months
                  </span>
                </div>
                {emiPlan.cashbackText && (
                  <div className="text-[11px] font-bold text-emerald-700">
                    ✓ {emiPlan.cashbackText}
                  </div>
                )}
              </div>

              {/* Mutual Fund Collateral Calculation */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50/70 via-white to-purple-50/70 border border-blue-100 space-y-2 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-gray-800">
                  <TrendingUp className="w-4 h-4 text-[#601CEB]" />
                  <span>Mutual Fund Collateral Guarantee</span>
                </div>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  To secure this no-cost EMI without a credit check, 1Fi pledges approx{" "}
                  <strong className="text-gray-900">₹{formatINR(pledgeAmount)}</strong> worth of
                  your existing mutual fund units.
                </p>
                <div className="pt-2 border-t border-gray-200 grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-gray-400 block">Lending Partner</span>
                    <span className="font-semibold text-gray-800">RBI Regulated NBFC</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Exit Load / Tax</span>
                    <span className="font-semibold text-emerald-700">₹0 (Zero impact)</span>
                  </div>
                </div>
              </div>

              {/* Contact Verification */}
              <div className="space-y-2.5 pt-1">
                <label className="block text-xs font-bold text-gray-800">
                  Investor Details for Mutual Fund Verification
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Full Name (as per PAN)"
                    required
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#601CEB] focus:ring-1 focus:ring-purple-200"
                  />
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Mobile Number (linked to MF)"
                    required
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#601CEB] focus:ring-1 focus:ring-purple-200"
                  />
                </div>
              </div>

              {errorMessage && (
                <div className="p-2.5 rounded-xl bg-red-50 text-red-700 text-xs font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-full bg-[#601CEB] hover:bg-[#4E12C8] disabled:opacity-70 text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Securing Pledge Lock...</span>
                ) : (
                  <>
                    <span>Confirm & Lock Pledge</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
