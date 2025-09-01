'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiBriefcase, FiBookOpen, FiAward } from 'react-icons/fi';
import { EXPERIENCES, EDUCATION, ACHIEVEMENTS } from '@/constants/data';

export function AboutSection(): JSX.Element {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="section-padding bg-gradient-to-br from-background via-secondary/5 to-background">
      <div className="container-max">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A passionate developer who transforms ideas into digital reality. 
            Every line of code tells a story of innovation and dedication.
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          <div className="bg-background rounded-xl p-6 border border-border text-center hover:border-primary/30 transition-colors">
            <div className="text-3xl font-bold text-primary mb-2">4+</div>
            <div className="text-sm text-muted-foreground">Years Experience</div>
          </div>
          <div className="bg-background rounded-xl p-6 border border-border text-center hover:border-primary/30 transition-colors">
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <div className="text-sm text-muted-foreground">Projects Delivered</div>
          </div>
          <div className="bg-background rounded-xl p-6 border border-border text-center hover:border-primary/30 transition-colors">
            <div className="text-3xl font-bold text-primary mb-2">{ACHIEVEMENTS.length}</div>
            <div className="text-sm text-muted-foreground">Awards Won</div>
          </div>
          <div className="bg-background rounded-xl p-6 border border-border text-center hover:border-primary/30 transition-colors">
            <div className="text-3xl font-bold text-primary mb-2">100%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </div>
        </motion.div>

        {/* Main Content - Experience and Education */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Experience Section - Takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="bg-background rounded-2xl border border-border p-8">
              <h3 className="text-2xl font-bold mb-8">Professional Experience</h3>

              <div className="space-y-8">
                {EXPERIENCES.map((experience, index) => (
                  <motion.div
                    key={experience.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                    className="relative pl-6 border-l-2 border-primary/20 hover:border-primary/40 transition-colors"
                  >
                    <div className="absolute -left-1.5 top-0 w-3 h-3 bg-primary rounded-full" />
                    <div className="bg-secondary/30 rounded-xl p-6 hover:bg-secondary/50 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                        <div>
                          <h4 className="text-xl font-semibold text-foreground mb-1">
                            {experience.title}
                          </h4>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-primary font-medium">{experience.company}</span>
                            <span className="text-muted-foreground">{experience.duration}</span>
                          </div>
                        </div>
                        <div className="mt-2 sm:mt-0">
                          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                            {experience.technologies.length} Tech
                          </span>
                        </div>
                      </div>
                      
                      <ul className="space-y-2 mb-4">
                        {experience.description.map((item, itemIndex) => (
                          <li key={itemIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-background text-sm rounded-full border border-border"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Education - Takes 1 column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="bg-background rounded-2xl border border-border p-6">
              <h3 className="text-xl font-bold mb-6">Education</h3>

              <div className="space-y-4">
                {EDUCATION.map((edu, index) => (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                    className="p-4 bg-secondary/30 rounded-lg"
                  >
                    <h4 className="font-semibold text-foreground text-sm mb-1">{edu.degree}</h4>
                    <p className="text-primary font-medium text-sm mb-1">{edu.institution}</p>
                    <p className="text-xs text-muted-foreground mb-1">{edu.duration}</p>
                    <p className="text-xs text-muted-foreground">{edu.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Achievements Section - Separate Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <div className="bg-background rounded-2xl border border-border p-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">Achievements & Recognition</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Milestones and accomplishments that highlight my dedication to excellence in software development
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ACHIEVEMENTS.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                  className="p-6 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-colors"
                >
                  <h4 className="font-bold text-foreground text-lg mb-2">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {achievement.description}
                  </p>
                  <span className="text-xs text-primary font-medium">
                    {achievement.date}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
