'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ObermannMark from '@/components/ui/ObermannMark';

const ease = [0.16, 1, 0.3, 1] as const;

function heroSubtitleLines(subtitle: string): string[] {
  if (subtitle.includes('\n')) {
    return subtitle.split('\n').map((line) => line.trim()).filter(Boolean);
  }

  const normalized = subtitle.replace(/\s+/g, ' ').trim();
  const defaultText =
    "I'm Abeer Nisar, a UI/UX Designer passionate about creating intuitive interfaces while exploring AI-powered products that combine creativity, technology, and meaningful user experiences.";

  if (normalized === defaultText.replace(/\s+/g, ' ').trim()) {
    return [
      "I'm Abeer Nisar, a UI/UX Designer passionate about creating intuitive interfaces",
      'while exploring AI-powered products that combine creativity, technology, and',
      'meaningful user experiences.',
    ];
  }

  return [subtitle];
}

const DEFAULT_SUBTITLE = [
  "I'm Abeer Nisar, a UI/UX Designer passionate about creating intuitive interfaces",
  'while exploring AI-powered products that combine creativity, technology, and',
  'meaningful user experiences.',
].join('\n');

function heroTitleLines(title: string): string[] {
  if (title.includes('\n')) {
    return title.split('\n').map((line) => line.trim()).filter(Boolean);
  }
  const match = title.match(/^(.+?)\s+(Functional Products\.?)$/i);
  if (match) return [match[1].trim(), match[2].trim()];
  return [title];
}

interface HeroSectionProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
}

export default function HeroSection({
  eyebrow = 'UI/UX DESIGNER • PRODUCT DESIGNER',
  title = 'Turning Ideas Into Beautiful &\nFunctional Products.',
  subtitle = DEFAULT_SUBTITLE,
  ctaLabel = 'View My Work',
  ctaHref = '/projects',
  secondaryCtaLabel = 'Download Resume',
  secondaryCtaHref = '/uploads/Abeer%20nisar%20resume.pdf',
}: HeroSectionProps) {
  return (
    <section className="obermann-hero px-6">
      {/* Large geometric mark behind text */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease }}
          className="relative h-[min(78vw,580px)] w-[min(78vw,580px)]"
        >
          <ObermannMark className="h-full w-full opacity-[0.48]" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="obermann-hero-content">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="obermann-hero-eyebrow"
        >
          {eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.1, ease }}
          className="obermann-hero-title"
        >
          {heroTitleLines(title).map((line, index) => (
            <span key={index} className="obermann-hero-title-line">
              {line}
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
          className="obermann-hero-subtitle"
        >
          {heroSubtitleLines(subtitle).map((line, index) => (
            <span key={index} className="obermann-hero-subtitle-line">
              {line}
            </span>
          ))}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.38, ease }}
          className="obermann-hero-actions"
        >
          <Link href={ctaHref} className="btn-obermann interactive-cursor">
            {ctaLabel}
          </Link>
          {secondaryCtaHref && (
            <a
              href={secondaryCtaHref}
              target={secondaryCtaHref.startsWith('http') ? '_blank' : undefined}
              rel={secondaryCtaHref.startsWith('http') ? 'noopener noreferrer' : undefined}
              download={secondaryCtaHref.includes('/uploads/') ? '' : undefined}
              className="btn-obermann-outline interactive-cursor"
            >
              {secondaryCtaLabel}
            </a>
          )}
        </motion.div>
      </div>

      {/* Bottom left scroll hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute bottom-8 left-6 z-10 text-[0.6875rem] lowercase tracking-[0.12em] text-white/50 sm:left-10 lg:left-12"
      >
        scroll to explore
      </motion.p>
    </section>
  );
}
