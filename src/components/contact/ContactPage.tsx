'use client';

import { motion } from 'framer-motion';
import { ContactPageContent } from './ContactPageContent';

export function ContactPage(): JSX.Element {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background text-foreground"
    >
      <ContactPageContent />
    </motion.main>
  );
}
