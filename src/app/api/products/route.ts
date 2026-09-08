import { NextResponse } from "next/server";
import { products } from "@/data/seedProducts";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort");

    let filtered = [...products];

    // Filter by category
    if (category && category.toLowerCase() !== "all") {
      filtered = filtered.filter(
        (p) => p.categoryId.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by search query
    if (search && search.trim() !== "") {
      const q = search.toLowerCase().trim();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Optional sort
    if (sort === "price-low") {
      filtered.sort((a, b) => a.basePrice - b.basePrice);
    } else if (sort === "price-high") {
      filtered.sort((a, b) => b.basePrice - a.basePrice);
    } else if (sort === "popular") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    return NextResponse.json({
      success: true,
      total: filtered.length,
      data: filtered,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
