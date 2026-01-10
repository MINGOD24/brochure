interface Projection {
  id: number;
  title: string;
  description: string;
  year: string;
}

interface ProjectionsProps {
  projections: Projection[];
}

export default function Projections({ projections }: ProjectionsProps) {
  return (
    <section
      id="projections"
      className="py-24 bg-navy relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-overlay opacity-30" />

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-[var(--color-white)]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-[var(--color-white)]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-[var(--color-white)]" />
            <span className="text-[var(--color-white)] uppercase tracking-[0.2em] text-sm font-medium font-bold">
              Looking Forward
            </span>
            <div className="h-px w-12 bg-[var(--color-gold)]" />
          </div>

          <h2 className="text-4xl md:text-5xl font-semibold text-[var(--color-cream)] mb-4">
            Projections 2025 - 2028
          </h2>

          <p className="text-lg text-[var(--color-cream)]/70 max-w-2xl mx-auto">
            Our strategic goals for the coming years, focused on expanding our
            reach and deepening our impact.
          </p>
        </div>

        {/* Projections Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projections.map((projection, index) => (
            <div
              key={projection.id}
              className="card-hover bg-[var(--color-navy-light)]/50 backdrop-blur-sm border border-[var(--color-white)]/20 rounded-lg p-8 relative overflow-hidden group"
            >
              {/* Number indicator */}
              <div className="absolute top-4 right-4 text-6xl font-bold text-[var(--color-white)]/10 group-hover:text-[var(--color-white)]/20 transition-colors">
                {String(index + 1).padStart(2, "0")}
              </div>

              {/* Icon */}
              <div className="w-12 h-12 rounded-full bg-[var(--color-white)]/10 border border-[var(--color-white)]/30 flex items-center justify-center mb-6 group-hover:bg-[var(--color-white)]/20 transition-colors">
                <ProjectionIcon index={index} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-[var(--color-cream)] mb-3">
                {projection.title}
              </h3>

              <p className="text-[var(--color-cream)]/70 mb-4 leading-relaxed">
                {projection.description}
              </p>

              <div className="flex items-center gap-2 text-[var(--color-white)] text-sm font-bold">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>{projection.year}</span>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-white)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectionIcon({ index }: { index: number }) {
  const icons = [
    // Book - Educational Materials
    <svg
      key="book"
      className="w-6 h-6 text-[var(--color-white)]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>,
    // Sparkles - Interactive Experiences
    <svg
      key="sparkles"
      className="w-6 h-6 text-[var(--color-white)]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
      />
    </svg>,
    // Link - Partnership
    <svg
      key="link"
      className="w-6 h-6 text-[var(--color-white)]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
      />
    </svg>,
    // Users - Community
    <svg
      key="users"
      className="w-6 h-6 text-[var(--color-white)]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>,
    // Chip - Technology
    <svg
      key="chip"
      className="w-6 h-6 text-[var(--color-white)]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
      />
    </svg>,
  ];

  return icons[index % icons.length];
}
