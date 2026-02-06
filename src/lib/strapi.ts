// Strapi API integration
// This file handles all communication with Strapi CMS
// Updated for Strapi v5 flat response structure

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
}

// Types for Strapi content (Strapi v5 flat structure)
export interface HeroContent {
  id: number;
  documentId: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: StrapiImage;
}

export interface MissionContent {
  id: number;
  documentId: string;
  title: string;
  description: string;
  points: {
    id: number;
    text: string;
  }[];
}

export interface Projection {
  id: number;
  documentId: string;
  title: string;
  description: string;
  year: string;
  order: number;
}

export interface AboutContent {
  id: number;
  documentId: string;
  name: string;
  title: string;
  bio: string;
  image?: StrapiImage;
  achievements: {
    id: number;
    text: string;
  }[];
}

export interface Course {
  id: number;
  documentId: string;
  title: string;
  description: string;
  duration: string;
  format: string;
  image?: StrapiImage;
  order: number;
  learnMoreUrl?: string;
}

export interface ContactInfo {
  id: number;
  documentId: string;
  email: string;
  phone?: string;
  address?: string;
  partnershipTitle: string;
  partnershipDescription: string;
}

export interface SiteSettings {
  id: number;
  documentId: string;
  siteName: string;
  logo?: StrapiImage;
  footerText: string;
  socialLinks?: {
    id: number;
    platform: string;
    url: string;
  }[];
}

export interface NewsArticle {
  id: number;
  documentId: string;
  title: string;
  source: string;
  url: string;
  publishedAt: string;
  excerpt?: string;
  image?: StrapiImage;
}

// Helper to get full image URL (Strapi v5 format)
export function getStrapiImageUrl(image?: StrapiImage | null): string | null {
  if (!image) return null;

  const url = image.url;

  // If URL is already absolute, return it
  if (url.startsWith("http")) return url;

  // Otherwise, prepend Strapi URL
  return `${STRAPI_URL}${url}`;
}

// Fetch helper with authentication and timeout
async function fetchStrapi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T | null> {
  const url = `${STRAPI_URL}/api${endpoint}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (STRAPI_API_TOKEN) {
    headers["Authorization"] = `Bearer ${STRAPI_API_TOKEN}`;
  }

  // Create an AbortController with 10 second timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
      next: { revalidate: 86400 }, // Revalidate once per day (24 hours)
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(
        `Strapi fetch error: ${response.status} ${response.statusText}`
      );
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      console.error("Strapi fetch timeout:", endpoint);
    } else {
      console.error("Strapi fetch error:", error);
    }
    return null;
  }
}

// API functions
export async function getHeroContent(): Promise<HeroContent | null> {
  const response = await fetchStrapi<StrapiResponse<HeroContent>>(
    "/hero?populate=*"
  );
  return response?.data || null;
}

export async function getMissionContent(): Promise<MissionContent | null> {
  const response = await fetchStrapi<StrapiResponse<MissionContent>>(
    "/mission?populate=*"
  );
  return response?.data || null;
}

export async function getProjections(): Promise<Projection[]> {
  const response = await fetchStrapi<StrapiResponse<Projection[]>>(
    "/projections?populate=*&sort=order:asc"
  );
  return response?.data || [];
}

export async function getAboutContent(): Promise<AboutContent | null> {
  const response = await fetchStrapi<StrapiResponse<AboutContent>>(
    "/about?populate=*"
  );
  return response?.data || null;
}

export async function getCourses(): Promise<Course[]> {
  const response = await fetchStrapi<StrapiResponse<Course[]>>(
    "/courses?populate=*&sort=order:asc"
  );
  return response?.data || [];
}

export async function getContactInfo(): Promise<ContactInfo | null> {
  const response = await fetchStrapi<StrapiResponse<ContactInfo>>(
    "/contact-info?populate=*"
  );
  return response?.data || null;
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const response = await fetchStrapi<StrapiResponse<SiteSettings>>(
    "/global?populate=*"
  );
  return response?.data || null;
}

export async function getNews(): Promise<NewsArticle[]> {
  const response = await fetchStrapi<StrapiResponse<NewsArticle[]>>(
    "/news-articles?populate=*&sort=publishedAt:desc"
  );
  return response?.data || [];
}

// Fallback content when Strapi is not available
export const fallbackContent = {
  hero: {
    title: "Jewish Heritage Education and Advocacy Center",
    subtitle: "Carrying the Message Across North America",
    description:
      "Based in Florida, the Jewish Heritage Education and Advocacy Center carries the message of the Jewish Museum of Chile across North America. By bringing memory to life through exhibitions, educational materials, and partnerships, we combat antisemitism and celebrate the fullness of Jewish heritage.",
    ctaText: "Join Our Mission",
    ctaLink: "#contact",
  },
  mission: {
    title: "Our Mission",
    description:
      "Based in Florida, the Jewish Heritage Education and Advocacy Center carries the message of the Jewish Museum of Chile across North America. By bringing memory to life through exhibitions, educational materials, and partnerships, we combat antisemitism and celebrate the fullness of Jewish heritage.",
    points: [
      "Preserve and share Jewish heritage through education",
      "Combat antisemitism through awareness and advocacy",
      "Partner with institutions across North America",
      "Connect communities through shared cultural experiences",
    ],
  },
  projections: [
    {
      id: 1,
      title: "Educational Materials",
      description:
        "Create and deliver impactful educational material on the Holocaust and Jewish culture.",
      year: "2025-2028",
    },
    {
      id: 2,
      title: "Interactive Experiences",
      description:
        "Develop unique museum-style and educational experiences for communities.",
      year: "2025-2028",
    },
    {
      id: 3,
      title: "Partnership Development",
      description:
        "Strengthen partnerships with the Jewish Museum of Chile and expand collaborative projects.",
      year: "2025-2028",
    },
    {
      id: 4,
      title: "Community Engagement",
      description:
        "Engage with Jewish communities across the Americas through events and educational forums.",
      year: "2025-2028",
    },
    {
      id: 5,
      title: "Technology & Innovation",
      description:
        "Leverage technology for virtual exhibitions and digital educational resources.",
      year: "2025-2028",
    },
  ],
  about: {
    name: "Dalia Pollak",
    title: "Executive Director",
    bio: "Executive director of Jewish Heritage Education and Advocacy Center. Co-founder & President of the Jewish Museum of Chile Foundation. Daughter of a Romanian-born Holocaust survivor, deeply committed to memory, education, and community building.",
    achievements: [
      "Executive director of Jewish Heritage Education and Advocacy Center",
      "Co-founder & President, Jewish Museum of Chile Foundation",
      "Resides in the U.S. under an O-1 visa for extraordinary ability in education",
      "A leading voice in Jewish education across Latin America",
      "Established partnerships with ADL and USC Shoah Foundation",
      "Founder of Red LAJD (Latin American Network for Holocaust Educators)",
      "Serves on the Advisory Council of JCHL at Brandeis Center",
      "Co-founder of ICOM International Council of Museums network",
    ],
  },
  courses: [
    {
      id: 1,
      title: "Holocaust Education Fundamentals",
      description:
        "Comprehensive course covering the history, impact, and lessons of the Holocaust for educators and community leaders.",
      duration: "8 weeks",
      format: "Online & In-Person",
    },
    {
      id: 2,
      title: "Jewish Heritage & Culture",
      description:
        "Explore the rich tapestry of Jewish traditions, customs, and cultural contributions throughout history.",
      duration: "6 weeks",
      format: "Online",
    },
    {
      id: 3,
      title: "Combating Antisemitism",
      description:
        "Learn effective strategies and approaches to identify, address, and prevent antisemitism in communities.",
      duration: "4 weeks",
      format: "Workshop Series",
    },
  ],
  contact: {
    email: "JHEACINFO@jewishheritageac.com",
    partnershipTitle: "Interested in joining our global educational mission?",
    partnershipDescription:
      "Become a partner, host institution, or sponsor to bring Jewish history and the fight against hate to audiences across the United States and beyond.",
  },
  siteSettings: {
    siteName: "Jewish Heritage Education and Advocacy Center",
    footerText:
      "© 2025 Jewish Heritage Education and Advocacy Center. All rights reserved.",
  },
  news: [
    {
      id: 1,
      title:
        "Dalia Pollak: Pioneering Jewish Education in Chile's Museum Space",
      source: "Vin News",
      url: "https://vinnews.com/2024/07/29/dalia-pollak-pioneering-jewish-education-in-chile-s-museum-space/",
      publishedAt: "2024-07-29",
      excerpt:
        "An in-depth look at how Dalia Pollak is transforming Jewish education through innovative museum experiences.",
    },
    {
      id: 2,
      title:
        "The Untold Stories: How Jewish Advocate Dalia Pollak Is Leading the Fight Against Modern-Day Anti-Semitism",
      source: "Matzav",
      url: "https://matzav.com/the-untold-stories-how-jewish-advocate-dalia-pollak-is-leading-the-fight-against-modern-day-anti-semitism/",
      publishedAt: "2024-08-15",
      excerpt:
        "Discover the untold stories behind Dalia Pollak's advocacy work combating antisemitism worldwide.",
    },
    {
      id: 3,
      title:
        "Preserving Memory: Meet Dalia Pollak, The Expert Safeguarding Jewish Cultural Heritage For Future Generations",
      source: "Vents Magazine",
      url: "https://ventsmagazine.com/2024/09/14/preserving-memory-meet-dalia-pollak-the-expert-safeguarding-jewish-cultural-heritage-for-future-generations/",
      publishedAt: "2024-09-14",
      excerpt:
        "Meet the expert dedicated to preserving Jewish cultural heritage and memory for future generations.",
    },
  ],
};
