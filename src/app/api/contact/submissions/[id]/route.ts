import { NextRequest, NextResponse } from 'next/server';
import { contactSubmissions } from '@/lib/data';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const { id } = params;
    
    const submission = contactSubmissions.find(sub => sub.id === id);

    if (!submission) {
      return NextResponse.json(
        { success: false, message: 'Contact submission not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      submission,
    });
  } catch (error) {
    console.error('Error fetching contact submission:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch contact submission' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const { id } = params;
    const body = await request.json();
    const { status } = body;
    
    const submissionIndex = contactSubmissions.findIndex(sub => sub.id === id);

    if (submissionIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Contact submission not found' },
        { status: 404 }
      );
    }

    // Update the submission
    const updatedSubmission = {
      ...contactSubmissions[submissionIndex],
      status: status || contactSubmissions[submissionIndex].status,
      updatedAt: new Date().toISOString(),
    };

    contactSubmissions[submissionIndex] = updatedSubmission;

    return NextResponse.json({
      success: true,
      message: 'Contact submission updated successfully',
      submission: updatedSubmission,
    });
  } catch (error) {
    console.error('Error updating contact submission:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update contact submission' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const { id } = params;
    
    const submissionIndex = contactSubmissions.findIndex(sub => sub.id === id);

    if (submissionIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Contact submission not found' },
        { status: 404 }
      );
    }

    // Remove the submission
    const deletedSubmission = contactSubmissions.splice(submissionIndex, 1)[0];

    return NextResponse.json({
      success: true,
      message: 'Contact submission deleted successfully',
      submission: deletedSubmission,
    });
  } catch (error) {
    console.error('Error deleting contact submission:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete contact submission' },
      { status: 500 }
    );
  }
}
