# Strapi CMS Setup Guide

This guide will help you set up Strapi CMS for the Brochure landing page.

## Quick Start

### Option 1: Use Strapi Cloud (Recommended for Production)

1. Go to [Strapi Cloud](https://strapi.io/cloud)
2. Create a free account
3. Create a new project
4. Follow the Strapi setup steps below

### Option 2: Local Development

1. Create a new Strapi project:
```bash
npx create-strapi-app@latest brochure-cms --quickstart
```

2. Start Strapi:
```bash
cd brochure-cms
npm run develop
```

3. Create an admin account at http://localhost:1337/admin

## Content Type Builder

### 1. Hero Section (Single Type)

**Path**: Content-Type Builder → Create new single type → "Hero Section"

**Fields**:

| Field Name | Type | Settings |
|------------|------|----------|
| title | Text | Required, Max length: 200 |
| subtitle | Text | Required, Max length: 100 |
| description | Text (Long text) | Required |
| ctaText | Text | Required, Max length: 50 |
| ctaLink | Text | Required, Default: "#courses" |
| backgroundImage | Media | Single, Images only |

**Example Data**:
```json
{
  "title": "Transform Your Future with Quality Education",
  "subtitle": "Learn. Grow. Succeed.",
  "description": "Discover comprehensive courses designed by industry experts.",
  "ctaText": "Explore Courses",
  "ctaLink": "#courses"
}
```

### 2. Courses (Collection Type)

**Path**: Content-Type Builder → Create new collection type → "Course"

**Fields**:

| Field Name | Type | Settings |
|------------|------|----------|
| title | Text | Required, Max length: 200 |
| description | Text (Long text) | Required |
| duration | Text | Required, e.g., "8 weeks" |
| level | Enumeration | Values: Beginner, Intermediate, Advanced |
| slug | UID | Required, Attached to: title |
| price | Number | Optional, Integer or Decimal |
| thumbnail | Media | Single, Images only |

**Example Entry**:
```json
{
  "title": "Web Development Fundamentals",
  "description": "Master the basics of HTML, CSS, and JavaScript",
  "duration": "8 weeks",
  "level": "Beginner",
  "slug": "web-dev-fundamentals",
  "price": 299
}
```

### 3. About Section (Single Type)

**Path**: Content-Type Builder → Create new single type → "About Section"

**Fields**:

| Field Name | Type | Settings |
|------------|------|----------|
| title | Text | Required, Max length: 200 |
| description | Text (Long text) | Required |
| mission | Text (Long text) | Required |
| vision | Text (Long text) | Required |
| image | Media | Single, Images only |

**Example Data**:
```json
{
  "title": "About Our Organization",
  "description": "We are dedicated to providing high-quality education",
  "mission": "Our mission is to deliver accessible education",
  "vision": "We envision a world where everyone has access to quality education"
}
```

### 4. Organization Info (Single Type)

**Path**: Content-Type Builder → Create new single type → "Organization Info"

**Fields**:

| Field Name | Type | Settings |
|------------|------|----------|
| name | Text | Required, Max length: 100 |
| tagline | Text | Required, Max length: 200 |
| email | Email | Required |
| phone | Text | Required |
| address | Text (Long text) | Required |
| socialLinks | JSON | Optional |

**Example Data**:
```json
{
  "name": "Educational Organization",
  "tagline": "Empowering minds, transforming futures",
  "email": "info@organization.com",
  "phone": "+1 (555) 123-4567",
  "address": "123 Education Street, Learning City, LC 12345",
  "socialLinks": {
    "facebook": "https://facebook.com/yourorg",
    "twitter": "https://twitter.com/yourorg",
    "linkedin": "https://linkedin.com/company/yourorg",
    "instagram": "https://instagram.com/yourorg"
  }
}
```

## API Configuration

### 1. Set Permissions

**Path**: Settings → Users & Permissions Plugin → Roles → Public

Enable the following permissions:

**Hero-section**:
- [x] find
- [x] findOne

**Course**:
- [x] find
- [x] findOne

**About-section**:
- [x] find
- [x] findOne

**Organization-info**:
- [x] find
- [x] findOne

### 2. Create API Token

**Path**: Settings → API Tokens → Create new API Token

**Settings**:
- Name: "Next.js Frontend"
- Description: "Token for Next.js brochure site"
- Token type: Read-only
- Token duration: Unlimited

**Copy the token** and add it to your `.env.local`:
```env
STRAPI_API_TOKEN=your-copied-token-here
```

## Upload Media

### Recommended Image Sizes

**Hero Background Image**:
- Dimensions: 1920x1080px or larger
- Format: JPEG or WebP
- Max size: 500KB

**Course Thumbnails**:
- Dimensions: 800x600px
- Format: JPEG, PNG, or WebP
- Max size: 200KB each

**About Section Image**:
- Dimensions: 800x800px
- Format: JPEG, PNG, or WebP
- Max size: 300KB

### Upload Process

1. Go to Media Library in Strapi admin
2. Click "Upload assets"
3. Drag and drop images or click to browse
4. Add alternative text for accessibility
5. Use the images in your content types

## Environment Variables

### For Next.js Application

Create/update `.env.local`:

```env
# Local Strapi
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your-api-token

# Production Strapi
# NEXT_PUBLIC_STRAPI_URL=https://your-strapi.com
# STRAPI_API_TOKEN=your-production-token
```

### For Vercel Deployment

Add these environment variables in Vercel dashboard:

1. Go to your project in Vercel
2. Settings → Environment Variables
3. Add:
   - `NEXT_PUBLIC_STRAPI_URL`: Your Strapi URL
   - `STRAPI_API_TOKEN`: Your API token

## Deploy Strapi

### Option 1: Strapi Cloud

1. Push your Strapi code to GitHub
2. Connect to Strapi Cloud
3. Deploy with one click
4. Get your production URL

### Option 2: Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize
railway init

# Deploy
railway up
```

### Option 3: DigitalOcean

1. Create a Droplet (Ubuntu 22.04)
2. Install Node.js and PostgreSQL
3. Clone your Strapi repo
4. Configure environment variables
5. Use PM2 to run Strapi
6. Set up Nginx as reverse proxy

## Webhooks (Optional)

To trigger automatic rebuilds in Vercel when content changes:

### 1. Get Vercel Deploy Hook

In Vercel:
1. Settings → Git → Deploy Hooks
2. Create a new hook: "Content Update"
3. Copy the webhook URL

### 2. Configure in Strapi

In Strapi:
1. Settings → Webhooks
2. Create new webhook
3. Name: "Trigger Vercel Build"
4. URL: Your Vercel deploy hook URL
5. Events: Select `entry.create`, `entry.update`, `entry.delete`
6. Save

Now, whenever you update content in Strapi, Vercel will automatically rebuild your site!

## Testing the Integration

1. Add content to all single types
2. Create 3-5 course entries
3. Upload images for each content type
4. Make sure all fields are populated
5. Check the API responses:
   - http://localhost:1337/api/hero-section?populate=*
   - http://localhost:1337/api/courses?populate=*
   - http://localhost:1337/api/about-section?populate=*
   - http://localhost:1337/api/organization-info?populate=*

6. Restart your Next.js app to see the content

## Troubleshooting

### CORS Issues

If you get CORS errors, update Strapi's middleware configuration:

**File**: `config/middlewares.js`

```javascript
module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https:'],
          'media-src': ["'self'", 'data:', 'blob:', 'https:'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: ['http://localhost:3000', 'https://your-vercel-domain.vercel.app'],
    },
  },
  // ... other middlewares
];
```

### Image URLs Not Working

Make sure:
1. Images are uploaded to Strapi Media Library
2. API permissions include media access
3. The `populate=*` parameter is used in API calls
4. Image URLs are processed with `getStrapiImageUrl()` helper

### API Token Not Working

Check:
1. Token is correctly copied (no extra spaces)
2. Token type is correct (Read-only)
3. Environment variable name matches the code
4. Restart your Next.js dev server after adding the token

## Next Steps

After setup:
1. ✅ Create all content types
2. ✅ Set API permissions
3. ✅ Create API token
4. ✅ Add sample content
5. ✅ Upload images
6. ✅ Test API endpoints
7. ✅ Update Next.js environment variables
8. ✅ Test the integration locally
9. ✅ Deploy Strapi to production
10. ✅ Deploy Next.js to Vercel

Need help? Check the [Strapi Documentation](https://docs.strapi.io/) or create an issue in the repository.
