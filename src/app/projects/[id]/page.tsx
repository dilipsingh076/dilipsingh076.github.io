import { PROJECTS } from '@/constants/data';
import { ProjectDetailClient } from './project-detail-client';

// Generate static params for static export
export function generateStaticParams() {
  return PROJECTS.map((project) => ({
    id: project.id,
  }));
}

interface ProjectDetailPageProps {
  params: {
    id: string;
  };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps): JSX.Element {
  const project = PROJECTS.find(p => p.id === params.id);

  return <ProjectDetailClient project={project} />;
}
