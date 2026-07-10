'use client';

import { useEffect } from 'react';
import { useCms } from '@/context/CmsContext';

export default function CmsHead() {
  const { cms } = useCms();
  const settings = cms.settings as Record<string, string>;

  useEffect(() => {
    if (settings.metaTitle) document.title = settings.metaTitle;
    const desc = document.querySelector('meta[name="description"]');
    if (desc && settings.metaDescription) desc.setAttribute('content', settings.metaDescription);
  }, [settings.metaTitle, settings.metaDescription]);

  return null;
}
