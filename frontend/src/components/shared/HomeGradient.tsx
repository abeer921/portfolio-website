'use client';

import { useEffect } from 'react';

export default function HomeGradient() {
  useEffect(() => {
    document.documentElement.classList.add('home-gradient');
    return () => document.documentElement.classList.remove('home-gradient');
  }, []);

  return null;
}
