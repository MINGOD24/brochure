import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Mission from "@/components/Mission";
import Projections from "@/components/Projections";
import Courses from "@/components/Courses";
import About from "@/components/About";
import News from "@/components/News";
import Donate from "@/components/Donate";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import StrapiRetryAfterSleep from "@/components/StrapiRetryAfterSleep";
import {
  fallbackContent,
  getHeroContent,
  getMissionContent,
  getProjections,
  getCourses,
  getAboutContent,
  getContactInfo,
  getSiteSettings,
  getNews,
  getStrapiImageUrl,
  resetStrapiUsedCacheFlag,
  getStrapiUsedCache,
} from "@/lib/strapi";

export const revalidate = 86400; // Revalidate once per day; Vercel cron + StrapiRetryAfterSleep handle on-demand refresh

export default async function Home() {
  resetStrapiUsedCacheFlag();

  // Fetch all content from Strapi (with fallbacks and persisted cache when Strapi is sleeping)
  const [
    heroData,
    missionData,
    projectionsData,
    coursesData,
    aboutData,
    newsData,
    contactData,
    siteSettings,
  ] = await Promise.all([
    getHeroContent().catch(() => null),
    getMissionContent().catch(() => null),
    getProjections().catch(() => []),
    getCourses().catch(() => []),
    getAboutContent().catch(() => null),
    getNews().catch(() => []),
    getContactInfo().catch(() => null),
    getSiteSettings().catch(() => null),
  ]);

  // Use Strapi data or fallback content (Strapi v5 flat structure)
  const hero = heroData || fallbackContent.hero;
  const mission = missionData || fallbackContent.mission;

  // Safely map projections with validation
  const projections =
    projectionsData && projectionsData.length > 0
      ? projectionsData
          .filter((p) => p && p.title) // Filter out invalid entries
          .map((p) => ({
            id: p.id,
            title: p.title,
            description: p.description || "",
            year: p.year || "",
          }))
      : fallbackContent.projections;

  // Use fallback if mapping resulted in empty array
  const finalProjections =
    projections.length > 0 ? projections : fallbackContent.projections;

  // Safely map courses with validation
  const courses =
    coursesData && coursesData.length > 0
      ? coursesData
          .filter((c) => c && c.title) // Filter out invalid entries
          .map((c) => ({
            id: c.id,
            title: c.title,
            description: c.description || "",
            duration: c.duration || "",
            format: c.format || "",
            imageUrl: getStrapiImageUrl(c.image),
            learnMoreUrl: c.learnMoreUrl || null,
          }))
      : fallbackContent.courses.map((c) => ({
          ...c,
          imageUrl: null,
          learnMoreUrl: null,
        }));

  // Use fallback if mapping resulted in empty array
  const finalCourses =
    courses.length > 0
      ? courses
      : fallbackContent.courses.map((c) => ({
          ...c,
          imageUrl: null,
          learnMoreUrl: null,
        }));

  const about = aboutData || fallbackContent.about;
  const contact = contactData || fallbackContent.contact;
  const settings = siteSettings || fallbackContent.siteSettings;

  // Safely map news with validation
  const news =
    newsData && newsData.length > 0
      ? newsData
          .filter((n) => n && n.title) // Filter out invalid entries
          .map((n) => ({
            id: n.id,
            title: n.title,
            source: n.source || "",
            url: n.url || "",
            publishedAt: n.publishedAt || "",
            excerpt: n.excerpt,
            imageUrl: getStrapiImageUrl(n.image),
          }))
      : fallbackContent.news.map((n) => ({ ...n, imageUrl: null }));

  const finalNews =
    news.length > 0
      ? news
      : fallbackContent.news.map((n) => ({ ...n, imageUrl: null }));

  const usedStrapiCache = getStrapiUsedCache();

  return (
    <main className="min-h-screen">
      {usedStrapiCache ? <StrapiRetryAfterSleep /> : null}
      <Header
        siteName={settings.siteName}
        logoUrl={siteSettings ? getStrapiImageUrl(siteSettings.logo) : null}
      />

      <Hero
        title={hero.title}
        subtitle={hero.subtitle}
        description={hero.description}
        ctaText={hero.ctaText}
        ctaLink={hero.ctaLink}
        backgroundImageUrl={
          heroData ? getStrapiImageUrl(heroData.backgroundImage) : null
        }
      />

      <Mission
        title={mission.title}
        description={mission.description}
        points={
          "points" in mission && Array.isArray(mission.points)
            ? mission.points.map((p: { text?: string } | string) =>
                typeof p === "string" ? p : p.text || "",
              )
            : fallbackContent.mission.points
        }
      />

      <Projections projections={finalProjections} />

      <Courses courses={finalCourses} />

      <About
        name={about.name}
        title={about.title}
        bio={about.bio}
        imageUrl={aboutData ? getStrapiImageUrl(aboutData.image) : null}
        achievements={
          "achievements" in about && Array.isArray(about.achievements)
            ? about.achievements.map((a: { text?: string } | string) =>
                typeof a === "string" ? a : a.text || "",
              )
            : fallbackContent.about.achievements
        }
      />

      <News articles={finalNews} />

      <Donate />

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
