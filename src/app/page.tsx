"use client";

import React, { useState } from "react";
import { MobileFrame } from "@/components/layout/MobileFrame";
import { HeaderBanner } from "@/components/layout/HeaderBanner";
import { TabNavigation, ShopTab } from "@/components/layout/TabNavigation";
import { BottomNavBar, NavTab } from "@/components/layout/BottomNavBar";
import { ProductCatalog } from "@/components/marketplace/ProductCatalog";
import { ProductDetailView } from "@/components/product-detail/ProductDetailView";
import { Product } from "@/types";
import { Store, ShoppingBag, ArrowRight } from "lucide-react";

export default function ShopPage() {
  const [activeTab, setActiveTab] = useState<ShopTab>("marketplace");
  const [activeNav, setActiveNav] = useState<NavTab>("shop");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Handle Bottom Navigation switching
  const handleNavChange = (tab: NavTab) => {
    setActiveNav(tab);
    if (tab === "shop") {
      setSelectedProduct(null);
    }
  };

  return (
    <MobileFrame>
      {selectedProduct ? (
        /* Full Product Detail Experience */
        <ProductDetailView
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
        />
      ) : (
        /* Master Shop Screen */
        <div className="flex-1 flex flex-col justify-between min-h-screen bg-[#F8F9FB]">
          <div className="flex-1 flex flex-col">
            {/* 1Fi Hero Dark Banner */}
            <HeaderBanner />

            {/* 3-Tab Segmented Control (Top Brands | Nearby Stores | 1Fi Marketplace) */}
            <TabNavigation
              activeTab={activeTab}
              onTabChange={(tab) => {
                setActiveTab(tab);
                setSelectedProduct(null);
              }}
            />

            {/* Tab Views */}
            {activeTab === "marketplace" && (
              <ProductCatalog onSelectProduct={(prod) => setSelectedProduct(prod)} />
            )}

            {activeTab === "top-brands" && (
              <div className="flex-1 flex flex-col items-center justify-center py-16 px-6 text-center">
                <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center mb-3">
                  <ShoppingBag className="w-6 h-6 text-[#601CEB]" />
                </div>
                <h3 className="text-sm font-bold text-gray-900">Top Brands</h3>
                <p className="text-xs text-gray-500 max-w-xs mt-1 leading-relaxed">
                  (Placeholder per assignment specifications: No implementation required for this tab.)
                </p>
                <button
                  onClick={() => setActiveTab("marketplace")}
                  className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#601CEB] text-white text-xs font-bold shadow-sm hover:bg-[#4E12C8] transition-all"
                >
                  <span>Go to 1Fi Marketplace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {activeTab === "nearby-stores" && (
              <div className="flex-1 flex flex-col items-center justify-center py-16 px-6 text-center">
                <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center mb-3">
                  <Store className="w-6 h-6 text-[#601CEB]" />
                </div>
                <h3 className="text-sm font-bold text-gray-900">Nearby Stores</h3>
                <p className="text-xs text-gray-500 max-w-xs mt-1 leading-relaxed">
                  (Placeholder per assignment specifications: No implementation required for this tab.)
                </p>
                <button
                  onClick={() => setActiveTab("marketplace")}
                  className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#601CEB] text-white text-xs font-bold shadow-sm hover:bg-[#4E12C8] transition-all"
                >
                  <span>Go to 1Fi Marketplace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* 5-Tab Docked Bottom Navigation */}
          <BottomNavBar activeNav={activeNav} onNavChange={handleNavChange} />
        </div>
      )}
    </MobileFrame>
  );
}
