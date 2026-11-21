import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { getWork, works, type TableBlock, type Work } from "@/lib/works";
import { cn } from "@/lib/utils";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/contact";
import { Button, Reveal, StatCallout, Tag, glowMove } from "@/components/site/ui";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const work = getWork(params.slug);
    if (!work) throw notFound();
    return { work };
  },
  head: ({ loaderData }) => {
    const w = loaderData?.work;
    if (!w) return { meta: [{ title: "Work — Priyanshu Vaidya" }] };
    return {
      meta: [
        { title: `${w.title} — Priyanshu Vaidya` },
        { name: "description", content: w.desc },
        { property: "og:title", content: `${w.title} — Priyanshu Vaidya` },
        { property: "og:description", content: w.desc },
        { property: "og:image", content: w.img },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: w.img },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-4 text-ink">
      <div className="text-center">
        <h1 className="t-h2">This page took a day off</h1>
        <Link to="/" className="link-u mt-6 inline-block font-medium text-brand-ink">
          Take me home
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-4 text-ink">
      <div className="text-center">
        <p>{error instanceof Error ? error.message : "Something went wrong."}</p>
        <button onClick={reset} className="link-u mt-4 font-medium text-brand-ink">
          Try again
        </button>
      </div>
    </div>
  ),
  component: WorkDetail,
});

type Block = { id: string; title: string; body: ReactNode };

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/** Builds the ordered list of sections that exist for this project. */
function buildSections(w: Work): Block[] {
  const out: Block[] = [];
  const add = (title: string, body: ReactNode) => {
    let id = slugify(title);
    while (out.some((b) => b.id === id)) id += "-2";
    out.push({ id, title, body });
  };

  if (w.overview?.length) {
    add(
      "The big picture",
      <div className="space-y-5">
        {w.overview.map((p, i) => (
          <p
            key={i}
            className={cn(
              "prose-measure",
              i === 0 && "text-[clamp(20px,1.5vw,24px)] leading-[1.5] tracking-[-0.01em]",
            )}
          >
            {p}
          </p>
        ))}
      </div>,
    );
  }

  if (w.problem || w.painPoints?.length) {
    add(
      "The problem",
      <>
        {w.problemSource && (
          <a
            href={w.problemSource.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group mb-10 flex flex-col gap-2 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-brand sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6"
          >
            <span>
              <span className="t-label !text-brand-ink">
                Problem statement by {w.problemSource.org}
              </span>
              <span className="mt-2 block text-lg font-medium tracking-[-0.01em]">
                &ldquo;{w.problemSource.title}&rdquo;
              </span>
              <span className="mt-1 block font-mono text-[13px] text-subtle">
                {w.problemSource.publication} · {w.problemSource.date}
              </span>
            </span>
            <span className="shrink-0 font-medium text-brand-ink">
              Read the source{" "}
              <span
                aria-hidden
                className="inline-block transition-transform group-hover:translate-x-0.5"
              >
                ↗
              </span>
            </span>
          </a>
        )}
        {w.problem && (
          <p className="prose-measure text-[clamp(20px,1.5vw,24px)] leading-[1.5] tracking-[-0.01em]">
            {w.problem}
          </p>
        )}
        {w.painPoints && w.painPoints.length > 0 && (
          <div className="mt-10">
            <div className="t-label mb-4">
              Where it hurts{w.problemSource && ` · as stated by ${w.problemSource.org}`}
            </div>
            <NumberedList items={w.painPoints} />
          </div>
        )}
      </>,
    );
  }

  if (w.research?.length || w.keyInsight || w.opportunity || w.successVision) {
    add(
      "What I found out",
      <>
        {w.research && w.research.length > 0 && <BulletList items={w.research} />}
        <div className="mt-8 space-y-4">
          {w.keyInsight && (
            <Callout label="The aha moment" tone="brand">
              {w.keyInsight}
            </Callout>
          )}
          {w.opportunity && <Callout label="The gap I saw">{w.opportunity}</Callout>}
          {w.successVision && <Callout label="What success looks like">{w.successVision}</Callout>}
        </div>
      </>,
    );
  }

  if (w.table) add(w.table.title || "The numbers", <DataTable table={w.table} />);

  if (w.gallery?.length) {
    add(
      "Screens from production",
      <div className="space-y-10">
        {w.gallery.map((g, i) => (
          <figure key={i}>
            <div className="overflow-hidden rounded-2xl border border-line bg-surface-2 p-2 sm:p-3">
              <img
                src={g.src}
                alt={g.caption}
                loading="lazy"
                decoding="async"
                className="h-auto w-full rounded-xl"
              />
            </div>
            <figcaption className="prose-measure mt-4 flex gap-3 text-[15px] leading-relaxed text-subtle">
              <span className="font-mono text-brand-ink">{String(i + 1).padStart(2, "0")}</span>
              {g.caption}
            </figcaption>
          </figure>
        ))}
      </div>,
    );
  }

  if (w.solutions?.length) {
    add(
      "The fix",
      <div className="grid gap-4 sm:grid-cols-2">
        {w.solutions.map((s, i) => (
          <div
            key={i}
            onPointerMove={glowMove}
            className="glow lift rounded-2xl border border-line bg-surface p-6"
          >
            <div className="font-mono text-[13px] text-brand-ink">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="mt-4 text-lg font-semibold tracking-[-0.02em]">{s.title}</div>
            <p className="mt-2 text-[15px] leading-relaxed text-subtle">{s.desc}</p>
          </div>
        ))}
      </div>,
    );
  }

  if (w.keyChallenges) {
    add(
      "What got tricky",
      <p className="prose-measure text-[clamp(20px,1.5vw,24px)] leading-[1.5] tracking-[-0.01em]">
        {w.keyChallenges}
      </p>,
    );
  }

  for (const sec of w.extraSections ?? []) {
    add(
      sec.title,
      <div className="space-y-6">
        {sec.paras?.map((p, j) => (
          <p key={j} className="prose-measure">
            {p}
          </p>
        ))}
        {sec.stats && sec.stats.length > 0 && <StatGrid stats={sec.stats} />}
        {sec.bullets && sec.bullets.length > 0 && <BulletList items={sec.bullets} />}
        {sec.steps && sec.steps.length > 0 && (
          <ol className="grid gap-2 sm:grid-cols-2">
            {sec.steps.map((st, j) => (
              <li
                key={j}
                className="flex items-center gap-4 rounded-2xl border border-line bg-surface px-4 py-3"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--brand-soft)] font-mono text-[13px] text-brand-ink">
                  {j + 1}
                </span>
                <span className="text-[15px]">{st}</span>
              </li>
            ))}
          </ol>
        )}
        {sec.table && <DataTable table={sec.table} />}
        {sec.quote && (
          <blockquote className="border-l-2 border-brand py-1 pl-6">
            <p className="prose-measure serif-accent text-[clamp(22px,2vw,30px)] leading-[1.3] text-ink">
              “{sec.quote}”
            </p>
          </blockquote>
        )}
      </div>,
    );
  }

  if (w.outcomes?.length) add("What changed", <NumberedList items={w.outcomes} />);
  if (w.keyLearnings?.length) add("What I learned", <BulletList items={w.keyLearnings} />);

  return out;
}

function WorkDetail() {
  const { work: w } = Route.useLoaderData() as { work: Work };
  const nextIdx = (works.findIndex((x) => x.slug === w.slug) + 1) % works.length;
  const next = works[nextIdx];
  const sections = buildSections(w);
  const active = useActiveSection(
    sections.map((s) => s.id),
    w.slug,
  );
  const prototypeHref = w.prototype || w.href;

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <SiteNav />
      <main id="main">
        {/* Hero */}
        <header id="top" className="mx-auto max-w-[1280px] px-4 pb-12 pt-32 sm:px-6 md:pt-40">
          <Reveal>
            <Link
              to="/"
              hash="work"
              className="link-u font-mono text-[13px] text-subtle hover:text-ink"
            >
              ← All work
            </Link>
          </Reveal>
          <Reveal delay={40} className="mt-8 flex flex-wrap gap-2">
            <Tag tone="brand">{w.tag}</Tag>
            <Tag>{w.sub}</Tag>
            {w.status && <Tag tone="live">{w.status}</Tag>}
          </Reveal>
          <Reveal as="h1" delay={80} className="t-h1 mt-6 max-w-[16ch]">
            {w.title}
          </Reveal>
          <Reveal
            as="p"
            delay={120}
            className="prose-measure mt-6 text-[clamp(19px,1.5vw,24px)] leading-[1.5] text-subtle"
          >
            {w.desc}
          </Reveal>

          <Reveal
            delay={160}
            className="mt-10 grid gap-6 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_2fr_auto] lg:items-start"
          >
            <MetaItem label="Timeline">{w.duration}</MetaItem>
            <MetaItem label="My role">{w.role}</MetaItem>
            <MetaItem label="Toolkit">
              <div className="flex flex-wrap gap-1.5">
                {w.stack.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </MetaItem>
            {prototypeHref && (
              <div className="flex flex-wrap gap-2 sm:col-span-2 lg:col-span-1 lg:justify-end">
                <Button href={prototypeHref} external magnetic>
                  {w.prototypeLabel?.replace(/\s*↗$/, "") || "Try the prototype"} ↗
                </Button>
              </div>
            )}
          </Reveal>

          <Reveal
            delay={200}
            className="mt-12 overflow-hidden rounded-3xl border border-line bg-surface-2"
          >
            <img
              src={w.img}
              alt={w.title}
              decoding="async"
              className="aspect-[16/9] w-full object-cover md:aspect-[2/1]"
            />
          </Reveal>
        </header>

        {/* Headline stats */}
        {w.stats && w.stats.length > 0 && (
          <section aria-label="Key numbers" className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <StatGrid stats={w.stats} big />
          </section>
        )}

        {/* Body */}
        <div className="mx-auto grid max-w-[1280px] gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <nav aria-label="Jump to a section" className="sticky top-28">
              <div className="t-label mb-4">Jump to</div>
              <ol className="space-y-1 border-l border-line">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className={cn(
                        "-ml-px flex gap-3 border-l py-1.5 pl-4 text-[14px] leading-snug transition-colors",
                        active === s.id
                          ? "border-brand text-ink"
                          : "border-transparent text-subtle hover:text-ink",
                      )}
                    >
                      <span className="font-mono text-[12px] opacity-70">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
              {w.href && (
                <a
                  href={w.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 flex min-h-11 items-center justify-center rounded-full border border-line-strong px-4 text-[14px] font-medium transition-colors hover:border-ink/40"
                >
                  {w.docLabel || "Open the full doc ↗"}
                </a>
              )}
            </nav>
          </aside>

          <article className="min-w-0 space-y-24 md:space-y-32 lg:col-span-9">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-28">
                <Reveal className="t-label mb-4 flex items-center gap-3">
                  <span className="text-brand-ink">{String(i + 1).padStart(2, "0")}</span>
                  <span className="h-px w-8 bg-line-strong" aria-hidden />
                </Reveal>
                <Reveal as="h2" id={`${s.id}-h`} delay={40} className="t-h2 mb-10 max-w-[20ch]">
                  {s.title}
                </Reveal>
                <Reveal delay={80} className="text-ink/90">
                  {s.body}
                </Reveal>
              </section>
            ))}

            {w.href && (
              <Reveal className="relative overflow-hidden rounded-3xl border border-line bg-surface p-8 md:p-12">
                <div
                  className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl"
                  style={{ background: "var(--brand-soft)" }}
                  aria-hidden
                />
                <div className="t-label relative">Want the deep dive?</div>
                <div className="t-h3 relative mt-4 max-w-[28ch] text-[clamp(26px,2.6vw,36px)]">
                  {w.ctaTitle || "The full deck, data and design files are one click away"}
                </div>
                <div className="relative mt-8">
                  <Button href={w.href} external magnetic>
                    {w.ctaLabel || "Open the deep dive ↗"}
                  </Button>
                </div>
              </Reveal>
            )}
          </article>
        </div>

        {/* Next project */}
        <section aria-label="Next project" className="mx-auto max-w-[1280px] px-4 pb-24 sm:px-6">
          <Reveal>
            <Link
              to="/work/$slug"
              params={{ slug: next.slug }}
              onPointerMove={glowMove}
              className="glow lift group grid overflow-hidden rounded-3xl border border-line bg-surface md:grid-cols-2"
            >
              <div className="aspect-[16/10] overflow-hidden bg-surface-2">
                <img
                  src={next.img}
                  alt={next.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <div className="t-label">Up next</div>
                <div className="t-h2 mt-4">{next.title}</div>
                <p className="mt-4 text-subtle">{next.desc}</p>
                <span className="mt-8 inline-flex items-center gap-2 font-medium text-brand-ink">
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
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

/* ── Pieces ───────────────────────────────────────────────── */

function useActiveSection(ids: string[], key: string) {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return active;
}

function MetaItem({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <div className="t-label mb-2">{label}</div>
      <div className="text-[15px]">{children}</div>
    </div>
  );
}

function StatGrid({ stats, big }: { stats: { value: string; label: string }[]; big?: boolean }) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line",
        stats.length >= 4 ? "lg:grid-cols-4" : stats.length === 3 ? "md:grid-cols-3" : "",
      )}
    >
      {stats.map((s, i) => (
        <Reveal key={i} delay={i * 60} className={cn("bg-surface", big ? "p-6 md:p-10" : "p-6")}>
          <StatCallout value={s.value} label={s.label} size={big ? "lg" : "md"} />
        </Reveal>
      ))}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="prose-measure space-y-4">
      {items.map((p, i) => (
        <li key={i} className="flex gap-4 leading-relaxed">
          <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
          <span>{p}</span>
        </li>
      ))}
    </ul>
  );
}

function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className="divide-y divide-line border-y border-line">
      {items.map((p, i) => (
        <li key={i} className="grid grid-cols-[40px_1fr] gap-2 py-5 leading-relaxed">
          <span className="pt-0.5 font-mono text-[13px] text-brand-ink">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="prose-measure">{p}</span>
        </li>
      ))}
    </ol>
  );
}

function Callout({
  label,
  tone,
  children,
}: {
  label: string;
  tone?: "brand";
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-6 md:p-8",
        tone === "brand" ? "border-transparent bg-[var(--brand-soft)]" : "border-line bg-surface",
      )}
    >
      <div className={cn("t-label", tone === "brand" && "!text-brand-ink")}>{label}</div>
      <p className="prose-measure mt-3 text-[clamp(18px,1.4vw,22px)] leading-[1.5] tracking-[-0.01em]">
        {children}
      </p>
    </div>
  );
}

function DataTable({ table }: { table: TableBlock }) {
  return (
    <div>
      <div className="overflow-x-auto rounded-2xl border border-line bg-surface">
        <table className="w-full min-w-[520px] text-left text-[15px]">
          <thead>
            <tr className="border-b border-line">
              {table.headers.map((h, i) => (
                <th key={i} scope="col" className="t-label px-5 py-4 font-normal">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {table.rows.map((row, i) => (
              <tr key={i} className="transition-colors hover:bg-surface-2">
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={cn("px-5 py-4 align-top leading-relaxed", j === 0 && "font-medium")}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {table.note && <p className="mt-3 font-mono text-[12px] text-subtle">{table.note}</p>}
    </div>
  );
}
