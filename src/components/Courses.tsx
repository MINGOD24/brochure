import Link from "next/link";

interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  format: string;
  imageUrl?: string | null;
  learnMoreUrl?: string | null;
}

interface CoursesProps {
  courses: Course[];
}

export default function Courses({ courses }: CoursesProps) {
  return (
    <section id="courses" className="py-24 bg-cream relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--color-white)] to-transparent opacity-30" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-[var(--color-navy)]" />
            <span className="text-[var(--color-navy)] uppercase tracking-[0.2em] text-sm font-bold">
              Educational Programs
            </span>
            <div className="h-px w-12 bg-[var(--color-navy)]" />
          </div>

          <h2 className="text-4xl md:text-5xl font-semibold text-[var(--color-navy)] mb-4">
            Our Programs
          </h2>

          <p className="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto">
            Comprehensive educational material designed to preserve memory,
            build understanding, and combat hate through knowledge.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <Link
              key={course.id}
              href={course.learnMoreUrl || "#contact"}
              target={course.learnMoreUrl ? "_blank" : undefined}
              rel={course.learnMoreUrl ? "noopener noreferrer" : undefined}
              className="card-hover bg-white rounded-lg overflow-hidden shadow-lg group flex flex-col cursor-pointer"
            >
              {/* Image placeholder or actual image */}
              <div className="relative h-48 bg-[var(--color-navy)] overflow-hidden">
                {course.imageUrl ? (
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <CourseIcon index={index} />
                  </div>
                )}
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)] to-transparent opacity-60" />

                {/* Format badge */}
                <div className="absolute top-4 right-4 bg-[var(--color-white)] text-[var(--color-navy)] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {course.format}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-[var(--color-navy)] mb-3 group-hover:text-[var(--color-navy-light)] transition-colors">
                  {course.title}
                </h3>

                <p className="text-[var(--color-text-muted)] mb-4 leading-relaxed flex-grow">
                  {course.description}
                </p>

                {/* Meta info */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-[var(--color-text-muted)] text-sm">
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{course.duration}</span>
                  </div>

                  <span className="text-[var(--color-navy)] font-bold text-sm group-hover:text-[var(--color-navy-light)] transition-colors flex items-center gap-1">
                    Learn More
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
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href="#contact" className="btn-primary rounded-sm inline-block">
            Request Course Information
          </Link>
        </div>
      </div>
    </section>
  );
}

function CourseIcon({ index }: { index: number }) {
  const icons = [
    // Holocaust Education
    <svg
      key="candle"
      className="w-20 h-20 text-[var(--color-navy)]/30"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>,
    // Heritage & Culture
    <svg
      key="scroll"
      className="w-20 h-20 text-[var(--color-navy)]/30"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>,
    // Combating Antisemitism
    <svg
      key="shield"
      className="w-20 h-20 text-[var(--color-navy)]/30"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>,
  ];

  return icons[index % icons.length];
}
