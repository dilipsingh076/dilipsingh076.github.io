'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowLeft, FiDownload, FiMail, FiLinkedin, FiGithub, FiMapPin, FiCalendar, FiAward } from 'react-icons/fi';
import { EXPERIENCES, EDUCATION, ACHIEVEMENTS, PERSONAL_INFO } from '@/components/maindashboard/constants';
import { ABOUT_PAGE_CONTENT } from './constants';
import { Logo } from '@/components/ui/logo';

export function AboutPageContent(): JSX.Element {
  const handleDownloadResume = (): void => {
    window.open(PERSONAL_INFO.resumeUrl, '_blank');
  };

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
          {ABOUT_PAGE_CONTENT.header.title} <span className="gradient-text">Dilip Singh</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
          {ABOUT_PAGE_CONTENT.header.subtitle}
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownloadResume}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            <FiDownload className="w-4 h-4" />
            {ABOUT_PAGE_CONTENT.header.buttons.downloadResume.text}
          </motion.button>
        </div>
      </motion.div>

      {/* Personal Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="container-max px-4 mb-16"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img
                src="/images/dilip.png"
                alt="Dilip Singh"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-foreground">
                {ABOUT_PAGE_CONTENT.personalInfo.title}
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                {PERSONAL_INFO.about}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <FiMapPin className="w-5 h-5 text-primary" />
                  <span className="text-foreground/80">{PERSONAL_INFO.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiCalendar className="w-5 h-5 text-primary" />
                  <span className="text-foreground/80">{ABOUT_PAGE_CONTENT.personalInfo.experience}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Experience Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="container-max px-4 mb-16"
      >
        <h2 className="text-3xl font-bold text-center mb-12">
          {ABOUT_PAGE_CONTENT.sections.experience.title} <span className="gradient-text">Experience</span>
        </h2>
        
        <div className="max-w-4xl mx-auto space-y-8">
          {EXPERIENCES.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row gap-6 p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors"
            >
              <div className="md:w-1/3">
                <h3 className="text-xl font-semibold text-primary mb-2">
                  {experience.title}
                </h3>
                <p className="text-muted-foreground mb-1">{experience.company}</p>
                <p className="text-sm text-muted-foreground">{experience.duration}</p>
              </div>
              <div className="md:w-2/3">
                <ul className="space-y-2 mb-4">
                  {experience.description.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-foreground/90 flex items-start gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Education */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="container-max px-4 mb-16"
      >
        <h2 className="text-3xl font-bold text-center mb-12">
          <span className="gradient-text">{ABOUT_PAGE_CONTENT.sections.education.title}</span>
        </h2>
        
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {EDUCATION.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors"
            >
              <h3 className="text-xl font-semibold text-primary mb-2">
                {edu.degree}
              </h3>
              <p className="text-foreground/80 mb-1">{edu.institution}</p>
              <p className="text-sm text-muted-foreground mb-3">{edu.duration}</p>
              <p className="text-foreground/70 text-sm">{edu.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="container-max px-4 mb-16"
      >
        <h2 className="text-3xl font-bold text-center mb-12">
          <span className="gradient-text">{ABOUT_PAGE_CONTENT.sections.achievements.title}</span>
        </h2>
        
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ACHIEVEMENTS.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiAward className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {achievement.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                {achievement.description}
              </p>
              <p className="text-xs text-primary font-medium">
                {achievement.date}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Contact Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="container-max px-4 pb-16"
      >
        <h2 className="text-3xl font-bold text-center mb-12">
          {ABOUT_PAGE_CONTENT.sections.contact.title} <span className="gradient-text">Touch</span>
        </h2>
        
        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href={`mailto:${PERSONAL_INFO.email}`}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border hover:border-primary/50 transition-colors"
              >
                <FiMail className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">{ABOUT_PAGE_CONTENT.contactInfo.email.label}</p>
                  <p className="text-sm text-muted-foreground">{PERSONAL_INFO.email}</p>
                </div>
              </motion.div>
            </Link>

            <Link href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border hover:border-primary/50 transition-colors"
              >
                <FiLinkedin className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">{ABOUT_PAGE_CONTENT.contactInfo.linkedin.label}</p>
                  <p className="text-sm text-muted-foreground">{ABOUT_PAGE_CONTENT.contactInfo.linkedin.username}</p>
                </div>
              </motion.div>
            </Link>

            <Link href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border hover:border-primary/50 transition-colors"
              >
                <FiGithub className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">{ABOUT_PAGE_CONTENT.contactInfo.github.label}</p>
                  <p className="text-sm text-muted-foreground">{ABOUT_PAGE_CONTENT.contactInfo.github.username}</p>
                </div>
              </motion.div>
            </Link>

            <Link href={ABOUT_PAGE_CONTENT.contactInfo.contactForm.href}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border hover:border-primary/50 transition-colors"
              >
                <FiMail className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">{ABOUT_PAGE_CONTENT.contactInfo.contactForm.label}</p>
                  <p className="text-sm text-muted-foreground">{ABOUT_PAGE_CONTENT.contactInfo.contactForm.description}</p>
                </div>
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
