export function PostHogIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <rect width="100" height="100" rx="22" fill="#1d4ed8" />
      <path
        d="M20 70C20 62 26 56 34 56H42V70H20Z"
        fill="#f59e0b"
      />
      <path
        d="M42 30C42 22 48 16 56 16C64 16 70 22 70 30V56H42V30Z"
        fill="#f43f5e"
      />
      <path
        d="M42 56H70C78 56 84 62 84 70H42V56Z"
        fill="#3b82f6"
      />
      <circle cx="56" cy="36" r="4" fill="#ffffff" />
    </svg>
  );
}

export function ChurnkeyIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <rect width="100" height="100" rx="22" fill="#6366f1" />
      <circle cx="50" cy="50" r="26" stroke="#ffffff" strokeWidth="7" strokeDasharray="120 40" strokeLinecap="round" />
      <path d="M50 32V50L62 62" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="68" cy="32" r="6" fill="#a5b4fc" />
    </svg>
  );
}
