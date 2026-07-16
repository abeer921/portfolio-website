'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DESKTOP_MQ = '(min-width: 1024px)';

type ViewportMetrics = {
  cx: number;
  cy: number;
  width: number;
  height: number;
  tilt: number;
};

type ServicesAboutImageMorphProps = {
  servicesImageSrc: string;
  aboutImageSrc: string;
  servicesSectionRef: React.RefObject<HTMLElement | null>;
  aboutSectionRef: React.RefObject<HTMLElement | null>;
  servicesImageFrameRef: React.RefObject<HTMLDivElement | null>;
  aboutImageFrameRef: React.RefObject<HTMLDivElement | null>;
  badgeLeft?: string;
  badgeRight?: string;
};

function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t;
}

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

function readTilt(el: HTMLElement) {
  const transform = window.getComputedStyle(el).transform;
  if (!transform || transform === 'none') return 0;
  const matrix = new DOMMatrix(transform);
  return Math.atan2(matrix.b, matrix.a) * (180 / Math.PI);
}

function getViewportMetrics(el: HTMLElement, tilt: number): ViewportMetrics {
  const rect = el.getBoundingClientRect();
  return {
    cx: rect.left + rect.width / 2,
    cy: rect.top + rect.height / 2,
    width: el.offsetWidth,
    height: el.offsetHeight,
    tilt,
  };
}

export default function ServicesAboutImageMorph({
  servicesImageSrc,
  aboutImageSrc,
  servicesSectionRef,
  aboutSectionRef,
  servicesImageFrameRef,
  aboutImageFrameRef,
  badgeLeft = 'Design',
  badgeRight = 'Craft',
}: ServicesAboutImageMorphProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const tiltsRef = useRef({ from: -6, to: -5 });
  const handoffFromRef = useRef<ViewportMetrics | null>(null);
  const [mounted, setMounted] = useState(false);
  const [canFlip, setCanFlip] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    const mq = window.matchMedia(DESKTOP_MQ);
    const syncCanFlip = () => setCanFlip(mq.matches);
    syncCanFlip();
    mq.addEventListener('change', syncCanFlip);
    return () => mq.removeEventListener('change', syncCanFlip);
  }, []);

  useEffect(() => {
    if (!mounted || reducedMotion || !canFlip) return;

    let flipTrigger: ScrollTrigger | null = null;
    let exitTrigger: ScrollTrigger | null = null;
    let cancelled = false;
    let refreshTimer: number | null = null;

    const handleResize = () => ScrollTrigger.refresh();
    const resizeObserver = new ResizeObserver(() => ScrollTrigger.refresh());

    const cleanup = () => {
      cancelled = true;
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('lenis-ready', onLenisReady);
      resizeObserver.disconnect();
      if (refreshTimer) window.clearTimeout(refreshTimer);
      flipTrigger?.kill();
      exitTrigger?.kill();
      flipTrigger = null;
      exitTrigger = null;

      const source = servicesImageFrameRef.current;
      const target = aboutImageFrameRef.current;
      const scene = sceneRef.current;
      const sourceWrap = source?.closest('.services-main-image-wrap') as HTMLElement | null;
      const targetWrap = target?.closest('.about-home-image-wrap') as HTMLElement | null;

      scene?.classList.remove('is-active');
      if (source) source.style.visibility = '';
      if (target) target.style.visibility = '';
      if (sourceWrap) sourceWrap.style.visibility = '';
      if (targetWrap) targetWrap.style.visibility = '';
    };

    const setup = (): boolean => {
      if (cancelled || flipTrigger) return Boolean(flipTrigger);

      const servicesSection = servicesSectionRef.current;
      const aboutSection = aboutSectionRef.current;
      const source = servicesImageFrameRef.current;
      const target = aboutImageFrameRef.current;
      const scene = sceneRef.current;
      const card = cardRef.current;

      if (!servicesSection || !aboutSection || !source || !target || !scene || !card) {
        return false;
      }

      const sourceWrap = source.closest('.services-main-image-wrap') as HTMLElement | null;
      const targetWrap = target.closest('.about-home-image-wrap') as HTMLElement | null;

      const refreshMetrics = () => {
        tiltsRef.current = {
          from: readTilt(source),
          to: readTilt(target),
        };
      };

      const captureHandoff = () => {
        handoffFromRef.current = getViewportMetrics(source, tiltsRef.current.from);
      };

      const setVisibility = (progress: number) => {
        const flipping = progress > 0.02 && progress < 0.98;

        source.style.visibility = flipping ? 'hidden' : '';
        target.style.visibility = progress >= 0.98 ? '' : 'hidden';

        if (sourceWrap) {
          sourceWrap.style.visibility = flipping ? 'hidden' : '';
        }
        if (targetWrap) {
          targetWrap.style.visibility = progress >= 0.98 ? '' : 'hidden';
        }

        scene.classList.toggle('is-active', flipping);
      };

      const applyFlip = (rawProgress: number) => {
        const progress = gsap.utils.clamp(0, 1, rawProgress);

        if (progress <= 0.02) {
          setVisibility(0);
          return;
        }

        if (!handoffFromRef.current) {
          captureHandoff();
        }

        setVisibility(progress);

        if (progress >= 0.98) return;

        const { from: fromTilt, to: toTilt } = tiltsRef.current;
        const from = handoffFromRef.current ?? getViewportMetrics(source, fromTilt);
        const to = getViewportMetrics(target, toTilt);

        const moveT = smoothstep(progress);
        const flipT = smoothstep(gsap.utils.clamp(0, 1, progress / 0.72));
        const flipDeg = flipT * 180;

        const cx = lerp(from.cx, to.cx, moveT);
        const cy = lerp(from.cy, to.cy, moveT);
        const width = lerp(from.width, to.width, moveT);
        const height = lerp(from.height, to.height, moveT);
        const tilt = lerp(fromTilt, toTilt, moveT);
        const radius = lerp(32, 28, moveT);
        const depthScale = 1 + Math.sin(flipT * Math.PI) * 0.04;

        scene.style.setProperty('--flip-x', `${cx - width / 2}px`);
        scene.style.setProperty('--flip-y', `${cy - height / 2}px`);
        scene.style.setProperty('--flip-w', `${width}px`);
        scene.style.setProperty('--flip-h', `${height}px`);
        scene.style.setProperty('--flip-tilt', `${tilt}deg`);
        scene.style.setProperty('--flip-radius', `${radius}px`);
        card.style.setProperty('--flip-y-deg', `${flipDeg}deg`);
        card.style.setProperty('--flip-scale', String(depthScale));
        card.style.setProperty('--flip-badge', String(Math.max(0, 1 - flipT * 2)));
        card.style.setProperty('--flip-dot', String(Math.max(0, (flipT - 0.5) * 2)));
      };

      refreshMetrics();

      exitTrigger = ScrollTrigger.create({
        trigger: servicesSection,
        start: 'bottom bottom',
        invalidateOnRefresh: true,
        onLeave: () => {
          captureHandoff();
        },
        onEnterBack: () => {
          handoffFromRef.current = null;
        },
      });

      flipTrigger = ScrollTrigger.create({
        trigger: aboutSection,
        start: 'top bottom',
        end: 'top 18%',
        scrub: 0.85,
        invalidateOnRefresh: true,
        onRefresh: () => {
          refreshMetrics();
        },
        onEnter: () => {
          if (!handoffFromRef.current) {
            captureHandoff();
          }
        },
        onLeaveBack: () => {
          handoffFromRef.current = null;
          setVisibility(0);
        },
        onUpdate: (self) => applyFlip(self.progress),
      });

      resizeObserver.observe(servicesSection);
      resizeObserver.observe(aboutSection);
      resizeObserver.observe(source);
      resizeObserver.observe(target);

      applyFlip(flipTrigger.progress);
      ScrollTrigger.refresh();

      return true;
    };

    const trySetup = () => {
      if (setup()) {
        refreshTimer = window.setTimeout(() => {
          if (!cancelled) ScrollTrigger.refresh();
        }, 350);
        return;
      }
      refreshTimer = window.setTimeout(() => {
        if (!cancelled) trySetup();
      }, 120);
    };

    const onLenisReady = () => {
      if (!cancelled) {
        ScrollTrigger.refresh();
        trySetup();
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('lenis-ready', onLenisReady);

    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(trySetup);
    });

    void Promise.all(
      [servicesImageSrc, aboutImageSrc].map(
        (src) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => resolve();
            img.src = src;
          }),
      ),
    ).then(() => {
      if (!cancelled) {
        ScrollTrigger.refresh();
        refreshTimer = window.setTimeout(() => {
          if (!cancelled) ScrollTrigger.refresh();
        }, 500);
      }
    });

    return () => {
      cancelAnimationFrame(rafId);
      cleanup();
    };
  }, [
    mounted,
    canFlip,
    reducedMotion,
    servicesSectionRef,
    aboutSectionRef,
    servicesImageFrameRef,
    aboutImageFrameRef,
    servicesImageSrc,
    aboutImageSrc,
  ]);

  if (!mounted || reducedMotion || !canFlip) return null;

  return createPortal(
    <div ref={sceneRef} className="services-about-flip-scene" aria-hidden>
      <div className="services-about-flip-perspective">
        <div ref={cardRef} className="services-about-flip-card">
          <div className="services-about-flip-face services-about-flip-face--front">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={servicesImageSrc} alt="" className="services-about-flip-image" loading="eager" decoding="async" />
            <div className="services-main-image-overlay" />
            <div className="services-main-image-shine" />
            <div className="services-main-image-badge services-about-flip-badge">
              <span>{badgeLeft}</span>
              <span className="services-main-image-badge-dot" />
              <span>{badgeRight}</span>
            </div>
          </div>

          <div className="services-about-flip-face services-about-flip-face--back">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={aboutImageSrc} alt="" className="services-about-flip-image" loading="lazy" decoding="async" />
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
