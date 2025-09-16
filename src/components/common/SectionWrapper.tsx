'use client';

import { ReactNode } from 'react';

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function SectionWrapper({ id, children, className = '' }: SectionWrapperProps): JSX.Element {
  return (
    <section id={id} className={`min-h-screen flex items-center justify-center py-20 ${className}`}>
      <div className="w-full">
        {children}
      </div>
    </section>
  );
}
