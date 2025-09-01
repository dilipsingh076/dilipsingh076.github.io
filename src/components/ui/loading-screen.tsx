'use client';

import { motion } from 'framer-motion';
import { FiCode } from 'react-icons/fi';

export function LoadingScreen(): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <div className="flex flex-col items-center space-y-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <FiCode className="h-16 w-16 text-primary" />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-xl font-semibold text-foreground">
            Dilip Singh
          </h2>
          <p className="text-sm text-muted-foreground">
            Senior Full Stack Developer
          </p>
        </motion.div>
        
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '200px' }}
          transition={{ delay: 0.5, duration: 1 }}
          className="h-1 bg-gradient-to-r from-primary to-purple-500 rounded-full"
        />
      </div>
    </motion.div>
  );
}
