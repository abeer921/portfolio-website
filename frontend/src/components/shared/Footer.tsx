'use client';

import Link from 'next/link';
import FadeIn from '@/components/ui/FadeIn';
import { useCms } from '@/context/CmsContext';
import { cmsDefaults } from '@/lib/cmsDefaults';

const defaultFooterLinks = cmsDefaults.settings.footerLinks as { name: string; path: string }[];

export default function Footer() {
  const { cms } = useCms();
  const settings = cms.settings as Record<string, string>;
  const footerLinks = (Array.isArray(cms.settings.footerLinks) && cms.settings.footerLinks.length
    ? cms.settings.footerLinks
    : defaultFooterLinks) as { name: string; path: string }[];
  const brandName = settings.brandName || 'Abeer Nisar';
  const tagline = settings.tagline || 'UI/UX designer crafting meaningful digital experiences.';
  const greeting = settings.footerGreeting || 'Hi';
  const contactEmail = settings.contactEmail || 'abeernisar11@gmail.com';
  const contactLocation = settings.contactLocation || 'Lahore, Pakistan';
  const copyright = settings.copyrightText || `© ${new Date().getFullYear()} ${brandName}. All rights reserved.`;

  return (
    <footer
      className="border-t border-[var(--border)] bg-transparent px-6 py-16 theme-transition sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="grid gap-12 lg:grid-cols-3">
            <div>
              <p className="mb-2 text-sm text-[var(--muted-foreground)]">{greeting}</p>
              <Link href="/" className="text-2xl font-semibold text-[var(--foreground)]">
                {brandName}
              </Link>
              <p className="mt-4 max-w-xs text-sm text-[var(--muted-foreground)]">
                {tagline}
              </p>
            </div>

            <nav className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="interactive-cursor text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="text-sm text-[var(--muted-foreground)]">
              <a href={`mailto:${contactEmail}`} className="block transition-colors hover:text-[var(--foreground)]">
                {contactEmail}
              </a>
              <p className="mt-4 text-xs">{contactLocation}</p>
            </div>
          </div>
        </FadeIn>

        <div className="mt-16 border-t border-[var(--border)] pt-8 text-xs text-[var(--muted)]">
          <p>{copyright.includes('©') ? copyright : `© ${copyright}`}</p>
        </div>
      </div>
    </footer>
  );
}
