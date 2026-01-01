import Image from "next/image";
import { getStrapiImageUrl } from "@/lib/strapi";

interface AboutProps {
  data?: {
    title: string;
    description: string;
    mission: string;
    vision: string;
    image?: any;
  };
}

export default function About({ data }: AboutProps) {
  // Default content if Strapi data is not available
  const title = data?.title || "About Our Organization";
  const description = data?.description || 
    "We are dedicated to providing high-quality education that transforms lives and empowers individuals to achieve their full potential.";
  const mission = data?.mission || 
    "Our mission is to deliver accessible, industry-relevant education that prepares students for successful careers in technology and beyond.";
  const vision = data?.vision || 
    "We envision a world where everyone has access to quality education and the opportunity to pursue their dreams.";
  const image = data?.image?.data?.attributes?.url;

  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              {title}
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              {description}
            </p>
            
            <div className="space-y-6">
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="text-xl font-bold mb-2 text-gray-900">Our Mission</h3>
                <p className="text-gray-600">{mission}</p>
              </div>
              
              <div className="border-l-4 border-indigo-600 pl-4">
                <h3 className="text-xl font-bold mb-2 text-gray-900">Our Vision</h3>
                <p className="text-gray-600">{vision}</p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-1">10K+</div>
                <div className="text-sm text-gray-600">Students</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-1">50+</div>
                <div className="text-sm text-gray-600">Courses</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-1">95%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="relative h-96 lg:h-full min-h-[400px] rounded-lg overflow-hidden shadow-xl">
              {image ? (
                <Image
                  src={getStrapiImageUrl(image)}
                  alt="About our organization"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <div className="text-white text-center p-8">
                    <svg
                      className="w-24 h-24 mx-auto mb-4 opacity-50"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                    <p className="text-xl font-semibold">Education Excellence</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
