import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type PointerEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

/* ── Motion helpers ───────────────────────────────────────── */

/** Fade + rise into view once. `delay` in ms (use 40–80ms steps for stagger). */
export function Reveal({
  as: Tag = "div",
  delay = 0,
  className,
  style,
  children,
  ...rest
}: {
  as?: ElementType;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      className={cn("reveal", className)}
      style={{ ...style, "--d": `${delay}ms` } as CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Splits text into words that rise in on load (once). */
export function WordReveal({
  text,
  start = 0,
  step = 70,
}: {
  text: string;
  start?: number;
  step?: number;
}) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span
          key={i}
          className="word-in inline-block"
          style={{ "--d": `${start + i * step}ms` } as CSSProperties}
        >
          {w}
          {i < text.split(" ").length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

const finePointer = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Updates --mx/--my so `.glow` can follow the cursor. */
export function glowMove(e: PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
}

/** Pulls its child slightly toward the cursor (desktop only). */
export function Magnetic({
  children,
  strength = 0.25,
}: {
  children: ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  return (
    <span
      ref={ref}
      className="inline-flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
      onPointerMove={(e) => {
        if (!finePointer() || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * strength;
        const y = (e.clientY - (r.top + r.height / 2)) * strength;
        ref.current.style.transform = `translate(${x}px, ${y}px)`;
      }}
      onPointerLeave={() => {
        if (ref.current) ref.current.style.transform = "";
      }}
    >
      {children}
    </span>
  );
}

/* ── Primitives ───────────────────────────────────────────── */

type Variant = "primary" | "secondary" | "ghost";

const buttonBase =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[15px] font-medium tracking-[-0.01em] transition-[background-color,border-color,color,transform] duration-300 active:scale-[0.97]";
const buttonVariants: Record<Variant, string> = {
  primary: "bg-brand text-brand-fg hover:bg-[color-mix(in_oklab,var(--brand),black_12%)]",
  secondary: "border border-line-strong bg-surface text-ink hover:border-ink/40",
  ghost: "text-ink hover:bg-surface-2",
};

export function buttonClass(variant: Variant = "primary", className?: string) {
  return cn(buttonBase, buttonVariants[variant], className);
}

/** Anchor styled as a button. External links open in a new tab. */
export function Button({
  href,
  variant = "primary",
  external,
  magnetic,
  className,
  children,
}: {
  href: string;
  variant?: Variant;
  external?: boolean;
  magnetic?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const a = (
    <a
      href={href}
      className={buttonClass(variant, className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
  return magnetic ? <Magnetic>{a}</Magnetic> : a;
}

export function Tag({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "brand" | "live";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[12px] leading-5 tracking-[0.02em]",
        tone === "neutral" && "border-line bg-surface text-subtle",
        tone === "brand" && "border-transparent bg-[var(--brand-soft)] text-brand-ink",
        tone === "live" && "border-line bg-surface text-ink",
        className,
      )}
    >
      {tone === "live" && <span className="live-dot" aria-hidden />}
      {children}
    </span>
  );
}

export function SectionHeader({
  index,
  eyebrow,
  title,
  aside,
  id,
  className,
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  aside?: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16", className)}>
      <div>
        <Reveal className="t-label mb-4 flex items-center gap-3">
          {index && <span className="text-brand-ink">{index}</span>}
          <span className="h-px w-8 bg-line-strong" aria-hidden />
          <span>{eyebrow}</span>
        </Reveal>
        <Reveal as="h2" id={id} delay={60} className="t-h2 max-w-[18ch]">
          {title}
        </Reveal>
      </div>
      {aside && (
        <Reveal delay={120} className="t-label">
          {aside}
        </Reveal>
      )}
    </div>
  );
}

export function StatCallout({
  value,
  label,
  source,
  size = "lg",
  className,
}: {
  value: string;
  label: string;
  source?: string;
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      <div
        className={cn(
          size === "lg" ? "t-stat" : "text-3xl font-semibold tracking-[-0.03em]",
          "text-ink",
        )}
      >
        {value}
      </div>
      <div className="mt-2 text-[15px] leading-snug text-subtle">{label}</div>
      {source && <div className="t-label mt-3 text-brand-ink">{source}</div>}
    </div>
  );
}

export function BentoTile({
  className,
  children,
  delay = 0,
}: {
  className?: string;
  children: ReactNode;
  delay?: number;
}) {
  // Reveal (outer) and hover-lift (inner) live on separate elements so their
  // transforms don't fight each other.
  return (
    <Reveal delay={delay} className={cn("flex", className)}>
      <div
        onPointerMove={glowMove}
        className="glow lift flex w-full flex-col overflow-hidden rounded-3xl border border-line bg-surface p-6 md:p-7"
      >
        {children}
      </div>
    </Reveal>
  );
}
