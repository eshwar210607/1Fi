import React from "react";
import { Sparkles, ShoppingBag, ShieldCheck, Zap } from "lucide-react";

export const HeaderBanner: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#1C0548] via-[#350A78] to-[#5914B8] text-white px-5 pt-7 pb-6 rounded-b-[28px] shadow-lg">
      {/* Subtle Background Glows */}
      <div className="absolute -top-10 -right-10 w-44 h-44 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

      {/* Decorative Floating Fintech Elements */}
      <div className="absolute right-4 top-5 opacity-90 hidden sm:block md:block pointer-events-none">
        <div className="relative w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-2xl transform rotate-6 border border-white/10 backdrop-blur-sm" />
          <ShoppingBag className="w-10 h-10 text-purple-200 transform -rotate-3" />
        </div>
      </div>

      {/* Badge: NO-COST EMIS */}
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-purple-200 mb-3 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
        <span>NO-COST EMIs</span>
      </div>

      {/* Title */}
      <h1 className="text-2xl sm:text-[26px] font-extrabold tracking-tight leading-tight max-w-[320px]">
        Shop today, <br />
        <span className="text-white">Pay later using </span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-white">
          Mutual funds.
        </span>
      </h1>

      {/* Subtitle */}
      <p className="mt-2.5 text-xs sm:text-[13px] text-purple-200/90 leading-relaxed font-normal max-w-[340px]">
        No credit score required. No interest. Backed by your investments.
      </p>

      {/* Feature Micro-Badges */}
      <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] text-purple-100 font-medium">
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/10 border border-white/10">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span>RBI Regulated</span>
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/10 border border-white/10">
          <Zap className="w-3 h-3 text-amber-300" />
          <span>Instant Approval</span>
        </div>
      </div>
    </div>
  );
};

