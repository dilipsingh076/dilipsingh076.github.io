import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Providers } from '@/components/providers/providers';
import { Navigation } from '@/components/navigation/navigation';
import { SideIcons } from '@/components/ui/side-icons';
import { Footer } from '@/components/ui/footer';

import { Inter } from 'next/font/google';
import { redirect } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Dilip Singh - Full Stack Developer',
  description: 'Senior Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. View my portfolio, projects, and get in touch.',
  keywords: [
    'Full Stack Developer',
    'React Developer',
    'Next.js Developer',
    'Node.js Developer',
    'TypeScript Developer',
    'Web Development',
    'Frontend Developer',
    'Backend Developer',
    'Portfolio',
    'Software Engineer',
    'JavaScript Developer',
    'MongoDB Developer',
    'Tailwind CSS Developer'
  ],
  authors: [{ name: 'Dilip Singh' }],
  creator: 'Dilip Singh',
  publisher: 'Dilip Singh',
  category: 'Technology',
  classification: 'Portfolio Website',
  icons: {
    icon: [

      { url: '/favicon.svg', type: 'image/svg+xml' },

    ],
    shortcut: '/favicon.svg',
    apple: '/logo192.png',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://dilipsingh076.github.io'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Dilip Singh - Full Stack Developer',
    description: 'Senior Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies.',
    url: 'https://dilipsingh076.github.io',
    siteName: 'Dilip Singh Portfolio',
    images: [
      {
        url: '/images/dilip.png',
        width: 1200,
        height: 630,
        alt: 'Dilip Singh - Full Stack Developer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dilip Singh - Full Stack Developer',
    description: 'Senior Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies.',
    images: ['/images/dilip.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  redirect('https://dilipsingh076.vercel.app');
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Dilip Singh",
              "jobTitle": "Full Stack Developer",
              "description": "Senior Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies",
              "url": "https://dilipsingh076.github.io",
              "sameAs": [
                "https://github.com/dilipsingh076",
                "https://linkedin.com/in/dilipsingh076"
              ],
              "knowsAbout": [
                "React",
                "Next.js",
                "Node.js",
                "TypeScript",
                "JavaScript",
                "MongoDB",
                "Web Development",
                "Full Stack Development"
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "Freelance"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <ThemeProvider
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navigation />
            <SideIcons />
            {children}
            <Footer />
            <ScrollToTop />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
