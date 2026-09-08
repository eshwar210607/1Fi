import { NextResponse } from "next/server";
import { OrderPledgeRequest } from "@/types";

export async function POST(request: Request) {
  try {
    const body: OrderPledgeRequest = await request.json();

    if (!body.productId || !body.planId || !body.monthlyPayment) {
      return NextResponse.json(
        { success: false, error: "Missing required order or plan parameters" },
        { status: 400 }
      );
    }

    const orderId = "1FI-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    const pledgedUnitsValue = Math.round(body.totalAmount * 1.3);

    return NextResponse.json({
      success: true,
      data: {
        orderId,
        status: "PLEDGE_CONFIRMED",
        timestamp: new Date().toISOString(),
        productVariant: body.variantId,
        loanAmount: body.totalAmount,
        tenureMonths: body.tenureMonths,
        monthlyEMI: body.monthlyPayment,
        firstDueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        pledgedMutualFundEstimate: pledgedUnitsValue,
        message: "Your mutual fund pledge lock is confirmed. 0% credit pull initiated.",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to process pledge order" },
      { status: 500 }
    );
  }
}
