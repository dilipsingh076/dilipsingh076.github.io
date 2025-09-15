'use client';

import { motion } from 'framer-motion';
import { ProjectDetailPageContent } from './ProjectDetailPageContent';
import { Project } from '@/components/projects/constants';

interface ProjectDetailPageProps {
  project: Project | undefined;
}

export function ProjectDetailPage({ project }: ProjectDetailPageProps): JSX.Element {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background text-foreground"
    >
      <ProjectDetailPageContent project={project} />
    </motion.main>
  );
}
