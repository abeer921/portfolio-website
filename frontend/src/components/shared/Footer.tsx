'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUp, ArrowUpRight, Heart, Lock } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';

export default function Footer() {
  const pathname = usePathname();
  const [timeString, setTimeString] = useState('');
  const isAdminPage = pathname?.startsWith('/admin');

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Karachi',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      };
      const lahoreTime = new Intl.DateTimeFormat('en-US', options).format(new Date());
      setTimeString(lahoreTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (isAdminPage) return null;

  return (
    <footer className="relative bg-[#08080a] border-t border-zinc-900 overflow-hidden pt-20 pb-10 px-6 md:px-12">
      {/* Background radial highlight */}
      <div className="glow-spot bottom-[-200px] left-[50%] -translate-x-1/2 opacity-60" />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Block */}
          <div className="md:col-span-2">
            <h2 className="font-display font-black text-3xl text-white tracking-tight mb-4">
              Abeer Nisar<span className="text-[#d4af37]">.</span>
            </h2>
            <p className="text-zinc-500 text-sm max-w-sm leading-relaxed mb-6">
              Passionate about designing and constructing interfaces that are highly functional, responsive, and visually outstanding. Currently based in Pakistan.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-950 border border-zinc-900 text-xs text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Available for Freelance & Remote roles
            </div>
          </div>

          {/* Sitemap */}
          <div>
            <h4 className="text-zinc-400 text-xs font-semibold tracking-wider uppercase mb-6">Explore</h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'About', path: '/about' },
                { name: 'Projects', path: '/projects' },
                { name: 'Services', path: '/services' },
                { name: 'Blogs', path: '/blogs' },
              ].map((link) => (
                <li key={link.path}>
                  <Link href={link.path} className="text-zinc-500 hover:text-white transition-colors duration-200 text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials / Links */}
          <div>
            <h4 className="text-zinc-400 text-xs font-semibold tracking-wider uppercase mb-6">Connect</h4>
            <ul className="space-y-3">
              {[
                { name: 'LinkedIn', url: 'https://linkedin.com/in/beer-nisar-a81928323' },
                { name: 'GitHub', url: 'https://github.com/abeernisar' },
                { name: 'Figma Portfolio', url: 'https://figma.com/@abeernisar' },
                { name: 'Email Me', url: 'mailto:abeernisar11@gmail.com' },
              ].map((social) => (
                <li key={social.name}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-500 hover:text-white transition-colors duration-200 text-sm flex items-center gap-1 group"
                  >
                    {social.name}
                    <ArrowUpRight className="w-3 h-3 text-zinc-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Big Signature Footer Text */}
        <div className="border-t border-zinc-900 pt-10 pb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 text-xs text-zinc-500">
            <span>&copy; {new Date().getFullYear()} Abeer Nisar. All rights reserved.</span>
            <span className="hidden md:inline text-zinc-800">|</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-[#d4af37] fill-[#d4af37]" /> and Next.js
            </span>
            <span className="hidden md:inline text-zinc-800">|</span>
            {timeString && (
              <span className="text-zinc-400">
                Lahore, PK: <span className="font-mono text-white font-medium">{timeString}</span> PST
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Back to Top */}
            <MagneticButton
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-zinc-950 border border-zinc-900 hover:border-[#d4af37] flex items-center justify-center text-zinc-400 hover:text-white transition-colors duration-300"
            >
              <ArrowUp className="w-4 h-4" />
            </MagneticButton>

            {/* Admin Login Link */}
            <Link href="/admin/login">
              <MagneticButton className="w-10 h-10 rounded-full bg-zinc-950 border border-zinc-900 hover:border-[#d4af37] flex items-center justify-center text-zinc-500 hover:text-white transition-colors duration-300">
                <Lock className="w-3.5 h-3.5" />
              </MagneticButton>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
