"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Product, Category } from "@/types";
import { SearchBar } from "./SearchBar";
import { CategoryPills } from "./CategoryPills";
import { ProductCard } from "./ProductCard";
import { ProductSkeletonGrid } from "./ProductSkeleton";
import { EmptyState } from "./EmptyState";
import { ShieldCheck, Percent, Zap, Wallet, ChevronDown, ArrowUpDown } from "lucide-react";
import { formatINR } from "@/lib/emiCalculator";

interface ProductCatalogProps {
  onSelectProduct: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ onSelectProduct }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories
  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch("/api/categories");
        const json = await res.json();
        if (json.success) {
          setCategories(json.data);
        }
      } catch (err) {
        console.error("Error loading categories", err);
      }
    }
    loadCategories();
  }, []);

  // Fetch products dynamically based on category, search, and sort
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (selectedCategory && selectedCategory !== "all") {
        params.set("category", selectedCategory);
      }
      if (searchQuery.trim()) {
        params.set("search", searchQuery.trim());
      }
      if (sortBy !== "featured") {
        params.set("sort", sortBy);
      }

      const res = await fetch(`/api/products?${params.toString()}`);
      const json = await res.json();
      if (json.success) {
        setProducts(json.data);
      } else {
        setError(json.error || "Failed to load products");
      }
    } catch (err) {
      setError("Network error loading products");
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory, searchQuery, sortBy]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 200);

    return () => clearTimeout(timer);
  }, [fetchProducts]);

  return (
    <div className="flex-1 flex flex-col bg-[#F8F9FB] pb-8">
      {/* 1Fi Simulated Mutual Fund Credit Limit Card */}
      <div className="mx-4 mt-3 p-3.5 bg-gradient-to-r from-[#1C0548] to-[#47119B] rounded-2xl text-white shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-purple-200 border border-white/10">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-purple-200 tracking-wider">
              Available MF Credit Limit
            </div>
            <div className="text-base font-black tracking-tight">
              ₹2,50,000{" "}
              <span className="text-[11px] font-medium text-purple-200">
                / ₹4,20,000 Portfolio
              </span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
            <ShieldCheck className="w-3 h-3" />
            Active
          </span>
          <span className="block text-[9px] text-purple-200 mt-0.5 font-medium">
            CAMS Verified
          </span>
        </div>
      </div>

      {/* Search Input */}
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search iPhone, Samsung, MacBook, Sony..."
      />

      {/* Category Pills */}
      {categories.length > 0 && (
        <CategoryPills
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      )}

      {/* 1Fi Trust Badges */}
      <div className="mx-4 my-2 p-2.5 bg-gradient-to-r from-purple-50 via-white to-purple-50 rounded-2xl border border-purple-100 flex items-center justify-between text-[11px] font-medium text-gray-700 shadow-2xs">
        <div className="flex items-center gap-1">
          <Percent className="w-3.5 h-3.5 text-[#601CEB]" />
          <span>0% Interest EMIs</span>
        </div>
        <div className="h-3 w-px bg-gray-200" />
        <div className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>No Credit Pull</span>
        </div>
        <div className="h-3 w-px bg-gray-200" />
        <div className="flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          <span>Instant Approval</span>
        </div>
      </div>

      {/* Product Section Header & Sort Menu */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-4 bg-[#601CEB] rounded-full" />
          <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-gray-800">
            {selectedCategory === "all"
              ? "All Products"
              : categories.find((c) => c.id === selectedCategory)?.name || "Products"}
          </h2>
          {!isLoading && (
            <span className="text-xs text-gray-400 font-medium">
              ({products.length})
            </span>
          )}
        </div>

        {/* Sort Filter Dropdown */}
        <div className="relative flex items-center">
          <ArrowUpDown className="w-3.5 h-3.5 text-gray-400 absolute left-2 pointer-events-none" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg pl-7 pr-4 py-1.5 focus:outline-none focus:border-[#601CEB] shadow-2xs appearance-none cursor-pointer"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="popular">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Main Product Grid / States */}
      {isLoading ? (
        <ProductSkeletonGrid count={4} />
      ) : error ? (
        <div className="p-8 text-center text-red-600 text-xs font-semibold">
          {error}
        </div>
      ) : products.length === 0 ? (
        <EmptyState
          query={searchQuery}
          onReset={() => {
            setSearchQuery("");
            setSelectedCategory("all");
            setSortBy("featured");
          }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 px-4 py-1">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
};
