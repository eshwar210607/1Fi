"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product, ProductVariant, CalculatedEMI } from "@/types";
import { VariantSelector } from "./VariantSelector";
import { EMIPlanSelector } from "./EMIPlanSelector";
import { PledgeSummaryModal } from "./PledgeSummaryModal";
import { TermsBottomSheet } from "../brand-voucher/TermsBottomSheet";
import { calculateEMIForPlan, formatINR } from "@/lib/emiCalculator";
import {
  ChevronLeft,
  Share2,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface ProductDetailViewProps {
  product: Product;
  onBack: () => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  onBack,
}) => {
  // Active variant state (defaults to first variant)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0] || {
      id: "default",
      name: product.name,
      colorName: product.availableColors?.[0]?.name || "Default",
      colorHex: product.availableColors?.[0]?.hex || "#000",
      storage: product.availableStorage?.[0],
      mrp: product.baseMrp,
      price: product.basePrice,
      image: product.defaultImage,
      inStock: true,
    }
  );

  // Selected EMI plan
  const initialCalculated = calculateEMIForPlan(
    selectedVariant.price,
    product.emiPlans[1] || product.emiPlans[0]
  );
  const [selectedPlan, setSelectedPlan] = useState<CalculatedEMI>(initialCalculated);
  const [isPledgeModalOpen, setIsPledgeModalOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  // When variant changes, update selected plan calculations with new price
  const handleVariantChange = (newVariant: ProductVariant) => {
    setSelectedVariant(newVariant);
    const updatedPlan = product.emiPlans.find((p) => p.id === selectedPlan.planId) || product.emiPlans[0];
    setSelectedPlan(calculateEMIForPlan(newVariant.price, updatedPlan));
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2000);
    }
  };

  const howToUseSteps = [
    "Select your preferred product variant (color, finish and storage).",
    "Choose your desired no-cost EMI tenure (3 to 60 months) or single 30-day payment.",
    "Your mutual fund portfolio is instantly evaluated via CAMS/KFintech with zero credit score check.",
    "A temporary pledge lock is placed on the required units without selling or breaking your investments.",
    "Your order is processed for immediate delivery, while your mutual funds continue compounding market returns.",
    "Pay your monthly EMI seamlessly via auto-debit or UPI on your due date.",
    "Once the loan is fully repaid, your mutual fund pledge is immediately released.",
  ];

  const termsPoints = [
    "Comes with 12 months official manufacturer warranty across authorized service centers in India.",
    "Customers can foreclose or prepay the remaining balance anytime with zero pre-closure charges.",
    "Your mutual fund portfolio remains 100% in your name, retaining dividend payouts and capital appreciation.",
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col justify-between">
      {/* 1Fi App Top Header: `< Pay using 1Fi` + Share */}
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
          {shareSuccess && (
            <span className="absolute -bottom-6 right-0 text-[10px] bg-gray-900 text-white px-2 py-0.5 rounded shadow">
              Copied!
            </span>
          )}
        </button>
      </div>

      {/* Main Content Scroll Area */}
      <div className="flex-1 px-4 py-4 space-y-4 pb-32 max-w-lg mx-auto w-full">
        {/* Brand & Product Title Card */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-card">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#601CEB]">
              {product.brand}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100">
              In Stock
            </span>
          </div>
          <h1 className="text-lg sm:text-xl font-extrabold text-gray-950 leading-snug">
            {selectedVariant.name}
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            {product.tagline}
          </p>
        </div>

        {/* Product Image Showcase */}
        <div className="relative w-full h-60 sm:h-72 bg-white rounded-2xl border border-gray-100 shadow-card flex items-center justify-center p-4 overflow-hidden">
          <div className="absolute top-3 left-3 flex items-center gap-1 text-[11px] font-bold text-[#601CEB] bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">
            <Sparkles className="w-3 h-3 fill-[#601CEB]" />
            <span>0% No-Cost EMI</span>
          </div>

          <Image
            src={selectedVariant.image || product.defaultImage}
            alt={selectedVariant.name}
            fill
            priority
            sizes="(max-width: 640px) 100vw, 450px"
            className="object-contain p-4 transition-all duration-300"
          />
        </div>

        {/* Variant Selector (Colors + Storage) */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-card">
          <VariantSelector
            product={product}
            selectedVariant={selectedVariant}
            onSelectVariant={handleVariantChange}
          />
        </div>

        {/* EMI Plans Collapsible Accordion (Matching Image 1 & 2) */}
        <EMIPlanSelector
          price={selectedVariant.price}
          mrp={selectedVariant.mrp}
          plans={product.emiPlans}
          selectedPlanId={selectedPlan.planId}
          onSelectPlan={(plan) => setSelectedPlan(plan)}
        />

        {/* Specifications & Features */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-card space-y-3">
          <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-gray-800">
            Specifications & Features
          </h4>
          <div className="divide-y divide-gray-100 text-xs">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className="py-2.5 flex justify-between gap-4">
                <span className="text-gray-500 font-medium">{key}</span>
                <span className="text-gray-900 font-semibold text-right">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* How to Use Card (Matching Image 2 & 3) */}
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

        {/* Terms and Conditions Card Matching Image 3 */}
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
          {/* Circular Share Button */}
          <button
            type="button"
            onClick={handleShare}
            className="w-12 h-12 rounded-full border border-purple-200 hover:border-[#601CEB] text-[#601CEB] hover:bg-purple-50 flex items-center justify-center flex-shrink-0 transition-colors"
            title="Share"
          >
            <Share2 className="w-5 h-5 stroke-[2]" />
          </button>

          {/* Continue CTA Button */}
          <button
            type="button"
            onClick={() => setIsPledgeModalOpen(true)}
            className="flex-1 py-3.5 px-6 rounded-full bg-[#601CEB] hover:bg-[#4E12C8] text-white text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <span>Continue</span>
            <span className="text-xs font-medium text-purple-200">
              (₹{formatINR(selectedPlan.monthlyPayment)}/mo)
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Terms Bottom Sheet Modal Matching Image 4 */}
      <TermsBottomSheet
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        brandName={product.name}
      />

      {/* Mutual Fund Pledge Summary Modal */}
      {isPledgeModalOpen && (
        <PledgeSummaryModal
          product={product}
          variant={selectedVariant}
          emiPlan={selectedPlan}
          onClose={() => setIsPledgeModalOpen(false)}
          onSuccess={() => {
            setIsPledgeModalOpen(false);
            onBack();
          }}
        />
      )}
    </div>
  );
};
