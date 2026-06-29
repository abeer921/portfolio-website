'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const cursorX = gsap.quickTo(cursor, 'x', { duration: 0.1, ease: 'none' });
    const cursorY = gsap.quickTo(cursor, 'y', { duration: 0.1, ease: 'none' });
    const followerX = gsap.quickTo(follower, 'x', { duration: 0.4, ease: 'power3.out' });
    const followerY = gsap.quickTo(follower, 'y', { duration: 0.4, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setIsHidden(false);
      cursorX(clientX);
      cursorY(clientY);
      followerX(clientX);
      followerY(clientY);
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
    };

    const addHoverListeners = () => {
      const targets = document.querySelectorAll('a, button, [role="button"], input, textarea, select, .interactive-cursor');
      targets.forEach((target) => {
        target.addEventListener('mouseenter', () => setIsHovered(true));
        target.addEventListener('mouseleave', () => setIsHovered(false));
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    addHoverListeners();

    // Observe body for changes to bind dynamically created components
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Center dot */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-1.5 h-1.5 bg-[#d4af37] rounded-full pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 hidden md:block ${
          isHidden ? 'opacity-0' : 'opacity-100'
        }`}
      />
      {/* Outer ring */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 w-8 h-8 border border-[#d4af37] rounded-full pointer-events-none z-[99998] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out hidden md:block ${
          isHidden ? 'opacity-0 scale-50' : 'opacity-100'
        } ${isHovered ? 'scale-150 bg-[rgba(212,175,55,0.08)] border-solid border-[#d4af37]' : ''}`}
      />
    </>
  );
}
