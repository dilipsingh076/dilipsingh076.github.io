import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Blog from '@/lib/models/Blog';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
): Promise<NextResponse> {
  try {
    await connectToDatabase();
    
    const { slug } = params;

    if (!slug) {
      return NextResponse.json(
        { success: false, message: 'Slug is required' },
        { status: 400 }
      );
    }

    // Find the blog post by slug
    const post = await Blog.findOne({ slug, published: true }).lean();

    if (!post) {
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      post: {
        ...post,
        id: (post as any)._id.toString(),
      },
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
): Promise<NextResponse> {
  try {
    await connectToDatabase();
    
    const { slug } = params;
    const body = await request.json();

    if (!slug) {
      return NextResponse.json(
        { success: false, message: 'Slug is required' },
        { status: 400 }
      );
    }

    // Find and update the blog post
    const updatedPost = await Blog.findOneAndUpdate(
      { slug },
      {
        ...body,
        updatedAt: new Date().toISOString(),
      },
      { new: true }
    ).lean();

    if (!updatedPost) {
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Blog post updated successfully',
      post: {
        ...updatedPost,
        id: (updatedPost as any)._id.toString(),
      },
    });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
): Promise<NextResponse> {
  try {
    await connectToDatabase();
    
    const { slug } = params;

    if (!slug) {
      return NextResponse.json(
        { success: false, message: 'Slug is required' },
        { status: 400 }
      );
    }

    // Find and delete the blog post
    const deletedPost = await Blog.findOneAndDelete({ slug }).lean();

    if (!deletedPost) {
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully',
      postId: (deletedPost as any)._id.toString(),
    });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
