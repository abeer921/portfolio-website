const DEFAULT_HERO_SUBTITLE_LINES = [
  "I'm Abeer Nisar, a UI/UX Designer passionate about creating intuitive interfaces",
  'while exploring AI-powered products that combine creativity, technology, and',
  'meaningful user experiences.',
] as const;

const DEFAULT_HERO_SUBTITLE = DEFAULT_HERO_SUBTITLE_LINES.join('\n');

function normalizeWhitespace(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

export function heroTitleLines(title: string): string[] {
  const normalized = normalizeWhitespace(title);

  if (title.includes('\n')) {
    const lines = title
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
    if (lines.length === 2) return lines;
    if (lines.length > 2) return [lines.slice(0, -1).join(' '), lines[lines.length - 1]];
  }

  if (/Turning Ideas Into Beautiful\s*&\s*Functional Products\.?/i.test(normalized)) {
    return ['Turning Ideas Into Beautiful &', 'Functional Products.'];
  }

  const match = normalized.match(/^(.+?)\s+(Functional Products\.?)$/i);
  if (match) return [match[1].trim(), match[2].trim()];

  return [normalized];
}

export function heroSubtitleLines(subtitle: string): string[] {
  if (subtitle.includes('\n')) {
    return subtitle
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
  }

  const normalized = normalizeWhitespace(subtitle);
  const defaultNormalized = normalizeWhitespace(DEFAULT_HERO_SUBTITLE);

  if (normalized === defaultNormalized || defaultNormalized.startsWith(normalized)) {
    return [...DEFAULT_HERO_SUBTITLE_LINES];
  }

  return [subtitle];
}

export function normalizeHeroSettings<T extends Record<string, unknown>>(settings: T): T {
  const title = String(settings.heroTitle ?? '');
  const subtitle = String(settings.heroSubtitle ?? '');

  return {
    ...settings,
    heroTitle: title ? heroTitleLines(title).join('\n') : 'Turning Ideas Into Beautiful &\nFunctional Products.',
    heroSubtitle: subtitle ? heroSubtitleLines(subtitle).join('\n') : DEFAULT_HERO_SUBTITLE,
  };
}
