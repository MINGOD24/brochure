"use client";

import { useState } from "react";
import PaymentForm from "./PaymentForm";

const presetAmounts = [25, 50, 100, 250, 500, 1000];

export default function Donate() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState<string | null>(null);

  const activeAmount =
    selectedAmount || (customAmount ? parseFloat(customAmount) : undefined);

  if (showSuccess) {
    return (
      <section
        id="donate"
        className="py-24 bg-gradient-to-b from-cream to-white"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-12">
              <div className="text-green-600 text-6xl mb-6">✓</div>
              <h2 className="text-3xl font-serif text-green-800 mb-4">
                Thank You!
              </h2>
              <p className="text-lg text-green-700 mb-4">
                Your generous donation helps us preserve Jewish heritage and
                combat antisemitism.
              </p>
              <p className="text-sm text-green-600 mb-8">
                Transaction ID: {transactionId}
              </p>
              <button
                onClick={() => {
                  setShowSuccess(false);
                  setTransactionId(null);
                  setSelectedAmount(null);
                  setCustomAmount("");
                }}
                className="px-8 py-3 bg-navy text-white font-semibold rounded-lg hover:bg-navy/90 transition-colors"
              >
                Make Another Donation
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="donate" className="py-24 bg-gradient-to-b from-cream to-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block text-gold text-sm font-semibold tracking-wider uppercase mb-4">
              — Support Our Work —
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-navy mb-4">
              Make a Donation
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your donation helps us preserve Jewish heritage, combat
              antisemitism, and educate communities across North America.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: Amount Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-navy mb-6">
                Choose Amount
              </h3>

              {/* Preset Amounts */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {presetAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount("");
                    }}
                    className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                      selectedAmount === amount
                        ? "bg-navy text-white"
                        : "bg-gray-100 text-navy hover:bg-gray-200"
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Or enter custom amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
                    $
                  </span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(null);
                    }}
                    placeholder="Enter amount"
                    min="1"
                    className="w-full pl-10 pr-4 py-4 text-lg border-2 border-gray-200 rounded-lg focus:border-gold focus:ring-0 transition-colors"
                  />
                </div>
              </div>

              {/* Impact Info */}
              <div className="mt-8 p-6 bg-navy/5 rounded-xl">
                <h4 className="font-semibold text-navy mb-3">Your Impact</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-gold mt-0.5">✓</span>
                    <span>
                      $25 - Provides educational materials for 5 students
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold mt-0.5">✓</span>
                    <span>$100 - Sponsors a community workshop session</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold mt-0.5">✓</span>
                    <span>$500 - Supports a traveling exhibition</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold mt-0.5">✓</span>
                    <span>$1000 - Funds a full educator training program</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right: Payment Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-navy mb-6">
                Payment Details
              </h3>

              {activeAmount ? (
                <PaymentForm
                  presetAmount={activeAmount}
                  description="JHEAC Donation"
                  onSuccess={(txId) => {
                    setShowSuccess(true);
                    setTransactionId(txId);
                  }}
                />
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <div className="text-5xl mb-4">💝</div>
                  <p>Please select or enter a donation amount to continue</p>
                </div>
              )}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span>256-bit SSL Encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              <span>Powered by Authorize.net</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
