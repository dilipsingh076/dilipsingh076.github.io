'use client';

import { motion } from 'framer-motion';
import { SkillsPageContent } from './SkillsPageContent';

export function SkillsPage(): JSX.Element {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background text-foreground"
    >
      <SkillsPageContent />
    </motion.main>
  );
}
