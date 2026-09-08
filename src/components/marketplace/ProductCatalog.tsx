"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Product, Category } from "@/types";
import { SearchBar } from "./SearchBar";
import { CategoryPills } from "./CategoryPills";
import { ProductCard } from "./ProductCard";
import { ProductSkeletonGrid } from "./ProductSkeleton";
import { EmptyState } from "./EmptyState";
import { ShieldCheck, Percent, Zap } from "lucide-react";

interface ProductCatalogProps {
  onSelectProduct: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ onSelectProduct }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
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

  // Fetch products dynamically based on category and search
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
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 200); // Quick debounce for search input

    return () => clearTimeout(timer);
  }, [fetchProducts]);

  return (
    <div className="flex-1 flex flex-col bg-[#F8F9FB] pb-8">
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

      {/* 1Fi Trust / Value Proposition Banner Strip */}
      <div className="mx-4 my-2 p-3 bg-gradient-to-r from-purple-50 via-white to-purple-50 rounded-2xl border border-purple-100 flex items-center justify-between text-[11px] font-medium text-gray-700 shadow-2xs">
        <div className="flex items-center gap-1.5">
          <Percent className="w-3.5 h-3.5 text-[#601CEB]" />
          <span>0% Interest EMIs</span>
        </div>
        <div className="h-3 w-px bg-gray-200" />
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>No Credit Score Pull</span>
        </div>
        <div className="h-3 w-px bg-gray-200" />
        <div className="flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          <span>Instant Approval</span>
        </div>
      </div>

      {/* Product Section Header */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-4 bg-[#601CEB] rounded-full" />
          <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-gray-800">
            {selectedCategory === "all"
              ? "All Products"
              : categories.find((c) => c.id === selectedCategory)?.name || "Products"}
          </h2>
        </div>
        {!isLoading && (
          <span className="text-xs text-gray-400 font-medium">
            {products.length} {products.length === 1 ? "product" : "products"} available
          </span>
        )}
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
