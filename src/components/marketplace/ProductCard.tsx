"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Star, ChevronRight, ShieldCheck } from "lucide-react";
import { Product } from "@/types";
import { formatINR, getStartingMonthlyEMI } from "@/lib/emiCalculator";

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const startingEmi = getStartingMonthlyEMI(product.basePrice, product.emiPlans);
  const discountPercent = Math.round(
    ((product.baseMrp - product.basePrice) / product.baseMrp) * 100
  );

  return (
    <div
      onClick={() => onSelect(product)}
      className="group bg-white rounded-2xl border border-gray-100 p-4 shadow-card hover:shadow-elevated hover:border-purple-200 transition-all duration-200 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Top Badges & Rating */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-1.5">
            {product.badge && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 text-[#601CEB] uppercase tracking-wider">
                {product.badge}
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              0% Interest
            </span>
          </div>

          <div className="flex items-center gap-1 text-xs font-semibold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
            <span className="text-gray-400 font-normal">({product.reviewCount})</span>
          </div>
        </div>

        {/* Product Image */}
        <div className="relative w-full h-44 my-2 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center p-2 group-hover:scale-[1.02] transition-transform duration-200">
          <Image
            src={product.defaultImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, 360px"
            className="object-contain p-2"
          />
        </div>

        {/* Color Dots Preview */}
        {product.availableColors && product.availableColors.length > 0 && (
          <div className="flex items-center gap-1.5 mb-2 mt-1">
            <span className="text-[10px] text-gray-400 font-medium">Colors:</span>
            <div className="flex items-center gap-1">
              {product.availableColors.map((color, idx) => (
                <div
                  key={idx}
                  className="w-3 h-3 rounded-full border border-gray-300 shadow-2xs"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
            {product.availableStorage && product.availableStorage.length > 0 && (
              <span className="text-[10px] text-gray-400 font-medium ml-auto">
                {product.availableStorage.join(" · ")}
              </span>
            )}
          </div>
        )}

        {/* Brand & Name */}
        <div className="mt-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            {product.brand}
          </span>
          <h3 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-1 group-hover:text-[#601CEB] transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
            {product.tagline}
          </p>
        </div>

        {/* Price Row */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-extrabold text-gray-900 tracking-tight">
            ₹{formatINR(product.basePrice)}
          </span>
          <span className="text-xs text-gray-400 line-through font-medium">
            ₹{formatINR(product.baseMrp)}
          </span>
          {discountPercent > 0 && (
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
              {discountPercent}% OFF
            </span>
          )}
        </div>
      </div>

      {/* EMI Section & CTA */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between bg-purple-50/70 border border-purple-100 rounded-xl px-2.5 py-2 mb-3">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#601CEB]" />
            <span className="text-xs font-bold text-[#601CEB]">
              EMI from ₹{formatINR(startingEmi)}/mo
            </span>
          </div>
          <span className="text-[10px] font-semibold text-purple-700 bg-white px-2 py-0.5 rounded-md shadow-2xs">
            Mutual Fund Backed
          </span>
        </div>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full bg-[#601CEB] hover:bg-[#4E12C8] text-white text-xs font-bold shadow-sm transition-all group-hover:shadow-md"
        >
          <span>View EMI Plans</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
