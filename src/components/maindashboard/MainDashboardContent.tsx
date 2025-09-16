'use client';

import { 
  HeroSection, 
  AboutSection, 
  ProjectsSection, 
  SkillsSection, 
  ContactSection
} from './sections';

export function MainDashboardContent(): JSX.Element {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Skills Section */}
      <SkillsSection />

      {/* Contact Section */}
      <ContactSection />
    </>
  );
}
