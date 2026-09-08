"use client";

import React, { useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import { BrandVoucherDetailView } from "../brand-voucher/BrandVoucherDetailView";

interface TopBrandsViewProps {
  onSwitchToMarketplace: () => void;
}

export const TopBrandsView: React.FC<TopBrandsViewProps> = ({ onSwitchToMarketplace }) => {
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<any | null>(null);

  const brands = [
    {
      id: "apple-reseller",
      name: "Apple Premium Reseller",
      emi: "No-cost EMIs upto 24 months",
      iconBg: "#000000",
      iconText: "",
      category: "Electronics",
    },
    {
      id: "air-india",
      name: "Air India",
      emi: "No-cost EMIs upto 18 months",
      iconBg: "#D91B24",
      iconText: "AI",
      category: "Travel",
    },
    {
      id: "caratlane",
      name: "CaratLane",
      emi: "No-cost EMIs upto 6 months",
      iconBg: "#7B2869",
      iconText: "CL",
      category: "Jewellery",
    },
    {
      id: "croma",
      name: "Croma",
      emi: "No-cost EMIs upto 6 months",
      iconBg: "#00838F",
      iconText: "Cr",
      category: "Electronics",
    },
    {
      id: "easemytrip",
      name: "EaseMyTrip Holiday",
      emi: "No-cost EMIs upto 24 months",
      iconBg: "#1976D2",
      iconText: "ET",
      category: "Travel",
    },
    {
      id: "wakefit",
      name: "Wakefit",
      emi: "No-cost EMIs upto 12 months",
      iconBg: "#2E3192",
      iconText: "Wf",
      category: "Furniture",
    },
  ];

  const filtered = brands.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  if (selectedBrand) {
    return (
      <BrandVoucherDetailView
        brand={selectedBrand}
        onBack={() => setSelectedBrand(null)}
      />
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#F8F9FB] pb-8">
      {/* Search Bar */}
      <div className="px-4 py-2">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search online stores..."
            className="w-full bg-white text-gray-800 placeholder-gray-400 text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:border-[#601CEB] shadow-2xs"
          />
        </div>
      </div>

      {/* Reference Context Callout */}
      <div className="mx-4 my-1.5 p-3 rounded-2xl bg-purple-50/80 border border-purple-200/80 flex items-center justify-between text-xs">
        <div>
          <span className="font-bold text-[#601CEB] block">
            Existing 1Fi Partner Brands
          </span>
          <span className="text-[11px] text-gray-500">
            Click any brand to view the Voucher & EMI flow
          </span>
        </div>
        <button
          onClick={onSwitchToMarketplace}
          className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-[#601CEB] px-3 py-1.5 rounded-full shadow-sm hover:bg-[#4E12C8]"
        >
          <span>Marketplace</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Brand Cards List */}
      <div className="px-4 py-2 space-y-2.5">
        {filtered.map((brand) => (
          <div
            key={brand.id}
            className="p-3.5 bg-white rounded-2xl border border-gray-100 shadow-card flex items-center justify-between gap-3 hover:border-purple-200 transition-colors cursor-pointer"
            onClick={() => setSelectedBrand(brand)}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0"
                style={{ backgroundColor: brand.iconBg }}
              >
                {brand.iconText}
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">{brand.name}</h4>
                <p className="text-xs text-gray-500 mt-0.5">{brand.emi}</p>
              </div>
            </div>

            <span className="text-[11px] font-bold text-[#601CEB] bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">
              Vouchers
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
