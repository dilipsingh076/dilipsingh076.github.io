'use client';

import { motion } from 'framer-motion';
import { MainDashboardContent } from './MainDashboardContent';

export function MainDashboard(): JSX.Element {
  return (
    <motion.div
      key="content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div className="relative z-10">
        <MainDashboardContent />
      </div>
    </motion.div>
  );
}
