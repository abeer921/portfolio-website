'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  aspectClass?: string;
  delay?: number;
}

export default function ImageReveal({
  src,
  alt,
  className = '',
  imageClassName = '',
  priority = false,
  sizes = '100vw',
  aspectClass = 'aspect-[4/3]',
  delay = 0,
}: ImageRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
      whileInView={{ opacity: 1, clipPath: 'inset(0% 0 0 0)' }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative overflow-hidden rounded-2xl bg-[var(--surface-muted)] ${aspectClass} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={`object-cover transition duration-700 group-hover:scale-[1.05] ${imageClassName}`}
      />
      <div className="pointer-events-none absolute inset-0 bg-[var(--foreground)]/0 transition duration-500 group-hover:bg-[var(--foreground)]/5" />
    </motion.div>
  );
}
