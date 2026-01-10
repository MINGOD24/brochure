import Image from "next/image";

interface MissionProps {
  title: string;
  description: string;
  points: string[];
}

export default function Mission({ title, description, points }: MissionProps) {
  return (
    <section id="mission" className="py-24 bg-cream relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--color-white)] to-transparent opacity-30" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div>
            {/* Section Label */}
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-[var(--color-white)]" />
              <span className="text-[var(--color-white)] uppercase tracking-[0.2em] text-sm font-medium font-bold">
                Our Purpose
              </span>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-semibold text-[var(--color-navy)] mb-8">
              {title}
            </h2>

            {/* Description */}
            <p className="text-lg text-[var(--color-text-muted)] leading-relaxed mb-8">
              {description}
            </p>

            {/* Points */}
            <ul className="space-y-4">
              {points.map((point, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-navy)] flex items-center justify-center mt-0.5">
                    <svg
                      className="w-4 h-4 text-[var(--color-white)]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-[var(--color-text-dark)] text-lg">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Decorative Card */}
          <div className="relative">
            <div className="bg-[var(--color-navy)] rounded-lg p-12 relative overflow-hidden">
              {/* Pattern overlay */}
              <div className="absolute inset-0 opacity-5">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <pattern
                    id="mission-pattern"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <polygon
                      points="10,1 12,7 19,7 14,11 16,18 10,14 4,18 6,11 1,7 8,7"
                      fill="var(--color-white)"
                    />
                  </pattern>
                  <rect
                    width="100%"
                    height="100%"
                    fill="url(#mission-pattern)"
                  />
                </svg>
              </div>

              {/* Content */}
              <div className="relative z-10 text-center">
                <div className="mb-8">
                  <Image
                    src="/LOGO.svg"
                    alt=""
                    width={80}
                    height={80}
                    className="mx-auto object-contain"
                  />
                </div>

                <blockquote className="text-2xl md:text-3xl text-[var(--color-cream)] italic mb-6">
                  &ldquo;Bringing memory to life through education&rdquo;
                </blockquote>

                <div className="separator-gold w-24 mx-auto mb-6" />

                <p className="text-[var(--color-white)] uppercase tracking-widest text-sm font-bold">
                  Since 2020
                </p>
              </div>

              {/* Corner decorations */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[var(--color-white)]/30" />
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-[var(--color-white)]/30" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-[var(--color-white)]/30" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[var(--color-white)]/30" />
            </div>

            {/* Offset decorative element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[var(--color-white)]/10 rounded-lg -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
