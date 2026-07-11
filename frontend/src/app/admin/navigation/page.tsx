'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Save, Plus, Trash2, ExternalLink } from 'lucide-react';
import { adminFetch } from '@/services/adminService';

type LinkItem = { name: string; path: string };
type SocialItem = { platform: string; url: string };

export default function AdminNavigation() {
  const [settings, setSettings] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await adminFetch<Record<string, unknown>>('/settings');
        setSettings(data);
      } catch {
        toast.error('Failed to load navigation settings');
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  const navItems = (settings.navItems as LinkItem[]) || [];
  const footerLinks = (settings.footerLinks as LinkItem[]) || [];
  const socialLinks = (settings.socialLinks as SocialItem[]) || [];

  const updateList = (key: 'navItems' | 'footerLinks' | 'socialLinks', list: unknown[]) => {
    setSettings((prev) => ({ ...prev, [key]: list }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await adminFetch('/settings', { method: 'PUT', body: JSON.stringify(settings) });
      toast.success('Navigation & footer published');
      window.dispatchEvent(new Event('cms-updated'));
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-20 text-zinc-500 animate-pulse text-xs uppercase">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
        <h3 className="font-display font-bold text-white text-base">Navigation & Footer</h3>
        <div className="flex gap-2">
          <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-zinc-800 text-zinc-400 text-[10px] font-bold uppercase">
            <ExternalLink className="w-3.5 h-3.5" /> Preview
          </a>
          <button onClick={() => void handleSave()} disabled={saving} className="flex items-center gap-1.5 px-4 py-2 bg-[#8B5CF6] text-black text-[10px] font-bold uppercase rounded-xl">
            <Save className="w-3.5 h-3.5" /> Publish
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Section title="Brand">
          {['brandName', 'tagline', 'footerGreeting', 'copyrightText'].map((key) => (
            <Field key={key} label={key} value={String(settings[key] || '')} onChange={(v) => setSettings((p) => ({ ...p, [key]: v }))} />
          ))}
        </Section>

        <Section title="Hero & CTA">
          {['heroEyebrow', 'heroTitle', 'heroSubtitle', 'heroCtaLabel', 'heroCtaHref'].map((key) => (
            <Field key={key} label={key} value={String(settings[key] || '')} onChange={(v) => setSettings((p) => ({ ...p, [key]: v }))} multiline={key.includes('Title') || key.includes('Subtitle')} />
          ))}
        </Section>

        <Section title="Contact Info">
          {['contactEmail', 'contactLocation', 'workingHours'].map((key) => (
            <Field key={key} label={key} value={String(settings[key] || '')} onChange={(v) => setSettings((p) => ({ ...p, [key]: v }))} />
          ))}
        </Section>

        <ListEditor
          title="Navigation Menu"
          items={navItems}
          onChange={(list) => updateList('navItems', list)}
          fields={['name', 'path']}
        />
        <ListEditor
          title="Footer Links"
          items={footerLinks}
          onChange={(list) => updateList('footerLinks', list)}
          fields={['name', 'path']}
        />
        <ListEditor
          title="Social Links"
          items={socialLinks}
          onChange={(list) => updateList('socialLinks', list)}
          fields={['platform', 'url']}
        />
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-900 space-y-3 text-xs">
      <h4 className="font-bold text-white uppercase tracking-wider border-b border-zinc-900 pb-2">{title}</h4>
      {children}
    </div>
  );
}

function Field({ label, value, onChange, multiline }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean }) {
  return (
    <div>
      <label className="block text-zinc-500 font-semibold mb-1 uppercase text-[10px]">{label}</label>
      {multiline ? (
        <textarea rows={2} value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-zinc-900/50 border border-zinc-850 text-white px-4 py-2 rounded-xl resize-none" />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-zinc-900/50 border border-zinc-850 text-white px-4 py-2 rounded-xl" />
      )}
    </div>
  );
}

function ListEditor({ title, items, onChange, fields }: { title: string; items: Record<string, string>[]; onChange: (list: Record<string, string>[]) => void; fields: string[] }) {
  const update = (index: number, field: string, value: string) => {
    const next = [...items];
    next[index] = { ...next[index], [field]: value };
    onChange(next);
  };

  return (
    <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-900 space-y-3 text-xs">
      <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
        <h4 className="font-bold text-white uppercase tracking-wider">{title}</h4>
        <button type="button" onClick={() => onChange([...items, Object.fromEntries(fields.map((f) => [f, '']))])} className="text-[#8B5CF6] flex items-center gap-1 text-[10px] font-bold uppercase"><Plus className="w-3 h-3" /> Add</button>
      </div>
      {items.map((item, idx) => (
        <div key={idx} className="flex gap-2 items-start">
          {fields.map((f) => (
            <input key={f} value={item[f] || ''} onChange={(e) => update(idx, f, e.target.value)} placeholder={f} className="flex-1 bg-zinc-900/50 border border-zinc-850 text-white px-3 py-2 rounded-xl" />
          ))}
          <button type="button" onClick={() => onChange(items.filter((_, i) => i !== idx))} className="p-2 text-rose-500"><Trash2 className="w-3.5 h-3.5" /></button>
        </div>
      ))}
    </div>
  );
}
