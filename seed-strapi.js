#!/usr/bin/env node

/**
 * JHEAC Strapi Content Seeder
 *
 * This script populates your Strapi CMS with all the JHEAC content.
 *
 * USAGE:
 * 1. Get your API token from Strapi Cloud Admin:
 *    Settings → API Tokens → Create new API Token (Full Access)
 *
 * 2. Run the script:
 *    STRAPI_URL=https://your-app.strapiapp.com STRAPI_TOKEN=your-token node seed-strapi.js
 */

const STRAPI_URL =
  process.env.STRAPI_URL || "https://gorgeous-purpose-478f30381f.strapiapp.com";
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

if (!STRAPI_TOKEN) {
  console.error("\n❌ ERROR: STRAPI_TOKEN environment variable is required!\n");
  console.log("How to get your API token:");
  console.log("1. Go to your Strapi admin panel");
  console.log("2. Settings → API Tokens → Create new API Token");
  console.log('3. Name: "Seed Script", Token type: "Full access"');
  console.log("4. Copy the token and run:\n");
  console.log(`   STRAPI_TOKEN=your-token-here node seed-strapi.js\n`);
  process.exit(1);
}

// ============================================
// CONTENT DATA
// ============================================

const heroData = {
  title: "Jewish Heritage Education and Advocacy Center",
  subtitle: "Carrying the Message Across North America",
  description:
    "Based in Florida, the Jewish Heritage Education and Advocacy Center carries the message of the Jewish Museum of Chile across North America. By bringing memory to life through exhibitions, educational materials, and partnerships, we combat antisemitism and celebrate the fullness of Jewish heritage.",
  ctaText: "Join Our Mission",
  ctaLink: "#contact",
};

const missionData = {
  title: "Our Mission",
  description:
    "Based in Florida, the Jewish Heritage Education and Advocacy Center carries the message of the Jewish Museum of Chile across North America. By bringing memory to life through exhibitions, educational materials, and partnerships, we combat antisemitism and celebrate the fullness of Jewish heritage.",
  points: [
    { text: "Preserve and share Jewish heritage through education" },
    { text: "Combat antisemitism through awareness and advocacy" },
    { text: "Partner with institutions across North America" },
    { text: "Connect communities through shared cultural experiences" },
  ],
};

const aboutData = {
  name: "Dalia Pollak",
  title: "Executive Director",
  bio: "Executive director of Jewish Heritage Education and Advocacy Center. Co-founder & President of the Jewish Museum of Chile Foundation. Daughter of a Romanian-born Holocaust survivor, deeply committed to memory, education, and community building.",
  achievements: [
    {
      text: "Executive director of Jewish Heritage Education and Advocacy Center",
    },
    { text: "Co-founder & President, Jewish Museum of Chile Foundation" },
    {
      text: "Resides in the U.S. under an O-1 visa for extraordinary ability in education",
    },
    { text: "A leading voice in Jewish education across Latin America" },
    { text: "Established partnerships with ADL and USC Shoah Foundation" },
    {
      text: "Founder of Red LAJD (Latin American Network for Holocaust Educators)",
    },
    { text: "Serves on the Advisory Council of JCHL at Brandeis Center" },
    { text: "Co-founder of ICOM International Council of Museums network" },
  ],
};

const contactInfoData = {
  email: "JHEACINFO@jewishheritageac.com",
  phone: "",
  address: "Florida, USA",
  partnershipTitle: "Interested in joining our global educational mission?",
  partnershipDescription:
    "Become a partner, host institution, or sponsor to bring Jewish history and the fight against hate to audiences across the United States and beyond.",
};

const globalData = {
  siteName: "Jewish Heritage Education and Advocacy Center",
  siteDescription:
    "Based in Florida, the Jewish Heritage Education and Advocacy Center carries the message of the Jewish Museum of Chile across North America.",
  footerText:
    "© 2025 Jewish Heritage Education and Advocacy Center. All rights reserved.",
};

const projectionsData = [
  {
    title: "Educational Materials",
    description:
      "Create and deliver impactful educational material on the Holocaust and Jewish culture.",
    year: "2025-2028",
    order: 1,
  },
  {
    title: "Interactive Experiences",
    description:
      "Develop unique museum-style and educational experiences for communities.",
    year: "2025-2028",
    order: 2,
  },
  {
    title: "Partnership Development",
    description:
      "Strengthen partnerships with the Jewish Museum of Chile and expand collaborative projects.",
    year: "2025-2028",
    order: 3,
  },
  {
    title: "Community Engagement",
    description:
      "Engage with Jewish communities across the Americas through events and educational forums.",
    year: "2025-2028",
    order: 4,
  },
  {
    title: "Technology & Innovation",
    description:
      "Leverage technology for virtual exhibitions and digital educational resources.",
    year: "2025-2028",
    order: 5,
  },
];

const coursesData = [
  {
    title: "Holocaust Education Fundamentals",
    description:
      "Comprehensive course covering the history, impact, and lessons of the Holocaust for educators and community leaders.",
    duration: "8 weeks",
    format: "Online & In-Person",
    order: 1,
  },
  {
    title: "Jewish Heritage & Culture",
    description:
      "Explore the rich tapestry of Jewish traditions, customs, and cultural contributions throughout history.",
    duration: "6 weeks",
    format: "Online",
    order: 2,
  },
  {
    title: "Combating Antisemitism",
    description:
      "Learn effective strategies and approaches to identify, address, and prevent antisemitism in communities.",
    duration: "4 weeks",
    format: "Workshop Series",
    order: 3,
  },
];

// ============================================
// API HELPERS
// ============================================

async function strapiRequest(endpoint, method = "GET", data = null) {
  const url = `${STRAPI_URL}/api${endpoint}`;
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
  };

  if (data) {
    options.body = JSON.stringify({ data });
  }

  const response = await fetch(url, options);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(`API Error: ${JSON.stringify(result)}`);
  }

  return result;
}

async function createOrUpdateSingleType(name, data) {
  try {
    // Try to get existing entry
    const existing = await strapiRequest(`/${name}`);
    if (existing.data) {
      // Update existing
      await strapiRequest(`/${name}`, "PUT", data);
      console.log(`✅ Updated: ${name}`);
      return;
    }
  } catch (e) {
    // Doesn't exist, create it
  }

  try {
    await strapiRequest(`/${name}`, "PUT", data);
    console.log(`✅ Created: ${name}`);
  } catch (e) {
    console.error(`❌ Failed: ${name}`, e.message);
  }
}

async function createCollectionEntries(name, entries) {
  // First, check if entries already exist
  try {
    const existing = await strapiRequest(`/${name}s`);
    if (existing.data && existing.data.length > 0) {
      console.log(
        `⏭️  Skipping ${name}s (${existing.data.length} entries already exist)`
      );
      return;
    }
  } catch (e) {
    // Collection might be empty or not exist
  }

  for (const entry of entries) {
    try {
      await strapiRequest(`/${name}s`, "POST", entry);
      console.log(`✅ Created: ${name} - "${entry.title}"`);
    } catch (e) {
      console.error(`❌ Failed: ${name} - "${entry.title}"`, e.message);
    }
  }
}

// ============================================
// MAIN SEED FUNCTION
// ============================================

async function seedStrapi() {
  console.log("\n🌱 Starting JHEAC Strapi Content Seeder...\n");
  console.log(`📡 Target: ${STRAPI_URL}\n`);

  try {
    // Single Types
    console.log("--- Single Types ---");
    await createOrUpdateSingleType("hero", heroData);
    await createOrUpdateSingleType("mission", missionData);
    await createOrUpdateSingleType("about", aboutData);
    await createOrUpdateSingleType("contact-info", contactInfoData);
    await createOrUpdateSingleType("global", globalData);

    // Collection Types
    console.log("\n--- Collection Types ---");
    await createCollectionEntries("projection", projectionsData);
    await createCollectionEntries("course", coursesData);

    console.log("\n✨ Seeding complete!\n");
    console.log("Next steps:");
    console.log("1. Go to your Strapi admin panel");
    console.log("2. Content Manager → Check each content type");
    console.log("3. Make sure all entries are Published (not Draft)\n");
  } catch (error) {
    console.error("\n❌ Seeding failed:", error.message);
    process.exit(1);
  }
}

// Run the seeder
seedStrapi();
