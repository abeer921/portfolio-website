'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Services', path: '/services' },
  { name: 'Blogs', path: '/blogs' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Hide public navbar on admin pages
  const isAdminPage = pathname?.startsWith('/admin');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  if (isAdminPage) return null;

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 md:px-12 ${
          scrolled ? 'py-4' : 'py-6'
        }`}
      >
        <div className={`mx-auto max-w-7xl flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 ${
          scrolled 
            ? 'glass-panel bg-black/60 shadow-lg shadow-black/20' 
            : 'bg-transparent border-transparent'
        }`}>
          {/* Logo */}
          <Link href="/">
            <MagneticButton className="flex items-center gap-2 group">
              <span className="font-display font-black text-2xl tracking-tighter text-white">
                Abeer<span className="text-[#d4af37]">.</span>
              </span>
            </MagneticButton>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link key={item.path} href={item.path} className="relative py-2 group">
                  <span className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                    isActive ? 'text-[#d4af37]' : 'text-zinc-400 group-hover:text-white'
                  }`}>
                    {item.name}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d4af37] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="/contact">
              <MagneticButton className="px-5 py-2.5 rounded-full border border-zinc-800 hover:border-[#d4af37] bg-zinc-950 text-white font-medium text-xs tracking-wider uppercase flex items-center gap-2 transition-all duration-300">
                Let's Talk
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform duration-300" />
              </MagneticButton>
            </Link>
          </div>

          {/* Mobile Hamburguer Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-zinc-400 hover:text-white rounded-full bg-zinc-900/50 border border-zinc-800/50"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Nav Screen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md flex flex-col justify-center px-10 md:hidden"
          >
            <nav className="flex flex-col gap-6 text-left">
              {navItems.map((item, index) => {
                const isActive = pathname === item.path;
                return (
                  <motion.div
                    key={item.path}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
                  >
                    <Link
                      href={item.path}
                      className={`font-display text-4xl font-semibold tracking-tight ${
                        isActive ? 'text-[#d4af37]' : 'text-zinc-600 hover:text-white'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-16 border-t border-zinc-900 pt-8"
            >
              <p className="text-xs tracking-wider uppercase text-zinc-500 mb-2">Available for projects</p>
              <a href="mailto:abeernisar11@gmail.com" className="text-[#d4af37] font-medium text-lg hover:underline">
                abeernisar11@gmail.com
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
