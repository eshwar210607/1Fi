"use client";

import React, { useState } from "react";
import { Search, MapPin, ChevronDown, ArrowRight } from "lucide-react";

interface NearbyStoresViewProps {
  onSwitchToMarketplace: () => void;
}

export const NearbyStoresView: React.FC<NearbyStoresViewProps> = ({ onSwitchToMarketplace }) => {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("Dhanbad");

  const stores = [
    {
      id: "trip-bouquet",
      name: "TripBouquet",
      distance: "1068 KM",
      address: "241, Tower B, Spazedge, near Dmart, Gurugram, Haryana, 122018",
      iconBg: "#E0F2FE",
      iconColor: "#0369A1",
      initials: "TB",
    },
    {
      id: "atelier",
      name: "Atelier Forbidden Joy",
      distance: "1068 KM",
      address: "Sector 40, Gurugram, Haryana, 122001",
      iconBg: "#FEF3C7",
      iconColor: "#B45309",
      initials: "AF",
    },
    {
      id: "charger-on-wheels",
      name: "Charger On Wheels",
      distance: "1069 KM",
      address: "Orchid Business Park, Near Subhash Chowk, Gurugram, 122101",
      iconBg: "#DCFCE7",
      iconColor: "#15803D",
      initials: "CW",
    },
    {
      id: "ashoka-suzuki",
      name: "Ashoka Suzuki",
      distance: "1069 KM",
      address: "Khata No 271, 316, Badshahpur Sohna Rd, Gurugram, Haryana",
      iconBg: "#FEE2E2",
      iconColor: "#B91C1C",
      initials: "SZ",
    },
    {
      id: "malwa-honda",
      name: "Malwa Honda Khand...",
      distance: "1072 KM",
      address: "60, Khandsa Rd, Pace City I, Sector 10A, Gurugram, Haryana",
      iconBg: "#F3E8FF",
      iconColor: "#7E22CE",
      initials: "HD",
    },
  ];

  const filtered = stores.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col bg-[#F8F9FB] pb-8">
      {/* Search Bar + Location Selector */}
      <div className="px-4 py-2 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-gray-800">Nearby Merchant Stores</span>
          <div className="flex items-center gap-1 text-xs font-semibold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100 cursor-pointer">
            <MapPin className="w-3 h-3 text-[#601CEB]" />
            <span>{location}</span>
            <ChevronDown className="w-3 h-3 text-[#601CEB]" />
          </div>
        </div>

        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search stores near you..."
            className="w-full bg-white text-gray-800 placeholder-gray-400 text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:border-[#601CEB] shadow-2xs"
          />
        </div>
      </div>

      {/* Reference Context Callout */}
      <div className="mx-4 my-1.5 p-3 rounded-2xl bg-purple-50/80 border border-purple-200/80 flex items-center justify-between text-xs">
        <div>
          <span className="font-bold text-[#601CEB] block">
            Offline 1Fi Merchant Stores
          </span>
          <span className="text-[11px] text-gray-500">
            Pay directly at retail outlets with MF EMIs
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

      {/* Stores List */}
      <div className="px-4 py-2 space-y-2.5">
        {filtered.map((store) => (
          <div
            key={store.id}
            onClick={onSwitchToMarketplace}
            className="p-3.5 bg-white rounded-2xl border border-gray-100 shadow-card hover:border-purple-200 transition-colors cursor-pointer space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0"
                  style={{ backgroundColor: store.iconBg, color: store.iconColor }}
                >
                  {store.initials}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{store.name}</h4>
                </div>
              </div>
              <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                {store.distance}
              </span>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
              {store.address}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
