'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ObermannMark from '@/components/ui/ObermannMark';
import {
  DEFAULT_HERO_SUBTITLE,
  DEFAULT_HERO_TITLE,
  heroSubtitleLines,
  heroTitleLines,
} from '@/lib/heroContent';

const ease = [0.16, 1, 0.3, 1] as const;

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
  title = DEFAULT_HERO_TITLE,
  subtitle = DEFAULT_HERO_SUBTITLE,
  ctaLabel = 'View My Work',
  ctaHref = '/projects',
  secondaryCtaLabel = 'Download Resume',
  secondaryCtaHref = '/uploads/Abeer%20nisar%20resume.pdf',
}: HeroSectionProps) {
  return (
    <section className="obermann-hero">
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

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.1, ease }}
          className="obermann-hero-title-wrap"
        >
          <h1 className="obermann-hero-title">
            {heroTitleLines(title).slice(0, 2).map((line, index) => (
              <span key={index} className="obermann-hero-title-line">
                {line}
              </span>
            ))}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
          className="obermann-hero-subtitle-wrap"
        >
          <p className="obermann-hero-subtitle">
            {heroSubtitleLines(subtitle).join('\n')}
          </p>
        </motion.div>

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
