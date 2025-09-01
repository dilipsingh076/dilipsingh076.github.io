'use client';

import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub, FiArrowLeft } from 'react-icons/fi';
import { Project } from '@/types';
import Link from 'next/link';

interface ProjectDetailClientProps {
  project: Project | undefined;
}

export function ProjectDetailClient({ project }: ProjectDetailClientProps): JSX.Element {
  if (!project) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <div className="container-max px-4 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-8">The project you&apos;re looking for doesn&apos;t exist.</p>
            <Link 
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <FiArrowLeft className="w-4 h-4" />
              Back to Projects
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container-max px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >


          {/* Project Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">{project.description}</p>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <FiExternalLink className="w-4 h-4" />
                Live Demo
              </motion.a>
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:bg-secondary transition-colors"
              >
                <FiGithub className="w-4 h-4" />
                View Code
              </motion.a>
            </div>
          </div>

          {/* Project Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <div className="relative rounded-xl overflow-hidden border border-border">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-96 object-cover"
              />
              {project.featured && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-primary text-white text-sm rounded-full font-medium">
                    Featured
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Project Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-secondary/30 rounded-xl p-8"
          >
            <h2 className="text-2xl font-semibold mb-4">Project Details</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                {project.description}
              </p>
              
              {/* Add more detailed information based on project type */}
              {project.title === 'Intelligage.io' && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">Key Features</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>AI-powered insights and analytics dashboard</li>
                    <li>Real-time data visualization</li>
                    <li>GraphQL API integration</li>
                    <li>TypeScript for type safety</li>
                    <li>Responsive design for all devices</li>
                  </ul>
                </div>
              )}
              
              {project.title === 'PDMI Project' && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">Key Features</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Micro frontend architecture using Single SPA</li>
                    <li>Dynamic form handling with React JSON Schema Form</li>
                    <li>RESTful API integration</li>
                    <li>Scalable project management system</li>
                    <li>Role-based access control</li>
                  </ul>
                </div>
              )}
              
              {project.title === 'Infiniti Possibilities' && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">Key Features</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Multi-LLM model query interface</li>
                    <li>Legacy codebase modernization</li>
                    <li>AI/ML integration</li>
                    <li>User-friendly results display</li>
                    <li>FastAPI backend integration</li>
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
