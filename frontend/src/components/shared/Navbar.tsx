'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Mail, Phone } from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { ObermannLogo } from '@/components/ui/ObermannMark';
import { useCms } from '@/context/CmsContext';
import { cmsDefaults } from '@/lib/cmsDefaults';

const defaultNav = cmsDefaults.settings.navItems as { name: string; path: string }[];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { cms } = useCms();
  const settings = cms.settings as Record<string, string>;
  const navItems = (Array.isArray(cms.settings.navItems) && cms.settings.navItems.length
    ? cms.settings.navItems
    : defaultNav) as { name: string; path: string }[];
  const brandName = settings.brandName || 'Abeer Nisar';
  const contactEmail = settings.contactEmail || 'abeernisar11@gmail.com';
  const contactPhone = settings.contactPhone || '+92 302 4115583';
  const isHome = pathname === '/';
  const onHero = isHome && !scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    if (path === '/projects') return pathname.startsWith('/projects');
    return pathname === path;
  };

  const textCls = onHero ? 'text-white' : 'text-[var(--foreground)]';
  const mutedCls = onHero ? 'text-white/75 hover:text-white' : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]';
  const iconCls = onHero ? 'text-white/75 hover:text-white' : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]';
  const dividerCls = onHero ? 'bg-white/20' : 'bg-[var(--border)]';

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 px-6 py-6 transition-colors duration-500 sm:px-10 lg:px-14 ${
          scrolled && isHome ? 'bg-[var(--background)]/80 backdrop-blur-xl' : ''
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between">
          <Link href="/" className={`interactive-cursor flex items-center gap-2.5 ${textCls}`}>
            <ObermannLogo size={18} />
            <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em]">
              {brandName}
            </span>
          </Link>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`interactive-cursor relative text-[0.8125rem] transition-colors ${
                  isActive(item.path) ? textCls : mutedCls
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <span className={`absolute -bottom-1 left-0 right-0 h-px ${onHero ? 'bg-white' : 'bg-[var(--foreground)]'}`} />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a href={`mailto:${contactEmail}`} className={`interactive-cursor hidden sm:block ${iconCls}`} aria-label="Email">
              <Mail className="h-4 w-4" />
            </a>
            <a href={`tel:${contactPhone.replace(/\s/g, '')}`} className={`interactive-cursor hidden sm:block ${iconCls}`} aria-label="Phone">
              <Phone className="h-4 w-4" />
            </a>
            <span className={`hidden h-4 w-px sm:block ${dividerCls}`} />
            <ThemeToggle onHero={onHero} />
            <button onClick={() => setIsOpen(!isOpen)} className={`md:hidden ${textCls}`} aria-label="Toggle menu">
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col bg-[var(--background)] px-6 py-8 md:hidden"
          >
            <div className="mt-24 flex flex-col gap-6">
              {navItems.map((item, i) => (
                <motion.div key={item.path} initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.05 }}>
                  <Link href={item.path} className="text-2xl font-medium text-[var(--foreground)]">{item.name}</Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
