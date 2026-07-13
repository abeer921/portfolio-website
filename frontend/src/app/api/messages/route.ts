import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { sendContactMessageNotification } from '@/lib/contactEmail';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type MessageRow = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  isRead: boolean;
  createdAt: Date;
};

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

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    return NextResponse.json(
      { message: 'Server is missing database configuration. Please try again later.' },
      { status: 503 }
    );
  }

  try {
    const sql = neon(databaseUrl);

    const inserted = await sql`
      INSERT INTO "Message" (id, name, email, subject, message, "isRead", "createdAt")
      VALUES (gen_random_uuid()::text, ${cleanName}, ${cleanEmail}, ${cleanSubject || null}, ${cleanMessage}, false, NOW())
      RETURNING id, name, email, subject, message, "isRead", "createdAt"
    `;

    const msg = inserted[0] as MessageRow;

    const settingsRows = await sql`
      SELECT "contactEmail" FROM "Settings" WHERE id = 'global' LIMIT 1
    `;
    const contactEmail = settingsRows[0]?.contactEmail as string | undefined;

    let emailNotificationSent = false;
    try {
      emailNotificationSent = await sendContactMessageNotification(msg, contactEmail);
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
