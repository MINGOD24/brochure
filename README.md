# Brochure - Educational Organization Landing Page

A modern, responsive landing page built with Next.js 14, TypeScript, and Tailwind CSS, integrated with Strapi CMS for easy content management.

## Features

- 🚀 **Next.js 14** with App Router and TypeScript
- 🎨 **Tailwind CSS** for styling
- 📝 **Strapi CMS Integration** for content management
- 🖼️ **Optimized Images** with Next.js Image component
- 📱 **Fully Responsive** design
- ⚡ **Fast Performance** with static generation and revalidation
- 🔄 **Easy Deployment** to Vercel with Strapi integration

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- (Optional) Strapi CMS instance running

### Installation

1. Clone the repository:
```bash
git clone https://github.com/MINGOD24/brochure.git
cd brochure
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your Strapi configuration:
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your-strapi-api-token
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Strapi CMS Setup

### Content Types

Create the following content types in your Strapi instance:

#### 1. Hero Section (Single Type)
- `title` (Text)
- `subtitle` (Text)
- `description` (Text, Long text)
- `ctaText` (Text)
- `ctaLink` (Text)
- `backgroundImage` (Media, Single)

#### 2. Courses (Collection Type)
- `title` (Text)
- `description` (Text, Long text)
- `duration` (Text)
- `level` (Text)
- `slug` (UID, based on title)
- `price` (Number, optional)
- `thumbnail` (Media, Single)

#### 3. About Section (Single Type)
- `title` (Text)
- `description` (Text, Long text)
- `mission` (Text, Long text)
- `vision` (Text, Long text)
- `image` (Media, Single)

#### 4. Organization Info (Single Type)
- `name` (Text)
- `tagline` (Text)
- `email` (Email)
- `phone` (Text)
- `address` (Text, Long text)
- `socialLinks` (JSON)

### API Permissions

Make sure to set the following permissions in Strapi:
- Public access to `find` for all content types
- Enable `populate` parameter for media fields

### Getting API Token

1. Go to Strapi Admin Panel → Settings → API Tokens
2. Create a new API Token with read-only access
3. Copy the token and add it to your `.env.local` file

## Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/MINGOD24/brochure)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_STRAPI_URL`: Your Strapi instance URL
   - `STRAPI_API_TOKEN`: Your Strapi API token

### Vercel + Strapi Integration

For seamless integration:

1. Deploy your Strapi instance (recommended: Railway, DigitalOcean, or Strapi Cloud)
2. In Vercel, add the Strapi environment variables
3. Enable ISR (Incremental Static Regeneration) for automatic content updates
4. Set up Strapi webhooks to trigger Vercel rebuilds on content changes (optional)

### Deploy Strapi

For production, you can deploy Strapi to:
- [Strapi Cloud](https://strapi.io/cloud)
- [Railway](https://railway.app/)
- [DigitalOcean](https://www.digitalocean.com/)
- [AWS](https://aws.amazon.com/)
- [Azure](https://azure.microsoft.com/)

## Project Structure

```
brochure/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── Hero.tsx            # Hero section
│   ├── Courses.tsx         # Courses section
│   ├── About.tsx           # About section
│   └── Footer.tsx          # Footer
├── lib/
│   └── strapi.ts           # Strapi API utilities
├── types/
│   └── strapi.ts           # TypeScript types
├── public/                 # Static assets
├── .env.example            # Environment variables example
├── next.config.js          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## Features in Detail

### Default Content

The application works without Strapi CMS by displaying default content. This allows you to:
- Preview the design before setting up Strapi
- Develop and test locally without a CMS dependency
- Ensure the site remains functional even if Strapi is temporarily unavailable

### Image Optimization

Next.js Image component is used for optimized image loading:
- Automatic image optimization
- Lazy loading
- Responsive images
- WebP format support

### Performance

- **ISR (Incremental Static Regeneration)**: Pages revalidate every 60 seconds
- **Optimized bundles**: Automatic code splitting
- **Fast refresh**: Hot module replacement in development

## Customization

### Styling

The project uses Tailwind CSS. Customize colors and design in:
- `tailwind.config.ts` - Tailwind configuration
- `app/globals.css` - Global styles and CSS variables

### Content

Without Strapi, edit default content in:
- `components/Hero.tsx`
- `components/Courses.tsx`
- `components/About.tsx`
- `components/Footer.tsx`

With Strapi, manage content through the Strapi admin panel.

## Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Linting
npm run lint         # Run ESLint
```

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Strapi
- **Deployment**: Vercel
- **Image Optimization**: Next.js Image

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For issues and questions:
- Create an issue in this repository
- Contact: info@organization.com

## Acknowledgments

- Next.js team for the amazing framework
- Strapi team for the headless CMS
- Vercel for the deployment platform
