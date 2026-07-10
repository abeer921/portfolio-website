'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { apiService } from '@/services/apiService';
import MagneticButton from '@/components/ui/MagneticButton';
import { useCms } from '@/context/CmsContext';

export default function Contact() {
  const { cms, getContent } = useCms();
  const settings = cms.settings as Record<string, string>;
  const page = getContent<{
    greeting?: string;
    heading?: string;
    intro?: string;
    formPlaceholder?: string;
    successHeading?: string;
    successBody?: string;
    successCta?: string;
  }>('contact.page');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error('Please fill in Name, Email and Message');
      return;
    }
    try {
      setSubmitting(true);
      await apiService.submitContactMessage({ name, email, subject, message });
      setSuccess(true);
      toast.success('Message sent successfully!');
      setName(''); setEmail(''); setSubject(''); setMessage('');
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    { title: 'Email', value: settings.contactEmail, href: `mailto:${settings.contactEmail}`, icon: Mail },
    { title: 'Phone', value: settings.contactPhone, href: `tel:${settings.contactPhone?.replace(/\s/g, '')}`, icon: Phone },
    { title: 'Location', value: settings.contactLocation, icon: MapPin },
    { title: 'Hours', value: settings.workingHours, icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-theme theme-transition pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <section className="mb-16 max-w-2xl">
          <p className="mb-2 text-sm text-[var(--muted-foreground)]">{page.greeting || 'Hi'}</p>
          <h1 className="portavia-hero-word !text-[clamp(2.5rem,8vw,5rem)] mb-6">{page.heading || "Let's work together"}</h1>
          <p className="text-[var(--muted-foreground)]">
            {page.intro || "Have a project in mind? Let's build something impactful — whether it's your brand, your website, or your next big idea."}
          </p>
        </section>

        <section className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-4">
            {contactInfo.map((info, idx) => {
              const Icon = info.icon;
              return (
                <div key={idx} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
                  <div className="mb-2 flex items-center gap-2 text-xs text-[#999]">
                    <Icon className="h-3.5 w-3.5" /> {info.title}
                  </div>
                  {info.href ? (
                    <a href={info.href} className="text-sm font-medium hover:underline">{info.value}</a>
                  ) : (
                    <span className="text-sm font-medium">{info.value}</span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 lg:col-span-8">
            {success ? (
              <div className="flex flex-col items-center py-16 text-center">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-black/5">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Message sent!</h3>
                <p className="mb-8 max-w-xs text-sm text-[var(--muted-foreground)]">Thank you for reaching out. I&apos;ll get back to you shortly.</p>
                <MagneticButton onClick={() => setSuccess(false)} className="btn-secondary px-6 py-3 text-sm">
                  Send another message
                </MagneticButton>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="mb-8 text-lg font-semibold">Send a message</h3>
                <div className="mb-5 grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs text-[#999]">Full Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border border-[var(--border)] bg-theme theme-transition px-4 py-3 text-sm outline-none focus:border-[var(--accent)]" required />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs text-[#999]">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-[var(--border)] bg-theme theme-transition px-4 py-3 text-sm outline-none focus:border-[var(--accent)]" required />
                  </div>
                </div>
                <div className="mb-5">
                  <label className="mb-2 block text-xs text-[#999]">Subject</label>
                  <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full rounded-xl border border-[var(--border)] bg-theme theme-transition px-4 py-3 text-sm outline-none focus:border-[var(--accent)]" />
                </div>
                <div className="mb-8">
                  <label className="mb-2 block text-xs text-[#999]">Message</label>
                  <textarea rows={5} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell me about your project..." className="w-full resize-none rounded-xl border border-[var(--border)] bg-theme theme-transition px-4 py-3 text-sm outline-none focus:border-[var(--accent)]" required />
                </div>
                <MagneticButton type="submit" disabled={submitting} className="btn-primary px-8 py-3.5 text-sm">
                  {submitting ? 'Sending...' : 'Send message'} <Send className="h-3.5 w-3.5" />
                </MagneticButton>
              </form>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
