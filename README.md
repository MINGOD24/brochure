# Jewish Heritage Education and Advocacy Center - Landing Page

A modern Next.js landing page for the Jewish Heritage Education and Advocacy Center (JHEAC), with Strapi CMS integration for easy content management.

## 🚀 Tech Stack

- **Frontend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Strapi Cloud
- **Deployment**: Vercel

## 📋 Features

- ✅ Responsive design matching the brochure
- ✅ Navy blue and gold color scheme
- ✅ Smooth scroll navigation
- ✅ Animated sections
- ✅ Contact form
- ✅ Strapi CMS integration for dynamic content
- ✅ SEO optimized
- ✅ Fast performance with Next.js App Router

## 🛠️ Local Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Deployment Guide

### Step 1: Push to GitHub

1. Create a new repository on GitHub
2. Initialize and push your code:

```bash
cd landing
git init
git add .
git commit -m "Initial commit: JHEAC landing page"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/jheac-landing.git
git push -u origin main
```

### Step 2: Set Up Strapi Cloud

1. Go to [Strapi Cloud](https://cloud.strapi.io)
2. Sign up or log in
3. Click **"Create Project"**
4. Choose a template or start from scratch
5. Wait for deployment to complete

### Step 3: Configure Strapi Content Types

In your Strapi admin panel, create these **Single Types**:

#### Hero (Single Type)

| Field           | Type      |
| --------------- | --------- |
| title           | Text      |
| subtitle        | Text      |
| description     | Rich Text |
| ctaText         | Text      |
| ctaLink         | Text      |
| backgroundImage | Media     |

#### Mission (Single Type)

| Field       | Type                                       |
| ----------- | ------------------------------------------ |
| title       | Text                                       |
| description | Rich Text                                  |
| points      | Component (Repeatable) - with `text` field |

#### About (Single Type)

| Field        | Type                                       |
| ------------ | ------------------------------------------ |
| name         | Text                                       |
| title        | Text                                       |
| bio          | Rich Text                                  |
| image        | Media                                      |
| achievements | Component (Repeatable) - with `text` field |

#### Contact Info (Single Type)

| Field                  | Type      |
| ---------------------- | --------- |
| email                  | Email     |
| phone                  | Text      |
| address                | Text      |
| partnershipTitle       | Text      |
| partnershipDescription | Rich Text |

#### Site Setting (Single Type)

| Field       | Type                                                      |
| ----------- | --------------------------------------------------------- |
| siteName    | Text                                                      |
| logo        | Media                                                     |
| footerText  | Text                                                      |
| socialLinks | Component (Repeatable) - with `platform` and `url` fields |

Create these **Collection Types**:

#### Projections (Collection Type)

| Field       | Type      |
| ----------- | --------- |
| title       | Text      |
| description | Rich Text |
| year        | Text      |
| order       | Number    |

#### Courses (Collection Type)

| Field       | Type      |
| ----------- | --------- |
| title       | Text      |
| description | Rich Text |
| duration    | Text      |
| format      | Text      |
| image       | Media     |
| order       | Number    |

### Step 4: Set Strapi Permissions

1. Go to **Settings > Roles > Public**
2. Enable **find** and **findOne** for all content types
3. Save

### Step 5: Create Strapi API Token

1. Go to **Settings > API Tokens**
2. Click **"Create new API Token"**
3. Name: `Vercel Frontend`
4. Token type: **Read-only**
5. Copy the token (you'll need it for Vercel)

### Step 6: Deploy to Vercel (with Strapi Integration)

#### Option A: Using Vercel's Strapi Integration (Recommended)

1. Go to [Vercel Integrations](https://vercel.com/integrations/strapi)
2. Click **"Add Integration"**
3. Select your Vercel team/account
4. Connect your Strapi Cloud account
5. Select your Strapi project
6. The integration will automatically add the environment variables!

#### Option B: Manual Deployment

1. Go to [Vercel](https://vercel.com)
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Configure environment variables:

   | Variable                 | Value                                                              |
   | ------------------------ | ------------------------------------------------------------------ |
   | `NEXT_PUBLIC_STRAPI_URL` | Your Strapi Cloud URL (e.g., `https://your-project.strapiapp.com`) |
   | `STRAPI_API_TOKEN`       | Your API token from Step 5                                         |

5. Click **"Deploy"**

### Step 7: Configure Webhook (Optional but Recommended)

To auto-rebuild your site when content changes:

1. In Vercel, go to **Project Settings > Git > Deploy Hooks**
2. Create a hook named "Strapi Content Update"
3. Copy the webhook URL
4. In Strapi, go to **Settings > Webhooks**
5. Add a new webhook with the Vercel URL
6. Select events: Entry create, update, delete

## 🔄 Content Management

Once deployed, your content manager can:

1. Log in to Strapi Cloud admin panel
2. Edit any content (text, images, etc.)
3. Save and publish
4. Changes appear on the website within 60 seconds (or immediately if using webhooks)

## 📁 Project Structure

```
landing/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main landing page
│   │   ├── layout.tsx        # Root layout with metadata
│   │   └── globals.css       # Global styles and animations
│   ├── components/
│   │   ├── Header.tsx        # Navigation header
│   │   ├── Hero.tsx          # Hero section
│   │   ├── Mission.tsx       # Mission section
│   │   ├── Projections.tsx   # Projections 2025-2028
│   │   ├── Courses.tsx       # Educational courses
│   │   ├── About.tsx         # About Dalia Pollak
│   │   ├── Contact.tsx       # Contact form
│   │   └── Footer.tsx        # Footer
│   └── lib/
│       └── strapi.ts         # Strapi API integration
├── public/                    # Static assets
├── next.config.ts            # Next.js configuration
└── package.json
```

## 🎨 Customization

### Colors

The color scheme is defined in `globals.css`:

```css
:root {
  --color-navy: #1a2744;
  --color-gold: #c9a962;
  --color-cream: #f8f6f0;
}
```

### Fonts

Using Cormorant Garamond for headings and Lato for body text, giving an elegant, professional feel.

## 📧 Support

For technical issues, contact your development team.
For content questions, contact: JHEACINFO@jewishheritageac.com

---

© 2025 Jewish Heritage Education and Advocacy Center
