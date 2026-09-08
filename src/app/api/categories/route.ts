import { NextResponse } from "next/server";
import { categories } from "@/data/seedProducts";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: categories,
  });
}
