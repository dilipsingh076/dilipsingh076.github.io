'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  SKILLS_PAGE_CONTENT, 
  SKILL_CATEGORIES, 
  SKILLS_OVERVIEW, 
  EXPERIENCE_STATS, 
  SKILLS_ACTION_ICONS,
  CATEGORY_ICONS,
  SkillCategory,
  Skill
} from './constants';
import { useSkillsData } from '@/hooks';
import { Logo } from '@/components/ui/logo';

export function SkillsPageContent(): JSX.Element {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [skillsOverview, setSkillsOverview] = useState<Skill[]>([]);
  const { data: skillsData, loading, error } = useSkillsData();

  // Update state when data is available
  useEffect(() => {
    if (skillsData) {
      setSkillCategories(skillsData.categories || SKILL_CATEGORIES);
      setSkillsOverview(skillsData.overview || SKILLS_OVERVIEW);
    } else {
      // Use fallback data if no API data
      setSkillCategories(SKILL_CATEGORIES);
      setSkillsOverview(SKILLS_OVERVIEW);
    }
  }, [skillsData]);

  // Loading state
  if (loading) {
    return (
      <div className="pt-16">
        <div className="container-max px-4 py-16 text-center">
          <div className="flex justify-center mb-6">
            <Logo animate={true} size="xl" />
          </div>
          <div className="animate-spin rounded-full h-12 w-12 border-3 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Loading skills...</p>
        </div>
      </div>
    );
  }

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
          {SKILLS_PAGE_CONTENT.header.title} <span className="gradient-text">Skills</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
          {SKILLS_PAGE_CONTENT.header.subtitle}
        </p>
        
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
          >
            <SKILLS_ACTION_ICONS.arrowLeft className="w-4 h-4" />
            {SKILLS_PAGE_CONTENT.navigation.backToHome}
          </motion.button>
        </Link>
      </motion.div>

      {/* Skills Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="container-max px-4 mb-16"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {skillsOverview.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                viewport={{ once: true }}
                className="text-center p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold text-lg">
                    {skill.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-foreground mb-1">
                  {skill.name}
                </h3>
                <div className="w-full bg-secondary rounded-full h-1">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency}%` }}
                    transition={{ delay: index * 0.05, duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="bg-primary h-1 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Detailed Skills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="container-max px-4 py-16"
      >
        <h2 className="text-3xl font-bold text-center mb-12">
          {SKILLS_PAGE_CONTENT.sections.breakdown.title} <span className="gradient-text">Breakdown</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl border border-border p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                {(() => {
                  const IconComponent = CATEGORY_ICONS[category.title as keyof typeof CATEGORY_ICONS];
                  return IconComponent ? <IconComponent className="w-6 h-6 text-primary" /> : null;
                })()}
                <h3 className="text-xl font-semibold text-foreground">
                  {category.title}
                </h3>
              </div>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: skillIndex * 0.05, duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-foreground/90 font-medium">
                        {skill.name}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {skill.proficiency}%
                      </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        transition={{ delay: skillIndex * 0.05, duration: 1, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="bg-primary h-2 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Experience Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="container-max px-4 pb-16"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-card rounded-xl border border-border"
            >
              <div className="text-3xl font-bold text-primary mb-2">{EXPERIENCE_STATS.years}+</div>
              <div className="text-foreground/90 font-medium">{SKILLS_PAGE_CONTENT.experience.years}</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-card rounded-xl border border-border"
            >
              <div className="text-3xl font-bold text-primary mb-2">{EXPERIENCE_STATS.projects}+</div>
              <div className="text-foreground/90 font-medium">{SKILLS_PAGE_CONTENT.experience.projects}</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-card rounded-xl border border-border"
            >
              <div className="text-3xl font-bold text-primary mb-2">{EXPERIENCE_STATS.technologies}+</div>
              <div className="text-foreground/90 font-medium">{SKILLS_PAGE_CONTENT.experience.technologies}</div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Learning Journey */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="container-max px-4 pb-16"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            {SKILLS_PAGE_CONTENT.sections.learning.title} <span className="gradient-text">Learning Journey</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="p-6 bg-card rounded-xl border border-border"
            >
              <div className="flex items-center gap-3 mb-4">
                <SKILLS_ACTION_ICONS.trendingUp className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">{SKILLS_PAGE_CONTENT.learning.continuous.title}</h3>
              </div>
              <p className="text-muted-foreground">
                {SKILLS_PAGE_CONTENT.learning.continuous.description}
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="p-6 bg-card rounded-xl border border-border"
            >
              <div className="flex items-center gap-3 mb-4">
                <SKILLS_ACTION_ICONS.code className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">{SKILLS_PAGE_CONTENT.learning.problemSolving.title}</h3>
              </div>
              <p className="text-muted-foreground">
                {SKILLS_PAGE_CONTENT.learning.problemSolving.description}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="container-max px-4 pb-16 text-center"
      >
        <div className="max-w-2xl mx-auto p-8 bg-card rounded-xl border border-border">
          <h2 className="text-2xl font-bold mb-4">
            {SKILLS_PAGE_CONTENT.callToAction.title}
          </h2>
          <p className="text-muted-foreground mb-6">
            {SKILLS_PAGE_CONTENT.callToAction.description}
          </p>
          <Link href={SKILLS_PAGE_CONTENT.callToAction.button.href}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              {SKILLS_PAGE_CONTENT.callToAction.button.text}
              <SKILLS_ACTION_ICONS.arrowLeft className="w-4 h-4 rotate-180" />
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
