'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Save, RefreshCw } from 'lucide-react';
import { API_BASE_URL, apiService } from '@/services/apiService';
import MagneticButton from '@/components/ui/MagneticButton';

export default function AdminSettings() {
  const [settings, setSettings] = useState<any>({
    heroTitle: '',
    heroSubtitle: '',
    resumeUrl: '',
    contactEmail: '',
    contactPhone: '',
    contactLocation: '',
    workingHours: '',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const data = await apiService.getSettings();
      setSettings({
        ...data,
        metaKeywords: Array.isArray(data.metaKeywords) ? data.metaKeywords : [],
      });
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const token = localStorage.getItem('admin_token');

    try {
      const res = await fetch(`${API_BASE_URL}/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error();

      toast.success('Site configurations updated. Homepage will refresh automatically.');
      loadSettings();
      window.dispatchEvent(new Event('cms-updated'));
    } catch {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-zinc-500 animate-pulse text-xs uppercase">
        Loading configurations...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
        <h3 className="font-display font-bold text-white text-base">SEO & Meta Settings</h3>
        <p className="text-xs text-zinc-500 mt-1">Hero, navigation, and footer content are managed under Navigation and Page Content.</p>
        <button
          onClick={loadSettings}
          className="p-2 bg-zinc-900 hover:bg-zinc-850 rounded-lg text-zinc-400 hover:text-white transition-colors duration-200"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      <form onSubmit={handleFormSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs">
        {/* Left Column: Copywriting & Contacts */}
        <div className="space-y-6 p-6 rounded-2xl bg-zinc-950 border border-zinc-900 shadow-xl">
          <h4 className="font-display font-bold text-white text-sm border-b border-zinc-900 pb-3 mb-4 uppercase tracking-wider">
            Copywriting & Assets
          </h4>

          <div>
            <label className="block text-zinc-500 font-semibold mb-2 uppercase">Hero Title</label>
            <textarea
              rows={2}
              value={settings.heroTitle}
              onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })}
              className="w-full bg-zinc-900/50 border border-zinc-850 text-white px-4 py-2.5 rounded-xl outline-none focus:border-[#8B5CF6] transition-all resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-zinc-500 font-semibold mb-2 uppercase">Hero Subtitle</label>
            <textarea
              rows={3}
              value={settings.heroSubtitle}
              onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
              className="w-full bg-zinc-900/50 border border-zinc-850 text-white px-4 py-2.5 rounded-xl outline-none focus:border-[#8B5CF6] transition-all resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-[#8B5CF6] font-semibold mb-2 uppercase">Resume Link (PDF Link)</label>
            <input
              type="text"
              value={settings.resumeUrl || ''}
              onChange={(e) => setSettings({ ...settings, resumeUrl: e.target.value })}
              placeholder="/resume/abeer-nisar-resume.pdf"
              className="w-full bg-zinc-900/50 border border-zinc-850 text-white px-4 py-2.5 rounded-xl outline-none focus:border-[#8B5CF6] transition-all"
            />
          </div>

          <h4 className="font-display font-bold text-white text-sm border-b border-zinc-900 pb-3 mt-8 mb-4 uppercase tracking-wider">
            Contact & Availability
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-500 font-semibold mb-2 uppercase">Contact Email</label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                className="w-full bg-zinc-900/50 border border-zinc-850 text-white px-4 py-2.5 rounded-xl outline-none focus:border-[#8B5CF6] transition-all"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-500 font-semibold mb-2 uppercase">Studio Location</label>
              <input
                type="text"
                value={settings.contactLocation}
                onChange={(e) => setSettings({ ...settings, contactLocation: e.target.value })}
                className="w-full bg-zinc-900/50 border border-zinc-850 text-white px-4 py-2.5 rounded-xl outline-none focus:border-[#8B5CF6] transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-zinc-500 font-semibold mb-2 uppercase">Working Hours</label>
              <input
                type="text"
                value={settings.workingHours}
                onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })}
                className="w-full bg-zinc-900/50 border border-zinc-850 text-white px-4 py-2.5 rounded-xl outline-none focus:border-[#8B5CF6] transition-all"
                required
              />
            </div>
          </div>
        </div>

        {/* Right Column: SEO Metadata Config */}
        <div className="space-y-6 p-6 rounded-2xl bg-zinc-950 border border-zinc-900 shadow-xl flex flex-col justify-between">
          <div className="space-y-6">
            <h4 className="font-display font-bold text-white text-sm border-b border-zinc-900 pb-3 mb-4 uppercase tracking-wider">
              SEO & Metadata
            </h4>

            <div>
              <label className="block text-zinc-500 font-semibold mb-2 uppercase">Meta Title Tag</label>
              <input
                type="text"
                value={settings.metaTitle}
                onChange={(e) => setSettings({ ...settings, metaTitle: e.target.value })}
                className="w-full bg-zinc-900/50 border border-zinc-850 text-white px-4 py-2.5 rounded-xl outline-none focus:border-[#8B5CF6] transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-zinc-500 font-semibold mb-2 uppercase">Meta Description</label>
              <textarea
                rows={4}
                value={settings.metaDescription}
                onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}
                className="w-full bg-zinc-900/50 border border-zinc-850 text-white px-4 py-2.5 rounded-xl outline-none focus:border-[#8B5CF6] transition-all resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-[#8B5CF6] font-semibold mb-2 uppercase">Keywords (comma separated)</label>
              <input
                type="text"
                value={Array.isArray(settings.metaKeywords) ? settings.metaKeywords.join(', ') : ''}
                onChange={(e) => setSettings({ ...settings, metaKeywords: e.target.value.split(',').map((k: string) => k.trim()) })}
                placeholder="UI UX, Figma Designer, Web Designer"
                className="w-full bg-zinc-900/50 border border-zinc-850 text-white px-4 py-2.5 rounded-xl outline-none focus:border-[#8B5CF6] transition-all"
              />
            </div>
          </div>

          <div className="border-t border-zinc-900 pt-6 mt-8 flex justify-end">
            <MagneticButton
              type="submit"
              disabled={saving}
              className="px-8 py-3.5 bg-[#8B5CF6] hover:bg-[#C084FC] text-black font-bold uppercase rounded-xl flex items-center gap-2 shadow-md shadow-[#8B5CF6]/15"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving Configurations...' : 'Save Settings'}
            </MagneticButton>
          </div>
        </div>
      </form>
    </div>
  );
}
