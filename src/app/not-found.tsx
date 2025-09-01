'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiHome, FiArrowLeft, FiSearch } from 'react-icons/fi';

export default function NotFound(): JSX.Element {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="container-max px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            {/* 404 Number */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
              className="text-8xl md:text-9xl font-bold gradient-text mb-8"
            >
              404
            </motion.div>

            {/* Error Message */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Page Not Found
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg text-muted-foreground mb-8"
            >
              Oops! The page you&apos;re looking for doesn&apos;t exist. 
              It might have been moved, deleted, or you entered the wrong URL.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  <FiHome className="w-4 h-4" />
                  Go Home
                </motion.button>
              </Link>

              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 px-8 py-3 bg-secondary text-foreground rounded-lg font-semibold hover:bg-secondary/80 transition-colors"
              >
                <FiArrowLeft className="w-4 h-4" />
                Go Back
              </button>
            </motion.div>

            {/* Helpful Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="mt-12"
            >
              <h2 className="text-xl font-semibold mb-6">
                Popular Pages
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/about">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-4 bg-card rounded-lg border border-border hover:border-primary/50 transition-colors"
                  >
                    <h3 className="font-medium text-foreground mb-1">About</h3>
                    <p className="text-sm text-muted-foreground">Learn more about me</p>
                  </motion.div>
                </Link>

                <Link href="/projects">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-4 bg-card rounded-lg border border-border hover:border-primary/50 transition-colors"
                  >
                    <h3 className="font-medium text-foreground mb-1">Projects</h3>
                    <p className="text-sm text-muted-foreground">View my work</p>
                  </motion.div>
                </Link>

                <Link href="/contact">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-4 bg-card rounded-lg border border-border hover:border-primary/50 transition-colors"
                  >
                    <h3 className="font-medium text-foreground mb-1">Contact</h3>
                    <p className="text-sm text-muted-foreground">Get in touch</p>
                  </motion.div>
                </Link>
              </div>
            </motion.div>

            {/* Search Suggestion */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-12 p-6 bg-card rounded-xl border border-border"
            >
              <div className="flex items-center gap-3 mb-4">
                <FiSearch className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">
                  Can&apos;t find what you&apos;re looking for?
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Try using the navigation menu above or contact me directly if you need help finding something specific.
              </p>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  Contact Me →
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
