'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Save, ExternalLink } from 'lucide-react';
import { adminFetch } from '@/services/adminService';
import ImageUpload from '@/components/admin/ImageUpload';
import { cmsDefaults } from '@/lib/cmsDefaults';

const SECTION_DEFAULTS: Record<string, Record<string, unknown>> = {
  ...cmsDefaults.content,
  'about.page': {
    heroImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    heading: 'About me',
    bio: [
      "Hi, I'm Abeer — a UI/UX designer passionate about crafting meaningful and impactful digital experiences for ambitious brands and startups.",
      'I combine research-led thinking with polished visual design to build interfaces that feel natural, premium, and conversion-focused.',
    ],
    stats: [
      { value: '2+', label: 'Years of Experience' },
      { value: '4', label: 'Completed Projects' },
      { value: '2+', label: 'Happy Clients' },
    ],
    experienceHeading: 'Experience',
    experienceIntro: 'A snapshot of the roles and projects that shaped my design practice.',
    educationHeading: 'Education',
    certificatesHeading: 'Certificates & Training',
    ctaLabel: "Let's work together",
  },
  'services.page': {
    eyebrow: 'Services',
    heading: 'What I can do for you',
    intro: 'From research and wireframes to polished UI systems, I help brands translate ideas into premium digital experiences.',
    pricingEyebrow: 'Pricing',
    pricingHeading: 'Flexible packages for every stage',
    faqEyebrow: 'FAQ',
    faqHeading: 'Common questions',
  },
  'contact.page': {
    greeting: 'Hi',
    heading: "Let's work together",
    intro: 'Tell me about your project, timeline, and goals. I typically respond within 24–48 hours.',
    formPlaceholder: 'Tell me about your project...',
    successHeading: 'Message sent',
    successBody: 'Thanks for reaching out. I will get back to you shortly.',
    successCta: 'Send another message',
  },
};

function mergeSection(key: string, fromApi?: unknown): Record<string, unknown> {
  const defaults = SECTION_DEFAULTS[key] || {};
  if (!fromApi || typeof fromApi !== 'object') return { ...defaults };
  return { ...defaults, ...(fromApi as Record<string, unknown>) };
}

const SECTIONS = [
  { key: 'home.about', label: 'Home — About' },
  { key: 'home.services', label: 'Home — Services' },
  { key: 'home.featuredProjects', label: 'Home — Featured Projects' },
  { key: 'home.testimonials', label: 'Home — Testimonials' },
  { key: 'home.faq', label: 'Home — FAQ' },
  { key: 'home.contactCta', label: 'Home — Contact CTA' },
  { key: 'about.page', label: 'About Page' },
  { key: 'services.page', label: 'Services Page' },
  { key: 'contact.page', label: 'Contact Page' },
];

export default function AdminHomeContent() {
  const [activeKey, setActiveKey] = useState(SECTIONS[0].key);
  const [content, setContent] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const items = await adminFetch<{ key: string; content: Record<string, unknown> }[]>('/site-content');
        const map: Record<string, unknown> = {};
        SECTIONS.forEach((s) => {
          const found = items.find((item) => item.key === s.key);
          map[s.key] = mergeSection(s.key, found?.content);
        });
        setContent(map);
      } catch {
        const map: Record<string, unknown> = {};
        SECTIONS.forEach((s) => { map[s.key] = mergeSection(s.key); });
        setContent(map);
        toast.error('Could not reach API — showing default content. Start the backend on port 5050.');
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  const current = mergeSection(activeKey, content[activeKey]);

  const update = (path: string, value: unknown) => {
    setContent((prev) => {
      const section = { ...(prev[activeKey] as Record<string, unknown> || {}) };
      if (path.includes('.')) {
        const [parent, child] = path.split('.');
        section[parent] = { ...(section[parent] as Record<string, unknown> || {}), [child]: value };
      } else {
        section[path] = value;
      }
      return { ...prev, [activeKey]: section };
    });
  };

  const updateFaqItem = (index: number, field: 'question' | 'answer', value: string) => {
    const items = [...((current.items as { question: string; answer: string }[]) || [])];
    items[index] = { ...items[index], [field]: value };
    update('items', items);
  };

  const addFaq = () => {
    const items = [...((current.items as { question: string; answer: string }[]) || []), { question: '', answer: '' }];
    update('items', items);
  };

  const removeFaq = (index: number) => {
    const items = ((current.items as { question: string; answer: string }[]) || []).filter((_, i) => i !== index);
    update('items', items);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await adminFetch('/site-content', {
        method: 'PUT',
        body: JSON.stringify({ key: activeKey, content: content[activeKey] }),
      });
      toast.success('Section published to live site');
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-zinc-500 animate-pulse text-xs uppercase">Loading content...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4 border-b border-zinc-900 pb-4">
        <h3 className="font-display font-bold text-white text-base">Page Content</h3>
        <div className="flex gap-2">
          <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-zinc-800 text-zinc-400 text-[10px] font-bold uppercase hover:text-white">
            <ExternalLink className="w-3.5 h-3.5" /> Preview Site
          </a>
          <button onClick={() => void handleSave()} disabled={saving} className="flex items-center gap-1.5 px-4 py-2 bg-[#8B5CF6] text-black text-[10px] font-bold uppercase rounded-xl disabled:opacity-50">
            <Save className="w-3.5 h-3.5" /> {saving ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {SECTIONS.map((s) => (
          <button
            key={s.key}
            onClick={() => setActiveKey(s.key)}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-colors ${
              activeKey === s.key ? 'bg-[#8B5CF6] text-black' : 'bg-zinc-900 text-zinc-400 hover:text-white'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-900 space-y-4 text-xs">
        {Object.entries(current).length === 0 && (
          <p className="text-zinc-500 text-center py-8">No editable fields for this section.</p>
        )}
        {Object.entries(current).map(([key, val]) => {
          if (key === 'items' && Array.isArray(val)) {
            return (
              <div key={key} className="space-y-3 border-t border-zinc-900 pt-4">
                <div className="flex justify-between items-center">
                  <label className="text-zinc-500 font-semibold uppercase">FAQ Items</label>
                  <button type="button" onClick={addFaq} className="text-[#8B5CF6] text-[10px] font-bold uppercase">+ Add FAQ</button>
                </div>
                {(val as { question: string; answer: string }[]).map((faq, idx) => (
                  <div key={idx} className="rounded-xl border border-zinc-900 p-4 space-y-2">
                    <input value={faq.question} onChange={(e) => updateFaqItem(idx, 'question', e.target.value)} placeholder="Question" className="w-full bg-zinc-900/50 border border-zinc-850 text-white px-4 py-2 rounded-xl" />
                    <textarea value={faq.answer} onChange={(e) => updateFaqItem(idx, 'answer', e.target.value)} placeholder="Answer" rows={2} className="w-full bg-zinc-900/50 border border-zinc-850 text-white px-4 py-2 rounded-xl resize-none" />
                    <button type="button" onClick={() => removeFaq(idx)} className="text-rose-500 text-[10px] font-bold uppercase">Remove</button>
                  </div>
                ))}
              </div>
            );
          }
          if (key === 'stats' && Array.isArray(val)) {
            return (
              <div key={key} className="space-y-2 border-t border-zinc-900 pt-4">
                <label className="text-zinc-500 font-semibold uppercase">Stats</label>
                {(val as { value: string; label: string }[]).map((stat, idx) => (
                  <div key={idx} className="grid grid-cols-2 gap-2">
                    <input value={stat.value} onChange={(e) => {
                      const stats = [...(val as { value: string; label: string }[])];
                      stats[idx] = { ...stats[idx], value: e.target.value };
                      update('stats', stats);
                    }} placeholder="Value" className="bg-zinc-900/50 border border-zinc-850 text-white px-4 py-2 rounded-xl" />
                    <input value={stat.label} onChange={(e) => {
                      const stats = [...(val as { value: string; label: string }[])];
                      stats[idx] = { ...stats[idx], label: e.target.value };
                      update('stats', stats);
                    }} placeholder="Label" className="bg-zinc-900/50 border border-zinc-850 text-white px-4 py-2 rounded-xl" />
                  </div>
                ))}
              </div>
            );
          }
          if (key === 'bio' && Array.isArray(val)) {
            return (
              <div key={key}>
                <label className="block text-zinc-500 font-semibold mb-2 uppercase">Bio Paragraphs (one per line)</label>
                <textarea rows={4} value={(val as string[]).join('\n')} onChange={(e) => update('bio', e.target.value.split('\n').filter(Boolean))} className="w-full bg-zinc-900/50 border border-zinc-850 text-white px-4 py-2.5 rounded-xl resize-none" />
              </div>
            );
          }
          if (typeof val === 'string' && (key.toLowerCase().includes('image') || key === 'backgroundImage' || key === 'portraitImage' || key === 'mainImage' || key === 'heroImage')) {
            return <ImageUpload key={key} label={key} value={val} onChange={(url) => update(key, url)} />;
          }
          if (typeof val === 'object' && val !== null) return null;
          return (
            <div key={key}>
              <label className="block text-zinc-500 font-semibold mb-2 uppercase">{key}</label>
              {typeof val === 'string' && val.length > 80 ? (
                <textarea rows={3} value={val} onChange={(e) => update(key, e.target.value)} className="w-full bg-zinc-900/50 border border-zinc-850 text-white px-4 py-2.5 rounded-xl resize-none" />
              ) : (
                <input type="text" value={String(val ?? '')} onChange={(e) => update(key, e.target.value)} className="w-full bg-zinc-900/50 border border-zinc-850 text-white px-4 py-2.5 rounded-xl" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
