'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Project } from '@/components/projects/constants';
import { PROJECT_DETAIL_PAGE_CONTENT, PROJECT_SPECIFIC_CONTENT, PROJECT_DETAIL_ACTION_ICONS } from './constants';

interface ProjectDetailPageContentProps {
  project: Project | undefined;
}

export function ProjectDetailPageContent({ project }: ProjectDetailPageContentProps): JSX.Element {
  if (!project) {
    return (
      <div className="container-max px-4 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">{PROJECT_DETAIL_PAGE_CONTENT.notFound.title}</h1>
          <p className="text-muted-foreground mb-8">{PROJECT_DETAIL_PAGE_CONTENT.notFound.description}</p>
          <Link 
            href={PROJECT_DETAIL_PAGE_CONTENT.notFound.button.href}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <PROJECT_DETAIL_ACTION_ICONS.arrowLeft className="w-4 h-4" />
            {PROJECT_DETAIL_PAGE_CONTENT.notFound.button.text}
          </Link>
        </div>
      </div>
    );
  }

  // Get project-specific content
  const projectContent = PROJECT_SPECIFIC_CONTENT[project.title as keyof typeof PROJECT_SPECIFIC_CONTENT];

  return (
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
              <PROJECT_DETAIL_ACTION_ICONS.externalLink className="w-4 h-4" />
              {PROJECT_DETAIL_PAGE_CONTENT.actions.liveDemo.text}
            </motion.a>
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:bg-secondary transition-colors"
            >
              <PROJECT_DETAIL_ACTION_ICONS.github className="w-4 h-4" />
              {PROJECT_DETAIL_PAGE_CONTENT.actions.viewCode.text}
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
                  {PROJECT_DETAIL_PAGE_CONTENT.badges.featured}
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
          <h2 className="text-2xl font-semibold mb-4">{PROJECT_DETAIL_PAGE_CONTENT.sections.technologies.title}</h2>
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
          <h2 className="text-2xl font-semibold mb-4">{PROJECT_DETAIL_PAGE_CONTENT.sections.projectDetails.title}</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              {project.description}
            </p>
            
            {/* Add project-specific key features if available */}
            {projectContent && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-3">{PROJECT_DETAIL_PAGE_CONTENT.sections.keyFeatures.title}</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {projectContent.keyFeatures.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
