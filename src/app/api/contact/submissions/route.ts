import { NextRequest, NextResponse } from 'next/server';
import { contactSubmissions } from '@/lib/data';

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    // Filter submissions based on status
    let filteredSubmissions = contactSubmissions;

    if (status && status !== 'all') {
      filteredSubmissions = contactSubmissions.filter(sub => sub.status === status);
    }

    // Paginate results
    const paginatedSubmissions = filteredSubmissions.slice(offset, offset + limit);
    const total = filteredSubmissions.length;

    return NextResponse.json({
      success: true,
      submissions: paginatedSubmissions,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch contact submissions' },
      { status: 500 }
    );
  }
}
