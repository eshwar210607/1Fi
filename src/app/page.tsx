"use client";

import React, { useState } from "react";
import { MobileFrame } from "@/components/layout/MobileFrame";
import { HeaderBanner } from "@/components/layout/HeaderBanner";
import { TabNavigation, ShopTab } from "@/components/layout/TabNavigation";
import { BottomNavBar, NavTab } from "@/components/layout/BottomNavBar";
import { ProductCatalog } from "@/components/marketplace/ProductCatalog";
import { TopBrandsView } from "@/components/tabs/TopBrandsView";
import { NearbyStoresView } from "@/components/tabs/NearbyStoresView";
import { ProductDetailView } from "@/components/product-detail/ProductDetailView";
import { Product } from "@/types";

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
              <TopBrandsView onSwitchToMarketplace={() => setActiveTab("marketplace")} />
            )}

            {activeTab === "nearby-stores" && (
              <NearbyStoresView onSwitchToMarketplace={() => setActiveTab("marketplace")} />
            )}
          </div>

          {/* 5-Tab Docked Bottom Navigation */}
          <BottomNavBar activeNav={activeNav} onNavChange={handleNavChange} />
        </div>
      )}
    </MobileFrame>
  );
}
