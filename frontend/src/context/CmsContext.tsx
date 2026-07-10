'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { API_BASE_URL, fallbackData } from '@/services/apiService';
import { cmsDefaults, type CmsBundle } from '@/lib/cmsDefaults';
import { normalizeHeroSettings } from '@/lib/heroContent';

const emptyBundle: CmsBundle = {
  settings: { ...cmsDefaults.settings, ...fallbackData.settings },
  content: { ...cmsDefaults.content },
  projects: fallbackData.projects,
  testimonials: fallbackData.testimonials,
  services: fallbackData.services,
  experiences: fallbackData.experiences,
  certificates: fallbackData.certificates,
  skills: fallbackData.skills,
  education: [],
};

type CmsContextValue = {
  cms: CmsBundle;
  loading: boolean;
  getContent: <T = Record<string, unknown>>(key: string, fallback?: T) => T;
  refresh: () => Promise<void>;
};

const CmsContext = createContext<CmsContextValue>({
  cms: emptyBundle,
  loading: true,
  getContent: (key, fallback) =>
    (fallback ?? cmsDefaults.content[key as keyof typeof cmsDefaults.content] ?? {}) as never,
  refresh: async () => {},
});

export function CmsProvider({ children }: { children: React.ReactNode }) {
  const [cms, setCms] = useState<CmsBundle>(emptyBundle);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/cms`, { cache: 'no-store' });
      if (!res.ok) throw new Error('CMS fetch failed');
      const data = await res.json();
      setCms({
        settings: normalizeHeroSettings({ ...cmsDefaults.settings, ...data.settings }),
        content: { ...cmsDefaults.content, ...data.content },
        projects: data.projects?.length ? data.projects : emptyBundle.projects,
        testimonials: data.testimonials?.length ? data.testimonials : emptyBundle.testimonials,
        services: data.services?.length ? data.services : emptyBundle.services,
        experiences: data.experiences?.length ? data.experiences : emptyBundle.experiences,
        certificates: data.certificates?.length ? data.certificates : emptyBundle.certificates,
        skills: data.skills?.length ? data.skills : emptyBundle.skills,
        education: data.education ?? [],
      });
    } catch {
      setCms(emptyBundle);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    const onCmsUpdated = () => {
      void load();
    };
    const onVisible = () => {
      if (document.visibilityState === 'visible') void load();
    };

    window.addEventListener('cms-updated', onCmsUpdated);
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      window.removeEventListener('cms-updated', onCmsUpdated);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [load]);

  const getContent = useCallback(
    <T = Record<string, unknown>>(key: string, fallback?: T): T => {
      const value = cms.content[key];
      if (value !== undefined && value !== null) return value as T;
      return (fallback ?? cmsDefaults.content[key as keyof typeof cmsDefaults.content] ?? {}) as T;
    },
    [cms.content]
  );

  return (
    <CmsContext.Provider value={{ cms, loading, getContent, refresh: load }}>
      {children}
    </CmsContext.Provider>
  );
}

export function useCms() {
  return useContext(CmsContext);
}
