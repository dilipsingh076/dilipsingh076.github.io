'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowLeft, FiCode, FiDatabase, FiCloud, FiSmartphone, FiMonitor, FiTrendingUp } from 'react-icons/fi';
import { SKILLS } from '@/constants/data';
import { Logo } from '@/components/ui/logo';

const skillCategories = [
  {
    title: 'Frontend Development',
    icon: FiMonitor,
    skills: [
      { name: 'React.js', proficiency: 95 },
      { name: 'Next.js', proficiency: 90 },
      { name: 'TypeScript', proficiency: 88 },
      { name: 'JavaScript (ES6+)', proficiency: 92 },
      { name: 'HTML5 & CSS3', proficiency: 95 },
      { name: 'Tailwind CSS', proficiency: 90 },
      { name: 'Redux/Zustand', proficiency: 85 },
      { name: 'GraphQL', proficiency: 80 },
    ]
  },
  {
    title: 'Backend Development',
    icon: FiCode,
    skills: [
      { name: 'Node.js', proficiency: 88 },
      { name: 'Express.js', proficiency: 85 },
      { name: 'Python', proficiency: 80 },
      { name: 'Django', proficiency: 75 },
      { name: 'RESTful APIs', proficiency: 90 },
      { name: 'Microservices', proficiency: 82 },
      { name: 'Authentication', proficiency: 85 },
      { name: 'JWT', proficiency: 88 },
    ]
  },
  {
    title: 'Database & Cloud',
    icon: FiDatabase,
    skills: [
      { name: 'MongoDB', proficiency: 85 },
      { name: 'PostgreSQL', proficiency: 80 },
      { name: 'Redis', proficiency: 75 },
      { name: 'AWS', proficiency: 78 },
      { name: 'Docker', proficiency: 80 },
      { name: 'CI/CD', proficiency: 75 },
      { name: 'Kubernetes', proficiency: 70 },
      { name: 'Serverless', proficiency: 72 },
    ]
  },
  {
    title: 'Mobile Development',
    icon: FiSmartphone,
    skills: [
      { name: 'React Native', proficiency: 80 },
      { name: 'Expo', proficiency: 75 },
      { name: 'Mobile UI/UX', proficiency: 78 },
      { name: 'App Store Deployment', proficiency: 70 },
      { name: 'Push Notifications', proficiency: 75 },
      { name: 'Offline Storage', proficiency: 72 },
    ]
  },
  {
    title: 'Tools & Technologies',
    icon: FiCloud,
    skills: [
      { name: 'Git & GitHub', proficiency: 90 },
      { name: 'VS Code', proficiency: 95 },
      { name: 'Figma', proficiency: 75 },
      { name: 'Postman', proficiency: 85 },
      { name: 'Jest & Testing', proficiency: 80 },
      { name: 'Webpack/Vite', proficiency: 78 },
      { name: 'NPM/Yarn', proficiency: 90 },
      { name: 'Linux/Unix', proficiency: 80 },
    ]
  }
];

export default function SkillsPage(): JSX.Element {
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
            Technical <span className="gradient-text">Skills</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            A comprehensive overview of my technical expertise and proficiency levels 
            across various technologies and frameworks. I&apos;m constantly learning and expanding my skill set.
          </p>
          
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
            >
              <FiArrowLeft className="w-4 h-4" />
              Back to Home
            </motion.button>
          </Link>
        </motion.div>

        {/* Skills Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="container-max px-4 mb-16"
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {SKILLS.slice(0, 12).map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="text-center p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-primary font-bold text-lg">
                      {skill.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-foreground mb-1">
                    {skill.name}
                  </h3>
                  <div className="w-full bg-secondary rounded-full h-1">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.proficiency}%` }}
                      transition={{ delay: index * 0.05, duration: 1, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="bg-primary h-1 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Detailed Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="container-max px-4 py-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            Skills <span className="gradient-text">Breakdown</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl border border-border p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <category.icon className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">
                    {category.title}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: skillIndex * 0.05, duration: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-foreground/90 font-medium">
                          {skill.name}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {skill.proficiency}%
                        </span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          transition={{ delay: skillIndex * 0.05, duration: 1, ease: "easeOut" }}
                          viewport={{ once: true }}
                          className="bg-primary h-2 rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Experience Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="container-max px-4 pb-16"
        >
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-card rounded-xl border border-border"
              >
                <div className="text-3xl font-bold text-primary mb-2">4+</div>
                <div className="text-foreground/90 font-medium">Years Experience</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-card rounded-xl border border-border"
              >
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-foreground/90 font-medium">Projects Completed</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-card rounded-xl border border-border"
              >
                <div className="text-3xl font-bold text-primary mb-2">20+</div>
                <div className="text-foreground/90 font-medium">Technologies Mastered</div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Learning Journey */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="container-max px-4 pb-16"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              My <span className="gradient-text">Learning Journey</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="p-6 bg-card rounded-xl border border-border"
              >
                <div className="flex items-center gap-3 mb-4">
                  <FiTrendingUp className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">Continuous Learning</h3>
                </div>
                <p className="text-muted-foreground">
                  I believe in staying updated with the latest technologies and best practices. 
                  I regularly participate in online courses, attend conferences, and contribute to open-source projects.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-card rounded-xl border border-border"
              >
                <div className="flex items-center gap-3 mb-4">
                  <FiCode className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">Problem Solving</h3>
                </div>
                <p className="text-muted-foreground">
                  I enjoy tackling complex technical challenges and finding elegant solutions. 
                  My experience spans from simple web applications to complex enterprise systems.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="container-max px-4 pb-16 text-center"
        >
          <div className="max-w-2xl mx-auto p-8 bg-card rounded-xl border border-border">
            <h2 className="text-2xl font-bold mb-4">
              Ready to collaborate?
            </h2>
            <p className="text-muted-foreground mb-6">
              I&apos;m always learning and expanding my skill set. Let&apos;s discuss how I can contribute to your next project.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Let&apos;s Talk
                <FiArrowLeft className="w-4 h-4 rotate-180" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
