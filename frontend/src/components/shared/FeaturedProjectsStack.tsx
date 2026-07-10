'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from '@/components/ui/FadeIn';

interface Project {
  id: string;
  title: string;
  description?: string;
  category?: string;
  images?: string[];
}

interface FeaturedProjectsStackProps {
  projects: Project[];
  title?: string;
  intro?: string;
  showBrowseAll?: boolean;
  browseAllLabel?: string;
  className?: string;
}

function StackCard({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start start', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, index === total - 1 ? 1 : 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, index === total - 1 ? 1 : 0.45]);
  const y = useTransform(scrollYProgress, [0, 1], [0, index === total - 1 ? 0 : -28]);

  const imageSrc =
    project.images?.[0] ||
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80';

  return (
    <div
      ref={cardRef}
      className="featured-stack-item"
      style={{ zIndex: index + 1 }}
    >
      <motion.div style={{ scale, opacity, y }} className="featured-stack-card-motion">
        <Link
          href={`/projects/${project.id}`}
          className="featured-stack-card interactive-cursor group"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt={project.title}
            className="featured-stack-card-image"
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
          />
          <div className="featured-stack-card-overlay" aria-hidden />

          <div className="featured-stack-card-content">
            {project.category && (
              <span className="featured-stack-badge">{project.category}</span>
            )}
            <h3 className="featured-stack-title">{project.title}</h3>
            {project.description && (
              <p className="featured-stack-desc">{project.description}</p>
            )}
            <span className="featured-stack-cta">View case study</span>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}

export default function FeaturedProjectsStack({
  projects,
  title = 'Featured Projects',
  intro = 'These selected projects reflect my passion for blending strategy with creativity — solving real problems through thoughtful design and impactful storytelling.',
  showBrowseAll = true,
  browseAllLabel = 'Browse All Projects',
  className = '',
}: FeaturedProjectsStackProps) {
  if (!projects.length) return null;

  return (
    <section className={`featured-stack-section border-t border-[var(--border)] theme-transition ${className}`}>
      {title && (
        <div className="mx-auto max-w-7xl px-6 pt-20 sm:px-8 lg:px-12 lg:pt-28">
          <FadeIn>
            <h2 className="featured-stack-heading">{title}</h2>
            {intro && <p className="featured-stack-intro">{intro}</p>}
          </FadeIn>
        </div>
      )}

      <div className={`featured-stack-list mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 ${!title ? 'pt-4' : ''}`}>
        {projects.map((project, index) => (
          <StackCard
            key={project.id}
            project={project}
            index={index}
            total={projects.length}
          />
        ))}
      </div>

      {showBrowseAll ? (
        <FadeIn className="mx-auto max-w-7xl px-6 pb-20 text-center sm:px-8 lg:px-12 lg:pb-28">
          <Link href="/projects" className="btn-secondary interactive-cursor px-8 py-3.5 text-sm">
            {browseAllLabel}
          </Link>
        </FadeIn>
      ) : (
        <div className="pb-20 lg:pb-28" />
      )}
    </section>
  );
}
