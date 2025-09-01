'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  BarChart3, 
  FileText, 
  Code, 
  Briefcase, 
  Users,
  Home,
  MessageCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/ui/logo';

const AdminNav = () => {
  const pathname = usePathname();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const response = await fetch('/api/contact/?status=pending');
        const data = await response.json();
        if (data.success) {
          // Count total unread messages across all contacts
          const totalUnread = data.contacts.reduce((total: number, contact: any) => {
            return total + contact.messages.filter((msg: any) => msg.status === 'pending').length;
          }, 0);
          setUnreadCount(totalUnread);
        }
      } catch (error) {
        console.error('Error fetching unread count:', error);
      }
    };

    fetchUnreadCount();
    // Refresh count every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    {
      href: '/admin',
      label: 'Dashboard',
      icon: Home,
    },
    {
      href: '/admin/blogs',
      label: 'Blog Posts',
      icon: FileText,
    },
    {
      href: '/admin/skills',
      label: 'Skills',
      icon: Code,
    },
    {
      href: '/admin/projects',
      label: 'Projects',
      icon: Briefcase,
    },
    {
      href: '/admin/contacts',
      label: 'Contacts',
      icon: MessageCircle,
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/admin" className="flex items-center space-x-2">
                <Logo animate={true} size="xl" />
                <span className="text-xl font-bold text-gray-900">Admin Dashboard</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 relative',
                      isActive
                        ? 'border-blue-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    )}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center">
            <Link
              href="/"
              className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              ← Back to Site
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNav;
