'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function MagneticButton({
  children,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const xTo = gsap.quickTo(button, 'x', { duration: 0.8, ease: 'power3.out' });
    const yTo = gsap.quickTo(button, 'y', { duration: 0.8, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const rect = button.getBoundingClientRect();
      const x = clientX - (rect.left + rect.width / 2);
      const y = clientY - (rect.top + rect.height / 2);
      
      // Pull element 35% closer to mouse position
      xTo(x * 0.35);
      yTo(y * 0.35);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative inline-flex items-center justify-center transition-transform duration-100 ${className}`}
    >
      {children}
    </button>
  );
}
