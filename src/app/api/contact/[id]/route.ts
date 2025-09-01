import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Contact from '@/lib/models/Contact';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    await connectToDatabase();
    
    const contact = await Contact.findById(params.id).lean();
    
    if (!contact) {
      return NextResponse.json(
        { success: false, message: 'Contact not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      contact: {
        ...contact,
        id: (contact as any)._id.toString(),
      },
    });
  } catch (error) {
    console.error('Error fetching contact:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch contact' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    const { status } = body;

    if (!status || !['pending', 'read', 'replied'].includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Invalid status value' },
        { status: 400 }
      );
    }

    const contact = await Contact.findByIdAndUpdate(
      params.id,
      { status, updatedAt: new Date() },
      { new: true }
    ).lean();

    if (!contact) {
      return NextResponse.json(
        { success: false, message: 'Contact not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      contact: {
        ...contact,
        id: (contact as any)._id.toString(),
      },
    });
  } catch (error) {
    console.error('Error updating contact:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update contact' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    await connectToDatabase();
    
    const contact = await Contact.findByIdAndDelete(params.id);
    
    if (!contact) {
      return NextResponse.json(
        { success: false, message: 'Contact not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Contact deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting contact:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete contact' },
      { status: 500 }
    );
  }
}
