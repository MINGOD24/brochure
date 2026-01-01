import Hero from "@/components/Hero";
import Courses from "@/components/Courses";
import About from "@/components/About";
import Footer from "@/components/Footer";
import {
  getHeroSection,
  getCourses,
  getAboutSection,
  getOrganizationInfo,
} from "@/lib/strapi";

export default async function Home() {
  // Fetch data from Strapi CMS
  // These will gracefully fall back to default content if Strapi is not configured
  const heroData = await getHeroSection();
  const coursesData = await getCourses();
  const aboutData = await getAboutSection();
  const orgInfo = await getOrganizationInfo();

  return (
    <main className="min-h-screen">
      <Hero data={heroData} />
      <Courses data={coursesData} />
      <About data={aboutData} />
      <Footer data={orgInfo} />
    </main>
  );
}
