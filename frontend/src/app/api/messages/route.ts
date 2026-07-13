import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendContactMessageNotification } from '@/lib/contactEmail';

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }

  const cleanName = typeof body.name === 'string' ? body.name.trim() : '';
  const cleanEmail = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const cleanSubject = typeof body.subject === 'string' ? body.subject.trim() : '';
  const cleanMessage = typeof body.message === 'string' ? body.message.trim() : '';

  if (!cleanName || !cleanEmail || !cleanMessage) {
    return NextResponse.json({ message: 'Name, email, and message are required' }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return NextResponse.json({ message: 'Please enter a valid email address' }, { status: 400 });
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      { message: 'Server is missing database configuration. Please try again later.' },
      { status: 503 }
    );
  }

  try {
    const msg = await prisma.message.create({
      data: {
        name: cleanName,
        email: cleanEmail,
        subject: cleanSubject || null,
        message: cleanMessage,
      },
    });

    const settings = await prisma.settings.findUnique({
      where: { id: 'global' },
      select: { contactEmail: true },
    });

    let emailNotificationSent = false;
    try {
      emailNotificationSent = await sendContactMessageNotification(msg, settings?.contactEmail);
    } catch (emailError) {
      console.error('Contact email notification failed:', emailError);
    }

    return NextResponse.json(
      {
        message: 'Message sent successfully',
        emailNotificationSent,
        data: msg,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting message:', error);
    return NextResponse.json({ message: 'Error submitting message' }, { status: 500 });
  }
}
