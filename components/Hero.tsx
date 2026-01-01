import Image from "next/image";
import { getStrapiImageUrl } from "@/lib/strapi";

interface HeroProps {
  data?: {
    title: string;
    subtitle: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    backgroundImage?: any;
  };
}

export default function Hero({ data }: HeroProps) {
  // Default content if Strapi data is not available
  const title = data?.title || "Transform Your Future with Quality Education";
  const subtitle = data?.subtitle || "Learn. Grow. Succeed.";
  const description = data?.description || 
    "Discover comprehensive courses designed by industry experts. Join thousands of students who have advanced their careers with our proven programs.";
  const ctaText = data?.ctaText || "Explore Courses";
  const ctaLink = data?.ctaLink || "#courses";
  const backgroundImage = data?.backgroundImage?.data?.attributes?.url;

  return (
    <section className="relative bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20 md:py-32 overflow-hidden">
      {backgroundImage && (
        <div className="absolute inset-0 opacity-20">
          <Image
            src={getStrapiImageUrl(backgroundImage)}
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg md:text-xl font-semibold mb-4 opacity-90">
            {subtitle}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            {description}
          </p>
          <a
            href={ctaLink}
            className="inline-block bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg"
          >
            {ctaText}
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
