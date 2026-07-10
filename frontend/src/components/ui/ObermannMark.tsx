export default function ObermannMark({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="facetLeft" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.14)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
        </linearGradient>
        <linearGradient id="facetRight" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.01)" />
        </linearGradient>
        <linearGradient id="facetTop" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.04)" />
        </linearGradient>
        <linearGradient id="edgeHighlight" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.45)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.12)" />
        </linearGradient>
        <filter id="markGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#markGlow)">
        {/* Left wing */}
        <path d="M200 36 L72 200 L200 364 Z" fill="url(#facetLeft)" />
        <path
          d="M200 36 L72 200 L200 364"
          stroke="url(#edgeHighlight)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Right wing */}
        <path d="M200 36 L328 200 L200 364 Z" fill="url(#facetRight)" />
        <path
          d="M200 36 L328 200 L200 364"
          stroke="url(#edgeHighlight)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Top facet */}
        <path d="M200 36 L128 128 L200 200 L272 128 Z" fill="url(#facetTop)" opacity="0.7" />

        {/* Inner facet lines */}
        <path d="M200 72 L112 200 L200 328" stroke="rgba(255,255,255,0.07)" strokeWidth="1.25" />
        <path d="M200 72 L288 200 L200 328" stroke="rgba(255,255,255,0.07)" strokeWidth="1.25" />
        <path d="M128 128 L272 128" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        <path d="M112 200 H288" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        <path d="M200 72 V328" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
      </g>
    </svg>
  );
}

export function ObermannLogo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3 L5 12 L12 21"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 3 L19 12 L12 21"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
