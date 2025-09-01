import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Contact from '@/lib/models/Contact';

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
      query.status = status;
    }

    // Get all contacts first
    const allContacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .lean();

    // Group contacts by email
    const emailGroups: { [key: string]: any[] } = {};
    allContacts.forEach((contact: any) => {
      const email = contact.email;
      if (!emailGroups[email]) {
        emailGroups[email] = [];
      }
      emailGroups[email].push({
        ...contact,
        id: contact._id.toString(),
      });
    });

    // Convert to array and sort by latest message date
    const batchedContacts = Object.entries(emailGroups).map(([email, contacts]) => {
      const latestContact = contacts[0]; // Already sorted by createdAt desc
      const totalMessages = contacts.length;
      const unreadCount = contacts.filter((c: any) => c.status === 'pending').length;
      const repliedCount = contacts.filter((c: any) => c.status === 'replied').length;
      
      // Determine overall status
      let overallStatus = 'pending';
      if (repliedCount === totalMessages) {
        overallStatus = 'replied';
      } else if (unreadCount === 0 && repliedCount < totalMessages) {
        overallStatus = 'read';
      }

      return {
        email,
        name: latestContact.name,
        phone: latestContact.phone,
        company: latestContact.company,
        totalMessages,
        unreadCount,
        repliedCount,
        overallStatus,
        latestMessage: {
          subject: latestContact.subject,
          message: latestContact.message,
          createdAt: latestContact.createdAt,
          status: latestContact.status,
        },
        lastReplySent: latestContact.sent_on,
        firstContact: contacts[contacts.length - 1].createdAt,
        contacts: contacts,
      };
    });

    // Sort by latest message date
    batchedContacts.sort((a, b) => 
      new Date(b.latestMessage.createdAt).getTime() - new Date(a.latestMessage.createdAt).getTime()
    );

    // Apply pagination
    const total = batchedContacts.length;
    const paginatedContacts = batchedContacts.slice(skip, skip + limit);

    return NextResponse.json({
      success: true,
      contacts: paginatedContacts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching batched contacts:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch batched contacts' },
      { status: 500 }
    );
  }
}
