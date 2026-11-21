import type { CSSProperties } from "react";
import heroPhoto from "@/assets/hero-photo.jpg";
import { cn } from "@/lib/utils";
import { hero } from "@/lib/site";

const d = (ms: number) => ({ animationDelay: `${ms}ms` }) as CSSProperties;

const card =
  "absolute z-10 rounded-2xl border border-line bg-surface/90 shadow-[var(--shadow-lift)] backdrop-blur-md";

/**
 * Hero photo of Priyanshu at his desk, with light motion:
 * slow zoom, monitor glow, the bulb on his tee lighting up, floating PM cards.
 */
export function HeroPhoto({ className }: { className?: string }) {
  return (
    <figure className={cn("hp relative px-3 py-6 sm:px-6", className)}>
      <div className="relative overflow-hidden rounded-[28px] border border-line bg-surface-2 shadow-[var(--shadow-lift)]">
        <img
          src={heroPhoto}
          alt="Priyanshu Vaidya at his desk, working on product ideas"
          width={740}
          height={600}
          fetchPriority="high"
          decoding="async"
          className="hp-zoom block h-auto w-full"
        />
        {/* Monitor glow */}
        <span
          aria-hidden
          className="hp-pulse pointer-events-none absolute h-[46%] w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen"
          style={{
            left: "12.5%",
            top: "42%",
            background: "radial-gradient(closest-side, rgba(96,165,250,.55), transparent)",
          }}
        />
        {/* Bulb on the tee lights up */}
        <span
          aria-hidden
          className="hp-pulse pointer-events-none absolute h-[16%] w-[13%] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen"
          style={{
            left: "63.6%",
            top: "64.5%",
            background:
              "radial-gradient(closest-side, rgba(253,224,71,.9), rgba(253,224,71,.25) 55%, transparent)",
            ...d(400),
          }}
        />
        {/* Caption */}
        <figcaption className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full border border-white/15 bg-black/55 px-3 py-1.5 font-mono text-[12px] text-white backdrop-blur-md">
          <span className="live-dot" aria-hidden />
          {hero.photoCaption}
        </figcaption>
      </div>

      {/* Floating PM cards */}
      <div className={cn(card, "hp-float left-0 top-0 w-[128px] p-3 sm:-left-2")} aria-hidden>
        <div className="font-mono text-[11px] text-ink">PRD.md</div>
        {[80, 60, 70].map((w, i) => (
          <div key={i} className="mt-2 flex items-center gap-2">
            <span
              className={cn(
                "grid h-3 w-3 shrink-0 place-items-center rounded-full border border-brand",
                i < 2 && "bg-brand",
              )}
            />
            <span className="h-1.5 rounded-full bg-line-strong" style={{ width: `${w}%` }} />
          </div>
        ))}
      </div>

      <div
        className={cn(card, "hp-float right-0 top-2 grid h-14 w-14 place-items-center sm:-right-1")}
        style={d(800)}
        aria-hidden
      >
        <svg
          viewBox="0 0 24 24"
          className="hp-pulse h-7 w-7"
          style={d(400)}
          fill="#fde047"
          stroke="#a16207"
          strokeWidth="1.4"
        >
          <path d="M12 3a6 6 0 0 1 3.5 10.9V16h-7v-2.1A6 6 0 0 1 12 3z" strokeLinejoin="round" />
          <path d="M9.5 19h5M10.5 21.5h3" fill="none" strokeLinecap="round" />
        </svg>
      </div>

      <div
        className={cn(card, "hp-float bottom-0 right-0 hidden w-[124px] p-3 sm:-right-2 sm:block")}
        style={d(1600)}
        aria-hidden
      >
        <div className="flex items-center justify-between font-mono text-[11px] text-ink">
          Metrics <span className="text-live">↑</span>
        </div>
        <div className="mt-2 flex h-10 items-end gap-1.5">
          {[35, 55, 45, 75, 100].map((h, i) => (
            <span
              key={i}
              className="hp-bar flex-1 rounded-[3px] bg-brand"
              style={{ height: `${h}%`, opacity: 0.45 + i * 0.13, ...d(i * 180) }}
            />
          ))}
        </div>
      </div>
    </figure>
  );
}
