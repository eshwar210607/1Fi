"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product, ProductVariant, CalculatedEMI } from "@/types";
import { VariantSelector } from "./VariantSelector";
import { EMIPlanSelector } from "./EMIPlanSelector";
import { PledgeSummaryModal } from "./PledgeSummaryModal";
import { calculateEMIForPlan, formatINR } from "@/lib/emiCalculator";
import {
  ChevronLeft,
  Share2,
  ShieldCheck,
  Check,
  ArrowRight,
  Sparkles,
  Info,
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

  // Selected EMI plan (defaults to first or 6-month / 12-month no-cost plan)
  const initialCalculated = calculateEMIForPlan(
    selectedVariant.price,
    product.emiPlans[1] || product.emiPlans[0]
  );
  const [selectedPlan, setSelectedPlan] = useState<CalculatedEMI>(initialCalculated);
  const [isPledgeModalOpen, setIsPledgeModalOpen] = useState(false);
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

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col justify-between">
      {/* 1Fi App Top Header (Matches `< Pay using 1Fi` from video) */}
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
          className="p-2 rounded-full text-purple-600 hover:bg-purple-50 transition-colors relative"
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
      <div className="flex-1 px-4 py-4 space-y-5 pb-32 max-w-2xl mx-auto w-full">
        {/* Product Brand & Title */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#601CEB]">
              {product.brand}
            </span>
            <span className="text-[11px] px-2 py-0.2 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-100">
              In Stock
            </span>
          </div>
          <h1 className="text-lg sm:text-2xl font-extrabold text-gray-950 leading-snug">
            {selectedVariant.name}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {product.tagline}
          </p>
        </div>

        {/* Big Product Image Showcase */}
        <div className="relative w-full h-64 sm:h-80 bg-white rounded-3xl border border-gray-100 shadow-card flex items-center justify-center p-4 overflow-hidden">
          <div className="absolute top-3 left-3 flex items-center gap-1 text-[11px] font-bold text-[#601CEB] bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">
            <Sparkles className="w-3 h-3 fill-[#601CEB]" />
            <span>0% No-Cost EMI</span>
          </div>

          <Image
            src={selectedVariant.image || product.defaultImage}
            alt={selectedVariant.name}
            fill
            priority
            sizes="(max-width: 640px) 100vw, 500px"
            className="object-contain p-4 transition-all duration-300"
          />
        </div>

        {/* Variant Selector (Colors + Storage) */}
        <div className="bg-white rounded-3xl p-4 border border-gray-100 shadow-card">
          <VariantSelector
            product={product}
            selectedVariant={selectedVariant}
            onSelectVariant={handleVariantChange}
          />
        </div>

        {/* EMI Plans Table (Direct match with PDF assignment reference!) */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-gray-100 shadow-card">
          <EMIPlanSelector
            price={selectedVariant.price}
            mrp={selectedVariant.mrp}
            plans={product.emiPlans}
            selectedPlanId={selectedPlan.planId}
            onSelectPlan={(plan) => setSelectedPlan(plan)}
          />
        </div>

        {/* 1Fi Advantage Banner */}
        <div className="p-4 rounded-3xl bg-gradient-to-br from-[#1C0548] to-[#48119C] text-white space-y-3 shadow-md">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h4 className="text-sm font-bold">How 1Fi Mutual Fund EMI Works</h4>
          </div>
          <ul className="text-xs text-purple-100 space-y-1.5 font-normal leading-relaxed">
            <li className="flex items-start gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Zero Credit Check:</strong> Approval is guaranteed against your existing mutual funds.
              </span>
            </li>
            <li className="flex items-start gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>No Portfolio Liquidation:</strong> Keep earning market returns while you pay EMIs.
              </span>
            </li>
            <li className="flex items-start gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Prepay Anytime:</strong> Zero pre-closure penalty to unpledge your funds early.
              </span>
            </li>
          </ul>
        </div>

        {/* Specifications & Highlights */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-card space-y-3">
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
      </div>

      {/* Sticky Bottom Action Bar (Proceed with selected plan CTA) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-100 px-4 py-3 shadow-elevated">
        <div className="max-w-md mx-auto flex items-center justify-between gap-4">
          <div className="min-w-0">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
              Selected Plan
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-xl font-extrabold text-gray-950 tracking-tight">
                ₹{formatINR(selectedPlan.monthlyPayment)}
              </span>
              <span className="text-xs text-gray-500 font-semibold">
                / mo ({selectedPlan.tenureMonths}m)
              </span>
            </div>
            {selectedPlan.isNoCost && (
              <span className="text-[10px] text-emerald-700 font-bold">
                0% Interest No-Cost EMI
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsPledgeModalOpen(true)}
            className="flex-1 max-w-[220px] py-3.5 px-4 rounded-full bg-[#601CEB] hover:bg-[#4E12C8] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-1.5 active:scale-95"
          >
            <span>Proceed with plan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

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

