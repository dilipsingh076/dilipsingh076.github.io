// Contact Page Data for Contact Route
import { FiMail, FiPhone, FiMapPin, FiMessageCircle, FiGithub, FiLinkedin, FiGlobe, FiClock } from 'react-icons/fi';

// Contact Methods Data
export const CONTACT_METHODS = [
  {
    icon: FiMail,
    title: 'Email',
    value: 'PERSONAL_INFO.email', // Will be dynamically replaced
    href: 'mailto:PERSONAL_INFO.email', // Will be dynamically replaced
    description: 'Send me an email anytime'
  },
  {
    icon: FiPhone,
    title: 'Phone',
    value: 'PERSONAL_INFO.phone', // Will be dynamically replaced
    href: 'tel:PERSONAL_INFO.phone', // Will be dynamically replaced
    description: 'Call me during business hours'
  },
  {
    icon: FiMapPin,
    title: 'Location',
    value: 'PERSONAL_INFO.location', // Will be dynamically replaced
    href: '#',
    description: 'Available for remote work'
  },
  {
    icon: FiMessageCircle,
    title: 'LinkedIn',
    value: 'dilip-singh-fauzdar',
    href: 'PERSONAL_INFO.linkedin', // Will be dynamically replaced
    description: 'Connect with me professionally'
  }
];

// Social Links Data
export const SOCIAL_LINKS = [
  {
    icon: FiGithub,
    name: 'GitHub',
    href: 'https://github.com/dilipsingh076',
    description: 'Check out my code'
  },
  {
    icon: FiLinkedin,
    name: 'LinkedIn',
    href: 'PERSONAL_INFO.linkedin', // Will be dynamically replaced
    description: 'Professional network'
  },
  {
    icon: FiGlobe,
    name: 'Portfolio',
    href: 'PERSONAL_INFO.github', // Will be dynamically replaced
    description: 'View my work'
  }
];

// FAQ Data
export const FAQ_DATA = [
  {
    question: 'What types of projects do you work on?',
    answer: 'I specialize in full-stack web applications, mobile apps, and scalable backend systems. I\'m particularly experienced with React, Next.js, Node.js, and modern cloud technologies.'
  },
  {
    question: 'Do you work remotely?',
    answer: 'Yes! I\'m fully set up for remote work and have experience collaborating with teams across different time zones. I\'m also available for on-site work when needed.'
  },
  {
    question: 'What\'s your typical response time?',
    answer: 'I typically respond to emails within 24 hours, often much sooner. For urgent matters, feel free to reach out through multiple channels.'
  },
  {
    question: 'Are you available for freelance work?',
    answer: 'Yes, I\'m available for freelance and contract work. I can work on both short-term projects and long-term collaborations.'
  },
  {
    question: 'What technologies do you specialize in?',
    answer: 'I specialize in React, Next.js, TypeScript, Node.js, and modern web technologies. I also have experience with mobile development using React Native.'
  },
  {
    question: 'How do you handle project communication?',
    answer: 'I believe in transparent communication and regular updates. I use tools like Slack, Zoom, and project management platforms to keep everyone informed.'
  }
];

// Page Content Data
export const CONTACT_PAGE_CONTENT = {
  header: {
    title: 'Get In Touch',
    subtitle: 'I\'m always interested in new opportunities and collaborations. Whether you have a question or just want to say hi, I\'ll try my best to get back to you!',
  },
  
  sections: {
    socialLinks: {
      title: 'Follow Me Online',
      subtitle: 'Connect with me on social media for updates, insights, and more.',
    },
    faq: {
      title: 'Frequently Asked Questions',
    },
    availability: {
      title: 'Currently Available',
      description: 'I\'m currently accepting new projects and opportunities. Feel free to reach out for collaborations, consultations, or just to say hello!',
      options: [
        'Full-time opportunities',
        'Freelance projects',
        'Technical consultations',
        'Open source contributions',
      ],
    },
  },
};
