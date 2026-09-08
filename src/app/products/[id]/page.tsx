"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { MobileFrame } from "@/components/layout/MobileFrame";
import { ProductDetailView } from "@/components/product-detail/ProductDetailView";
import { Product } from "@/types";
import { Sparkles, ArrowLeft } from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    async function loadProduct() {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${id}`);
        const json = await res.json();
        if (json.success) {
          setProduct(json.data);
        } else {
          setError(json.error || "Product not found");
        }
      } catch (err) {
        setError("Error loading product");
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [id]);

  return (
    <MobileFrame>
      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[600px] bg-[#F8F9FB] space-y-3">
          <div className="w-10 h-10 border-3 border-[#601CEB] border-t-transparent rounded-full animate-spin" />
          <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
            <Sparkles className="w-3.5 h-3.5 text-[#601CEB]" />
            <span>Loading 1Fi Marketplace product...</span>
          </div>
        </div>
      ) : error || !product ? (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[600px] bg-[#F8F9FB] p-6 text-center">
          <h3 className="text-base font-bold text-gray-900">Product Not Found</h3>
          <p className="text-xs text-gray-500 mt-1 max-w-xs">
            {error || "The requested product does not exist in 1Fi Marketplace."}
          </p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#601CEB] text-white text-xs font-bold shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Marketplace</span>
          </button>
        </div>
      ) : (
        <ProductDetailView product={product} onBack={() => router.push("/")} />
      )}
    </MobileFrame>
  );
}
