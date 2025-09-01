'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { FiExternalLink, FiGithub, FiFilter, FiCode, FiEye } from 'react-icons/fi';
import { projectsData } from '@/constants/data';
import { Logo } from '@/components/ui/logo';

const categories = ['All', 'Web App', 'Mobile App', 'E-commerce', 'Dashboard', 'AI/ML', 'Real-time'];

export default function ProjectsPage(): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredProjects = selectedCategory === 'All' 
    ? projectsData 
    : projectsData.filter(project => project.category === selectedCategory);

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
            My <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            A collection of projects showcasing my skills in full-stack development, 
            from concept to deployment. Each project represents a unique challenge and solution.
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
            {categories.map((category) => (
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
                className="bg-card rounded-xl border border-border overflow-hidden card-hover group"
              >
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
                          className="p-3 bg-white rounded-full text-black hover:bg-gray-100 transition-colors"
                          title="View Live"
                        >
                          <FiExternalLink className="w-5 h-5" />
                        </motion.button>
                      </Link>
                    )}
                    {project.githubUrl && (
                      <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-3 bg-white rounded-full text-black hover:bg-gray-100 transition-colors"
                          title="View Code"
                        >
                          <FiGithub className="w-5 h-5" />
                        </motion.button>
                      </Link>
                    )}
                  </div>
                  {project.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-primary text-white text-xs rounded-full font-medium">
                        Featured
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium">
                      {project.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-secondary text-foreground/80 text-xs rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 bg-secondary text-foreground/80 text-xs rounded-md">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    {project.liveUrl && (
                      <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                        >
                          <FiEye className="w-4 h-4" />
                          Live Demo
                        </motion.button>
                      </Link>
                    )}
                    {project.githubUrl && (
                      <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-2 bg-secondary text-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2"
                        >
                          <FiCode className="w-4 h-4" />
                          Code
                        </motion.button>
                      </Link>
                    )}
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
              <FiFilter className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No projects found</h3>
              <p className="text-muted-foreground">
                No projects match the selected category. Try selecting a different filter.
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
                <div className="text-3xl font-bold text-primary mb-2">{projectsData.length}</div>
                <div className="text-foreground/90 font-medium">Total Projects</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-card rounded-xl border border-border"
              >
                <div className="text-3xl font-bold text-primary mb-2">
                  {projectsData.filter(p => p.featured).length}
                </div>
                <div className="text-foreground/90 font-medium">Featured Projects</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-card rounded-xl border border-border"
              >
                <div className="text-3xl font-bold text-primary mb-2">
                  {new Set(projectsData.flatMap(p => p.technologies)).size}
                </div>
                <div className="text-foreground/90 font-medium">Technologies Used</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-card rounded-xl border border-border"
              >
                <div className="text-3xl font-bold text-primary mb-2">4+</div>
                <div className="text-foreground/90 font-medium">Years Experience</div>
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
              Have a project in mind?
            </h2>
            <p className="text-muted-foreground mb-6">
              Let&apos;s work together to bring your ideas to life. I&apos;m always excited to take on new challenges 
              and create innovative solutions.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Start a Project
                <FiExternalLink className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
