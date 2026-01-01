import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Mission from "@/components/Mission";
import Projections from "@/components/Projections";
import Courses from "@/components/Courses";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import {
  fallbackContent,
  getHeroContent,
  getMissionContent,
  getProjections,
  getCourses,
  getAboutContent,
  getContactInfo,
  getSiteSettings,
  getStrapiImageUrl,
} from "@/lib/strapi";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  // Fetch all content from Strapi (with fallbacks)
  const [
    heroData,
    missionData,
    projectionsData,
    coursesData,
    aboutData,
    contactData,
    siteSettings,
  ] = await Promise.all([
    getHeroContent(),
    getMissionContent(),
    getProjections(),
    getCourses(),
    getAboutContent(),
    getContactInfo(),
    getSiteSettings(),
  ]);

  // Use Strapi data or fallback content
  const hero = heroData?.attributes || fallbackContent.hero;
  const mission = missionData?.attributes || fallbackContent.mission;
  const projections =
    projectionsData.length > 0
      ? projectionsData.map((p) => ({
          id: p.id,
          title: p.attributes.title,
          description: p.attributes.description,
          year: p.attributes.year,
        }))
      : fallbackContent.projections;

  const courses =
    coursesData.length > 0
      ? coursesData.map((c) => ({
          id: c.id,
          title: c.attributes.title,
          description: c.attributes.description,
          duration: c.attributes.duration,
          format: c.attributes.format,
          imageUrl: getStrapiImageUrl(c.attributes.image),
        }))
      : fallbackContent.courses.map((c) => ({ ...c, imageUrl: null }));

  const about = aboutData?.attributes || fallbackContent.about;
  const contact = contactData?.attributes || fallbackContent.contact;
  const settings = siteSettings?.attributes || fallbackContent.siteSettings;

  return (
    <main className="min-h-screen">
      <Header
        siteName={settings.siteName}
        logoUrl={getStrapiImageUrl(siteSettings?.attributes?.logo)}
      />

      <Hero
        title={hero.title}
        subtitle={hero.subtitle}
        description={hero.description}
        ctaText={hero.ctaText}
        ctaLink={hero.ctaLink}
        backgroundImageUrl={
          heroData
            ? getStrapiImageUrl(heroData.attributes.backgroundImage)
            : null
        }
      />

      <Mission
        title={mission.title}
        description={mission.description}
        points={
          "points" in mission && Array.isArray(mission.points)
            ? mission.points.map((p: { text?: string } | string) =>
                typeof p === "string" ? p : p.text || ""
              )
            : fallbackContent.mission.points
        }
      />

      <Projections projections={projections} />

      <Courses courses={courses} />

      <About
        name={about.name}
        title={about.title}
        bio={about.bio}
        imageUrl={
          aboutData ? getStrapiImageUrl(aboutData.attributes.image) : null
        }
        achievements={
          "achievements" in about && Array.isArray(about.achievements)
            ? about.achievements.map((a: { text?: string } | string) =>
                typeof a === "string" ? a : a.text || ""
              )
            : fallbackContent.about.achievements
        }
      />

      <Contact
        email={contact.email}
        phone={"phone" in contact ? String(contact.phone) : undefined}
        address={"address" in contact ? String(contact.address) : undefined}
        partnershipTitle={contact.partnershipTitle}
        partnershipDescription={contact.partnershipDescription}
      />

      <Footer
        siteName={settings.siteName}
        footerText={settings.footerText}
        email={contact.email}
      />
    </main>
  );
}
