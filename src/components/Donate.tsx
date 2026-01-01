"use client";

import { useState } from "react";
import PaymentForm from "./PaymentForm";

const presetAmounts = [25, 50, 100, 250, 500];

export default function Donate() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100);
  const [customAmount, setCustomAmount] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState<string | null>(null);

  const activeAmount = selectedAmount || (customAmount ? parseFloat(customAmount) : undefined);

  if (showSuccess) {
    return (
      <section id="donate" className="py-24 bg-gradient-to-b from-navy to-navy-dark relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 text-[200px] text-gold">✡</div>
          <div className="absolute bottom-20 right-10 text-[150px] text-gold">✡</div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-gold/20">
              <div className="text-6xl mb-6">💝</div>
              <h2 className="text-4xl font-serif text-white mb-4">Thank You!</h2>
              <p className="text-xl text-cream mb-4">
                Your generous donation helps us preserve Jewish heritage and combat antisemitism.
              </p>
              <p className="text-gold text-sm">
                Transaction ID: {transactionId}
              </p>
              <button
                onClick={() => {
                  setShowSuccess(false);
                  setTransactionId(null);
                }}
                className="mt-8 px-8 py-3 bg-gold text-navy font-semibold rounded-full hover:bg-gold/90 transition-colors"
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
    <section id="donate" className="py-24 bg-gradient-to-b from-navy to-navy-dark relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 text-[200px] text-gold">✡</div>
        <div className="absolute bottom-20 right-10 text-[150px] text-gold">✡</div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-gold text-sm font-semibold tracking-wider uppercase mb-4">
            — Support Our Work —
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
            Make a Donation
          </h2>
          <p className="text-lg text-cream/80 max-w-2xl mx-auto">
            Your contribution directly supports Holocaust education, cultural preservation, 
            and the fight against antisemitism across North America.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Amount Selection & Impact */}
            <div className="space-y-8">
              {/* Amount Selection Card */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-gold/20">
                <h3 className="text-xl font-semibold text-white mb-6">
                  Select Donation Amount
                </h3>

                {/* Preset Amounts */}
                <div className="grid grid-cols-5 gap-2 mb-6">
                  {presetAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => {
                        setSelectedAmount(amount);
                        setCustomAmount("");
                      }}
                      className={`py-3 px-2 rounded-lg font-semibold transition-all text-sm ${
                        selectedAmount === amount
                          ? "bg-gold text-navy"
                          : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 text-lg">
                    $
                  </span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(null);
                    }}
                    placeholder="Custom amount"
                    min="1"
                    className="w-full pl-10 pr-4 py-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-gold focus:ring-0 transition-colors"
                  />
                </div>
              </div>

              {/* Impact Card */}
              <div className="bg-gold/10 backdrop-blur-sm rounded-2xl p-8 border border-gold/30">
                <h3 className="text-xl font-semibold text-gold mb-4 flex items-center gap-2">
                  <span>✨</span> Your Impact
                </h3>
                <ul className="space-y-3 text-cream/90">
                  <li className="flex items-start gap-3">
                    <span className="text-gold mt-1">✓</span>
                    <span><strong className="text-gold">$25</strong> — Educational materials for 5 students</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gold mt-1">✓</span>
                    <span><strong className="text-gold">$100</strong> — Community workshop session</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gold mt-1">✓</span>
                    <span><strong className="text-gold">$250</strong> — Teacher training program</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gold mt-1">✓</span>
                    <span><strong className="text-gold">$500+</strong> — Sponsor a traveling exhibition</span>
                  </li>
                </ul>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-cream/60">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Secure & Encrypted</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <span>Authorize.net</span>
                </div>
              </div>
            </div>

            {/* Right: Payment Form */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <h3 className="text-xl font-semibold text-navy mb-6">
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
                <div className="text-center py-16 text-gray-400">
                  <div className="text-5xl mb-4">💝</div>
                  <p>Select an amount to continue</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

