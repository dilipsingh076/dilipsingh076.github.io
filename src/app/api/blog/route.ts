import { NextRequest, NextResponse } from 'next/server';
import { BlogPost } from '@/store/slices/blogSlice';
import { connectToDatabase } from '@/lib/mongodb';
import Blog from '@/lib/models/Blog';
import { generateId, generateSlug } from '@/lib/data';

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '9');
    const skip = (page - 1) * limit;

    // Build query
    const query: any = { published: true };

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    // Get posts with pagination
    const posts = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count
    const total = await Blog.countDocuments(query);

    // Get unique categories
    const categories = await Blog.distinct('category', { published: true });

    return NextResponse.json({
      success: true,
      posts: posts.map((post: any) => ({
        ...post,
        id: post._id.toString(),
      })),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      categories,
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    const { title, excerpt, content, category, author, tags, featured = false } = body;

    // Validation
    if (!title || !excerpt || !content || !category || !author) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create new post
    const newPost = {
      title,
      excerpt,
      content,
      date: new Date().toISOString().split('T')[0],
      readTime: `${Math.ceil(content.split(' ').length / 200)} min read`,
      category,
      author,
      slug: generateSlug(title),
      featured,
      tags: tags || [],
      published: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Save to database
    const savedPost = await Blog.create(newPost);

    return NextResponse.json({
      success: true,
      message: 'Blog post created successfully',
      post: {
        ...savedPost.toObject(),
        id: savedPost._id.toString(),
      },
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}
