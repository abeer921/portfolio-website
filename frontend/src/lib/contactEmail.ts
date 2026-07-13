import nodemailer from 'nodemailer';

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject?: string | null;
  message: string;
  createdAt: Date;
};

const requiredEmailEnv = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS'];

const isEmailConfigured = () => requiredEmailEnv.every((key) => Boolean(process.env[key]));

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export async function sendContactMessageNotification(
  contactMessage: ContactMessage,
  recipientEmail?: string | null
) {
  if (!isEmailConfigured()) {
    return false;
  }

  const to = process.env.NOTIFICATION_EMAIL_TO || recipientEmail || process.env.SMTP_USER;
  if (!to) {
    return false;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const subject = contactMessage.subject?.trim() || 'New Portfolio Contact Message';
  const safeName = escapeHtml(contactMessage.name);
  const safeEmail = escapeHtml(contactMessage.email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(contactMessage.message).replace(/\n/g, '<br />');

  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    replyTo: contactMessage.email,
    to,
    subject: `New contact message: ${subject}`,
    text: [
      `Name: ${contactMessage.name}`,
      `Email: ${contactMessage.email}`,
      `Subject: ${subject}`,
      `Submitted: ${contactMessage.createdAt.toISOString()}`,
      '',
      contactMessage.message,
    ].join('\n'),
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #18181b;">
        <h2 style="margin: 0 0 16px;">New portfolio contact message</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Subject:</strong> ${safeSubject}</p>
        <p><strong>Submitted:</strong> ${contactMessage.createdAt.toISOString()}</p>
        <hr style="border: 0; border-top: 1px solid #e4e4e7; margin: 20px 0;" />
        <p>${safeMessage}</p>
      </div>
    `,
  });

  return true;
}
