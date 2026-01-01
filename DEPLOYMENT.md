# Deployment Guide

## Deploy to Vercel

### Prerequisites
- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com))
- Strapi CMS instance (optional for initial deployment)

### Step 1: Push to GitHub

Your code is already in GitHub! The repository is at:
```
https://github.com/MINGOD24/brochure
```

### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository: `MINGOD24/brochure`
4. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### Step 3: Add Environment Variables (Optional)

If you have Strapi configured, add these environment variables in Vercel:

1. In the project settings, go to "Environment Variables"
2. Add the following:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_STRAPI_URL` | Your Strapi URL (e.g., `https://your-strapi.com`) | Production |
| `STRAPI_API_TOKEN` | Your Strapi API token | Production |

**Note**: You can deploy without these variables. The site will use default content.

### Step 4: Deploy

1. Click "Deploy"
2. Wait for the build to complete (usually 1-2 minutes)
3. Your site will be live at `https://your-project.vercel.app`

### Step 5: Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS settings as instructed by Vercel

## Deploy Strapi CMS

### Option 1: Strapi Cloud (Recommended)

1. Go to [strapi.io/cloud](https://strapi.io/cloud)
2. Sign up for a free account
3. Create a new project
4. Follow the Strapi setup instructions in `STRAPI_SETUP.md`
5. Once deployed, copy your Strapi URL
6. Update Vercel environment variables with your Strapi URL

### Option 2: Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login to Railway
railway login

# Create a new Strapi project
npx create-strapi-app@latest strapi-cms --quickstart

# Initialize Railway in the Strapi directory
cd strapi-cms
railway init

# Deploy to Railway
railway up

# Get your deployment URL
railway open
```

### Option 3: DigitalOcean App Platform

1. Create a DigitalOcean account
2. Go to Apps → Create App
3. Connect your GitHub repository with Strapi code
4. Configure:
   - **Run Command**: `npm start`
   - **Build Command**: `npm run build`
5. Add a managed database (PostgreSQL recommended)
6. Deploy

## Connect Strapi to Next.js

After deploying Strapi:

1. Get your Strapi URL (e.g., `https://your-strapi.railway.app`)
2. Create an API token in Strapi (Settings → API Tokens)
3. Update Vercel environment variables:
   - Go to your Vercel project
   - Settings → Environment Variables
   - Update `NEXT_PUBLIC_STRAPI_URL` and `STRAPI_API_TOKEN`
4. Redeploy your Vercel site (Deployments → click "..." → Redeploy)

## Set Up Webhooks (Optional)

To automatically rebuild your Vercel site when Strapi content changes:

### 1. Create Vercel Deploy Hook

1. In Vercel: Settings → Git → Deploy Hooks
2. Create a new hook named "Strapi Content Update"
3. Copy the webhook URL

### 2. Configure Strapi Webhook

1. In Strapi: Settings → Webhooks
2. Create a new webhook:
   - **Name**: Trigger Vercel Deploy
   - **URL**: Your Vercel deploy hook URL
   - **Events**: Select `entry.create`, `entry.update`, `entry.delete`
3. Save

Now your site will automatically rebuild when you update content! 🎉

## Continuous Deployment

Vercel automatically deploys when you push to GitHub:

- **Production**: Pushes to `main` branch
- **Preview**: Pull requests and other branches

Every commit triggers a new deployment with a unique URL.

## Monitoring & Analytics

### Built-in Vercel Analytics

1. Go to your project in Vercel
2. Click "Analytics" tab
3. Enable Web Analytics (free)

### Performance Monitoring

Vercel automatically monitors:
- Build times
- Function execution
- Cache hits
- Page load performance

## Troubleshooting

### Build Failures

**Problem**: Build fails on Vercel

**Solution**:
1. Check the build logs in Vercel
2. Ensure all dependencies are in `package.json`
3. Test the build locally: `npm run build`
4. Check Node.js version (Vercel uses Node 18+ by default)

### Environment Variables Not Working

**Problem**: Strapi content not loading

**Solution**:
1. Verify environment variables are set correctly in Vercel
2. Check variable names match exactly (including `NEXT_PUBLIC_` prefix)
3. Redeploy after adding/changing environment variables
4. Check Strapi API permissions are set to Public

### CORS Errors

**Problem**: CORS errors when fetching from Strapi

**Solution**:
Update Strapi's `config/middlewares.js`:
```javascript
{
  name: 'strapi::cors',
  config: {
    origin: ['https://your-vercel-domain.vercel.app'],
  },
}
```

### Images Not Loading

**Problem**: Images from Strapi not displaying

**Solution**:
1. Check `next.config.js` has the correct image domains
2. Verify images are uploaded to Strapi Media Library
3. Check API permissions include media access
4. Ensure `getStrapiImageUrl()` helper is used

## Best Practices

### 1. Use Environment Variables
- Never commit API tokens to Git
- Use Vercel's environment variables for secrets
- Use different tokens for development and production

### 2. Enable ISR (Incremental Static Regeneration)
The app is configured with ISR (60-second revalidation). This means:
- Fast page loads (static)
- Fresh content (revalidates every minute)
- No need for webhooks for most use cases

### 3. Optimize Images
- Upload images in appropriate sizes to Strapi
- Use WebP format when possible
- Enable Vercel Image Optimization (automatic)

### 4. Monitor Performance
- Use Vercel Analytics
- Check Core Web Vitals
- Monitor API response times

### 5. Set Up Preview Deployments
- Create a separate Strapi instance for staging
- Use Vercel Preview Deployments for testing
- Test changes before merging to production

## Cost Optimization

### Free Tier Limits
- **Vercel**: 100GB bandwidth, unlimited deployments
- **Strapi Cloud**: 14-day trial, then paid plans
- **Railway**: $5 free credit monthly

### Recommendations
- Start with Vercel free tier (sufficient for most sites)
- Use Strapi Cloud free trial for testing
- Upgrade based on traffic and needs

## Support

Need help?
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Strapi Documentation](https://docs.strapi.io/)
- [Create an issue](https://github.com/MINGOD24/brochure/issues)

## Next Steps

After deployment:
1. ✅ Test the live site
2. ✅ Set up Strapi CMS
3. ✅ Add your content
4. ✅ Configure custom domain
5. ✅ Enable analytics
6. ✅ Set up webhooks
7. ✅ Share with your team!

Happy deploying! 🚀
