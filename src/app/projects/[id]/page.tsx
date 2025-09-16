import { PROJECTS_DATA } from '@/components/projects/constants';
import { ProjectDetailPage } from '@/components/project-detail';

// Generate static params for static export
export function generateStaticParams() {
  return PROJECTS_DATA.map((project) => ({
    id: project.id,
  }));
}

interface ProjectDetailPageProps {
  params: {
    id: string;
  };
}

export default function ProjectDetail({ params }: ProjectDetailPageProps): JSX.Element {
  const project = PROJECTS_DATA.find(p => p.id === params.id);

  return <ProjectDetailPage project={project} />;
}
