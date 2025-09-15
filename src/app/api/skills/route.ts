import { NextResponse } from 'next/server';
import { SKILL_CATEGORIES, SKILLS_OVERVIEW } from '@/components/skills/constants';

export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return skills data in the exact format expected
    return NextResponse.json({
      categories: SKILL_CATEGORIES,
      overview: SKILLS_OVERVIEW,
    });
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json(
      { error: 'Failed to fetch skills' },
      { status: 500 }
    );
  }
}