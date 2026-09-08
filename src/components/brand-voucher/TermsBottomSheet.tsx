"use client";

import React from "react";
import { ExternalLink } from "lucide-react";

interface TermsBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  brandName?: string;
}

export const TermsBottomSheet: React.FC<TermsBottomSheetProps> = ({
  isOpen,
  onClose,
  brandName = "Apple Premium Reseller",
}) => {
  if (!isOpen) return null;

  const termsList = [
    "This gift voucher is accepted exclusively at select Apple Premium Partner, Apple Premium Reseller and Mono Apple Authorised Reseller stores within India.",
    "You can find your nearest store with the official store locator.",
    "To redeem the gift card, the store cashier will generate a payment link for the value of the gift card.",
    "There is no limit on the number of gift vouchers or total value of gift vouchers that a customer can redeem in a single invoice.",
    "Customers can redeem the gift voucher at multiple stores in case of partial redemptions.",
    "If the order value exceeds the cumulative balance in the gift voucher, the balance must be paid via another payment method available in the stores.",
    "If the order value is less than the cumulative balance in the gift voucher, the remaining balance will remain in the gift voucher and can be used for future transactions until expiry.",
    "No returns and no refunds on Gift cards, E-Gift cards and E-Gift vouchers.",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-[430px] bg-white rounded-t-[28px] shadow-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag Handle */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-3 mb-2" />

        {/* Modal Title */}
        <div className="px-6 py-2 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-950">Terms and Conditions</h3>
        </div>

        {/* Scrollable Terms List */}
        <div className="px-6 py-4 overflow-y-auto space-y-4 flex-1">
          {termsList.map((term, index) => (
            <div key={index} className="flex items-start gap-3 text-xs sm:text-[13px] text-gray-700 leading-relaxed">
              <span className="w-5 h-5 rounded-full bg-[#EDE5FC] text-[#601CEB] font-bold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">
                {index + 1}
              </span>
              <p>{term}</p>
            </div>
          ))}

          {/* External Link */}
          <div className="pt-2 pb-1">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#601CEB] transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Full terms on {brandName}</span>
            </a>
          </div>
        </div>

        {/* Bottom CTA Button */}
        <div className="p-4 border-t border-gray-100 bg-white">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3.5 rounded-full bg-[#601CEB] hover:bg-[#4E12C8] text-white text-sm font-bold shadow-md transition-all active:scale-[0.98]"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
