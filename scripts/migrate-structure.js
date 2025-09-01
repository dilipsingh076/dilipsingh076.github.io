#!/usr/bin/env node

/**
 * Migration Script for Optimized Folder Structure
 * 
 * This script helps migrate existing pages to use the new optimized structure
 * with custom hooks, shared components, and feature-based organization.
 */

const fs = require('fs');
const path = require('path');

const MIGRATION_TEMPLATES = {
  page: `'use client';

import { motion } from 'framer-motion';
import { use[Feature] } from '@/hooks/use[Feature]';
import { [Feature]Card, [Feature]Filters } from '@/features/[feature]';
import { Button, Card } from '@/shared/components';

export default function [Feature]Page(): JSX.Element {
  const {
    data,
    loading,
    error,
    handleAction
  } = use[Feature]();

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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            [Feature] <span className="gradient-text">Page</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            [Description of the page]
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="container-max px-4 pb-16"
        >
          {/* Add your content here */}
        </motion.div>
      </div>
    </main>
  );
}`,

  hook: `import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetch[Feature] } from '@/store/slices/[feature]Slice';

export const use[Feature] = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.[feature]);

  useEffect(() => {
    dispatch(fetch[Feature]());
  }, [dispatch]);

  const handleAction = () => {
    // Add your action logic here
  };

  return {
    data,
    loading,
    error,
    handleAction,
    refetch: () => dispatch(fetch[Feature]())
  };
};`,

  component: `import { motion } from 'framer-motion';

interface [Feature]CardProps {
  item: {
    id: string;
    title: string;
    description: string;
    // Add more properties as needed
  };
  index?: number;
}

export const [Feature]Card = ({ item, index = 0 }: [Feature]CardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-card rounded-xl border border-border overflow-hidden card-hover"
    >
      <div className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-3">
          {item.title}
        </h3>
        
        <p className="text-muted-foreground mb-4">
          {item.description}
        </p>
        
        {/* Add more content as needed */}
      </div>
    </motion.div>
  );
};`,

  service: `import { apiService } from './api';

export interface [Feature]Item {
  id: string;
  title: string;
  description: string;
  // Add more properties as needed
}

class [Feature]Service {
  async get[Feature](): Promise<[Feature]Item[]> {
    const response = await apiService.get<[Feature]Item[]>('/api/[feature]');
    return response.data;
  }

  async get[Feature]ById(id: string): Promise<[Feature]Item> {
    const response = await apiService.get<[Feature]Item>(\`/api/[feature]/\${id}\`);
    return response.data;
  }

  async create[Feature](item: Omit<[Feature]Item, 'id'>): Promise<[Feature]Item> {
    const response = await apiService.post<[Feature]Item>('/api/[feature]', item);
    return response.data;
  }

  async update[Feature](id: string, item: Partial<[Feature]Item>): Promise<[Feature]Item> {
    const response = await apiService.put<[Feature]Item>(\`/api/[feature]/\${id}\`, item);
    return response.data;
  }

  async delete[Feature](id: string): Promise<void> {
    await apiService.delete(\`/api/[feature]/\${id}\`);
  }
}

export const [feature]Service = new [Feature]Service();`
};

function createDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ Created directory: ${dirPath}`);
  }
}

function createFile(filePath, content) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Created file: ${filePath}`);
  } else {
    console.log(`⚠️  File already exists: ${filePath}`);
  }
}

function generateTemplate(template, feature, featureLower) {
  return template
    .replace(/\[Feature\]/g, feature)
    .replace(/\[feature\]/g, featureLower);
}

function migrateFeature(feature) {
  const featureLower = feature.toLowerCase();
  
  console.log(`\n🚀 Migrating ${feature} feature...\n`);

  // Create feature directory
  const featureDir = path.join(__dirname, '..', 'src', 'features', featureLower);
  createDirectory(featureDir);
  
  // Create components directory
  const componentsDir = path.join(featureDir, 'components');
  createDirectory(componentsDir);
  
  // Create component file
  const componentFile = path.join(componentsDir, `${feature}Card.tsx`);
  createFile(componentFile, generateTemplate(MIGRATION_TEMPLATES.component, feature, featureLower));
  
  // Create index file
  const indexFile = path.join(featureDir, 'index.ts');
  createFile(indexFile, `export { ${feature}Card } from './components/${feature}Card';\n`);
  
  // Create hook file
  const hookFile = path.join(__dirname, '..', 'src', 'hooks', `use${feature}.ts`);
  createFile(hookFile, generateTemplate(MIGRATION_TEMPLATES.hook, feature, featureLower));
  
  // Create service file
  const serviceFile = path.join(__dirname, '..', 'src', 'services', `${featureLower}Service.ts`);
  createFile(serviceFile, generateTemplate(MIGRATION_TEMPLATES.service, feature, featureLower));
  
  // Create page template
  const pageFile = path.join(__dirname, '..', 'src', 'app', featureLower, 'page.tsx');
  createDirectory(path.dirname(pageFile));
  createFile(pageFile, generateTemplate(MIGRATION_TEMPLATES.page, feature, featureLower));
  
  console.log(`\n✅ ${feature} feature migration completed!\n`);
}

function updateHooksIndex() {
  const hooksIndexPath = path.join(__dirname, '..', 'src', 'hooks', 'index.ts');
  const hooksDir = path.join(__dirname, '..', 'src', 'hooks');
  
  if (fs.existsSync(hooksDir)) {
    const files = fs.readdirSync(hooksDir)
      .filter(file => file.endsWith('.ts') && file !== 'index.ts')
      .map(file => file.replace('.ts', ''));
    
    const exports = files.map(file => `export { ${file} } from './${file}';`).join('\n');
    const content = `${exports}\n`;
    
    fs.writeFileSync(hooksIndexPath, content);
    console.log(`✅ Updated hooks index file`);
  }
}

function updateServicesIndex() {
  const servicesIndexPath = path.join(__dirname, '..', 'src', 'services', 'index.ts');
  const servicesDir = path.join(__dirname, '..', 'src', 'services');
  
  if (fs.existsSync(servicesDir)) {
    const files = fs.readdirSync(servicesDir)
      .filter(file => file.endsWith('.ts') && file !== 'index.ts')
      .map(file => file.replace('.ts', ''));
    
    const exports = files.map(file => {
      const serviceName = file.replace('Service', '');
      return `export { ${serviceName}Service } from './${file}';\nexport type { ${serviceName}Item } from './${file}';`;
    }).join('\n');
    
    const content = `export { apiService } from './api';\n${exports}\n`;
    
    fs.writeFileSync(servicesIndexPath, content);
    console.log(`✅ Updated services index file`);
  }
}

// Main execution
function main() {
  console.log('🏗️  Starting folder structure migration...\n');
  
  // Migrate common features
  const features = ['Projects', 'Skills', 'Contact'];
  features.forEach(migrateFeature);
  
  // Update index files
  updateHooksIndex();
  updateServicesIndex();
  
  console.log('\n🎉 Migration completed successfully!');
  console.log('\n📋 Next steps:');
  console.log('1. Review the generated files and customize them');
  console.log('2. Update the Redux store slices if needed');
  console.log('3. Test the new components and hooks');
  console.log('4. Update imports in existing components');
  console.log('5. Remove old monolithic components');
}

if (require.main === module) {
  main();
}

module.exports = { migrateFeature, updateHooksIndex, updateServicesIndex };


