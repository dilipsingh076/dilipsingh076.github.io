# Dilip Singh - Senior Full Stack Developer Portfolio

A modern, responsive portfolio website built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. This portfolio showcases my skills, projects, and experience as a Senior Full Stack Developer.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 14, TypeScript, and Tailwind CSS
- **Responsive Design**: Fully responsive across all devices
- **Dark/Light Mode**: Toggle between dark and light themes
- **Smooth Animations**: Powered by Framer Motion
- **SEO Optimized**: Meta tags, Open Graph, and structured data
- **Performance Optimized**: Fast loading with Next.js optimizations
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Type Safety**: Full TypeScript implementation
- **Modern UI/UX**: Clean, professional design with glass morphism effects
- **EmailJS Integration**: Functional contact form with EmailJS
- **GitHub Pages Ready**: Configured for easy deployment

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Icons** - Icon library

### Backend & Services
- **EmailJS** - Contact form functionality
- **React Toastify** - Toast notifications

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dilipsingh076/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── sections/          # Page sections
│   ├── ui/               # Reusable UI components
│   ├── navigation/       # Navigation components
│   └── providers/        # Context providers
├── constants/            # Data and constants
├── lib/                  # Utility functions
├── types/                # TypeScript type definitions
└── public/               # Static assets
```

## 🎨 Customization

### Personal Information
Update your personal information in `src/constants/data.ts`:

```typescript
export const PERSONAL_INFO = {
  name: 'Your Name',
  title: 'Your Title',
  email: 'your.email@example.com',
  phone: 'Your Phone Number',
  location: 'Your Location',
  about: 'Your description...',
  resumeUrl: 'Your resume URL',
};
```

### EmailJS Configuration
The contact form uses EmailJS. Update the configuration in `src/components/sections/contact-section.tsx`:

```typescript
const result = await emailjs.sendForm(
  'YOUR_SERVICE_ID',      // Replace with your EmailJS service ID
  'YOUR_TEMPLATE_ID',     // Replace with your EmailJS template ID
  formRef.current,
  'YOUR_PUBLIC_KEY'       // Replace with your EmailJS public key
);
```

### Projects
Add your projects in the same file:

```typescript
export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Project Name',
    description: 'Project description...',
    image: '/images/project.png',
    technologies: ['React', 'Node.js'],
    githubUrl: 'https://github.com/...',
    liveUrl: 'https://project.com',
    featured: true,
  },
];
```

### Skills
Update your skills and proficiency levels:

```typescript
export const SKILLS: Skill[] = [
  {
    name: 'React',
    icon: 'react',
    category: 'frontend',
    proficiency: 95,
  },
];
```

### Styling
Customize colors and themes in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#your-primary-color',
      },
    },
  },
},
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run export` - Export static site
- `npm run deploy` - Deploy to GitHub Pages

## 🚀 Deployment

### GitHub Pages (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```

3. **Configure GitHub Pages**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Set source to "Deploy from a branch"
   - Select "gh-pages" branch
   - Save the settings

4. **Your site will be available at**
   `https://dilipsingh076.github.io`

### Alternative Deployment Options

#### Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

#### Netlify
1. Build the project: `npm run build`
2. Deploy the `out` directory

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1440px+)

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- High contrast ratios
- Screen reader friendly

## 🔧 Performance Optimizations

- Next.js Image optimization
- Code splitting
- Lazy loading
- Optimized fonts
- Compressed assets
- Minimal bundle size

## 📧 Contact Form

The contact form is powered by EmailJS and includes:
- Form validation
- Loading states
- Success/error notifications
- Google Maps integration
- Direct contact links

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

- **Email**: dilipsinghf@gmail.com
- **Phone**: +91 7665 135 229
- **LinkedIn**: [Dilip Singh](https://linkedin.com/in/dilipsingh076)
- **GitHub**: [@dilipsingh076](https://github.com/dilipsingh076)

---

**Built with ❤️ by Dilip Singh**
