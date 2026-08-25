import React from "react";

export function RoadmapDoodle({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className={className}>
      <path d="M10 50 H90" strokeWidth="3" strokeDasharray="6 4" strokeLinecap="round" />
      <circle cx="25" cy="50" r="8" fill="#f3e8ff" strokeWidth="3" />
      <path d="M25 42 L25 25 M25 25 H40" strokeWidth="2.5" strokeLinecap="round" />
      <text x="44" y="28" fontSize="9" fill="currentColor" fontWeight="bold">Q1: MVP</text>
      
      <circle cx="55" cy="50" r="8" fill="#f3e8ff" strokeWidth="3" />
      <path d="M55 58 L55 75 M55 75 H70" strokeWidth="2.5" strokeLinecap="round" />
      <text x="74" y="78" fontSize="9" fill="currentColor" fontWeight="bold">Q2: Scale</text>
      
      <circle cx="85" cy="50" r="8" fill="#a855f7" stroke="currentColor" strokeWidth="3" />
      <path d="M82 50 L85 53 L90 47" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function KanbanDoodle({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className={className}>
      <rect x="10" y="15" width="80" height="70" rx="8" strokeWidth="3" fill="#ffffff" />
      <path d="M10 32 H90" strokeWidth="2" />
      <path d="M37 32 V85 M64 32 V85" strokeWidth="2" strokeDasharray="3 3" />
      {/* Column Titles */}
      <rect x="15" y="38" width="17" height="14" rx="3" fill="#ede9fe" strokeWidth="1.5" />
      <rect x="15" y="56" width="17" height="20" rx="3" fill="#f3e8ff" strokeWidth="1.5" />
      
      <rect x="42" y="38" width="17" height="22" rx="3" fill="#ddd6fe" strokeWidth="1.5" />
      
      <rect x="69" y="38" width="17" height="16" rx="3" fill="#c084fc" strokeWidth="1.5" />
      <rect x="69" y="58" width="17" height="16" rx="3" fill="#a855f7" strokeWidth="1.5" />
    </svg>
  );
}

export function NorthStarDoodle({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className={className}>
      <path
        d="M50 10 L58 38 L86 42 L64 60 L71 88 L50 72 L29 88 L36 60 L14 42 L42 38 Z"
        strokeWidth="3"
        fill="#f3e8ff"
        strokeLinejoin="round"
      />
      <circle cx="50" cy="50" r="10" fill="#a855f7" strokeWidth="2" />
      <path d="M50 45 L50 55 M45 50 L55 50" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function WireframeDoodle({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className={className}>
      <rect x="12" y="12" width="76" height="76" rx="10" strokeWidth="3" fill="#ffffff" />
      <path d="M12 28 H88" strokeWidth="2" />
      <circle cx="22" cy="20" r="3" fill="#a855f7" />
      <circle cx="30" cy="20" r="3" fill="#c084fc" />
      <circle cx="38" cy="20" r="3" fill="#e9d5ff" />
      {/* Sidebar & Content */}
      <rect x="18" y="34" width="20" height="48" rx="4" fill="#f3e8ff" strokeWidth="1.5" />
      <rect x="42" y="34" width="40" height="22" rx="4" fill="#ede9fe" strokeWidth="1.5" />
      <rect x="42" y="60" width="18" height="22" rx="4" strokeWidth="1.5" />
      <rect x="64" y="60" width="18" height="22" rx="4" fill="#a855f7" strokeWidth="1.5" />
    </svg>
  );
}

export function AnalyticsDoodle({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className={className}>
      <path d="M15 85 H85" strokeWidth="3" strokeLinecap="round" />
      <path d="M15 15 V85" strokeWidth="3" strokeLinecap="round" />
      <path
        d="M20 70 Q 35 60, 45 40 T 75 25 T 85 20"
        strokeWidth="3.5"
        stroke="#7c3aed"
        strokeLinecap="round"
      />
      <circle cx="45" cy="40" r="5" fill="#a855f7" strokeWidth="2" />
      <circle cx="75" cy="25" r="5" fill="#c084fc" strokeWidth="2" />
      {/* Target arrow */}
      <path d="M78 18 L88 18 L88 28" stroke="#7c3aed" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function FunnelDoodle({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className={className}>
      <path
        d="M15 20 L85 20 L62 55 L62 80 L38 88 L38 55 Z"
        strokeWidth="3"
        fill="#faf5ff"
        strokeLinejoin="round"
      />
      <path d="M25 35 H75" strokeWidth="2" strokeDasharray="3 3" />
      <path d="M33 50 H67" strokeWidth="2" strokeDasharray="3 3" />
      <circle cx="50" cy="70" r="4" fill="#7c3aed" />
    </svg>
  );
}

export function IdeaDoodle({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className={className}>
      <path
        d="M50 18 C33 18 24 30 24 45 C24 57 34 64 38 72 H62 C66 64 76 57 76 45 C76 30 67 18 50 18 Z"
        strokeWidth="3"
        fill="#f3e8ff"
      />
      <path d="M40 72 V82 H60 V72" strokeWidth="3" strokeLinejoin="round" fill="#ddd6fe" />
      <path d="M44 88 H56" strokeWidth="3" strokeLinecap="round" />
      {/* Rays */}
      <path d="M50 8 V12 M20 20 L24 24 M80 20 L76 24 M12 45 H16 M84 45 H88" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function OKRDoodle({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className={className}>
      <circle cx="50" cy="50" r="38" strokeWidth="3" fill="#faf5ff" />
      <circle cx="50" cy="50" r="26" strokeWidth="2.5" fill="#f3e8ff" />
      <circle cx="50" cy="50" r="14" strokeWidth="2" fill="#ede9fe" />
      <circle cx="50" cy="50" r="6" fill="#7c3aed" />
      {/* Dart arrow */}
      <path d="M72 28 L52 48" stroke="#6d28d9" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M72 28 L82 22 L78 32 Z" fill="#7c3aed" />
    </svg>
  );
}
