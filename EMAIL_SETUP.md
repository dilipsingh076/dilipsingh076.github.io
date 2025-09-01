# Email Setup Guide

This guide will help you set up email notifications for your contact form using Gmail or alternative email services.

## Option 1: Gmail Setup (Recommended)

### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account settings: https://myaccount.google.com/
2. Navigate to "Security"
3. Enable "2-Step Verification" if not already enabled

### Step 2: Generate App Password
1. In your Google Account settings, go to "Security"
2. Find "2-Step Verification" and click on it
3. Scroll down to "App passwords"
4. Click "Generate" for a new app password
5. Select "Mail" as the app and "Other" as the device
6. Enter a name like "Portfolio Contact Form"
7. Click "Generate"
8. **Copy the 16-character password** (you'll only see it once!)

### Step 3: Update Environment Variables
Replace the placeholder in your `.env.local` file:

```env
EMAIL_USER=dilipsinghf@gmail.com
EMAIL_PASS=your_16_character_app_password_here
ADMIN_EMAIL=dilipsinghf@gmail.com
```

### Step 4: Test the Setup
1. Restart your development server
2. Submit a contact form
3. Check your email for notifications

## Option 2: Alternative Email Services

### Using Outlook/Hotmail
Update the email service in `src/lib/email.ts`:

```typescript
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'outlook',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};
```

### Using Yahoo Mail
```typescript
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'yahoo',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};
```

### Using Custom SMTP Server
```typescript
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: 'your-smtp-server.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};
```

## Option 3: Professional Email Services

### Using SendGrid
1. Sign up for a free SendGrid account
2. Create an API key
3. Update the email service:

```typescript
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: 'smtp.sendgrid.net',
    port: 587,
    secure: false,
    auth: {
      user: 'apikey',
      pass: process.env.SENDGRID_API_KEY,
    },
  });
};
```

### Using Resend
1. Sign up for Resend (resend.com)
2. Get your API key
3. Update the email service:

```typescript
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: 'smtp.resend.com',
    port: 587,
    secure: false,
    auth: {
      user: 'resend',
      pass: process.env.RESEND_API_KEY,
    },
  });
};
```

## Environment Variables Reference

```env
# Required for Gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Optional - defaults to EMAIL_USER if not set
ADMIN_EMAIL=admin@example.com

# Site URL for email templates
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Troubleshooting

### Common Issues:

1. **"Invalid login" error**
   - Make sure you're using an app password, not your regular Gmail password
   - Ensure 2-factor authentication is enabled

2. **"Less secure app access" error**
   - Gmail no longer supports less secure apps
   - Use app passwords instead

3. **"Connection timeout" error**
   - Check your internet connection
   - Verify the email service settings

4. **Emails not sending**
   - Check the server console for error messages
   - Verify environment variables are loaded correctly
   - Test with a simple email first

### Testing Email Setup

Create a test API endpoint to verify email functionality:

```typescript
// Add this to your API routes for testing
export async function GET() {
  try {
    const result = await sendEmail({
      to: 'test@example.com',
      subject: 'Test Email',
      html: '<h1>Test Email</h1><p>This is a test email.</p>'
    });
    
    return NextResponse.json({ 
      success: result, 
      message: result ? 'Email sent successfully' : 'Email failed to send' 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
```

## Security Notes

1. **Never commit your `.env.local` file** to version control
2. **Use app passwords** instead of your main account password
3. **Rotate app passwords** regularly
4. **Monitor email sending** to prevent abuse
5. **Consider rate limiting** for contact form submissions

## Production Deployment

For production deployment:

1. Set up environment variables in your hosting platform
2. Use a professional email service like SendGrid or Resend
3. Implement rate limiting
4. Add email validation and spam protection
5. Monitor email delivery rates

## Support

If you encounter issues:

1. Check the server console for error messages
2. Verify your email service settings
3. Test with a simple email first
4. Check your email provider's documentation
5. Consider using a professional email service for better reliability
