'use client';

import Image from 'next/image';

interface MarqueeImage {
  src: string;
  alt: string;
  label?: string;
}

interface MarqueeProps {
  items?: string[];
  images?: MarqueeImage[];
  direction?: 'left' | 'right';
  speed?: 'slow' | 'medium' | 'fast';
  variant?: 'default' | 'transparent';
}

export default function Marquee({ items, images, direction = 'left', speed = 'medium', variant = 'default' }: MarqueeProps) {
  const duration = speed === 'slow' ? '45s' : speed === 'medium' ? '28s' : '16s';
  const stripCls =
    variant === 'transparent'
      ? 'relative overflow-hidden border-y border-[var(--border)] bg-white/[0.03] py-6 backdrop-blur-sm theme-transition'
      : 'relative overflow-hidden border-y border-[var(--border)] bg-[var(--surface-muted)] py-6 theme-transition';

  if (images && images.length > 0) {
    const repeated = [...images, ...images];
    return (
      <div className={stripCls}>
        <div
          className="flex shrink-0 gap-6 animate-marquee"
          style={{
            animationDuration: duration,
            animationDirection: direction === 'right' ? 'reverse' : 'normal',
          }}
        >
          {repeated.map((img, idx) => (
            <div key={idx} className="relative h-28 w-44 shrink-0 overflow-hidden rounded-xl sm:h-36 sm:w-56">
              <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="224px" />
              {img.label && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <span className="text-xs font-medium text-white">{img.label}</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <div
          className="flex shrink-0 gap-6 animate-marquee"
          aria-hidden
          style={{
            animationDuration: duration,
            animationDirection: direction === 'right' ? 'reverse' : 'normal',
          }}
        >
          {repeated.map((img, idx) => (
            <div key={idx} className="relative h-28 w-44 shrink-0 overflow-hidden rounded-xl sm:h-36 sm:w-56">
              <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="224px" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const repeatedItems = [...(items || []), ...(items || [])];
  return (
    <div className="relative overflow-hidden border-y border-[var(--border)] py-8 theme-transition">
      <div
        className="flex shrink-0 gap-16 whitespace-nowrap animate-marquee"
        style={{
          animationDuration: duration,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
        }}
      >
        {repeatedItems.map((item, idx) => (
          <span key={idx} className="font-display text-3xl font-medium tracking-tight text-[var(--muted)] select-none sm:text-5xl">
            {item}
            <span className="mx-8 opacity-40">/</span>
          </span>
        ))}
      </div>
      <div
        className="flex shrink-0 gap-16 whitespace-nowrap animate-marquee"
        aria-hidden
        style={{
          animationDuration: duration,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
        }}
      >
        {repeatedItems.map((item, idx) => (
          <span key={idx} className="font-display text-3xl font-medium tracking-tight text-[var(--muted)] select-none sm:text-5xl">
            {item}
            <span className="mx-8 opacity-40">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
