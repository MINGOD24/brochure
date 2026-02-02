import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

interface PaymentRequest {
  amount: number;
  paymentMethodId: string;
  firstName: string;
  lastName: string;
  email: string;
  description?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: PaymentRequest = await request.json();

    // Validate required fields
    if (
      !body.amount ||
      !body.paymentMethodId ||
      !body.email ||
      !body.firstName ||
      !body.lastName
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required payment fields" },
        { status: 400 }
      );
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("Stripe secret key not configured");
      return NextResponse.json(
        { success: false, error: "Payment system not configured" },
        { status: 500 }
      );
    }

    // Convert amount to cents (Stripe uses smallest currency unit)
    const amountInCents = Math.round(body.amount * 100);

    // Create a Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      payment_method: body.paymentMethodId,
      confirmation_method: "manual",
      confirm: true,
      description: body.description || "JHEA Donation/Course Payment",
      receipt_email: body.email,
      metadata: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
      },
    });

    // Check if payment requires additional action (3D Secure, etc.)
    if (paymentIntent.status === "requires_action") {
      return NextResponse.json({
        success: false,
        requiresAction: true,
        clientSecret: paymentIntent.client_secret,
        error: "Additional authentication required",
      });
    }

    // Check if payment succeeded
    if (paymentIntent.status === "succeeded") {
      return NextResponse.json({
        success: true,
        transactionId: paymentIntent.id,
        paymentIntentId: paymentIntent.id,
        message: "Payment successful",
      });
    }

    // Payment failed or is in an unexpected state
    return NextResponse.json(
      {
        success: false,
        error: `Payment failed with status: ${paymentIntent.status}`,
      },
      { status: 400 }
    );
  } catch (error) {
    console.error("Payment processing error:", error);

    // Handle Stripe-specific errors
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    const errorMessage =
      error instanceof Error ? error.message : "Payment processing failed";

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
