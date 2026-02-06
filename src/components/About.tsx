import Image from "next/image";

interface AboutProps {
  name: string;
  title: string;
  bio: string;
  imageUrl?: string | null;
  achievements: string[];
}

export default function About({
  name,
  title,
  bio,
  imageUrl,
  achievements,
}: AboutProps) {
  return (
    <section id="about" className="py-24 bg-navy relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-overlay opacity-20" />

      {/* Decorative elements */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[var(--color-white)]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-[var(--color-white)]" />
            <span className="text-[var(--color-white)] uppercase tracking-[0.2em] text-sm font-medium font-bold">
              Leadership
            </span>
            <div className="h-px w-12 bg-[var(--color-gold)]" />
          </div>

          <h2 className="text-4xl md:text-5xl font-semibold text-[var(--color-cream)]">
            About Our Director
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Image Column */}
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              {imageUrl ? (
                <div className="aspect-[4/5] bg-[var(--color-navy-light)] relative">
                  <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-top"
                  />
                </div>
              ) : (
                <div className="aspect-[4/5] bg-[var(--color-navy-light)] flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-48 h-48 mx-auto mb-8 rounded-full bg-[var(--color-white)]/10 flex items-center justify-center">
                      <svg
                        className="w-24 h-24 text-[var(--color-white)]/60"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <p className="text-[var(--color-cream)] text-2xl font-semibold">
                      {name}
                    </p>
                    <p className="text-[var(--color-white)] uppercase tracking-wider text-sm mt-2 font-bold">
                      {title}
                    </p>
                  </div>
                </div>
              )}

              {/* Decorative frame */}
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[var(--color-white)]/30 rounded-lg pointer-events-none" />
            </div>

            {/* Quote card */}
            <div className="absolute -bottom-8 -right-8 bg-[var(--color-white)] text-[var(--color-navy)] p-6 rounded-lg max-w-xs shadow-xl hidden md:block">
              <svg
                className="w-8 h-8 mb-2 opacity-30"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="italic text-sm">
                &ldquo;Education is the most powerful weapon to change the world
                and combat hatred.&rdquo;
              </p>
            </div>
          </div>

          {/* Content Column */}
          <div className="lg:pl-8">
            <div className="mb-8">
              <h3 className="text-3xl font-semibold text-[var(--color-cream)] mb-2">
                {name}
              </h3>
              <p className="text-[var(--color-white)] uppercase tracking-wider text-sm font-bold">
                {title}
              </p>
            </div>

            <p className="text-lg text-[var(--color-cream)]/80 leading-relaxed mb-8">
              {bio}
            </p>

            {/* Achievements */}
            <div className="space-y-4">
              <h4 className="text-[var(--color-white)] uppercase tracking-wider text-sm font-medium mb-4 font-bold">
                Achievements & Affiliations
              </h4>

              <ul className="space-y-3">
                {achievements.map((achievement, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-[var(--color-cream)]/80"
                  >
                    <svg
                      className="w-5 h-5 text-[var(--color-white)] flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
