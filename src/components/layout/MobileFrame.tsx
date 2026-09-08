"use client";

import React, { useState } from "react";
import { Smartphone, Monitor, Wifi, Battery, Signal } from "lucide-react";

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  const [viewMode, setViewMode] = useState<"mobile" | "fluid">("mobile");

  return (
    <div className="min-h-screen bg-[#ECEEF2] text-[#111827] flex flex-col items-center justify-start py-0 sm:py-6 px-0 sm:px-4">
      {/* Top Bar for Reviewers & Interviewers */}
      <header className="w-full max-w-2xl mb-4 hidden sm:flex items-center justify-between px-4 py-2 bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#601CEB] animate-pulse" />
          <span className="text-xs font-bold text-gray-800 tracking-tight">
            1Fi SDE Intern Assignment Preview
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded-md bg-purple-50 text-[#601CEB] font-semibold border border-purple-200">
            Marketplace Feature
          </span>
        </div>

        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setViewMode("mobile")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              viewMode === "mobile"
                ? "bg-white text-[#601CEB] shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile App</span>
          </button>
          <button
            onClick={() => setViewMode("fluid")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              viewMode === "fluid"
                ? "bg-white text-[#601CEB] shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Responsive Web</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div
        className={`w-full transition-all duration-300 ${
          viewMode === "mobile"
            ? "max-w-[430px] sm:rounded-[36px] shadow-2xl sm:border-[8px] sm:border-gray-900 overflow-hidden bg-[#F8F9FB] min-h-[860px] relative flex flex-col"
            : "max-w-4xl rounded-3xl shadow-xl border border-gray-200 overflow-hidden bg-[#F8F9FB] min-h-[860px] relative flex flex-col"
        }`}
      >
        {/* Android / iOS Status Bar (in mobile mode) */}
        {viewMode === "mobile" && (
          <div className="w-full bg-[#1C0548] text-white px-6 py-2 flex items-center justify-between text-[11px] font-semibold select-none z-30">
            <span>1:20</span>
            <div className="flex items-center gap-2 text-white/90">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <div className="flex items-center gap-1">
                <span>85%</span>
                <Battery className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        )}

        {/* Content Viewport */}
        <div className="flex-1 flex flex-col">{children}</div>
      </div>
    </div>
  );
};

