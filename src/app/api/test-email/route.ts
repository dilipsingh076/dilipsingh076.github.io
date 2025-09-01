import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { to, subject, message } = body;

    if (!to || !subject || !message) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields: to, subject, message' },
        { status: 400 }
      );
    }

    const result = await sendEmail({
      to,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Test Email from Portfolio
          </h2>
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            This is a test email to verify that your email service is working correctly.
          </p>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">Test Message</h3>
            <p style="line-height: 1.6; color: #333;">${message}</p>
          </div>
          <p style="font-size: 14px; color: #6c757d;">
            If you received this email, your contact form email service is working correctly!
          </p>
        </div>
      `,
    });

    return NextResponse.json({
      success: result,
      message: result ? 'Test email sent successfully' : 'Failed to send test email',
    });
  } catch (error) {
    console.error('Error sending test email:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send test email', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    message: 'Test email endpoint. Use POST with { to, subject, message } to test email functionality.',
    example: {
      to: 'your-email@example.com',
      subject: 'Test Email',
      message: 'This is a test message from your portfolio contact form.',
    },
  });
}
