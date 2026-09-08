import React from "react";

export const ProductSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-card flex flex-col justify-between animate-pulse">
      <div>
        {/* Badges */}
        <div className="flex justify-between items-center mb-3">
          <div className="h-5 w-20 bg-gray-200 rounded-full" />
          <div className="h-5 w-12 bg-gray-200 rounded-full" />
        </div>

        {/* Image Placeholder */}
        <div className="w-full h-40 bg-gray-100 rounded-xl mb-3 flex items-center justify-center animate-shimmer" />

        {/* Texts */}
        <div className="h-3 w-16 bg-gray-200 rounded mb-2" />
        <div className="h-5 w-3/4 bg-gray-200 rounded mb-2" />
        <div className="h-3 w-1/2 bg-gray-200 rounded mb-4" />

        {/* Price */}
        <div className="flex items-center gap-2 mb-2">
          <div className="h-6 w-24 bg-gray-200 rounded" />
          <div className="h-4 w-16 bg-gray-100 rounded" />
        </div>
      </div>

      {/* EMI Box & Button */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="h-9 w-full bg-purple-50 rounded-xl mb-3" />
        <div className="h-10 w-full bg-gray-200 rounded-full" />
      </div>
    </div>
  );
};

export const ProductSkeletonGrid: React.FC<{ count?: number }> = ({ count = 4 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 px-4 py-2">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
};

