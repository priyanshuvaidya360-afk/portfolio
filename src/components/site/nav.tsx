import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { contact, person } from "@/lib/site";
import { Magnetic, buttonClass } from "./ui";

/** Runs before paint: marks JS as available and applies the theme (no flash). */
export const themeBootScript = `(function(){try{var d=document.documentElement;d.classList.add('js');var s=localStorage.getItem('theme');var t=s||(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');d.classList.toggle('dark',t==='dark');}catch(e){}})();`;

export function ThemeToggle({ className }: { className?: string }) {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    setDark(root.classList.contains("dark"));
    // Follow the OS setting until the visitor picks a theme themselves.
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem("theme");
      } catch {
        /* storage unavailable */
      }
      if (stored) return;
      root.classList.toggle("dark", !mq.matches);
      setDark(!mq.matches);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    setDark(next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* storage unavailable */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className={cn(
        "grid h-11 w-11 place-items-center rounded-full text-subtle transition-colors hover:bg-surface-2 hover:text-ink",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden
      >
        {dark ? (
          <>
            <circle cx="12" cy="12" r="4.2" />
            <path
              d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4"
              strokeLinecap="round"
            />
          </>
        ) : (
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
}

/** Small lightbulb mark: ideas, switched on. */
function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path
        d="M12 3.2a6.3 6.3 0 0 1 3.7 11.4c-.6.5-.9 1.1-.9 1.8v.4H9.2v-.4c0-.7-.3-1.3-.9-1.8A6.3 6.3 0 0 1 12 3.2Z"
        fill="currentColor"
      />
      <path
        d="M9.6 19.4h4.8M10.6 21.6h2.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M12 7.4v3.4l1.6 1.4"
        stroke="var(--brand)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const links = [
  { label: "Work", hash: "work" },
  { label: "About", hash: "about" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[120] rounded-full bg-brand px-4 py-2 text-brand-fg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 md:pt-4">
        <nav
          aria-label="Primary"
          className={cn(
            "pointer-events-auto flex w-full items-center justify-between rounded-full border backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            scrolled
              ? "max-w-3xl border-line bg-[color-mix(in_oklab,var(--canvas),transparent_20%)] py-1.5 pl-5 pr-1.5 shadow-[var(--shadow-lift)]"
              : "max-w-6xl border-transparent bg-transparent py-2.5 pl-5 pr-2.5",
          )}
        >
          <Link
            to="/"
            className="group flex items-center gap-2.5 font-medium tracking-[-0.02em]"
            aria-label={`${person.name} — home`}
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-brand text-brand-fg transition-transform duration-500 group-hover:rotate-[-12deg]">
              <LogoMark className="h-[18px] w-[18px]" />
            </span>
            <span className="hidden sm:inline">{person.firstName}</span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.hash}
                to="/"
                hash={l.hash}
                className="rounded-full px-4 py-2.5 text-[15px] text-subtle transition-colors hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={person.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full px-4 py-2.5 text-[15px] text-subtle transition-colors hover:text-ink"
            >
              Resume ↗
            </a>
            <ThemeToggle />
            <Magnetic>
              <Link to="/" hash="contact" className={buttonClass("primary", "ml-1")}>
                {contact.navCta}
              </Link>
            </Magnetic>
          </div>

          <div className="flex items-center md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="Open menu"
              className="grid h-11 w-11 place-items-center rounded-full hover:bg-surface-2"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden
              >
                <path d="M4 8h16M4 16h16" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={cn(
          "fixed inset-0 z-[60] flex flex-col bg-canvas px-6 pb-10 pt-4 transition-[opacity,visibility] duration-500 md:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <div className="flex items-center justify-between">
          <span className="t-label">Menu</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="grid h-11 w-11 place-items-center rounded-full hover:bg-surface-2"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden
            >
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <ul className="mt-16 space-y-2">
          {[...links, { label: contact.navCta, hash: "contact" }].map((l, i) => (
            <li
              key={l.hash}
              className={cn(
                "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
              )}
              style={{ transitionDelay: open ? `${120 + i * 70}ms` : "0ms" }}
            >
              <Link
                to="/"
                hash={l.hash}
                onClick={() => setOpen(false)}
                className="block py-2 text-[clamp(44px,13vw,64px)] font-semibold leading-none tracking-[-0.04em]"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li
            className={cn(
              "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
              open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
            )}
            style={{ transitionDelay: open ? "330ms" : "0ms" }}
          >
            <a
              href={person.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-2 text-[clamp(44px,13vw,64px)] font-semibold leading-none tracking-[-0.04em] text-subtle"
            >
              Resume ↗
            </a>
          </li>
        </ul>
        <div className="mt-auto font-mono text-sm text-subtle">
          <a href={`mailto:${person.email}`} className="break-all">
            {person.email}
          </a>
        </div>
      </div>
    </>
  );
}
