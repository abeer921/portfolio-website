'use client';

import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function ThemeToggle({ onHero = false }: { onHero?: boolean }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`interactive-cursor relative flex h-8 w-8 items-center justify-center rounded-full border transition-colors duration-400 ${
        onHero
          ? 'border-white/20 text-white'
          : 'border-[var(--border)] text-[var(--foreground)]'
      }`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <motion.span
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180, opacity: theme === 'dark' ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        className="absolute"
      >
        <Moon className="h-3.5 w-3.5" />
      </motion.span>
      <motion.span
        initial={false}
        animate={{ rotate: theme === 'light' ? 0 : -180, opacity: theme === 'light' ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        className="absolute"
      >
        <Sun className="h-3.5 w-3.5" />
      </motion.span>
    </motion.button>
  );
}
