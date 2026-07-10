'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, CheckCircle, Globe, Smartphone, Layers } from 'lucide-react';
import { fallbackData } from '@/services/apiService';
import MagneticButton from '@/components/ui/MagneticButton';
import { useCms } from '@/context/CmsContext';

const FigmaIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
    <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
    <path d="M12 9h3.5a3.5 3.5 0 1 1-3.5 3.5V9z" />
    <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
    <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
  </svg>
);

const iconMap: { [key: string]: any } = { Figma: FigmaIcon, Globe, Smartphone, Layers };

export default function Services() {
  const { cms, loading, getContent } = useCms();
  const page = getContent<{
    eyebrow?: string;
    heading?: string;
    intro?: string;
    pricingEyebrow?: string;
    pricingHeading?: string;
    pricingTiers?: { name: string; price: string; description: string; features: string[]; cta: string; featured?: boolean }[];
    faqEyebrow?: string;
    faqHeading?: string;
    faqs?: { question: string; answer: string }[];
  }>('services.page');
  const [openFaqIndex, setOpenFaqIndex] = useState<string | null>(null);

  const services = (cms.services as typeof fallbackData.services).length
    ? (cms.services as typeof fallbackData.services)
    : fallbackData.services;

  const pricingTiers = page.pricingTiers || [
    { name: 'Design Sprint', price: '$500', description: 'Perfect for startups needing to validate an idea quickly.', features: ['Interactive Figma Prototype', 'Up to 5 Key Mobile/Web Screens', 'Core Design Style Guide', '1 Round of Revisions', 'Developer-ready Handoff Spec'], cta: 'Request Design Sprint' },
    { name: 'Full Product Design', price: '$1,200', description: 'Complete UI/UX design cycle for a full web/mobile application.', features: ['Complete UX Audit & Flows', 'Figma Design System Components', 'Up to 15 Screens (Web + Mobile)', '3 Rounds of Revisions', 'Comprehensive Handoff Assets', '2 Weeks of Developer Support'], cta: 'Request Full Design', featured: true },
    { name: 'Design System Kit', price: '$800', description: 'Standardize visual consistency across all engineering teams.', features: ['Custom variables (color/spacing)', 'Typography Styles & Grids', 'Core Component Library (Buttons/Forms)', 'Figma Component Properties setup', 'PDF Guideline Specs Documentation'], cta: 'Build My Design System' },
  ];

  const faqs = (page.faqs || []).map((f) => ({ q: f.question, a: f.answer }));
  const displayFaqs = faqs.length ? faqs : [
    { q: 'What is your typical project timeline?', a: 'A single landing page design generally takes 1-2 weeks. A full application design containing user research, detailed wireframes, and prototypes usually takes 4-6 weeks.' },
    { q: 'Which tools do you design with?', a: 'I design exclusively with Figma. For video editing and marketing asset creation, I use CapCut, Adobe Photoshop, and Illustrator.' },
    { q: 'Do you write code or just design interfaces?', a: 'I specialize in UI/UX design, but I have a strong background in IT, enabling me to write clean HTML/CSS, Tailwind CSS, JavaScript, and React templates that frontend developers can drop right into their projects.' },
    { q: 'How do revisions work?', a: 'Each package includes a set number of revision rounds. We review wireframes and styles early, ensuring that the final high-fidelity mockup aligns perfectly with your goals.' },
  ];

  return (
    <div className="relative overflow-hidden pb-24 pt-32">
      <div className="glow-spot top-[15%] right-[10%] opacity-20" />
      <div className="glow-spot bottom-[15%] left-[5%] opacity-25" />

      <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
        <section className="section-shell mb-20 px-8 py-10 sm:px-10 lg:px-14 lg:py-16">
          <span className="brand-eyebrow">{page.eyebrow || 'Offerings List'}</span>
          <h1 className="brand-heading mb-6">{page.heading || 'Services & Pricing'}<span className="text-[#8B5CF6]">.</span></h1>
          <p className="max-w-2xl text-lg leading-8 text-[#9B99A8">
            {page.intro || 'Providing premium design capability, high-conversion web structures, and components designed to align visual elements seamlessly.'}
          </p>
        </section>

        <section className="mb-24 grid gap-8 md:grid-cols-2">
          {loading ? (
            Array(4).fill(0).map((_, i) => <div key={i} className="h-64 animate-pulse rounded-[1.5rem] border border-white/10 bg-[#15111E]/70" />))
          : (
            services.map((service, idx) => {
              const Icon = iconMap[service.icon] || Globe;
              return (
                <div key={service.id || idx} className="glass-panel flex flex-col justify-between p-8">
                  <div>
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#8B5CF6]/10 text-[#C084FC]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mb-4 text-xl font-semibold text-white">{service.title}</h3>
                    <p className="mb-6 text-sm leading-7 text-[#9B99A8]">{service.description}</p>
                  </div>
                  {service.price && (
                    <div className="flex items-center justify-between border-t border-white/10 pt-6 text-sm">
                      <span className="uppercase tracking-[0.25em] text-[#9B99A8]">Starting from</span>
                      <span className="font-mono font-semibold text-white">{service.price}</span>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </section>

        <section className="mb-24">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="brand-eyebrow">{page.pricingEyebrow || 'Budget Estimator'}</span>
            <h2 className="brand-heading">{page.pricingHeading || 'Structured Pricing Packages'}</h2>
          </div>

          <div className="grid items-stretch gap-8 lg:grid-cols-3">
            {pricingTiers.map((tier, idx) => (
              <div key={idx} className={`glass-panel relative flex flex-col justify-between overflow-hidden p-8 ${tier.featured ? 'ring-1 ring-[#8B5CF6]/40' : ''}`}>
                {tier.featured && <div className="absolute right-4 top-4 rounded-full bg-[#8B5CF6] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white">Recommended</div>}
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-white">{tier.name}</h3>
                  <p className="mb-6 text-xs text-[#9B99A8]">{tier.description}</p>
                  <div className="mb-8 flex items-baseline gap-1">
                    <span className="font-mono text-4xl font-black text-white">{tier.price}</span>
                    <span className="text-xs text-[#9B99A8]">/ project</span>
                  </div>
                  <ul className="mb-8 space-y-3.5">
                    {tier.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-xs leading-6 text-[#9B99A8]">
                        <CheckCircle className="h-4 w-4 shrink-0 text-[#8B5CF6]" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href="/contact" className="w-full">
                  <MagneticButton className={`w-full rounded-full py-3 text-xs font-semibold uppercase tracking-[0.25em] transition-colors duration-300 ${tier.featured ? 'bg-[#8B5CF6] text-white' : 'border border-white/10 bg-white/5 text-white hover:bg-white/10'}`}>
                    {tier.cta}
                  </MagneticButton>
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-4xl">
          <div className="mb-16 text-center">
            <span className="brand-eyebrow">{page.faqEyebrow || 'Frequently Asked'}</span>
            <h2 className="brand-heading">{page.faqHeading || 'Got Questions?'}</h2>
          </div>

          <div className="space-y-4">
            {displayFaqs.map((faq, i) => {
              const isOpen = openFaqIndex === String(i);
              return (
                <div key={i} className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#15111E]/80">
                  <button onClick={() => setOpenFaqIndex(isOpen ? null : String(i))} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left outline-none">
                    <span className="text-sm font-semibold text-white transition-colors duration-200 md:text-base">{faq.q}</span>
                    <div className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-[#8B5CF6]/10 text-[#C084FC]">
                      {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                    </div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
                        <div className="border-t border-white/10 px-6 pb-5 pt-3 text-sm leading-7 text-[#9B99A8]">{faq.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
