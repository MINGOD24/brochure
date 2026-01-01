import Image from "next/image";
import { getStrapiImageUrl } from "@/lib/strapi";

interface CoursesProps {
  data?: Array<{
    id: number;
    attributes: {
      title: string;
      description: string;
      duration: string;
      level: string;
      thumbnail?: any;
      slug: string;
      price?: number;
    };
  }>;
}

export default function Courses({ data }: CoursesProps) {
  // Default courses if Strapi data is not available
  const defaultCourses = [
    {
      id: 1,
      attributes: {
        title: "Web Development Fundamentals",
        description: "Master the basics of HTML, CSS, and JavaScript. Build responsive websites from scratch.",
        duration: "8 weeks",
        level: "Beginner",
        slug: "web-dev-fundamentals",
        thumbnail: undefined,
        price: undefined,
      },
    },
    {
      id: 2,
      attributes: {
        title: "Advanced React & Next.js",
        description: "Learn modern React patterns, hooks, and build production-ready applications with Next.js.",
        duration: "10 weeks",
        level: "Intermediate",
        slug: "advanced-react-nextjs",
        thumbnail: undefined,
        price: undefined,
      },
    },
    {
      id: 3,
      attributes: {
        title: "Full Stack Development",
        description: "Become a full-stack developer. Learn frontend, backend, databases, and deployment.",
        duration: "16 weeks",
        level: "Advanced",
        slug: "full-stack-development",
        thumbnail: undefined,
        price: undefined,
      },
    },
  ];

  const courses = data || defaultCourses;

  return (
    <section id="courses" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Our Courses
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our wide range of courses designed to help you achieve your goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {course.attributes.thumbnail?.data?.attributes?.url && (
                <div className="relative h-48 bg-gradient-to-br from-blue-500 to-indigo-600">
                  <Image
                    src={getStrapiImageUrl(course.attributes.thumbnail.data.attributes.url)}
                    alt={course.attributes.thumbnail.data.attributes.alternativeText || course.attributes.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              {!course.attributes.thumbnail?.data?.attributes?.url && (
                <div className="h-48 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <span className="text-white text-4xl font-bold opacity-50">
                    {course.attributes.title.substring(0, 1)}
                  </span>
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                    {course.attributes.level}
                  </span>
                  <span className="text-gray-600 text-sm">
                    {course.attributes.duration}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  {course.attributes.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {course.attributes.description}
                </p>
                
                <div className="flex items-center justify-between">
                  {course.attributes.price && (
                    <span className="text-2xl font-bold text-blue-600">
                      ${course.attributes.price}
                    </span>
                  )}
                  <a
                    href={`/courses/${course.attributes.slug}`}
                    className="text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                  >
                    Learn More →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
