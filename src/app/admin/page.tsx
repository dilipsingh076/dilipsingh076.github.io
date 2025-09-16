'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BarChart3,
  Users,
  FileText,
  Code,
  Briefcase
} from 'lucide-react';
import { AdminStats, AdminSection } from './types';

const AdminDashboard = () => {
  const [stats, setStats] = useState<AdminStats>({
    blogs: 0,
    skills: 0,
    projects: 0,
    contacts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Use cached skills data if available, otherwise fetch
        let skillsCount = 0;
        try {
          const skillsRes = await fetch('/api/skills');
          if (skillsRes.ok) {
            const skillsData = await skillsRes.json();
            skillsCount = skillsData.categories?.reduce((total: number, category: any) => 
              total + (category.skills?.length || 0), 0) || 0;
          }
        } catch (error) {
          console.warn('Failed to fetch skills count:', error);
        }

        const [blogsRes, projectsRes, contactsRes] = await Promise.all([
          fetch('/api/blog/'),
          fetch('/api/projects/'),
          fetch('/api/contact/submissions/'),
        ]);

        const [blogs, projects, contacts] = await Promise.all([
          blogsRes.json(),
          projectsRes.json(),
          contactsRes.json(),
        ]);

        setStats({
          blogs: blogs.length,
          skills: skillsCount,
          projects: projects.length,
          contacts: contacts.length,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const adminSections: AdminSection[] = [
    {
      id: 'overview',
      title: 'Overview',
      icon: BarChart3,
      description: 'Dashboard overview and statistics',
      href: '/admin',
    },
    {
      id: 'blogs',
      title: 'Blog Posts',
      icon: FileText,
      description: 'Manage blog posts and articles',
      href: '/admin/blogs',
    },
    {
      id: 'skills',
      title: 'Skills',
      icon: Code,
      description: 'Manage technical skills and proficiencies',
      href: '/admin/skills',
    },
    {
      id: 'projects',
      title: 'Projects',
      icon: Briefcase,
      description: 'Manage portfolio projects',
      href: '/admin/projects',
    },
    {
      id: 'contacts',
      title: 'Contact Submissions',
      icon: Users,
      description: 'View and manage contact form submissions',
      href: '/admin/contacts',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">Manage your portfolio content and data</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminSections.slice(1).map((section) => (
          <Link
            key={section.id}
            href={section.href}
            className="block group"
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <section.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {section.title}
                  </h3>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                {section.description}
              </p>
              <div className="mt-4 flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700">
                Manage
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-blue-600">Blog Posts</p>
                <p className="text-2xl font-bold text-blue-900">
                  {loading ? '...' : stats.blogs}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center">
              <Code className="h-8 w-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-green-600">Skills</p>
                <p className="text-2xl font-bold text-green-900">
                  {loading ? '...' : stats.skills}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center">
              <Briefcase className="h-8 w-8 text-purple-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-purple-600">Projects</p>
                <p className="text-2xl font-bold text-purple-900">
                  {loading ? '...' : stats.projects}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-orange-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-orange-600">Contacts</p>
                <p className="text-2xl font-bold text-orange-900">
                  {loading ? '...' : stats.contacts}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
