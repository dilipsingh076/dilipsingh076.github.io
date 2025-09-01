'use client';

import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiDownload } from 'react-icons/fi';
import { SOCIAL_LINKS, PERSONAL_INFO } from '@/constants/data';

export function SideIcons(): JSX.Element {
  const handleDownloadResume = (): void => {
    window.open(PERSONAL_INFO.resumeUrl, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed left-4 top-1/2 transform -translate-y-1/2 z-30 hidden lg:block"
    >
      <div className="flex flex-col items-center space-y-4">
        {/* Social Links */}
        {SOCIAL_LINKS.map((link, index) => (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 + index * 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
            aria-label={link.name}
          >
            {link.name === 'GitHub' && <FiGithub className="w-5 h-5" />}
            {link.name === 'LinkedIn' && <FiLinkedin className="w-5 h-5" />}
            {link.name === 'Twitter' && <FiTwitter className="w-5 h-5" />}
          </motion.a>
        ))}

        {/* Email */}
        <motion.a
          href={`mailto:${PERSONAL_INFO.email}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6, duration: 0.3 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
          aria-label="Email"
        >
          <FiMail className="w-5 h-5" />
        </motion.a>

        {/* Resume Download */}
        <motion.button
          onClick={handleDownloadResume}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, duration: 0.3 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 rounded-full bg-primary text-white hover:bg-primary/80 transition-all duration-300 shadow-lg hover:shadow-xl"
          aria-label="Download Resume"
        >
          <FiDownload className="w-5 h-5" />
        </motion.button>

        {/* Vertical Line */}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: '100px' }}
          transition={{ delay: 2, duration: 0.5 }}
          className="w-px bg-border"
        />
      </div>
    </motion.div>
  );
}
