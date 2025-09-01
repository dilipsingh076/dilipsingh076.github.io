'use client';

import { motion } from 'framer-motion';
import { ContactSection } from '@/components/sections/contact-section';
import Link from 'next/link';
import { FiArrowLeft, FiMail, FiPhone, FiMapPin, FiLinkedin, FiGithub, FiTwitter, FiMessageCircle, FiClock, FiGlobe } from 'react-icons/fi';
import { PERSONAL_INFO } from '@/constants/data';
import { Logo } from '@/components/ui/logo';

const contactMethods = [
  {
    icon: FiMail,
    title: 'Email',
    value: PERSONAL_INFO.email,
    href: `mailto:${PERSONAL_INFO.email}`,
    description: 'Send me an email anytime'
  },
  {
    icon: FiPhone,
    title: 'Phone',
    value: PERSONAL_INFO.phone,
    href: `tel:${PERSONAL_INFO.phone}`,
    description: 'Call me during business hours'
  },
  {
    icon: FiMapPin,
    title: 'Location',
    value: PERSONAL_INFO.location,
    href: '#',
    description: 'Available for remote work'
  },
  {
    icon: FiMessageCircle,
    title: 'LinkedIn',
    value: 'dilip-singh-fauzdar',
    href: PERSONAL_INFO.linkedin,
    description: 'Connect with me professionally'
  }
];

const socialLinks = [
  {
    icon: FiGithub,
    name: 'GitHub',
    href: 'https://github.com/dilipsingh076',
    description: 'Check out my code'
  },
  {
    icon: FiLinkedin,
    name: 'LinkedIn',
    href: PERSONAL_INFO.linkedin,
    description: 'Professional network'
  },
  {
    icon: FiGlobe,
    name: 'Portfolio',
    href: PERSONAL_INFO.github,
    description: 'View my work'
  }
];

const faqData = [
  {
    question: 'What types of projects do you work on?',
    answer: 'I specialize in full-stack web applications, mobile apps, and scalable backend systems. I&apos;m particularly experienced with React, Next.js, Node.js, and modern cloud technologies.'
  },
  {
    question: 'Do you work remotely?',
    answer: 'Yes! I&apos;m fully set up for remote work and have experience collaborating with teams across different time zones. I&apos;m also available for on-site work when needed.'
  },
  {
    question: 'What&apos;s your typical response time?',
    answer: 'I typically respond to emails within 24 hours, often much sooner. For urgent matters, feel free to reach out through multiple channels.'
  },
  {
    question: 'Are you available for freelance work?',
    answer: 'Yes, I&apos;m available for freelance and contract work. I can work on both short-term projects and long-term collaborations.'
  },
  {
    question: 'What technologies do you specialize in?',
    answer: 'I specialize in React, Next.js, TypeScript, Node.js, and modern web technologies. I also have experience with mobile development using React Native.'
  },
  {
    question: 'How do you handle project communication?',
    answer: 'I believe in transparent communication and regular updates. I use tools like Slack, Zoom, and project management platforms to keep everyone informed.'
  }
];

export default function ContactPage(): JSX.Element {
  return (
    <main className="min-h-screen bg-background text-foreground">
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
            Get In <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            I&apos;m always interested in new opportunities and collaborations. 
            Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
          </p>
          
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
            >
              <FiArrowLeft className="w-4 h-4" />
              Back to Home
            </motion.button>
          </Link>
        </motion.div>

        {/* Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="container-max px-4 mb-16"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
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
              Follow Me <span className="gradient-text">Online</span>
            </h2>
            <p className="text-muted-foreground">
              Connect with me on social media for updates, insights, and more.
            </p>
          </div>
          
          <div className="flex justify-center gap-6">
            {socialLinks.map((social, index) => (
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
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {faqData.map((faq, index) => (
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
                  Currently Available
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                I&apos;m currently accepting new projects and opportunities. 
                Feel free to reach out for collaborations, consultations, or just to say hello!
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <span>• Full-time opportunities</span>
                <span>• Freelance projects</span>
                <span>• Technical consultations</span>
                <span>• Open source contributions</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
