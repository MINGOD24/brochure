interface NewsArticle {
  id: number;
  title: string;
  source: string;
  url: string;
  publishedAt: string;
  excerpt?: string;
  imageUrl?: string | null;
}

interface NewsProps {
  articles: NewsArticle[];
}

// Source logo/icon mapping
const sourceIcons: Record<string, { bg: string; text: string }> = {
  "Vin News": { bg: "bg-blue-600", text: "VN" },
  Matzav: { bg: "bg-emerald-600", text: "M" },
  "Vents Magazine": { bg: "bg-purple-600", text: "V" },
  default: { bg: "bg-gray-600", text: "📰" },
};

function getSourceStyle(source: string) {
  return sourceIcons[source] || sourceIcons.default;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function News({ articles }: NewsProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section id="news" className="py-24 bg-cream relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[var(--color-navy)]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--color-gold)]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-[var(--color-gold)]" />
            <span className="text-[var(--color-gold)] uppercase tracking-[0.2em] text-sm font-medium">
              In The Press
            </span>
            <div className="h-px w-12 bg-[var(--color-gold)]" />
          </div>

          <h2 className="text-4xl md:text-5xl font-semibold text-[var(--color-navy)] mb-4">
            JHEAC in the News
          </h2>

          <p className="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto">
            Read about our work and impact in leading publications
          </p>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => {
            const sourceStyle = getSourceStyle(article.source);

            return (
              <a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[var(--color-gold)]/30 hover:-translate-y-2"
              >
                {/* Header with Source */}
                <div className="p-6 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    {article.imageUrl ? (
                      <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center">
                        <img
                          src={article.imageUrl}
                          alt={article.source}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div
                        className={`w-12 h-12 rounded-xl ${sourceStyle.bg} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                      >
                        {sourceStyle.text}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-[var(--color-navy)]">
                        {article.source}
                      </p>
                      <p className="text-sm text-[var(--color-text-muted)]">
                        {formatDate(article.publishedAt)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[var(--color-navy)] mb-3 line-clamp-3 group-hover:text-[var(--color-gold)] transition-colors leading-snug">
                    {article.title}
                  </h3>

                  {article.excerpt && (
                    <p className="text-[var(--color-text-muted)] text-sm line-clamp-2 mb-4">
                      {article.excerpt}
                    </p>
                  )}

                  {/* Read More Link */}
                  <div className="flex items-center gap-2 text-[var(--color-gold)] font-medium text-sm group-hover:gap-3 transition-all">
                    <span>Read Article</span>
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                </div>

                {/* Bottom accent */}
                <div className="h-1 bg-gradient-to-r from-[var(--color-navy)] via-[var(--color-gold)] to-[var(--color-navy)] opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            );
          })}
        </div>

        {/* View More Link (optional) */}
        <div className="text-center mt-12">
          <p className="text-[var(--color-text-muted)]">
            Featured in leading Jewish and international publications
          </p>
        </div>
      </div>
    </section>
  );
}
