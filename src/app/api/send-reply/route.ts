import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { connectToDatabase } from '@/lib/mongodb';
import Contact from '@/lib/models/Contact';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { contactId, to, subject, message } = body;

    // Validation
    if (!contactId || !to || !subject || !message) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Get the original contact
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return NextResponse.json(
        { success: false, message: 'Contact not found' },
        { status: 404 }
      );
    }

    // Get the latest message for context
    const latestMessage = contact.messages[contact.messages.length - 1];

        // Try to send the reply email (but don't fail if email fails)
    let emailSent = false;
    try {
      emailSent = await sendEmail({
        to,
        subject,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #333; margin-top: 0;">Reply from Dilip Singh</h2>
              <p style="color: #666; margin-bottom: 0;">
                This is a reply to your message: <strong>${latestMessage.subject}</strong>
              </p>
            </div>

            <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px; margin-bottom: 20px;">
              <div style="white-space: pre-wrap; line-height: 1.6; color: #333;">
                ${message}
              </div>
            </div>

            <div style="background-color: #e9ecef; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #007bff; margin-top: 0; font-size: 16px;">Original Message</h3>
                          <p style="color: #666; margin-bottom: 10px;">
              <strong>From:</strong> ${contact.name} (${contact.email})
            </p>
              <p style="color: #666; margin-bottom: 10px;">
                <strong>Subject:</strong> ${latestMessage.subject}
              </p>
              <div style="background-color: #fff; padding: 15px; border-radius: 5px; border-left: 4px solid #007bff;">
                <p style="color: #333; margin: 0; white-space: pre-wrap; line-height: 1.5;">
                  ${latestMessage.message}
                </p>
              </div>
            </div>

            <div style="text-align: center; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
              <p style="margin: 0; color: #6c757d; font-size: 14px;">
                <strong>Dilip Singh</strong><br>
                Senior Full Stack Developer<br>
                <a href="mailto:dilipsinghf@gmail.com" style="color: #007bff;">dilipsinghf@gmail.com</a>
              </p>
            </div>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Continue anyway - we'll still add the reply to the conversation
    }

    // Add admin reply to contact manually
    const adminReply = {
      subject,
      message,
      status: 'replied',
      sent_on: new Date(),
      isAdminReply: true,
      adminReplyTo: latestMessage._id.toString(),
      createdAt: new Date(),
    };
    
    contact.messages.push(adminReply);
    
    // Update timestamps
    contact.lastMessageAt = new Date();
    
    // Save the contact
    await contact.save();

    return NextResponse.json({
      success: true,
      message: 'Reply sent successfully',
    });
  } catch (error) {
    console.error('Error sending reply:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send reply' },
      { status: 500 }
    );
  }
}
