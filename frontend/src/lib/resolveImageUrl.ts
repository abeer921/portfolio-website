const LOCAL_IMAGE_FALLBACKS: Record<string, string> = {
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80':
    '/images/testimonials/waseem-khan.jpg',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80':
    '/images/testimonials/waseem-khan.jpg',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80':
    '/images/testimonials/sardar-azam.jpg',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80':
    '/images/testimonials/sardar-azam.jpg',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80':
    '/images/contact/cta-background.jpg',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80':
    '/images/about/portrait.jpg',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80':
    '/images/about/portrait.jpg',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80':
    '/images/blogs/minimalist-uiux.jpg',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80':
    '/images/blogs/minimalist-uiux.jpg',
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80':
    '/images/blogs/design-handoff.jpg',
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80':
    '/images/blogs/design-handoff.jpg',
  'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=500&q=80':
    '/images/certificates/seo-graphic-design.jpg',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=500&q=80':
    '/images/certificates/mern-ai-workshop.jpg',
  'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=500&q=80':
    '/images/certificates/blockchain-workshop.jpg',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80':
    '/images/projects/protego-os.jpg',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80':
    '/images/projects/protego-os.jpg',
};

const UNSPLASH_PHOTO_FALLBACKS: Record<string, string> = {
  'photo-1507003211169-0a1dd7228f2d': '/images/testimonials/waseem-khan.jpg',
  'photo-1500648767791-00dcc994a43e': '/images/testimonials/sardar-azam.jpg',
  'photo-1497366216548-37526070297c': '/images/contact/cta-background.jpg',
  'photo-1534528741775-53994a69daeb': '/images/about/portrait.jpg',
  'photo-1618005182384-a83a8bd57fbe': '/images/blogs/minimalist-uiux.jpg',
  'photo-1531482615713-2afd69097998': '/images/blogs/design-handoff.jpg',
  'photo-1513258496099-48168024aec0': '/images/certificates/seo-graphic-design.jpg',
  'photo-1517245386807-bb43f82c33c4': '/images/certificates/mern-ai-workshop.jpg',
  'photo-1639762681485-074b7f938ba0': '/images/certificates/blockchain-workshop.jpg',
  'photo-1551288049-bebda4e38f71': '/images/projects/protego-os.jpg',
};

const PROJECT_IMAGE_MAP: Record<string, string> = {
  'protego-os': '/images/projects/protego-os.jpg',
  protego: '/images/projects/protego-os.jpg',
  nextlevel: '/images/projects/nextlevel.jpg',
  'nextlevel-platform': '/images/projects/nextlevel.jpg',
  appealsdr: '/images/projects/appealsdr.jpg',
  maubrand: '/images/projects/maubrand.jpg',
  'maubrand-analytics': '/images/projects/maubrand.jpg',
};

const SERVICE_IMAGE_MAP: Record<string, string> = {
  'ui-ux': '/images/services/ui-ux.jpg',
  uiux: '/images/services/ui-ux.jpg',
  'graphic-design': '/images/services/graphic-design.jpg',
  graphic: '/images/services/graphic-design.jpg',
  'web-design': '/images/services/web-design.jpg',
  web: '/images/services/web-design.jpg',
  branding: '/images/services/branding.jpg',
  main: '/images/services/main.jpg',
};

const UPLOAD_HINTS: Array<{ match: RegExp; path: string }> = [
  { match: /protego/i, path: '/images/projects/protego-os.jpg' },
  { match: /nextlevel/i, path: '/images/projects/nextlevel.jpg' },
  { match: /appealsdr/i, path: '/images/projects/appealsdr.jpg' },
  { match: /maubrand/i, path: '/images/projects/maubrand.jpg' },
  { match: /waseem/i, path: '/images/testimonials/waseem-khan.jpg' },
  { match: /sardar/i, path: '/images/testimonials/sardar-azam.jpg' },
  { match: /cta|contact|footer|work-together/i, path: '/images/contact/cta-background.jpg' },
  { match: /portrait|about|hero|abeer/i, path: '/images/about/portrait.jpg' },
  { match: /minimal|uiux|ui-ux/i, path: '/images/blogs/minimalist-uiux.jpg' },
  { match: /handoff|mern|developer/i, path: '/images/blogs/design-handoff.jpg' },
  { match: /seo|graphic/i, path: '/images/certificates/seo-graphic-design.jpg' },
  { match: /blockchain/i, path: '/images/certificates/blockchain-workshop.jpg' },
  { match: /fullstack|full-stack|software/i, path: '/images/certificates/fullstack-dev.jpg' },
  { match: /workshop|mern|education/i, path: '/images/certificates/mern-ai-workshop.jpg' },
  { match: /branding/i, path: '/images/services/branding.jpg' },
  { match: /web/i, path: '/images/services/web-design.jpg' },
  { match: /service|main/i, path: '/images/services/main.jpg' },
];

function mapUploadPath(fileName: string) {
  const stem = fileName.replace(/\.(png|jpe?g|webp|gif)$/i, '').toLowerCase();
  if (PROJECT_IMAGE_MAP[stem]) return PROJECT_IMAGE_MAP[stem];
  if (SERVICE_IMAGE_MAP[stem]) return SERVICE_IMAGE_MAP[stem];

  for (const hint of UPLOAD_HINTS) {
    if (hint.match.test(fileName)) return hint.path;
  }
  return '';
}

function normalizeProjectImagePath(url: string) {
  if (url.startsWith('/images/projects/') && url.endsWith('.png')) {
    return url.replace(/\.png$/i, '.jpg');
  }
  return url;
}

function resolveUnsplashUrl(url: string) {
  if (LOCAL_IMAGE_FALLBACKS[url]) {
    return LOCAL_IMAGE_FALLBACKS[url];
  }

  const withoutQuery = url.split('?')[0];
  const exactMatch = Object.entries(LOCAL_IMAGE_FALLBACKS).find(([key]) => key.startsWith(withoutQuery));
  if (exactMatch) return exactMatch[1];

  const photoId = url.match(/photo-[a-zA-Z0-9-]+/)?.[0];
  if (photoId && UNSPLASH_PHOTO_FALLBACKS[photoId]) {
    return UNSPLASH_PHOTO_FALLBACKS[photoId];
  }

  return '';
}

function resolveBackendUploadUrl(url: string) {
  try {
    const parsed = new URL(url);
    if (!parsed.pathname.startsWith('/uploads/')) return '';
    return mapUploadPath(parsed.pathname.split('/').pop() || '');
  } catch {
    return '';
  }
}

export function resolveImageUrl(url?: string | null) {
  if (!url) return '';

  const trimmed = url.trim();
  if (!trimmed) return '';

  if (trimmed.startsWith('/images/')) {
    if (trimmed === '/images/about/abeer-portrait.jpg') {
      return '/images/about/portrait.jpg';
    }
    return normalizeProjectImagePath(trimmed);
  }

  if (trimmed.startsWith('/uploads/')) {
    const fileName = trimmed.split('/').pop() || '';
    return mapUploadPath(fileName);
  }

  if (LOCAL_IMAGE_FALLBACKS[trimmed]) {
    return LOCAL_IMAGE_FALLBACKS[trimmed];
  }

  if (trimmed.startsWith('https://images.unsplash.com/')) {
    return resolveUnsplashUrl(trimmed);
  }

  if (trimmed.startsWith('http://localhost:') || trimmed.startsWith('https://localhost:')) {
    const uploadPath = trimmed.includes('/uploads/')
      ? mapUploadPath(trimmed.split('/').pop() || '')
      : '';
    return uploadPath;
  }

  if (trimmed.includes('/uploads/')) {
    const mapped = resolveBackendUploadUrl(trimmed);
    if (mapped) return mapped;
  }

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }

  return trimmed;
}

export const DEFAULT_TESTIMONIAL_PHOTOS = {
  waseem: '/images/testimonials/waseem-khan.jpg',
  sardar: '/images/testimonials/sardar-azam.jpg',
} as const;

export const DEFAULT_CONTACT_CTA_BACKGROUND = '/images/contact/cta-background.jpg';
export const DEFAULT_ABOUT_PORTRAIT = '/images/about/portrait.jpg';
export const DEFAULT_BLOG_COVER = '/images/blogs/minimalist-uiux.jpg';
