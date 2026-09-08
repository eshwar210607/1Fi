import React from "react";
import { Home, Store, ReceiptText, TrendingUp, User } from "lucide-react";

export type NavTab = "home" | "shop" | "emi-dues" | "limit" | "profile";

interface BottomNavBarProps {
  activeNav?: NavTab;
  onNavChange?: (tab: NavTab) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeNav = "shop",
  onNavChange,
}) => {
  const navItems: { id: NavTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: "home", label: "Home", icon: Home },
    { id: "shop", label: "Shop", icon: Store },
    { id: "emi-dues", label: "EMI Dues", icon: ReceiptText },
    { id: "limit", label: "Limit", icon: TrendingUp },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <div className="sticky bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-gray-100 px-4 py-2 shadow-card">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavChange?.(item.id)}
              className="flex flex-col items-center justify-center flex-1 py-1 focus:outline-none transition-transform active:scale-95"
            >
              <div
                className={`w-9 h-8 rounded-full flex items-center justify-center transition-colors ${
                  isActive ? "bg-purple-100 text-[#601CEB]" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.4]" : "stroke-[1.8]"}`} />
              </div>
              <span
                className={`text-[10px] mt-0.5 tracking-tight ${
                  isActive ? "text-[#601CEB] font-bold" : "text-gray-500 font-medium"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
