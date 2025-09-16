'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PROJECT_CATEGORIES, PROJECTS_PAGE_CONTENT, PROJECT_ACTION_ICONS, PROJECTS_DATA, Project } from './constants';
import { Logo } from '@/components/ui/logo';

export function ProjectsPageContent(): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch projects from API with fallback to dummy data
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try to fetch from API first
        const response = await fetch('/api/projects');
        
        if (response.ok) {
          const apiProjects = await response.json();
          setProjects(apiProjects);
        } else {
          // If API fails, use fallback data
          console.warn('API fetch failed, using fallback data');
          setProjects(PROJECTS_DATA);
        }
      } catch (error) {
        // If API is not available or fails, use fallback data
        console.warn('API not available, using fallback data:', error);
        setProjects(PROJECTS_DATA);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  // Loading state
  if (loading) {
    return (
      <div className="pt-16">
        <div className="container-max px-4 py-16 text-center">
          <div className="flex justify-center mb-6">
            <Logo animate={true} size="xl" />
          </div>
          <div className="animate-spin rounded-full h-12 w-12 border-3 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Loading projects...</p>
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
          {PROJECTS_PAGE_CONTENT.header.title} <span className="gradient-text">Projects</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
          {PROJECTS_PAGE_CONTENT.header.subtitle}
        </p>
      </motion.div>

      {/* Filter Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="container-max px-4 mb-12"
      >
        <div className="flex flex-wrap justify-center gap-3">
          {PROJECT_CATEGORIES.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-secondary text-foreground hover:bg-secondary/80'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="container-max px-4 pb-16"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative"
            >
              {/* Card Container with Clean Design */}
              <div className="relative bg-card rounded-xl border border-border overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-primary text-white text-xs rounded-full font-medium shadow-lg">
                      {PROJECTS_PAGE_CONTENT.project.featured}
                    </span>
                  </div>
                )}

                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    {project.liveUrl && (
                      <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-3 bg-white rounded-full text-black hover:bg-gray-100 transition-colors shadow-lg"
                          title="View Live Demo"
                        >
                          <PROJECT_ACTION_ICONS.externalLink className="w-5 h-5" />
                        </motion.button>
                      </Link>
                    )}
                    {project.githubUrl && (
                      <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-3 bg-white rounded-full text-black hover:bg-gray-100 transition-colors shadow-lg"
                          title="View Source Code"
                        >
                          <PROJECT_ACTION_ICONS.github className="w-5 h-5" />
                        </motion.button>
                      </Link>
                    )}
                  </div>
                </div>
                
                {/* Project Content */}
                <div className="p-6">
                  {/* Category and Date */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium">
                      {project.category}
                    </span>
                    {project.createdAt && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <PROJECT_ACTION_ICONS.calendar className="w-3 h-3" />
                        <span>{new Date(project.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Project Title */}
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-200">
                    {project.title}
                  </h3>
                  
                  {/* Project Description */}
                  <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-secondary text-foreground/80 text-xs rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-secondary text-foreground/80 text-xs rounded-md">
                        +{project.technologies.length - 3} {PROJECTS_PAGE_CONTENT.project.moreTechnologies}
                      </span>
                    )}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="space-y-4">
                    {/* View Details Button */}
                    <Link href={`/projects/${project.id}`} className="block">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                      >
                        <PROJECT_ACTION_ICONS.eye className="w-4 h-4" />
                        {PROJECTS_PAGE_CONTENT.project.viewDetails}
                        <PROJECT_ACTION_ICONS.arrowRight className="w-4 h-4" />
                      </motion.button>
                    </Link>
                    
                    {/* External Links - Better Layout */}
                    <div className="grid grid-cols-2 gap-3">
                      {project.liveUrl && (
                        <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-2.5 bg-secondary text-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2 text-sm"
                          >
                            <PROJECT_ACTION_ICONS.externalLink className="w-4 h-4" />
                            <span className="hidden sm:inline">{PROJECTS_PAGE_CONTENT.project.liveDemo}</span>
                            <span className="sm:hidden">Live</span>
                          </motion.button>
                        </Link>
                      )}
                      {project.githubUrl && (
                        <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-2.5 bg-secondary text-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2 text-sm"
                          >
                            <PROJECT_ACTION_ICONS.github className="w-4 h-4" />
                            <span className="hidden sm:inline">{PROJECTS_PAGE_CONTENT.project.code}</span>
                            <span className="sm:hidden">Code</span>
                          </motion.button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <PROJECT_ACTION_ICONS.filter className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {PROJECTS_PAGE_CONTENT.filter.noProjectsFound.title}
            </h3>
            <p className="text-muted-foreground">
              {PROJECTS_PAGE_CONTENT.filter.noProjectsFound.description}
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Project Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="container-max px-4 pb-16"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-card rounded-xl border border-border"
            >
              <div className="text-3xl font-bold text-primary mb-2">{projects.length}</div>
              <div className="text-foreground/90 font-medium">{PROJECTS_PAGE_CONTENT.statistics.totalProjects}</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-card rounded-xl border border-border"
            >
              <div className="text-3xl font-bold text-primary mb-2">
                {projects.filter(p => p.featured).length}
              </div>
              <div className="text-foreground/90 font-medium">{PROJECTS_PAGE_CONTENT.statistics.featuredProjects}</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-card rounded-xl border border-border"
            >
              <div className="text-3xl font-bold text-primary mb-2">
                {new Set(projects.flatMap(p => p.technologies)).size}
              </div>
              <div className="text-foreground/90 font-medium">{PROJECTS_PAGE_CONTENT.statistics.technologiesUsed}</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-card rounded-xl border border-border"
            >
              <div className="text-3xl font-bold text-primary mb-2">5+</div>
              <div className="text-foreground/90 font-medium">{PROJECTS_PAGE_CONTENT.statistics.yearsExperience}</div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="container-max px-4 pb-16 text-center"
      >
        <div className="max-w-2xl mx-auto p-8 bg-card rounded-xl border border-border">
          <h2 className="text-2xl font-bold mb-4">
            {PROJECTS_PAGE_CONTENT.callToAction.title}
          </h2>
          <p className="text-muted-foreground mb-6">
            {PROJECTS_PAGE_CONTENT.callToAction.description}
          </p>
          <Link href={PROJECTS_PAGE_CONTENT.callToAction.button.href}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              {PROJECTS_PAGE_CONTENT.callToAction.button.text}
              <PROJECT_ACTION_ICONS.externalLink className="w-4 h-4" />
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
