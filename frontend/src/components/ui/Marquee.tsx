'use client';

import React from 'react';

interface MarqueeProps {
  items: string[];
  direction?: 'left' | 'right';
  speed?: 'slow' | 'medium' | 'fast';
}

export default function Marquee({ items, direction = 'left', speed = 'medium' }: MarqueeProps) {
  const duration = speed === 'slow' ? '40s' : speed === 'medium' ? '25s' : '15s';
  
  // Duplicate list to guarantee seamless scroll loop width
  const repeatedItems = [...items, ...items, ...items, ...items];
  
  return (
    <div className="relative flex overflow-hidden border-y border-[rgba(255,255,255,0.05)] py-6 bg-[rgba(255,255,255,0.01)] w-full">
      <div 
        className="flex space-x-12 whitespace-nowrap animate-marquee"
        style={{
          animationDuration: duration,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
        }}
      >
        {repeatedItems.map((item, idx) => (
          <span 
            key={idx} 
            className="text-4xl md:text-6xl font-display font-bold uppercase tracking-wider text-[rgba(255,255,255,0.15)] hover:text-[#d4af37] transition-colors duration-300 select-none cursor-default px-4"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
