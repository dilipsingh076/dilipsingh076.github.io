const nodemailer = require('nodemailer');

interface EmailData {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  company?: string;
}

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Use app password for Gmail
    },
  });
};

// Send email function
export const sendEmail = async (emailData: EmailData): Promise<boolean> => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: emailData.to,
      subject: emailData.subject,
      html: emailData.html,
      text: emailData.text || emailData.html.replace(/<[^>]*>/g, ''),
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

// Send contact form notification to admin
export const sendContactNotification = async (contactData: ContactFormData): Promise<boolean> => {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
  
  if (!adminEmail) {
    console.error('Admin email not configured');
    return false;
  }

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
        New Contact Form Submission
      </h2>
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #007bff; margin-top: 0;">Contact Details</h3>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555;">Name:</td>
            <td style="padding: 8px 0;">${contactData.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
            <td style="padding: 8px 0;">
              <a href="mailto:${contactData.email}" style="color: #007bff;">${contactData.email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555;">Subject:</td>
            <td style="padding: 8px 0;">${contactData.subject}</td>
          </tr>
          ${contactData.phone ? `
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td>
            <td style="padding: 8px 0;">${contactData.phone}</td>
          </tr>
          ` : ''}
          ${contactData.company ? `
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555;">Company:</td>
            <td style="padding: 8px 0;">${contactData.company}</td>
          </tr>
          ` : ''}
        </table>
      </div>
      
      <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
        <h3 style="color: #007bff; margin-top: 0;">Message</h3>
        <p style="line-height: 1.6; color: #333; white-space: pre-wrap;">${contactData.message}</p>
      </div>
      
      <div style="margin-top: 30px; padding: 15px; background-color: #e9ecef; border-radius: 8px; text-align: center;">
        <p style="margin: 0; color: #6c757d; font-size: 14px;">
          This message was sent from your portfolio contact form at ${process.env.NEXT_PUBLIC_SITE_URL || 'your website'}
        </p>
        <p style="margin: 10px 0 0 0;">
          <a href="mailto:${contactData.email}?subject=Re: ${contactData.subject}" 
             style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Reply to ${contactData.name}
          </a>
        </p>
      </div>
    </div>
  `;

  return await sendEmail({
    to: adminEmail,
    subject: `New Contact Form Submission: ${contactData.subject}`,
    html,
  });
};

// Send auto-reply to the user
export const sendAutoReply = async (contactData: ContactFormData): Promise<boolean> => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
        Thank you for contacting Dilip Singh
      </h2>
      
      <p style="font-size: 16px; line-height: 1.6; color: #333;">
        Hi ${contactData.name},
      </p>
      
      <p style="font-size: 16px; line-height: 1.6; color: #333;">
        Thank you for reaching out to me! I have received your message and will get back to you as soon as possible.
      </p>
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #007bff; margin-top: 0;">Your Message</h3>
        <p style="line-height: 1.6; color: #333; white-space: pre-wrap;">${contactData.message}</p>
      </div>
      
      <p style="font-size: 16px; line-height: 1.6; color: #333;">
        I typically respond within 24-48 hours. If you have any urgent inquiries, please don't hesitate to reach out again.
      </p>
      
      <div style="margin-top: 30px; padding: 20px; background-color: #e9ecef; border-radius: 8px;">
        <h3 style="color: #007bff; margin-top: 0;">Best regards,</h3>
        <p style="margin: 0; font-size: 16px; color: #333;">
          <strong>Dilip Singh</strong><br>
          Senior Full Stack Developer<br>
          <a href="mailto:dilipsinghf@gmail.com" style="color: #007bff;">dilipsinghf@gmail.com</a>
        </p>
      </div>
      
      <div style="margin-top: 20px; padding: 15px; background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px;">
        <p style="margin: 0; color: #856404; font-size: 14px;">
          This is an automated response. Please do not reply to this email.
        </p>
      </div>
    </div>
  `;

  return await sendEmail({
    to: contactData.email,
    subject: 'Thank you for contacting Dilip Singh',
    html,
  });
};
