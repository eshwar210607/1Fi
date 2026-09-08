import React from "react";

export type ShopTab = "top-brands" | "nearby-stores" | "marketplace";

interface TabNavigationProps {
  activeTab: ShopTab;
  onTabChange: (tab: ShopTab) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs: { id: ShopTab; label: string; badge?: string }[] = [
    { id: "top-brands", label: "Top Brands" },
    { id: "nearby-stores", label: "Nearby Stores" },
    { id: "marketplace", label: "1Fi Marketplace", badge: "NEW" },
  ];

  return (
    <div className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
      <div className="flex items-center px-3 justify-between">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex-1 py-3.5 text-center text-xs sm:text-[13px] font-semibold transition-all duration-150 flex items-center justify-center gap-1.5 ${
                isActive
                  ? "text-[#601CEB] font-bold"
                  : "text-gray-500 hover:text-gray-800 font-medium"
              }`}
            >
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="px-1.5 py-0.2 text-[9px] font-extrabold uppercase bg-purple-100 text-[#601CEB] rounded-full">
                  {tab.badge}
                </span>
              )}

              {/* Active Indicator Underline */}
              {isActive && (
                <div className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-[#601CEB] rounded-t-full shadow-sm" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
