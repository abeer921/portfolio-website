'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, CheckCircle, Globe, Smartphone, Layers, HelpCircle } from 'lucide-react';
import { apiService, fallbackData } from '@/services/apiService';
import MagneticButton from '@/components/ui/MagneticButton';

const FigmaIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
    <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
    <path d="M12 9h3.5a3.5 3.5 0 1 1-3.5 3.5V9z" />
    <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
    <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
  </svg>
);

const iconMap: { [key: string]: any } = {
  Figma: FigmaIcon,
  Globe: Globe,
  Smartphone: Smartphone,
  Layers: Layers,
};

export default function Services() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState<string | null>(null);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await apiService.getServices();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };
    loadServices();
  }, []);

  const pricingTiers = [
    {
      name: 'Design Sprint',
      price: '$500',
      description: 'Perfect for startups needing to validate an idea quickly.',
      features: [
        'Interactive Figma Prototype',
        'Up to 5 Key Mobile/Web Screens',
        'Core Design Style Guide',
        '1 Round of Revisions',
        'Developer-ready Handoff Spec'
      ],
      cta: 'Request Design Sprint'
    },
    {
      name: 'Full Product Design',
      price: '$1,200',
      description: 'Complete UI/UX design cycle for a full web/mobile application.',
      features: [
        'Complete UX Audit & Flows',
        'Figma Design System Components',
        'Up to 15 Screens (Web + Mobile)',
        '3 Rounds of Revisions',
        'Comprehensive Handoff Assets',
        '2 Weeks of Developer Support'
      ],
      cta: 'Request Full Design',
      featured: true
    },
    {
      name: 'Design System Kit',
      price: '$800',
      description: 'Standardize visual consistency across all engineering teams.',
      features: [
        'Custom variables (color/spacing)',
        'Typography Styles & Grids',
        'Core Component Library (Buttons/Forms)',
        'Figma Component Properties setup',
        'PDF Guideline Specs Documentation'
      ],
      cta: 'Build My Design System'
    }
  ];

  const faqs = [
    {
      q: 'What is your typical project timeline?',
      a: 'A single landing page design generally takes 1-2 weeks. A full application design containing user research, detailed wireframes, and prototypes usually takes 4-6 weeks.'
    },
    {
      q: 'Which tools do you design with?',
      a: 'I design exclusively with Figma. For video editing and marketing asset creation, I use CapCut, Adobe Photoshop, and Illustrator.'
    },
    {
      q: 'Do you write code or just design interfaces?',
      a: 'I specialize in UI/UX design, but I have a strong background in IT, enabling me to write clean HTML/CSS, Tailwind CSS, JavaScript, and React templates that frontend developers can drop right into their projects.'
    },
    {
      q: 'How do revisions work?',
      a: 'Each package includes a set number of revision rounds. We review wireframes and styles early, ensuring that the final high-fidelity mockup aligns perfectly with your goals.'
    }
  ];

  return (
    <div className="relative pt-32 pb-24 overflow-hidden">
      {/* Background glow spots */}
      <div className="glow-spot top-[15%] right-[10%] opacity-20" />
      <div className="glow-spot bottom-[15%] left-[5%] opacity-25" />

      {/* Grid Dot Background */}
      <div className="absolute inset-0 dot-bg opacity-30 z-0 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
        
        {/* Header Title */}
        <section className="mb-20">
          <span className="text-[#d4af37] text-xs font-semibold tracking-wider uppercase mb-2 block">OFFERINGS LIST</span>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight mb-6">
            Services & Pricing<span className="text-[#d4af37]">.</span>
          </h1>
          <p className="text-zinc-500 text-lg leading-relaxed max-w-2xl">
            Providing premium design capability, high-conversion web structures, and components designed to align visual elements seamlessly.
          </p>
        </section>

        {/* ==========================================
            CAPABILITY LIST
            ========================================== */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          {loading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="h-64 rounded-2xl bg-zinc-950/40 border border-zinc-900 animate-pulse" />
            ))
          ) : (
            (services.length > 0 ? services : fallbackData.services).map((service, idx) => {
              const Icon = iconMap[service.icon] || Globe;
              return (
                <div key={service.id || idx} className="p-8 rounded-2xl bg-zinc-950 border border-zinc-900 hover:border-zinc-800 transition-colors duration-300 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 text-[#d4af37]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-white mb-4">{service.title}</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed mb-6">{service.description}</p>
                  </div>
                  {service.price && (
                    <div className="flex justify-between items-center pt-6 border-t border-zinc-900/50">
                      <span className="text-zinc-500 text-xs uppercase tracking-wider">Starting from</span>
                      <span className="text-white font-mono font-bold text-lg">{service.price}</span>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </section>

        {/* ==========================================
            PRICING TIERS
            ========================================== */}
        <section className="mb-32">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#d4af37] text-xs font-semibold tracking-wider uppercase mb-2 block">BUDGET ESTIMATOR</span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white tracking-tight">Structured Pricing Packages</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {pricingTiers.map((tier, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden ${
                  tier.featured
                    ? 'bg-zinc-950 border-2 border-[#d4af37] shadow-xl shadow-[#d4af37]/5'
                    : 'bg-zinc-950 border border-zinc-900'
                }`}
              >
                {tier.featured && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-[#d4af37] text-black font-semibold text-[10px] tracking-wider uppercase rounded-full">
                    RECOMMENDED
                  </div>
                )}
                <div>
                  <h3 className="font-display font-bold text-xl text-white mb-2">{tier.name}</h3>
                  <p className="text-zinc-500 text-xs mb-6">{tier.description}</p>
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-white font-mono font-black text-4xl">{tier.price}</span>
                    <span className="text-zinc-500 text-xs">/ project</span>
                  </div>
                  <ul className="space-y-3.5 mb-8">
                    {tier.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-zinc-400 text-xs">
                        <CheckCircle className="w-4 h-4 text-[#d4af37] shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href="/contact" className="w-full">
                  <MagneticButton className={`w-full py-3 text-xs font-semibold uppercase tracking-wider rounded-full transition-colors duration-300 ${
                    tier.featured
                      ? 'bg-[#d4af37] hover:bg-[#bda02b] text-black'
                      : 'bg-zinc-900 hover:bg-zinc-850 text-white border border-zinc-800'
                  }`}>
                    {tier.cta}
                  </MagneticButton>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================
            FAQ ACCORDION
            ========================================== */}
        <section className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#d4af37] text-xs font-semibold tracking-wider uppercase mb-2 block">FREQUENTLY ASKED</span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white tracking-tight">Got Questions?</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => {
              const isOpen = openFaqIndex === String(i);
              return (
                <div key={i} className="rounded-xl bg-zinc-950 border border-zinc-900 overflow-hidden">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : String(i))}
                    className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left outline-none group"
                  >
                    <span className="font-semibold text-white group-hover:text-[#d4af37] transition-colors duration-200 text-sm md:text-base">
                      {faq.q}
                    </span>
                    <div className="w-6 h-6 rounded-full bg-zinc-900 border border-zinc-850 flex items-center justify-center text-zinc-400">
                      {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-5 pt-1 text-zinc-500 text-sm leading-relaxed border-t border-zinc-900/50">
                          {faq.a}
                        </div>
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
