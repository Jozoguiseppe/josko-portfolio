# Joško Leoni - Portfolio Website

A modern, award-style portfolio website built with React 18, Vite, GSAP, and Resend email integration.

## Features

- 🎨 **3D Hero Section** with parallax tiles and mouse interactions
- 📱 **Responsive Design** with hamburger menu and glassmorphism overlay
- ✨ **Smooth Animations** using GSAP and Lenis smooth scroll
- 📧 **Email Integration** with Resend API for contact form
- 🎯 **Performance Optimized** with lazy loading and reduced motion support
- 🌐 **SEO Ready** with semantic HTML and meta tags

## Tech Stack

- **Frontend**: React 18, Vite, React Router
- **Styling**: SCSS with CSS variables
- **Animations**: GSAP + ScrollTrigger, Lenis smooth scroll
- **Email**: Resend API
- **Deployment**: Vercel (recommended)

## Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up Resend email:**

   - Sign up at [resend.com](https://resend.com)
   - Get your API key from the dashboard
   - Create `.env.local` file:
     ```env
     RESEND_API_KEY=re_your_api_key_here
     ```

3. **Run development server:**

   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Add environment variable: `RESEND_API_KEY`
4. Deploy!

### Other Platforms

- **Netlify**: Drag `dist` folder to Netlify dashboard
- **GitHub Pages**: Use the included workflow file
- **Firebase**: Use Firebase Hosting

## Email Setup

1. **Get Resend API Key:**

   - Go to [resend.com](https://resend.com)
   - Create account and get API key
   - Add to environment variables

2. **Verify Domain (Optional):**
   - Add your domain in Resend dashboard
   - Update `from` email in `api/send-email.js`

## Customization

- **Colors**: Edit `src/styles/_tokens.scss`
- **Content**: Update text in component files
- **Images**: Replace `/public/hero.jpg` with your portrait
- **Animations**: Adjust GSAP settings in `Home.jsx`

## Performance

- **Bundle Size**: ~310KB total (105KB gzipped)
- **Core Web Vitals**: Optimized for LCP, FID, CLS
- **Accessibility**: WCAG compliant with keyboard navigation
- **Mobile**: Fully responsive with touch-friendly interactions

## License

MIT License - feel free to use for your own portfolio!
