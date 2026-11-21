import { useEffect, useRef, useState } from "react";
import { contact, person } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button, Reveal, buttonClass } from "./ui";

function LocalTime() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: person.timeZone,
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <span className="tabular-nums" suppressHydrationWarning>
      {now ?? "--:--"} {person.timeZoneLabel}
    </span>
  );
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>(0);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${person.email}`;
    }
  };

  return (
    <>
      <button type="button" onClick={copy} className={buttonClass("secondary")}>
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden
        >
          <rect x="8" y="8" width="12" height="12" rx="2.5" />
          <path d="M16 8V6.5A2.5 2.5 0 0 0 13.5 4h-7A2.5 2.5 0 0 0 4 6.5v7A2.5 2.5 0 0 0 6.5 16H8" />
        </svg>
        {contact.copyCta}
      </button>
      {/* Toast */}
      <div
        role="status"
        aria-live="polite"
        className={cn(
          "fixed bottom-6 left-1/2 z-[90] -translate-x-1/2 rounded-full border border-line bg-surface px-5 py-3 text-[15px] shadow-[var(--shadow-lift)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          copied ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
        )}
      >
        {copied && (
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-live" aria-hidden />
            {contact.copied}
          </span>
        )}
      </div>
    </>
  );
}

export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="mx-auto max-w-[1280px] px-4 py-24 sm:px-6 md:py-40"
    >
      <Reveal className="t-label mb-8 flex items-center gap-3">
        <span className="text-brand-ink">04</span>
        <span className="h-px w-8 bg-line-strong" aria-hidden />
        <span>{contact.eyebrow}</span>
      </Reveal>
      <Reveal as="h2" id="contact-title" delay={60} className="t-hero">
        {contact.heading[0]}
        <br />
        <span className="serif-accent text-brand-ink">{contact.heading[1]}</span>
      </Reveal>
      <Reveal
        as="p"
        delay={120}
        className="prose-measure mt-8 text-xl leading-relaxed text-subtle md:text-2xl"
      >
        {contact.body}
      </Reveal>

      <Reveal
        delay={180}
        className="mt-12 flex flex-col gap-6 border-t border-line pt-10 lg:flex-row lg:items-end lg:justify-between"
      >
        <div className="min-w-0">
          <a
            href={`mailto:${person.email}`}
            className="link-u break-all text-[clamp(22px,3.4vw,40px)] font-medium tracking-[-0.03em]"
          >
            {person.email}
          </a>
          <div className="mt-3">
            <a
              href={person.phoneHref}
              className="link-u font-mono text-[15px] text-subtle hover:text-ink"
            >
              {person.phone}
            </a>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button href={`mailto:${person.email}`} variant="primary" magnetic>
            {contact.emailCta} <span aria-hidden>→</span>
          </Button>
          <CopyEmail />
          <Button href={person.resume} variant="secondary" external>
            {contact.resumeCta}
          </Button>
        </div>
      </Reveal>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="mx-auto max-w-[1280px] px-4 pb-10 sm:px-6">
      <div className="flex flex-col gap-6 border-t border-line pt-8 font-mono text-[13px] text-subtle md:flex-row md:items-center md:justify-between">
        <span>
          © {new Date().getFullYear()} {person.name}
        </span>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-live" aria-hidden />
            {contact.localTime} <LocalTime />
          </span>
          <a href={`mailto:${person.email}`} className="link-u hover:text-ink">
            {person.email}
          </a>
          <a href={person.phoneHref} className="link-u hover:text-ink">
            {person.phone}
          </a>
          <a
            href={person.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="link-u hover:text-ink"
          >
            Resume ↗
          </a>
          {/* TODO: social links render here once added to `person.socials` in src/lib/site.ts */}
          {person.socials.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-u hover:text-ink"
            >
              {s.label} ↗
            </a>
          ))}
          <a href="#top" className="link-u text-ink">
            {contact.backToTop}
          </a>
        </div>
      </div>
    </footer>
  );
}
