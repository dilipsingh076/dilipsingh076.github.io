'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCode, FiDatabase, FiServer, FiCloud, FiTool, FiTrendingUp } from 'react-icons/fi';
import { cn } from '@/lib/utils';
import { Skill } from '@/app/skills/types';

const categories = [
  { id: 'all', label: 'All Skills', icon: FiCode, count: 0 },
  { id: 'frontend', label: 'Frontend', icon: FiCode, count: 0 },
  { id: 'backend', label: 'Backend', icon: FiServer, count: 0 },
  { id: 'database', label: 'Database', icon: FiDatabase, count: 0 },
  { id: 'devops', label: 'DevOps', icon: FiCloud, count: 0 },
  { id: 'tools', label: 'Tools', icon: FiTool, count: 0 },
];

export function SkillsSection(): JSX.Element {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('/api/skills/');
        const data = await response.json();
        setSkills(data);
      } catch (error) {
        console.error('Error fetching skills:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  const getProficiencyColor = (proficiency: number) => {
    if (proficiency >= 90) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (proficiency >= 75) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (proficiency >= 60) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const getProficiencyLabel = (proficiency: number) => {
    if (proficiency >= 90) return 'Expert';
    if (proficiency >= 75) return 'Advanced';
    if (proficiency >= 60) return 'Intermediate';
    return 'Beginner';
  };

  if (loading) {
    return (
      <section id="skills" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-3 border-blue-600 border-t-transparent mx-auto"></div>
            <p className="mt-6 text-lg text-gray-600">Loading skills...</p>
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
            <FiTrendingUp className="w-4 h-4" />
            Technical Expertise
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Skills & <span className="text-blue-600">Technologies</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            I&apos;ve worked with a diverse range of technologies and tools throughout my career.
            Here&apos;s a comprehensive overview of my technical proficiency.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((category) => {
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
                          skill.proficiency >= 90 ? "bg-gradient-to-r from-emerald-500 to-emerald-600" :
                          skill.proficiency >= 75 ? "bg-gradient-to-r from-blue-500 to-blue-600" :
                          skill.proficiency >= 60 ? "bg-gradient-to-r from-amber-500 to-amber-600" :
                          "bg-gradient-to-r from-gray-500 to-gray-600"
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
            <div className="text-gray-600 font-medium">Technologies</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-emerald-600 mb-2">
              {skills.length > 0 ? Math.round(skills.reduce((acc, skill) => acc + skill.proficiency, 0) / skills.length) : 0}%
            </div>
            <div className="text-gray-600 font-medium">Average</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-amber-600 mb-2">
              {skills.filter(skill => skill.proficiency >= 90).length}
            </div>
            <div className="text-gray-600 font-medium">Expert Level</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {categories.length - 1}
            </div>
            <div className="text-gray-600 font-medium">Categories</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
