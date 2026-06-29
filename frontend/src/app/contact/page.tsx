'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { apiService, fallbackData } from '@/services/apiService';
import MagneticButton from '@/components/ui/MagneticButton';

export default function Contact() {
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
      await apiService.submitContactMessage({
        name,
        email,
        subject,
        message,
      });

      setSuccess(true);
      toast.success('Message sent successfully!');
      
      // Clear fields
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (error) {
      toast.error('Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    {
      title: 'Email Direct',
      value: fallbackData.settings.contactEmail,
      href: `mailto:${fallbackData.settings.contactEmail}`,
      icon: Mail,
    },
    {
      title: 'Phone / Whatsapp',
      value: fallbackData.settings.contactPhone,
      href: `tel:${fallbackData.settings.contactPhone}`,
      icon: Phone,
    },
    {
      title: 'Work Location',
      value: fallbackData.settings.contactLocation,
      icon: MapPin,
    },
    {
      title: 'Studio Hours',
      value: fallbackData.settings.workingHours,
      icon: Clock,
    },
  ];

  return (
    <div className="relative pt-32 pb-24 overflow-hidden min-h-screen">
      {/* Background glow spots */}
      <div className="glow-spot top-[15%] left-[10%] opacity-20" />
      <div className="glow-spot bottom-[15%] right-[10%] opacity-25" />

      {/* Grid Dot Background */}
      <div className="absolute inset-0 dot-bg opacity-30 z-0 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
        
        {/* Header Title */}
        <section className="mb-20">
          <span className="text-[#d4af37] text-xs font-semibold tracking-wider uppercase mb-2 block">GET IN TOUCH</span>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight mb-6">
            Let's Collaborate<span className="text-[#d4af37]">.</span>
          </h1>
          <p className="text-zinc-500 text-lg leading-relaxed max-w-2xl">
            Have an interesting product, dashboard redesign, or design system project? Drop a line and let's craft something premium.
          </p>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            {contactInfo.map((info, idx) => {
              const Icon = info.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-zinc-950 border border-zinc-900 flex items-center gap-5 hover:border-zinc-800 transition-colors duration-300">
                  <div className="w-11 h-11 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#d4af37]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-zinc-500 text-[10px] tracking-wider uppercase block mb-1">{info.title}</span>
                    {info.href ? (
                      <a href={info.href} className="text-white hover:text-[#d4af37] text-sm font-semibold transition-colors duration-200">
                        {info.value}
                      </a>
                    ) : (
                      <span className="text-white text-sm font-semibold">{info.value}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 p-8 rounded-2xl bg-zinc-950 border border-zinc-900 relative">
            {success ? (
              <div className="py-16 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-2xl text-white mb-2">Message Dispatched</h3>
                <p className="text-zinc-500 text-sm max-w-xs leading-relaxed mb-8">
                  Thank you for reaching out! Your inquiry was successfully recorded. I will check my inbox and get back to you shortly.
                </p>
                <MagneticButton
                  onClick={() => setSuccess(false)}
                  className="px-6 py-2.5 bg-zinc-900 border border-zinc-800 hover:border-white text-white text-xs font-semibold uppercase rounded-full transition-colors duration-300"
                >
                  Send another message
                </MagneticButton>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="font-display font-bold text-lg text-white mb-8">Inquiry Form</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-zinc-500 text-xs font-semibold mb-2 uppercase">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-zinc-900/40 border border-zinc-850 focus:border-[#d4af37] text-zinc-300 px-4 py-3 rounded-xl text-sm outline-none transition-colors duration-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-500 text-xs font-semibold mb-2 uppercase">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-zinc-900/40 border border-zinc-850 focus:border-[#d4af37] text-zinc-300 px-4 py-3 rounded-xl text-sm outline-none transition-colors duration-200"
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-zinc-500 text-xs font-semibold mb-2 uppercase">Subject</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-zinc-900/40 border border-zinc-850 focus:border-[#d4af37] text-zinc-300 px-4 py-3 rounded-xl text-sm outline-none transition-colors duration-200"
                  />
                </div>

                <div className="mb-8">
                  <label className="block text-zinc-500 text-xs font-semibold mb-2 uppercase">Inquiry details</label>
                  <textarea
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your design needs, deadlines, or project details..."
                    className="w-full bg-zinc-900/40 border border-zinc-850 focus:border-[#d4af37] text-zinc-300 px-4 py-3 rounded-xl text-sm outline-none transition-colors duration-200 resize-none placeholder:text-zinc-700"
                    required
                  />
                </div>

                <MagneticButton
                  type="submit"
                  disabled={submitting}
                  className="px-8 py-3.5 bg-[#d4af37] hover:bg-[#bda02b] text-black text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-2 transition-colors duration-300"
                >
                  {submitting ? 'Dispatching...' : 'Dispatch Message'}
                  <Send className="w-3.5 h-3.5" />
                </MagneticButton>
              </form>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
