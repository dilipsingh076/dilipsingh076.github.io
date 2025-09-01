import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Blog from '@/lib/models/Blog';

export async function GET(): Promise<NextResponse> {
  try {
    await connectToDatabase();
    
    // Get featured posts from database
    const featuredPosts = await Blog.find({ featured: true, published: true })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      posts: featuredPosts.map((post: any) => ({
        ...post,
        id: post._id.toString(),
      })),
      total: featuredPosts.length,
    });
  } catch (error) {
    console.error('Error fetching featured blog posts:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch featured blog posts' },
      { status: 500 }
    );
  }
}
