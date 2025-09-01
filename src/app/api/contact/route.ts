import { NextRequest, NextResponse } from 'next/server';
import { ContactForm } from '@/store/slices/contactSlice';
import { isValidEmail } from '@/lib/data';
import { sendContactNotification, sendAutoReply } from '@/lib/email';
import { connectToDatabase } from '@/lib/mongodb';
import Contact from '@/lib/models/Contact';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { name, email, subject, message, phone, company }: ContactForm = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (name.length < 2) {
      return NextResponse.json(
        { success: false, message: 'Name must be at least 2 characters long' },
        { status: 400 }
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        { success: false, message: 'Message must be at least 10 characters long' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Check if contact exists for this email
    let contact = await Contact.findOne({ email });
    
    if (contact) {
      // Add message to existing contact
      await contact.addMessage(subject, message, phone, company);
    } else {
      // Create new contact
      contact = new Contact({
        email,
        name,
        phone: phone || '',
        company: company || '',
        messages: [{
          subject,
          message,
          status: 'pending',
          createdAt: new Date(),
        }],
        lastMessageAt: new Date(),
        firstContactAt: new Date(),
      });
      await contact.save();
    }

    // Send email notification to admin
    try {
      await sendContactNotification({
        name,
        email,
        subject,
        message,
        phone,
        company,
      });
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
    }

    // Send auto-reply to the user
    try {
      await sendAutoReply({
        name,
        email,
        subject,
        message,
        phone,
        company,
      });
    } catch (emailError) {
      console.error('Failed to send auto-reply:', emailError);
    }

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully! I will get back to you soon.',
      submission: {
        id: contact._id.toString(),
        email: contact.email,
        name: contact.name,
        message: contact.messages[contact.messages.length - 1],
      },
    }, { status: 201 });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}

// Admin endpoint to get all submissions (in production, add authentication)
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Build query
    const query: any = {};
    if (status && status !== 'all') {
      query.overallStatus = status;
    }

    // Get contacts with pagination
    const contacts = await Contact.find(query)
      .sort({ lastMessageAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count
    const total = await Contact.countDocuments(query);

    return NextResponse.json({
      success: true,
      contacts: contacts.map((contact: any) => ({
        id: contact._id.toString(),
        email: contact.email,
        name: contact.name,
        phone: contact.phone,
        company: contact.company,
        overallStatus: contact.overallStatus,
        lastMessageAt: contact.lastMessageAt,
        firstContactAt: contact.firstContactAt,
        messages: contact.messages,
        createdAt: contact.createdAt,
        updatedAt: contact.updatedAt,
      })),
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
