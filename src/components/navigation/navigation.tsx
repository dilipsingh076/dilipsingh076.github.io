'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiSun, FiMoon, FiMonitor } from 'react-icons/fi';
import { useTheme } from '@/components/providers/theme-provider';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Logo } from '../ui/logo';

const navigationItems = [
  { label: 'Home', href: '/', sectionId: 'home' },
  { label: 'About', href: '/about', sectionId: 'about' },
  { label: 'Projects', href: '/projects', sectionId: 'projects' },
  { label: 'Skills', href: '/skills', sectionId: 'skills' },
  { label: 'Blog', href: '/blog', sectionId: 'blog' },
  { label: 'Contact', href: '/contact', sectionId: 'contact' },
];

export function Navigation(): JSX.Element | null {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const { theme, setTheme, mounted } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  // Hide navigation in admin routes
  const isAdminRoute = pathname.startsWith('/admin');

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string): void => {
    router.push(href);
    setIsOpen(false);
  };

  const toggleTheme = (): void => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const isActiveLink = (href: string): boolean => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  // Render theme toggle button only after mounting to prevent hydration mismatch
  const renderThemeToggle = (): JSX.Element => {
    if (!mounted) {
      return (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors duration-200"
          aria-label="Toggle theme"
        >
          <div className="w-4 h-4" />
        </motion.button>
      );
    }

    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleTheme}
        className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors duration-200"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? (
          <FiMoon className="w-4 h-4" />
        ) : theme === 'dark' ? (
          <FiSun className="w-4 h-4" />
        ) : (
          <FiMonitor className="w-4 h-4" />
        )}
      </motion.button>
    );
  };

  // Don't render navigation in admin routes
  if (isAdminRoute) {
    return null;
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      )}
    >
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="cursor-pointer"
            >
              <Logo animate={true} size="lg" />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <motion.button
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleNavClick(item.href)}
                className={cn(
                  "text-foreground/80 hover:text-foreground transition-colors duration-200 font-medium relative py-2",
                  isActiveLink(item.href) && "text-primary"
                )}
              >
                {item.label}
                {isActiveLink(item.href) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            {renderThemeToggle()}

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <FiX className="w-5 h-5" />
              ) : (
                <FiMenu className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-b border-border"
          >
            <div className="container-max px-4 py-4 space-y-2">
              {navigationItems.map((item, index) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    "block w-full text-left py-3 px-4 rounded-lg text-foreground/80 hover:text-foreground hover:bg-secondary transition-all duration-200 font-medium",
                    isActiveLink(item.href) && "text-primary bg-primary/10"
                  )}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
