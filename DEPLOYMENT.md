# GitHub Deployment Instructions

## Step 1: Initialize Git and Push to GitHub

Run these commands in your terminal from the project root directory:

```bash
# Navigate to the project directory
cd "/Users/achyuth/Documents/Website Ideas/In-Production/WordEditor.online V2/docs-tutorial"

# Initialize git if not already done
git init

# Add all files
git add .

# Commit the changes
git commit -m "Complete Word Editor Tools project - AdSense ready with all required pages"

# Add the GitHub repository as remote (replace existing if needed)
git remote add origin https://github.com/achyuth8055/wordeditor.com.git

# Or if remote already exists, update it:
git remote set-url origin https://github.com/achyuth8055/wordeditor.com.git

# Push to GitHub (this will replace the existing repo content)
git push -u origin main --force
```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Import your GitHub repository: `achyuth8055/wordeditor.com`
4. Configure environment variables:
   - Add all variables from your `.env.local` file
5. Click "Deploy"

### Option B: Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

## Step 3: Configure Custom Domain

1. In Vercel dashboard, go to your project
2. Go to Settings → Domains
3. Add your domain: `wordeditor.online`
4. Update DNS records as instructed by Vercel

## Step 4: Apply for Google AdSense

### Prerequisites (✅ All Completed)
- [x] Original, valuable content
- [x] About Us page (`/about`)
- [x] Privacy Policy page (`/privacy`)
- [x] Terms and Conditions page (`/terms`)
- [x] Contact Us page (`/contact`)
- [x] Multiple blog posts with 800+ words
- [x] Google Analytics installed
- [x] Sitemap.xml configured
- [x] Robots.txt configured
- [x] Mobile responsive design
- [x] Fast loading times

### Apply for AdSense
1. Go to https://www.google.com/adsense
2. Sign in with your Google account
3. Enter your website URL: `wordeditor.online`
4. Submit your application
5. Add the AdSense code to your site (you'll receive this after approval)
6. Wait for approval (usually 1-2 weeks)

### After AdSense Approval
Add the AdSense code to `/src/app/layout.tsx` in the `<head>` section, similar to how Google Analytics is added.

## Step 5: Post-Deployment Checklist

- [ ] Test all pages on live site
- [ ] Verify Google Analytics is tracking
- [ ] Check all tool functionalities
- [ ] Test form submissions (contact page)
- [ ] Verify all links work
- [ ] Test on mobile devices
- [ ] Check page load speeds
- [ ] Submit sitemap to Google Search Console
- [ ] Add site to Bing Webmaster Tools

## Step 6: Google Search Console Setup

1. Go to https://search.google.com/search-console
2. Add your property: `wordeditor.online`
3. Verify ownership (Vercel makes this easy)
4. Submit your sitemap: `https://wordeditor.online/sitemap.xml`
5. Monitor indexing and search performance

## Important Notes

### Environment Variables Required
Make sure these are set in Vercel:
```env
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_JWT_ISSUER_DOMAIN=
LIVEBLOCKS_SECRET_KEY=
NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=
```

### Build Command
```bash
npm run build
```

### Output Directory
```
.next
```

### Node Version
Use Node.js 18.x or higher

## Troubleshooting

### If build fails on Vercel:
1. Check build logs in Vercel dashboard
2. Ensure all environment variables are set
3. Try building locally: `npm run build`
4. Check for TypeScript errors: `npm run type-check`

### If AdSense application is rejected:
1. Add more original content
2. Ensure all pages load correctly
3. Check for copyright violations
4. Improve page speed
5. Wait and reapply after making improvements

## Support

For issues or questions:
- Check Vercel documentation: https://vercel.com/docs
- Check Next.js documentation: https://nextjs.org/docs
- Contact via GitHub Issues

---

Good luck with your deployment and AdSense application! 🚀
