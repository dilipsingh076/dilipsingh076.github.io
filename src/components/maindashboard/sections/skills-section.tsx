'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Button } from '@/components/common';
import { SKILL_CATEGORIES, SKILLS_CONTENT, PROFICIENCY_COLORS, PROGRESS_COLORS } from '../constants';
import { useSkillsData } from '@/hooks';

// Local interface for skills section (includes id and category)
interface SkillWithMeta {
  id: string;
  name: string;
  proficiency: number;
  category: string;
}


export function SkillsSection(): JSX.Element {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [skills, setSkills] = useState<SkillWithMeta[]>([]);
  const { data: skillsData, loading, error } = useSkillsData();

  useEffect(() => {
    if (skillsData) {
      // Map category titles to maindashboard category IDs
      const categoryMapping: { [key: string]: string } = {
        'Frontend Development': 'frontend',
        'Backend Development': 'backend',
        'Database & Cloud': 'database',
        'Mobile Development': 'frontend', // Map mobile to frontend for now
        'Tools & Technologies': 'tools',
      };
      
      // Flatten all skills from categories into a single array
      const allSkills: SkillWithMeta[] = skillsData.categories.flatMap(category => 
        category.skills.map(skill => ({
          ...skill,
          id: `${category.title.toLowerCase().replace(/\s+/g, '-')}-${skill.name.toLowerCase().replace(/\s+/g, '-')}`,
          category: categoryMapping[category.title] || 'tools'
        }))
      );
      setSkills(allSkills);
    } else {
      setSkills([]);
    }
  }, [skillsData]);

  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  const getProficiencyColor = (proficiency: number) => {
    if (proficiency >= SKILLS_CONTENT.proficiency.thresholds.expert) return PROFICIENCY_COLORS.expert;
    if (proficiency >= SKILLS_CONTENT.proficiency.thresholds.advanced) return PROFICIENCY_COLORS.advanced;
    if (proficiency >= SKILLS_CONTENT.proficiency.thresholds.intermediate) return PROFICIENCY_COLORS.intermediate;
    return PROFICIENCY_COLORS.beginner;
  };

  const getProficiencyLabel = (proficiency: number) => {
    if (proficiency >= SKILLS_CONTENT.proficiency.thresholds.expert) return SKILLS_CONTENT.proficiency.labels.expert;
    if (proficiency >= SKILLS_CONTENT.proficiency.thresholds.advanced) return SKILLS_CONTENT.proficiency.labels.advanced;
    if (proficiency >= SKILLS_CONTENT.proficiency.thresholds.intermediate) return SKILLS_CONTENT.proficiency.labels.intermediate;
    return SKILLS_CONTENT.proficiency.labels.beginner;
  };

  if (loading) {
    return (
      <section id="skills" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-3 border-blue-600 border-t-transparent mx-auto"></div>
            <p className="mt-6 text-lg text-gray-600">{SKILLS_CONTENT.loading.text}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-6">
            <SKILLS_CONTENT.badge.icon className="w-4 h-4" />
            {SKILLS_CONTENT.badge.text}
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {SKILLS_CONTENT.title} <span className="text-blue-600">Technologies</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {SKILLS_CONTENT.subtitle} {SKILLS_CONTENT.description}
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {SKILL_CATEGORIES.map((category) => {
            const Icon = category.icon;
            const categoryCount = skills.filter(skill => skill.category === category.id).length;
            const isActive = selectedCategory === category.id;
            
            return (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  'flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-sm',
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md border border-gray-200'
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{category.label}</span>
                {category.id !== 'all' && (
                  <span className={cn(
                    'px-2 py-1 rounded-full text-xs font-medium',
                    isActive ? 'bg-blue-500' : 'bg-gray-100'
                  )}>
                    {categoryCount}
                  </span>
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Skills List */}
        <div className="space-y-6">
          {filteredSkills.map((skill, index) => {
            const proficiencyColor = getProficiencyColor(skill.proficiency);
            const proficiencyLabel = getProficiencyLabel(skill.proficiency);
            
            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ x: 5, scale: 1.01 }}
                className="group flex items-center justify-between p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                      <span className="text-white font-bold text-xl">
                        {skill.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full border-2 border-blue-600 flex items-center justify-center">
                      <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {skill.name}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500 capitalize">
                        {skill.category}
                      </span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span className={cn(
                        'px-3 py-1 rounded-full text-xs font-medium border',
                        proficiencyColor
                      )}>
                        {proficiencyLabel}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      {skill.proficiency}%
                    </div>
                    <div className="text-xs text-gray-500 font-medium">
                      Proficiency
                    </div>
                  </div>
                  
                  <div className="w-32">
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.proficiency}%` } : {}}
                        transition={{ delay: index * 0.1 + 0.5, duration: 1.5, ease: "easeOut" }}
                        className={cn(
                          "h-full rounded-full transition-all duration-300",
                          skill.proficiency >= SKILLS_CONTENT.proficiency.thresholds.expert ? PROGRESS_COLORS.expert :
                          skill.proficiency >= SKILLS_CONTENT.proficiency.thresholds.advanced ? PROGRESS_COLORS.advanced :
                          skill.proficiency >= SKILLS_CONTENT.proficiency.thresholds.intermediate ? PROGRESS_COLORS.intermediate :
                          PROGRESS_COLORS.beginner
                        )}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>0%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Enhanced Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-20 grid md:grid-cols-4 gap-8"
        >
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {skills.length}
            </div>
            <div className="text-gray-600 font-medium">{SKILLS_CONTENT.stats.technologies}</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-emerald-600 mb-2">
              {skills.length > 0 ? Math.round(skills.reduce((acc, skill) => acc + skill.proficiency, 0) / skills.length) : 0}%
            </div>
            <div className="text-gray-600 font-medium">{SKILLS_CONTENT.stats.average}</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-amber-600 mb-2">
              {skills.filter(skill => skill.proficiency >= SKILLS_CONTENT.proficiency.thresholds.expert).length}
            </div>
            <div className="text-gray-600 font-medium">{SKILLS_CONTENT.stats.expertLevel}</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {SKILL_CATEGORIES.length - 1}
            </div>
            <div className="text-gray-600 font-medium">{SKILLS_CONTENT.stats.categories}</div>
          </div>
        </motion.div>

        {/* View All Skills Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-12"
        >
          <Button href={SKILLS_CONTENT.button.href}>{SKILLS_CONTENT.button.text}</Button>
        </motion.div>
      </div>
    </section>
  );
}
