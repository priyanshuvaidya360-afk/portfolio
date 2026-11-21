import { Link } from "@tanstack/react-router";
import type { Work } from "@/lib/works";
import { cn } from "@/lib/utils";
import { copy } from "@/lib/site";
import { Reveal, StatCallout, Tag, glowMove } from "./ui";

/** Large feature card for the "Selected Work" list. Alternates sides via `flip`. */
export function ProjectCard({
  work: w,
  index,
  flip,
}: {
  work: Work;
  index: number;
  flip?: boolean;
}) {
  const stats = (w.stats ?? []).slice(0, 2);
  return (
    <Reveal as="article">
      <Link
        to="/work/$slug"
        params={{ slug: w.slug }}
        onPointerMove={glowMove}
        className="glow lift group grid overflow-hidden rounded-3xl border border-line bg-surface lg:grid-cols-12"
        aria-label={`${w.title}: ${copy.work.cardCta.toLowerCase()}`}
      >
        {/* Cover */}
        <div
          className={cn(
            "flex items-center bg-surface-2 p-2 sm:p-3 lg:col-span-7 lg:p-4",
            flip && "lg:order-2",
          )}
        >
          <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl border border-line">
            <img
              src={w.img}
              alt={w.title}
              loading={index < 2 ? "eager" : "lazy"}
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
            />
          </div>
        </div>

        {/* Copy */}
        <div className="flex flex-col p-6 sm:p-8 lg:col-span-5 lg:p-10">
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-[13px] text-subtle">
              {String(index + 1).padStart(2, "0")}
            </span>
            {w.status && <Tag tone="live">{w.status}</Tag>}
          </div>

          <h3 className="t-h3 mt-6 text-[clamp(28px,2.6vw,40px)] tracking-[-0.035em]">{w.title}</h3>
          <p className="mt-3 text-subtle">{w.desc}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            <Tag tone="brand">{w.tag}</Tag>
            <Tag>{w.sub}</Tag>
          </div>

          {stats.length > 0 && (
            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-6">
              {stats.map((s) => (
                <StatCallout key={s.label} value={s.value} label={s.label} size="md" />
              ))}
            </div>
          )}

          <dl className="mt-auto grid grid-cols-2 gap-4 pt-8 text-[14px]">
            <div>
              <dt className="t-label">{copy.work.role}</dt>
              <dd className="mt-1">{w.role}</dd>
            </div>
            <div>
              <dt className="t-label">{copy.work.duration}</dt>
              <dd className="mt-1">{w.duration}</dd>
            </div>
          </dl>

          <span className="mt-8 inline-flex items-center gap-2 font-medium text-brand-ink">
            {copy.work.cardCta}
            <span
              aria-hidden
              className="transition-transform duration-500 group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
