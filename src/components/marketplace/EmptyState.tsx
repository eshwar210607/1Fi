import React from "react";
import { Search } from "lucide-react";

interface EmptyStateProps {
  query?: string;
  onReset?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ query, onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center py-14 px-6 text-center">
      <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center mb-4 border border-purple-100 shadow-sm">
        <Search className="w-7 h-7 text-[#601CEB]" />
      </div>
      <h4 className="text-base font-bold text-gray-900">
        No matching products found
      </h4>
      <p className="mt-1 text-xs text-gray-500 max-w-xs">
        {query
          ? `We couldn't find any products matching "${query}". Try searching for something else.`
          : "Try selecting a different category or adjusting your search filters."}
      </p>
      {onReset && (
        <button
          onClick={onReset}
          className="mt-4 px-5 py-2 rounded-full bg-[#601CEB] text-white text-xs font-bold hover:bg-[#4E12C8] transition-all shadow-sm"
        >
          Reset Filters
        </button>
      )}
    </div>
  );
};
