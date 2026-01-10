import Link from "next/link";
import Image from "next/image";

interface HeroProps {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  backgroundImageUrl?: string | null;
}

export default function Hero({
  title,
  subtitle,
  description,
  ctaText,
  ctaLink,
  backgroundImageUrl,
}: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-navy-gradient">
        {backgroundImageUrl && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${backgroundImageUrl})` }}
          />
        )}
        {/* Decorative Pattern Overlay */}
        <div className="absolute inset-0 pattern-overlay opacity-50" />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-navy)] via-transparent to-[var(--color-navy)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-navy)]/80 via-transparent to-[var(--color-navy)]/80" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 opacity-10">
        <Image
          src="/LOGO.svg"
          alt=""
          width={192}
          height={192}
          className="object-contain"
        />
      </div>
      <div className="absolute bottom-20 right-10 opacity-10">
        <Image
          src="/LOGO.svg"
          alt=""
          width={144}
          height={144}
          className="object-contain"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center py-32">
        {/* Decorative Line */}
        <div
          className="flex items-center justify-center gap-4 mb-8 animate-fade-in-up opacity-0"
          style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
        >
          <div className="h-px w-16 bg-[var(--color-white)]" />
          <div className="w-3 h-3 rotate-45 border border-[var(--color-white)]" />
          <div className="h-px w-16 bg-[var(--color-white)]" />
        </div>

        {/* Subtitle */}
        <p
          className="text-[var(--color-white)] uppercase tracking-[0.3em] text-sm md:text-base mb-4 animate-fade-in-up opacity-0 font-bold"
          style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
        >
          {subtitle}
        </p>

        {/* Title */}
        <h1
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[var(--color-cream)] mb-8 leading-tight animate-fade-in-up opacity-0 text-center"
          style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
        >
          {title.split(" ").map((word, i) => (
            <span key={i}>
              {word === "Jewish" ||
              word === "Heritage" ||
              word === "Education" ? (
                <span className="text-gold-gradient">{word} </span>
              ) : (
                <span>{word} </span>
              )}
            </span>
          ))}
        </h1>

        {/* Description */}
        <p
          className="text-lg md:text-xl text-[var(--color-cream)]/80 max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in-up opacity-0"
          style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
        >
          {description}
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up opacity-0"
          style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
        >
          <Link href={ctaLink} className="btn-primary rounded-sm">
            {ctaText}
          </Link>
          <Link href="#mission" className="btn-secondary rounded-sm">
            Learn More
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-fade-in opacity-0"
          style={{ animationDelay: "1s", animationFillMode: "forwards" }}
        >
          <div className="scroll-indicator flex flex-col items-center gap-2 text-[var(--color-white)]">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
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
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
