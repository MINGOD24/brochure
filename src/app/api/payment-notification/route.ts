import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, amount, paymentType, transactionId } =
      await request.json();

    if (!firstName || !lastName || !email || !amount || !transactionId) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    const type = paymentType === "recurring" ? "recurring" : "one-time";

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
        subject: `New ${type === "recurring" ? "Monthly Subscription" : "One-Time Donation"} — $${amount}`,
        from_name: `${firstName} ${lastName}`,
        name: `${firstName} ${lastName}`,
        email,
        amount: `$${amount}${type === "recurring" ? "/month" : ""}`,
        payment_type:
          type === "recurring" ? "Monthly Subscription" : "One-Time Donation",
        transaction_id: transactionId,
        message: `${firstName} ${lastName} (${email}) made a ${type === "recurring" ? "monthly subscription" : "one-time donation"} of $${amount}. Transaction ID: ${transactionId}`,
      }),
    });

    if (response.ok) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, error: "Failed to send notification" },
      { status: 500 },
    );
  } catch (error) {
    console.error("Payment notification error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send notification" },
      { status: 500 },
    );
  }
}
