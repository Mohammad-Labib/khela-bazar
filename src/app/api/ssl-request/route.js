import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { orderId, totalAmount, customerName, customerEmail, customerPhone } = body;

    // SSLCommerz Sandbox Payload
    const postData = {
      store_id: "khelabazarlive",
      store_passwd: "khelabazar@sslsecure",
      total_amount: totalAmount,
      currency: "BDT",
      tran_id: orderId,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/payment/success`,
      fail_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/payment/fail`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/payment/cancel`,
      cus_name: customerName,
      cus_email: customerEmail || "customer@khelabazar.com",
      cus_add1: "Dhaka",
      cus_phone: customerPhone,
      shipping_method: "NO",
      product_name: "Sports Gear & Equipment",
      product_category: "Sports",
      product_profile: "physical-goods",
    };

    // রিয়েল প্রজেক্টে এখানে fetch দিয়ে SSLCommerz API কল করতে হবে
    // const response = await fetch('https://sandbox.sslcommerz.com/gwprocess/v4/api.php', { method: 'POST', body: ... })

    return NextResponse.json({
      success: true,
      gatewayUrl: "https://sandbox.sslcommerz.com/gwv4/process.php?q=mock_gateway_token",
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}