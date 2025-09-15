'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowLeft, FiClock } from 'react-icons/fi';
import { PERSONAL_INFO } from '@/components/maindashboard/constants';
import { CONTACT_METHODS, SOCIAL_LINKS, FAQ_DATA, CONTACT_PAGE_CONTENT } from './constants';
import { Logo } from '@/components/ui/logo';
import { ContactSection } from '@/components/maindashboard';

export function ContactPageContent(): JSX.Element {
  // Process contact methods with actual data
  const processedContactMethods = CONTACT_METHODS.map(method => ({
    ...method,
    value: method.value === 'PERSONAL_INFO.email' ? PERSONAL_INFO.email :
           method.value === 'PERSONAL_INFO.phone' ? PERSONAL_INFO.phone :
           method.value === 'PERSONAL_INFO.location' ? PERSONAL_INFO.location :
           method.value,
    href: method.href === 'mailto:PERSONAL_INFO.email' ? `mailto:${PERSONAL_INFO.email}` :
          method.href === 'tel:PERSONAL_INFO.phone' ? `tel:${PERSONAL_INFO.phone}` :
          method.href === 'PERSONAL_INFO.linkedin' ? PERSONAL_INFO.linkedin :
          method.href,
  }));

  // Process social links with actual data
  const processedSocialLinks = SOCIAL_LINKS.map(social => ({
    ...social,
    href: social.href === 'PERSONAL_INFO.linkedin' ? PERSONAL_INFO.linkedin :
          social.href === 'PERSONAL_INFO.github' ? PERSONAL_INFO.github :
          social.href,
  }));

  return (
    <div className="pt-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container-max px-4 py-16 text-center"
      >
        <div className="flex justify-center mb-6">
          <Logo animate={true} size="xl" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          {CONTACT_PAGE_CONTENT.header.title} <span className="gradient-text">Touch</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
          {CONTACT_PAGE_CONTENT.header.subtitle}
        </p>
      </motion.div>

      {/* Contact Methods */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="container-max px-4 mb-16"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processedContactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors"
            >
              <Link href={method.href} target={method.href.startsWith('http') ? '_blank' : undefined}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <method.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {method.title}
                    </h3>
                    <p className="text-primary font-medium mb-1">
                      {method.value}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {method.description}
                    </p>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Main Contact Form */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative z-10"
      >
        <ContactSection />
      </motion.div>

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="container-max px-4 py-16"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {CONTACT_PAGE_CONTENT.sections.socialLinks.title} <span className="gradient-text">Online</span>
          </h2>
          <p className="text-muted-foreground">
            {CONTACT_PAGE_CONTENT.sections.socialLinks.subtitle}
          </p>
        </div>
        
        <div className="flex justify-center gap-6">
          {processedSocialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-3 p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <social.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-foreground mb-1">
                  {social.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {social.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="container-max px-4 pb-16"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            {CONTACT_PAGE_CONTENT.sections.faq.title} <span className="gradient-text">Questions</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {FAQ_DATA.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-card rounded-xl border border-border"
              >
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Availability Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="container-max px-4 pb-16"
      >
        <div className="max-w-2xl mx-auto">
          <div className="p-6 bg-card rounded-xl border border-border text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <FiClock className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">
                {CONTACT_PAGE_CONTENT.sections.availability.title}
              </h3>
            </div>
            <p className="text-muted-foreground mb-4">
              {CONTACT_PAGE_CONTENT.sections.availability.description}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              {CONTACT_PAGE_CONTENT.sections.availability.options.map((option, index) => (
                <span key={index}>• {option}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
