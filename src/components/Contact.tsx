"use client";

import { useState } from "react";

interface ContactProps {
  email: string;
  phone?: string;
  address?: string;
  partnershipTitle: string;
  partnershipDescription: string;
}

export default function Contact({
  email,
  phone,
  address,
  partnershipTitle,
  partnershipDescription,
}: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    interest: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to an API endpoint
    window.location.href = `mailto:${email}?subject=Partnership Inquiry from ${
      formData.name
    }&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nOrganization: ${formData.organization}\nInterest: ${formData.interest}\n\nMessage:\n${formData.message}`
    )}`;
  };

  return (
    <section id="contact" className="py-24 bg-cream relative overflow-hidden">
      {/* Top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent opacity-30" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-[var(--color-gold)]" />
            <span className="text-[var(--color-gold)] uppercase tracking-[0.2em] text-sm font-medium">
              Get Involved
            </span>
            <div className="h-px w-12 bg-[var(--color-gold)]" />
          </div>

          <h2 className="text-4xl md:text-5xl font-semibold text-[var(--color-navy)] mb-4">
            {partnershipTitle}
          </h2>

          <p className="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto">
            {partnershipDescription}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-xl p-8 md:p-10">
            <h3 className="text-2xl font-semibold text-[var(--color-navy)] mb-6">
              Send Us a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[var(--color-text-dark)] mb-2"
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--color-gold)] focus:border-transparent outline-none transition-all"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[var(--color-text-dark)] mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--color-gold)] focus:border-transparent outline-none transition-all"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="organization"
                  className="block text-sm font-medium text-[var(--color-text-dark)] mb-2"
                >
                  Organization
                </label>
                <input
                  type="text"
                  id="organization"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--color-gold)] focus:border-transparent outline-none transition-all"
                  placeholder="Your organization name"
                  value={formData.organization}
                  onChange={(e) =>
                    setFormData({ ...formData, organization: e.target.value })
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="interest"
                  className="block text-sm font-medium text-[var(--color-text-dark)] mb-2"
                >
                  I&apos;m Interested In *
                </label>
                <select
                  id="interest"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--color-gold)] focus:border-transparent outline-none transition-all bg-white"
                  value={formData.interest}
                  onChange={(e) =>
                    setFormData({ ...formData, interest: e.target.value })
                  }
                >
                  <option value="">Select an option</option>
                  <option value="partnership">Becoming a Partner</option>
                  <option value="sponsor">Sponsorship Opportunities</option>
                  <option value="host">Hosting an Event/Exhibition</option>
                  <option value="courses">Educational Courses</option>
                  <option value="volunteer">Volunteering</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-[var(--color-text-dark)] mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--color-gold)] focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Tell us about your interest in our mission..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </div>

              <button type="submit" className="w-full btn-primary rounded-lg">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Direct Contact Card */}
            <div className="bg-[var(--color-navy)] rounded-lg p-8 text-[var(--color-cream)]">
              <h3 className="text-2xl font-semibold mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-gold)]/20 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-[var(--color-gold)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[var(--color-gold)] uppercase tracking-wider text-xs mb-1">
                      Email
                    </p>
                    <a
                      href={`mailto:${email}`}
                      className="text-lg hover:text-[var(--color-gold)] transition-colors"
                    >
                      {email}
                    </a>
                  </div>
                </div>

                {phone && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-gold)]/20 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-[var(--color-gold)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[var(--color-gold)] uppercase tracking-wider text-xs mb-1">
                        Phone
                      </p>
                      <a
                        href={`tel:${phone}`}
                        className="text-lg hover:text-[var(--color-gold)] transition-colors"
                      >
                        {phone}
                      </a>
                    </div>
                  </div>
                )}

                {address && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-gold)]/20 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-[var(--color-gold)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[var(--color-gold)] uppercase tracking-wider text-xs mb-1">
                        Location
                      </p>
                      <p className="text-lg">{address}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Partnership Types */}
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-[var(--color-navy)] mb-6">
                Ways to Partner
              </h3>

              <div className="space-y-4">
                {[
                  {
                    icon: "🏛️",
                    title: "Host Institution",
                    desc: "Bring our exhibitions to your venue",
                  },
                  {
                    icon: "🤝",
                    title: "Sponsor",
                    desc: "Support our educational mission financially",
                  },
                  {
                    icon: "📚",
                    title: "Educational Partner",
                    desc: "Collaborate on curriculum development",
                  },
                  {
                    icon: "🌐",
                    title: "Community Partner",
                    desc: "Join our network of advocates",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-[var(--color-cream)] transition-colors cursor-pointer"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="font-medium text-[var(--color-navy)]">
                        {item.title}
                      </p>
                      <p className="text-sm text-[var(--color-text-muted)]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
