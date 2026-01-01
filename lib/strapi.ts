import { StrapiResponse, StrapiData } from "@/types/strapi";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || "";

/**
 * Fetches data from Strapi CMS
 * @param endpoint - The API endpoint to fetch from
 * @param options - Additional fetch options
 * @returns The fetched data
 */
export async function fetchStrapi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${STRAPI_URL}/api${endpoint}`;
  
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!response.ok) {
      console.error(`Strapi API error: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to fetch from Strapi: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching from Strapi:", error);
    throw error;
  }
}

/**
 * Gets the full URL for a Strapi image
 * @param url - The image URL from Strapi
 * @returns The full image URL
 */
export function getStrapiImageUrl(url: string | undefined): string {
  if (!url) return "/placeholder.jpg";
  
  // If URL is already absolute, return it
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  
  // Otherwise, prepend the Strapi URL
  return `${STRAPI_URL}${url}`;
}

/**
 * Fetches hero section data from Strapi
 */
export async function getHeroSection() {
  try {
    const response = await fetchStrapi<StrapiResponse<StrapiData<any>>>(
      "/hero-section?populate=*"
    );
    return response.data?.attributes || null;
  } catch (error) {
    console.error("Error fetching hero section:", error);
    return null;
  }
}

/**
 * Fetches courses data from Strapi
 */
export async function getCourses() {
  try {
    const response = await fetchStrapi<StrapiResponse<StrapiData<any>[]>>(
      "/courses?populate=*"
    );
    return response.data || [];
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
}

/**
 * Fetches about section data from Strapi
 */
export async function getAboutSection() {
  try {
    const response = await fetchStrapi<StrapiResponse<StrapiData<any>>>(
      "/about-section?populate=*"
    );
    return response.data?.attributes || null;
  } catch (error) {
    console.error("Error fetching about section:", error);
    return null;
  }
}

/**
 * Fetches organization info from Strapi
 */
export async function getOrganizationInfo() {
  try {
    const response = await fetchStrapi<StrapiResponse<StrapiData<any>>>(
      "/organization-info?populate=*"
    );
    return response.data?.attributes || null;
  } catch (error) {
    console.error("Error fetching organization info:", error);
    return null;
  }
}
