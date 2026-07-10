'use client';

import { useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';
import { useCms } from '@/context/CmsContext';

const ease = [0.16, 1, 0.3, 1] as const;
const PREVIEW_OFFSET = 28;

const DEFAULT_SERVICES = [
  {
    num: '1',
    title: 'UI/UX Design',
    previewImage: '/images/services/ui-ux.jpg',
    items: [
      'Wireframing and prototyping',
      'User interface design for web and mobile',
      'Usability testing and feedback analysis',
      'Interaction design and micro-animations',
    ],
  },
  {
    num: '2',
    title: 'Graphic Design',
    previewImage: '/images/services/graphic-design.jpg',
    items: [
      'Visual identity and marketing assets',
      'Social media and campaign graphics',
      'Print and digital collateral',
      'Iconography and illustration support',
    ],
  },
  {
    num: '3',
    title: 'Web Design',
    previewImage: '/images/services/web-design.jpg',
    items: [
      'Responsive website design',
      'Landing page design and optimization',
      'Design-to-development handoff',
      'Website maintenance and updates',
    ],
  },
  {
    num: '4',
    title: 'Branding',
    previewImage: '/images/services/branding.jpg',
    items: [
      'Brand strategy and identity development',
      'Visual style guide creation',
      'Typography and color selection',
      'Brand storytelling and messaging',
    ],
  },
];

type ServiceItem = {
  num?: string;
  title: string;
  previewImage?: string;
  items?: string[];
};

export default function ServicesAccordion() {
  const { cms, getContent } = useCms();
  const section = getContent<{
    heading?: string;
    intro?: string;
    mainImage?: string;
    badgeLeft?: string;
    badgeRight?: string;
  }>('home.services');

  const apiServices = (cms.services as ServiceItem[]).length
    ? (cms.services as ServiceItem[]).map((s, i) => ({
        num: s.num || String(i + 1),
        title: s.title,
        previewImage: s.previewImage || '/images/services/main.jpg',
        items: Array.isArray(s.items) ? s.items : [],
      }))
    : DEFAULT_SERVICES;

  const services = apiServices;
  const mainImage = section.mainImage || '/images/services/main.jpg';
  const heading = section.heading || 'What I can do for you';
  const intro = section.intro || 'As a digital designer, I am a visual storyteller, crafting experiences that connect deeply and spark creativity.';
  const badgeLeft = section.badgeLeft || 'Design';
  const badgeRight = section.badgeRight || 'Craft';
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const previewX = useMotionValue(0);
  const previewY = useMotionValue(0);
  const smoothX = useSpring(previewX, { stiffness: 260, damping: 26, mass: 0.55 });
  const smoothY = useSpring(previewY, { stiffness: 260, damping: 26, mass: 0.55 });

  const updatePreviewPosition = (e: React.MouseEvent) => {
    previewX.set(e.clientX + PREVIEW_OFFSET);
    previewY.set(e.clientY + PREVIEW_OFFSET);
  };

  const handleCategoryClick = (idx: number) => {
    setHoveredIndex(null);
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const showPreview = hoveredIndex !== null && hoveredIndex !== openIndex;
  const hoveredService = showPreview ? services[hoveredIndex] : null;

  return (
    <section className="border-t border-[var(--border)] px-6 py-20 theme-transition sm:px-8 lg:px-12 lg:py-28">
      {/* Cursor-following hover preview */}
      <AnimatePresence>
        {hoveredService && (
          <motion.div
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.82 }}
            transition={{ duration: 0.28, ease }}
            className="service-hover-preview pointer-events-none fixed top-0 left-0 z-[200] hidden overflow-hidden rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.55)] md:block"
            style={{ x: smoothX, y: smoothY, rotate: -3 }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={hoveredIndex}
                src={hoveredService.previewImage}
                alt={hoveredService.title}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.22, ease }}
                className="h-[7.5rem] w-[6.5rem] object-cover sm:h-[8.5rem] sm:w-[7.25rem]"
              />
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto grid max-w-7xl items-start gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        {/* Left — heading + accordion */}
        <div>
          <FadeIn>
            <h2 className="services-accordion-heading">{heading}</h2>
            <p className="services-accordion-intro">{intro}</p>
          </FadeIn>

          <div
            className="mt-12 divide-y divide-[var(--border)] border-y border-[var(--border)]"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {services.map((service, idx) => {
              const isOpen = openIndex === idx;
              return (
                <FadeIn key={service.num || idx} delay={idx * 0.06}>
                  <div>
                    <button
                      type="button"
                      onClick={() => handleCategoryClick(idx)}
                      onMouseEnter={(e) => {
                        if (isOpen) return;
                        setHoveredIndex(idx);
                        updatePreviewPosition(e);
                      }}
                      onMouseMove={(e) => {
                        if (isOpen) return;
                        updatePreviewPosition(e);
                      }}
                      className="interactive-cursor group flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span className="services-accordion-item">
                        {service.num}. {service.title}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 0 : 180 }}
                        transition={{ duration: 0.3, ease }}
                        className="shrink-0 text-[var(--muted-foreground)]"
                      >
                        <ChevronUp className="h-5 w-5" strokeWidth={1.5} />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease }}
                          className="overflow-hidden"
                        >
                          <ul className="space-y-2.5 pb-6 pl-1">
                            {service.items?.map((item) => (
                              <li
                                key={item}
                                className="text-sm leading-relaxed text-[var(--muted-foreground)]"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>

        {/* Right — main section image */}
        <FadeIn delay={0.15} className="flex w-full justify-center lg:justify-end">
          <div className="services-main-image-wrap w-full max-w-md lg:max-w-lg">
            <div className="services-main-image-glow" aria-hidden />

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease }}
              className="services-main-image-frame -rotate-6 transition-transform duration-500 hover:-rotate-3 hover:scale-[1.02]"
            >
              <div className="relative aspect-[4/5] w-full min-h-[320px] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={mainImage}
                  alt="Creative design and digital craft"
                  width={900}
                  height={1125}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="eager"
                  decoding="async"
                />
                <div className="services-main-image-overlay z-[1]" aria-hidden />
                <div className="services-main-image-shine z-[2]" aria-hidden />
              </div>

              <div className="services-main-image-badge">
                <span>{badgeLeft}</span>
                <span className="services-main-image-badge-dot" />
                <span>{badgeRight}</span>
              </div>
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
