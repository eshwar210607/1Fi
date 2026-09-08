"use client";

import React from "react";
import { Product, ProductVariant } from "@/types";
import { Check } from "lucide-react";

interface VariantSelectorProps {
  product: Product;
  selectedVariant: ProductVariant;
  onSelectVariant: (variant: ProductVariant) => void;
}

export const VariantSelector: React.FC<VariantSelectorProps> = ({
  product,
  selectedVariant,
  onSelectVariant,
}) => {
  // If product has distinct storage options
  const storageOptions = product.availableStorage || [];

  const handleColorChange = (colorName: string) => {
    // Find variant matching current storage + new color, or fallback to first matching color
    const matching =
      product.variants.find(
        (v) =>
          v.colorName.toLowerCase() === colorName.toLowerCase() &&
          v.storage === selectedVariant.storage
      ) ||
      product.variants.find(
        (v) => v.colorName.toLowerCase() === colorName.toLowerCase()
      );

    if (matching) onSelectVariant(matching);
  };

  const handleStorageChange = (storage: string) => {
    // Find variant matching current color + new storage, or fallback to first matching storage
    const matching =
      product.variants.find(
        (v) =>
          v.storage === storage &&
          v.colorName.toLowerCase() === selectedVariant.colorName.toLowerCase()
      ) || product.variants.find((v) => v.storage === storage);

    if (matching) onSelectVariant(matching);
  };

  return (
    <div className="space-y-4 py-3 border-y border-gray-100">
      {/* Color Selection */}
      {product.availableColors && product.availableColors.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-800">
              Color:{" "}
              <span className="text-gray-500 font-medium">
                {selectedVariant.colorName}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {product.availableColors.map((color, idx) => {
              const isSelected =
                selectedVariant.colorName.toLowerCase() === color.name.toLowerCase();
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleColorChange(color.name)}
                  className={`group relative flex items-center justify-center p-1 rounded-full border-2 transition-all ${
                    isSelected
                      ? "border-[#601CEB] scale-110 shadow-sm"
                      : "border-transparent hover:border-gray-300"
                  }`}
                  title={color.name}
                >
                  <div
                    className="w-7 h-7 rounded-full shadow-inner border border-gray-200 flex items-center justify-center"
                    style={{ backgroundColor: color.hex }}
                  >
                    {isSelected && (
                      <Check
                        className={`w-3.5 h-3.5 stroke-[3] ${
                          color.hex.toLowerCase() === "#ffffff" ||
                          color.hex.toLowerCase() === "#f2f1ed"
                            ? "text-gray-900"
                            : "text-white"
                        }`}
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Storage / Finish Selection */}
      {storageOptions.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-800">
              Storage:{" "}
              <span className="text-gray-500 font-medium">
                {selectedVariant.storage || "Standard"}
              </span>
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {storageOptions.map((storage) => {
              const isSelected = selectedVariant.storage === storage;
              return (
                <button
                  key={storage}
                  type="button"
                  onClick={() => handleStorageChange(storage)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border text-center ${
                    isSelected
                      ? "bg-purple-50 text-[#601CEB] border-[#601CEB] shadow-sm"
                      : "bg-white text-gray-700 hover:bg-gray-50 border-gray-200"
                  }`}
                >
                  {storage}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

