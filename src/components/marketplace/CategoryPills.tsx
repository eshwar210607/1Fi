"use client";

import React from "react";
import { Category } from "@/types";

interface CategoryPillsProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

export const CategoryPills: React.FC<CategoryPillsProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 px-4">
      {categories.map((cat) => {
        const isSelected = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold transition-all duration-150 flex items-center gap-1.5 ${
              isSelected
                ? "bg-[#601CEB] text-white shadow-sm"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            <span>{cat.name}</span>
            {cat.count > 0 && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isSelected ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                }`}
              >
                {cat.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
