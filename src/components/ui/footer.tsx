import React from 'react';
import Link from 'next/link';
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';
import { Logo } from './logo';
import { PERSONAL_INFO } from '@/constants/data';

export function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      href: PERSONAL_INFO.github,
      icon: FiGithub,
    },
    {
      name: 'LinkedIn',
      href: PERSONAL_INFO.linkedin,
      icon: FiLinkedin,
    },
    {
      name: 'Twitter',
      href: PERSONAL_INFO.twitter || '',
      icon: FiTwitter,
    },
    {
      name: 'Email',
      href: `mailto:${PERSONAL_INFO.email}`,
      icon: FiMail,
    },
  ];

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Skills', href: '/skills' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="bg-background border-t border-border">
      <div className="container-max px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <Logo animate={true} size="xl" />
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Senior Full Stack Developer passionate about creating innovative web solutions. 
              Specializing in React, Next.js, Node.js, and modern web technologies.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-muted-foreground">
              <p>{PERSONAL_INFO.email}</p>
              <p>{PERSONAL_INFO.location}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} {PERSONAL_INFO.name}. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm mt-2 md:mt-0">
            Built with ❤️ using Next.js & TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}

