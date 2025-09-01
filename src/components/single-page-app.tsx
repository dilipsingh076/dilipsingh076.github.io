'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingScreen } from '@/components/ui/loading-screen';
import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { ContactSection } from '@/components/sections/contact-section';
import { usePathname, useRouter } from 'next/navigation';

type PageType = 'home' | 'about' | 'projects' | 'skills' | 'blog' | 'contact';

export function SinglePageApp(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Handle route changes
  useEffect(() => {
    const path = pathname.slice(1) || 'home';
    if (['home', 'about', 'projects', 'skills', 'blog', 'contact'].includes(path)) {
      setCurrentPage(path as PageType);
    } else {
      setCurrentPage('home');
    }
  }, [pathname]);

  const renderPage = (page: PageType) => {
    switch (page) {
      case 'home':
        return (
          <div className="relative z-10">
            {/* Hero Section */}
            <section id="home" className="min-h-screen flex items-center justify-center">
              <HeroSection />
            </section>

            {/* About Section */}
            <section id="about" className="min-h-screen flex items-center justify-center py-20">
              <div className="w-full">
                <AboutSection />
              </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="min-h-screen flex items-center justify-center py-20">
              <div className="w-full">
                <ProjectsSection />
              </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="min-h-screen flex items-center justify-center py-20">
              <div className="w-full">
                <SkillsSection />
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="min-h-screen flex items-center justify-center py-20">
              <div className="w-full">
                <ContactSection />
              </div>
            </section>
          </div>
        );

      case 'about':
        return (
          <div className="pt-16">
            <div className="container-max px-4 py-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  About <span className="gradient-text">Dilip Singh</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Senior Full Stack Developer with extensive experience in modern web technologies, 
                  passionate about creating scalable and user-friendly applications.
                </p>
              </motion.div>

              <AboutSection />

              {/* Additional About Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-16"
              >
                {/* Experience Timeline */}
                <div className="mb-16">
                  <h2 className="text-3xl font-bold text-center mb-12">
                    Professional <span className="gradient-text">Experience</span>
                  </h2>
                  
                  <div className="max-w-4xl mx-auto space-y-8">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className="flex flex-col md:flex-row gap-6 p-6 bg-card rounded-xl border border-border"
                    >
                      <div className="md:w-1/3">
                        <h3 className="text-xl font-semibold text-primary">Senior Full Stack Developer</h3>
                        <p className="text-muted-foreground">2022 - Present</p>
                        <p className="text-sm text-muted-foreground">Tech Company</p>
                      </div>
                      <div className="md:w-2/3">
                        <p className="text-foreground/90">
                          Leading development of scalable web applications using React, Next.js, and Node.js. 
                          Mentoring junior developers and implementing best practices for code quality and performance.
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="pt-16">
            <div className="container-max px-4 py-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  My <span className="gradient-text">Projects</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  A collection of projects showcasing my skills in full-stack development, 
                  from concept to deployment.
                </p>
              </motion.div>

              <ProjectsSection />
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="pt-16">
            <div className="container-max px-4 py-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Technical <span className="gradient-text">Skills</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  A comprehensive overview of my technical expertise and proficiency levels 
                  across various technologies and frameworks.
                </p>
              </motion.div>

              <SkillsSection />
            </div>
          </div>
        );

      case 'blog':
        return (
          <div className="pt-16">
            <div className="container-max px-4 py-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Blog & <span className="gradient-text">Insights</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Sharing my thoughts, experiences, and insights on modern web development, 
                  AI integration, and best practices in software engineering.
                </p>
              </motion.div>

              <div className="text-center py-16">
                <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
                <p className="text-muted-foreground">
                  I&apos;m working on some great content. Check back soon!
                </p>
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="pt-16">
            <div className="container-max px-4 py-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Get In <span className="gradient-text">Touch</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  I&apos;m always interested in new opportunities and collaborations. 
                  Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
                </p>
              </motion.div>

              <ContactSection />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {renderPage(currentPage)}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
