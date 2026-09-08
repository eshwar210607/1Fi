"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  Share2,
  ChevronUp,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { formatINR } from "@/lib/emiCalculator";
import { TermsBottomSheet } from "./TermsBottomSheet";

interface BrandVoucherDetailViewProps {
  brand: {
    id: string;
    name: string;
    emi: string;
    iconBg: string;
    iconText: string;
    category: string;
  };
  onBack: () => void;
}

export const BrandVoucherDetailView: React.FC<BrandVoucherDetailViewProps> = ({
  brand,
  onBack,
}) => {
  const [amount, setAmount] = useState<number>(50000);
  const [isEditingAmount, setIsEditingAmount] = useState<boolean>(false);
  const [showPlans, setShowPlans] = useState<boolean>(true);
  const [isTermsOpen, setIsTermsOpen] = useState<boolean>(false);
  const [shareToast, setShareToast] = useState<boolean>(false);

  // Dynamic calculation for the 9 standard 1Fi tenures based on entered amount
  const emiRates = [
    { months: 3, rate: 0 },
    { months: 6, rate: 0 },
    { months: 9, rate: 0 },
    { months: 12, rate: 0 },
    { months: 18, rate: 0 },
    { months: 24, rate: 0 },
    { months: 36, rate: 7.49 },
    { months: 48, rate: 7.99 },
    { months: 60, rate: 8.49 },
  ];

  const calculatedPlans = emiRates.map((item) => {
    let monthly = 0;
    if (item.rate === 0) {
      monthly = Math.round(amount / item.months);
    } else {
      const annualRate = item.rate / 100;
      const totalInterest = amount * annualRate * (item.months / 12);
      monthly = Math.round((amount + totalInterest) / item.months);
    }
    return {
      months: item.months,
      rate: item.rate,
      monthly,
    };
  });

  const lowestMonthly = calculatedPlans[calculatedPlans.length - 1]?.monthly || 1026;

  const howToUseSteps = [
    "This gift voucher is accepted exclusively at select Apple Premium Partner, Apple Premium Reseller and Mono Apple Authorised Reseller stores within India.",
    "You can find your nearest with the official store locator.",
    "To redeem the gift card, the store cashier will generate a payment link for the value of the gift card.",
    "The customer receives the payment link via email or SMS.",
    "The customer clicks on the link which opens the checkout page.",
    "They choose the \"Pay by Gift Card\" option.",
    "The customer enters the gift card number and PIN and makes the payment.",
    "The cashier sees that the payment link status has changed to \"Paid\" on their dashboard.",
    "The customer can pay the balance of the purchase amount, if any, using any other payment method available at the store.",
  ];

  const termsPoints = [
    "Comes with 12 months validity and is redeemable exclusively at select Apple Premium Partner, Apple Premium Reseller and Mono Apple Authorised Reseller stores within India",
    "Customers can redeem the gift card at multiple stores in case of partial redemptions.",
    "Customer can only redeem up to Rs 40,000 worth Gift Cards in a single order invoice.",
  ];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col justify-between">
      {/* Top Header: `< Pay using 1Fi` + Share */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-3.5 flex items-center justify-between shadow-2xs">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm font-bold text-gray-900 hover:text-[#601CEB] transition-colors"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          <span>Pay using 1Fi</span>
        </button>

        <button
          onClick={handleShare}
          className="p-2 rounded-full text-[#601CEB] hover:bg-purple-50 transition-colors relative"
          title="Share"
        >
          <Share2 className="w-4 h-4 stroke-[2]" />
          {shareToast && (
            <span className="absolute -bottom-6 right-0 text-[10px] bg-gray-900 text-white px-2 py-0.5 rounded shadow">
              Copied!
            </span>
          )}
        </button>
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 px-4 py-5 space-y-4 pb-32 max-w-lg mx-auto w-full">
        {/* Brand Banner Card */}
        <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-card flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-base shadow-sm flex-shrink-0"
              style={{ backgroundColor: brand.iconBg }}
            >
              {brand.iconText}
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">{brand.name}</h3>
              <span className="inline-block mt-0.5 text-[10px] font-bold text-[#601CEB] bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
                Gift voucher Online
              </span>
            </div>
          </div>
        </div>

        {/* Voucher Title & Amount Section (Matching Image 1) */}
        <div className="text-center pt-2 pb-1 space-y-1">
          <h2 className="text-2xl font-black text-gray-950 tracking-tight">
            Gift voucher
          </h2>
          <p className="text-xs font-semibold text-gray-500">
            Up to 60 months EMIs
          </p>

          <p className="text-[11px] font-medium text-gray-400 pt-3">
            Enter the purchase amount · ₹1,000 – ₹10,00,000
          </p>

          {/* Amount Display */}
          <div className="pt-1 pb-3 flex items-center justify-center">
            {isEditingAmount ? (
              <div className="flex items-center justify-center gap-1">
                <span className="text-2xl font-bold text-gray-400">₹</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value) || 0)}
                  onBlur={() => setIsEditingAmount(false)}
                  autoFocus
                  className="text-3xl font-black text-gray-950 w-44 text-center border-b-2 border-[#601CEB] focus:outline-none"
                />
              </div>
            ) : (
              <div
                onClick={() => setIsEditingAmount(true)}
                className="flex items-baseline justify-center gap-2 cursor-pointer group"
                title="Click to edit amount"
              >
                <span className="text-2xl sm:text-3xl font-bold text-gray-400">
                  ₹
                </span>
                <span className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight group-hover:text-[#601CEB] transition-colors">
                  {formatINR(amount)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* EMI Plans Accordion with Hide/Show Toggle (Matching Images 1 & 2) */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-4">
          {/* Header Row */}
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

          {/* Collapsible Plans List */}
          {showPlans && (
            <div className="mt-3 pt-2 border-t border-gray-100 divide-y divide-gray-100">
              {calculatedPlans.map((plan) => (
                <div
                  key={plan.months}
                  className="py-2.5 flex items-center justify-between text-xs sm:text-[13px]"
                >
                  <span className="font-medium text-gray-800">
                    {plan.months} months · {plan.rate}% p.a.
                  </span>
                  <span className="text-right">
                    <strong className="font-extrabold text-gray-950">
                      ₹{formatINR(plan.monthly)}
                    </strong>{" "}
                    <span className="text-gray-400 font-normal">/mo</span>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* How to Use Card (Matching Images 2 & 3) */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-4 sm:p-5 space-y-3">
          <h3 className="text-sm font-bold text-gray-900">How to use</h3>
          <div className="space-y-3">
            {howToUseSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-gray-700 leading-relaxed">
                <span className="w-5 h-5 rounded-full bg-[#EDE5FC] text-[#601CEB] font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Terms and Conditions Card with View All (Matching Image 3) */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-4 sm:p-5 space-y-3">
          <h3 className="text-sm font-bold text-gray-900">Terms and Conditions</h3>
          <div className="space-y-2.5">
            {termsPoints.map((point, index) => (
              <div key={index} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-gray-600 leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-[#601CEB] flex-shrink-0 mt-0.5" />
                <p>{point}</p>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsTermsOpen(true)}
              className="flex items-center justify-between w-full text-xs font-bold text-[#601CEB] hover:text-[#4E12C8] py-1"
            >
              <span>View All</span>
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Sticky Bottom Bar (Matching Images 1 & 2) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-100 px-4 py-3 shadow-elevated">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <button
            type="button"
            onClick={handleShare}
            className="w-12 h-12 rounded-full border border-purple-200 hover:border-[#601CEB] text-[#601CEB] hover:bg-purple-50 flex items-center justify-center flex-shrink-0 transition-colors"
            title="Share"
          >
            <Share2 className="w-5 h-5 stroke-[2]" />
          </button>

          <button
            type="button"
            onClick={() => alert(`Redirecting to 1Fi secure payment for ₹${formatINR(amount)} backed by Mutual Funds...`)}
            className="flex-1 py-3.5 px-6 rounded-full bg-[#601CEB] hover:bg-[#4E12C8] text-white text-sm font-bold shadow-md transition-all flex items-center justify-center gap-1.5 active:scale-[0.98]"
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Terms & Conditions Bottom Sheet Modal (Matching Image 4) */}
      <TermsBottomSheet
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        brandName={brand.name}
      />
    </div>
  );
};
