'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingScreen } from '@/components/ui/loading-screen';
import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { ContactSection } from '@/components/sections/contact-section';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

export default function HomePage(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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
            <div className="relative z-10">
              {/* Hero Section */}
                <HeroSection />

              {/* About Section */}
              <section id="about" className="min-h-screen flex items-center justify-center py-20">
                <div className="w-full">
                  <AboutSection />
                  <div className="text-center mt-12">
                    <Link href="/about">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                      >
                        View Full About
                        <FiArrowRight className="w-4 h-4" />
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </section>

              {/* Projects Section */}
              <section id="projects" className="min-h-screen flex items-center justify-center py-20">
                <div className="w-full">
                  <ProjectsSection />
                  <div className="text-center mt-12">
                    <Link href="/projects">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                      >
                        View All Projects
                        <FiArrowRight className="w-4 h-4" />
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </section>

              {/* Skills Section */}
              <section id="skills" className="min-h-screen flex items-center justify-center py-20">
                <div className="w-full">
                  <SkillsSection />
                  <div className="text-center mt-12">
                    <Link href="/skills">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                      >
                        View All Skills
                        <FiArrowRight className="w-4 h-4" />
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <section id="contact" className="min-h-screen flex items-center justify-center py-20">
                <div className="w-full">
                  <ContactSection />
                  <div className="text-center mt-12">
                    <Link href="/contact">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                      >
                        Get In Touch
                        <FiArrowRight className="w-4 h-4" />
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
