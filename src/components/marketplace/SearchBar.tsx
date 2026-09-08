"use client";

import React from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (query: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search products, brands (e.g. iPhone, Samsung)...",
}) => {
  return (
    <div className="px-4 py-2">
      <div className="relative flex items-center">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-white text-gray-800 placeholder-gray-400 text-xs sm:text-sm pl-10 pr-9 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:border-[#601CEB] focus:ring-2 focus:ring-purple-100 transition-all shadow-sm"
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute right-3 text-gray-400 hover:text-gray-600 p-0.5 rounded-full hover:bg-gray-100"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
