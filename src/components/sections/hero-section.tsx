'use client';

import { motion } from 'framer-motion';
import { FiArrowRight, FiDownload } from 'react-icons/fi';
import { PERSONAL_INFO } from '@/constants/data';
import { scrollToElement } from '@/lib/utils';
import { Logo } from '@/components/ui/logo';

const roles = [
  'Senior Full Stack Developer',
  'React & Next.js Specialist',
  'TypeScript Expert',
  'MERN Stack Developer',
];

export function HeroSection(): JSX.Element {
  const handleDownloadResume = (): void => {
    window.open(PERSONAL_INFO.resumeUrl, '_blank');
  };

  const handleContactClick = (): void => {
    scrollToElement('contact');
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 md:pt-0">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-6"
            >
              <div className="flex justify-center lg:justify-start mb-4">
                <Logo animate={true} size="xl" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                Hey, I&apos;m{' '}
                <span className="gradient-text">{PERSONAL_INFO.name}</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-8"
            >
              <div className="text-xl sm:text-2xl text-muted-foreground mb-4">
                I&apos;m a{' '}
                <span className="relative inline-block">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="text-primary font-semibold"
                  >
                    {roles[0]}
                  </motion.span>
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="absolute bottom-0 left-0 h-0.5 bg-primary"
                  />
                </span>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              {PERSONAL_INFO.about}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleContactClick}
                className="px-8 py-3 bg-primary text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors duration-200"
              >
                Get In Touch
                <FiArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadResume}
                className="px-8 py-3 border border-border rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-secondary transition-colors duration-200"
              >
                Download Resume
                <FiDownload className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <motion.div
                initial={{ scale: 0.8, rotate: -5 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="relative w-80 h-80 lg:w-96 lg:h-96"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-purple-500 rounded-full blur-2xl opacity-20" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/20">
                  <img
                    src="/images/dilip.png"
                    alt={PERSONAL_INFO.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg"
              >
                <span>5+</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute -bottom-4 -left-4 w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg"
              >
                <span>50+</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
