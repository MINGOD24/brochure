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
  paymentType?: "one-time" | "recurring";
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
        { status: 400 },
      );
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("Stripe secret key not configured");
      return NextResponse.json(
        { success: false, error: "Payment system not configured" },
        { status: 500 },
      );
    }

    // Convert amount to cents (Stripe uses smallest currency unit)
    const amountInCents = Math.round(body.amount * 100);
    const isRecurring = body.paymentType === "recurring";

    if (isRecurring) {
      // Create or retrieve a Stripe Customer
      const customer = await stripe.customers.create({
        email: body.email,
        name: `${body.firstName} ${body.lastName}`,
        payment_method: body.paymentMethodId,
        invoice_settings: {
          default_payment_method: body.paymentMethodId,
        },
        metadata: {
          firstName: body.firstName,
          lastName: body.lastName,
        },
      });

      // First, create an ad-hoc price for the dynamic amount
      const price = await stripe.prices.create({
        currency: "usd",
        unit_amount: amountInCents,
        recurring: {
          interval: "month",
        },
        product_data: {
          name: body.description || "JHEA Monthly Donation",
        },
      });

      // Create a subscription with the dynamic price
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: price.id }],
        payment_behavior: "default_incomplete",
        payment_settings: {
          save_default_payment_method: "on_subscription",
          payment_method_types: ["card"],
        },
        expand: ["latest_invoice.payment_intent"],
        metadata: {
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
        },
      });

      const invoice = subscription.latest_invoice as Stripe.Invoice;
      const paymentIntent = invoice.payment_intent as Stripe.PaymentIntent;

      // Check if subscription is active (payment succeeded immediately)
      if (
        subscription.status === "active" ||
        subscription.status === "trialing"
      ) {
        return NextResponse.json({
          success: true,
          transactionId: subscription.id,
          subscriptionId: subscription.id,
          message: "Subscription created successfully",
        });
      }

      // Handle incomplete subscription - needs payment confirmation
      if (
        subscription.status === "incomplete" &&
        paymentIntent?.client_secret
      ) {
        // Payment needs to be confirmed by the frontend
        return NextResponse.json({
          success: false,
          requiresAction: true,
          clientSecret: paymentIntent.client_secret,
          subscriptionId: subscription.id,
          paymentIntentId: paymentIntent.id,
          error: "Payment confirmation required",
        });
      }

      // Handle declined payment
      if (paymentIntent?.status === "requires_payment_method") {
        return NextResponse.json(
          {
            success: false,
            error: "Payment method declined. Please try a different card.",
          },
          { status: 400 },
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: `Subscription creation failed with status: ${subscription.status}`,
        },
        { status: 400 },
      );
    }

    // One-time payment flow
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      payment_method: body.paymentMethodId,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
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
      { status: 400 },
    );
  } catch (error) {
    console.error("Payment processing error:", error);

    // Handle Stripe-specific errors
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 },
      );
    }

    const errorMessage =
      error instanceof Error ? error.message : "Payment processing failed";

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 },
    );
  }
}
