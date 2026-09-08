import { NextResponse } from "next/server";
import { products } from "@/data/seedProducts";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const product = products.find(
      (p) => p.id.toLowerCase() === id.toLowerCase() || p.slug.toLowerCase() === id.toLowerCase()
    );

    if (!product) {
      return NextResponse.json(
        { success: false, error: `Product with id or slug '${id}' not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch product details" },
      { status: 500 }
    );
  }
}
