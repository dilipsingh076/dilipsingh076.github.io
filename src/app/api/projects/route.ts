import { NextResponse } from 'next/server';
import { PROJECTS_DATA } from '@/components/projects/constants';

// Example API route for projects
// This would typically fetch from a database or external API
export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // In a real application, you would fetch from a database or external API
    // const projects = await fetchProjectsFromDatabase();
    
    // For now, return the static data
    return NextResponse.json(PROJECTS_DATA);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}