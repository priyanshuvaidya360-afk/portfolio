import { createFileRoute, Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { works, getWork } from "@/lib/works";
import { aboutCards, copy, hero, person, tools, toolsHeading } from "@/lib/site";
import aboutPhoto from "@/assets/about-photo.jpg";
import { SiteNav } from "@/components/site/nav";
import { ContactSection, SiteFooter } from "@/components/site/contact";
import { ProjectCard } from "@/components/site/project-card";
import { HeroPhoto } from "@/components/site/hero-photo";
import {
  BentoTile,
  Button,
  Reveal,
  SectionHeader,
  StatCallout,
  Tag,
  WordReveal,
} from "@/components/site/ui";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Priyanshu Vaidya — Product Manager" },
      {
        name: "description",
        content:
          "Priyanshu Vaidya is a Product Manager who talks to users, finds the real problem and ships the fix, from AI agents to live SaaS features.",
      },
      { property: "og:title", content: "Priyanshu Vaidya — Product Manager" },
      {
        property: "og:description",
        content: "A Product Manager who finds the real problem and ships the fix.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const container = "mx-auto max-w-[1280px] px-4 sm:px-6";

function Index() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <SiteNav />
      <main id="main">
        <Hero />
        <AtAGlance />
        <Work />
        <About />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────── */

function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* Background: dot grid + slow gradient mesh */}
      <div className="dot-grid pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="mesh pointer-events-none absolute -right-[20%] -top-[30%] h-[80vh] w-[80vh] rounded-full opacity-70 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--brand-soft), transparent 65%)" }}
        aria-hidden
      />

      <div
        className={`${container} relative grid items-center gap-12 pb-20 pt-32 md:pb-28 md:pt-44 lg:grid-cols-12 lg:gap-8`}
      >
        <div className="min-w-0 lg:col-span-7">
          <div
            className="word-in t-label flex flex-wrap items-center gap-x-3 gap-y-2"
            style={{ "--d": "0ms" } as CSSProperties}
          >
            <span>{hero.greeting}</span>
            <span aria-hidden>·</span>
            <span>{person.role}</span>
            {person.location && (
              <>
                <span aria-hidden>·</span>
                <span>{person.location}</span>
              </>
            )}
            <span aria-hidden>·</span>
            <span className="flex items-center gap-2 text-ink">
              <span className="live-dot" aria-hidden />
              {hero.status}
            </span>
          </div>

          <h1 id="hero-title" className="t-hero mt-8 md:mt-10 lg:text-[clamp(72px,8.2vw,124px)]">
            <span className="text-subtle">
              <WordReveal text="I'm" start={80} />
            </span>{" "}
            <WordReveal text={person.firstName} start={150} />
            <br />
            <span className="serif-accent text-[1.08em] leading-[0.85]">
              <WordReveal text={person.lastName} start={220} />
            </span>
          </h1>

          <p
            className="word-in mt-10 text-[clamp(20px,1.6vw,26px)] leading-[1.45] tracking-[-0.015em] text-subtle md:mt-12"
            style={{ "--d": "380ms", maxWidth: "36ch" } as CSSProperties}
          >
            {hero.intro.map((part, i) =>
              part.strong ? (
                <strong key={i} className="font-medium text-ink">
                  {part.text}
                </strong>
              ) : part.secondary ? (
                <span key={i} className="text-ink/80">
                  {part.text}
                </span>
              ) : (
                <span key={i}>{part.text}</span>
              ),
            )}
          </p>
          <div
            className="word-in mt-10 flex flex-wrap items-center gap-3"
            style={{ "--d": "500ms" } as CSSProperties}
          >
            <Button href="#work" magnetic>
              {hero.primaryCta}
              <span aria-hidden>↓</span>
            </Button>
            <Button href={person.resume} variant="secondary" external>
              {hero.secondaryCta}
            </Button>
          </div>
        </div>

        <div
          className="word-in mx-auto w-full max-w-[420px] sm:max-w-[480px] lg:col-span-5 lg:max-w-none"
          style={{ "--d": "300ms" } as CSSProperties}
        >
          <HeroPhoto />
        </div>
      </div>
    </section>
  );
}

/* ── At a glance (bento) ──────────────────────────────────── */

function AtAGlance() {
  const refermint = getWork("refermint");
  const mcp = getWork("saleshandy-mcp");
  const surveyStat = refermint?.stats?.[0];
  const [expValue, ...expRest] = person.experience.split(" ");

  return (
    <section aria-labelledby="glance-title" className={`${container} py-16 md:py-24`}>
      <h2 id="glance-title" className="sr-only">
        {copy.glance.eyebrow}
      </h2>
      <Reveal className="t-label mb-8 flex items-center gap-3">
        <span className="text-brand-ink">01</span>
        <span className="h-px w-8 bg-line-strong" aria-hidden />
        <span>{copy.glance.eyebrow}</span>
      </Reveal>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
        {/* Role + domains */}
        <BentoTile className="md:col-span-2 lg:col-span-7">
          <span className="t-label">{copy.glance.role}</span>
          <div className="mt-auto pt-16">
            <div className="t-h2">{person.role}</div>
            <div className="mt-6 flex flex-wrap gap-2">
              {hero.domains.map((d) => (
                <Tag key={d} tone="brand">
                  {d}
                </Tag>
              ))}
              {hero.secondaryDomains.map((d) => (
                <Tag key={d}>{d}</Tag>
              ))}
            </div>
          </div>
        </BentoTile>

        {/* Experience */}
        <BentoTile delay={60} className="lg:col-span-5">
          <span className="t-label">{copy.glance.experience}</span>
          <div className="mt-auto pt-16">
            <StatCallout value={expValue} label={expRest.join(" ")} />
          </div>
        </BentoTile>

        {/* Currently building */}
        {refermint && (
          <BentoTile delay={0} className="lg:col-span-4">
            <div className="flex items-start justify-between gap-3">
              <Tag tone="live">{refermint.status}</Tag>
            </div>
            <div className="mt-auto pt-12">
              <div className="t-h3">{refermint.title}</div>
              <p className="mt-2 text-[15px] leading-relaxed text-subtle">{refermint.sub}</p>
              <Link
                to="/work/$slug"
                params={{ slug: refermint.slug }}
                className="link-u mt-4 inline-block text-[15px] font-medium text-brand-ink"
              >
                {copy.glance.buildingCta}
              </Link>
            </div>
          </BentoTile>
        )}

        {/* Headline metric */}
        {refermint && surveyStat && (
          <BentoTile delay={60} className="lg:col-span-4">
            <span className="t-label">{copy.glance.discovery}</span>
            <div className="mt-auto pt-12">
              <StatCallout
                value={surveyStat.value}
                label={surveyStat.label}
                source={refermint.title}
              />
            </div>
          </BentoTile>
        )}

        {/* Shipped to production */}
        {mcp && (
          <BentoTile delay={120} className="lg:col-span-4">
            <div className="flex items-start justify-between gap-3">
              <Tag tone="live">{mcp.status}</Tag>
            </div>
            <div className="mt-auto pt-12">
              <div className="t-h3">{mcp.title}</div>
              <p className="mt-2 text-[15px] leading-relaxed text-subtle">{mcp.sub}</p>
              <Link
                to="/work/$slug"
                params={{ slug: mcp.slug }}
                className="link-u mt-4 inline-block text-[15px] font-medium text-brand-ink"
              >
                {copy.glance.shippedCta}
              </Link>
            </div>
          </BentoTile>
        )}

        {/* Toolkit */}
        <BentoTile className="md:col-span-2 lg:col-span-8">
          <span className="t-label">{toolsHeading}</span>
          <ul className="mt-8 flex flex-wrap gap-2">
            {tools.map((t) => (
              <li
                key={t.name}
                className="flex min-h-11 items-center gap-2.5 rounded-full border border-line bg-canvas py-1.5 pl-1.5 pr-4 text-[14px] transition-colors hover:border-line-strong"
              >
                <span className="grid h-8 w-8 place-items-center overflow-hidden rounded-full bg-white p-1.5">
                  {t.Icon ? (
                    <t.Icon className="h-full w-full" />
                  ) : (
                    <img
                      src={t.icon}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-contain"
                    />
                  )}
                </span>
                {t.name}
              </li>
            ))}
          </ul>
        </BentoTile>

        {/* Contact */}
        <BentoTile delay={60} className="md:col-span-2 lg:col-span-4">
          <span className="t-label">{copy.glance.contact}</span>
          <div className="mt-auto space-y-2 pt-12">
            <a
              href={`mailto:${person.email}`}
              className="link-u block break-all text-lg font-medium tracking-[-0.02em]"
            >
              {person.email}
            </a>
            <a
              href={person.phoneHref}
              className="link-u inline-block font-mono text-[14px] text-subtle hover:text-ink"
            >
              {person.phone}
            </a>
          </div>
        </BentoTile>
      </div>
    </section>
  );
}

/* ── Selected work ────────────────────────────────────────── */

function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className={`${container} py-24 md:py-36`}>
      <SectionHeader
        id="work-title"
        index="02"
        eyebrow={copy.work.eyebrow}
        title={
          <>
            {copy.work.title[0]}{" "}
            <span className="serif-accent text-brand-ink">{copy.work.title[1]}</span>
          </>
        }
        aside={`${works.length} projects · ${person.experience}`}
      />
      <div className="space-y-6 md:space-y-8">
        {works.map((w, i) => (
          <ProjectCard key={w.slug} work={w} index={i} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

/* ── About ────────────────────────────────────────────────── */

function About() {
  const [first, ...rest] = aboutCards;
  return (
    <section id="about" aria-labelledby="about-title" className={`${container} py-24 md:py-36`}>
      <Reveal className="t-label mb-12 flex items-center gap-3 md:mb-16">
        <span className="text-brand-ink">03</span>
        <span className="h-px w-8 bg-line-strong" aria-hidden />
        <span>{copy.about.eyebrow}</span>
      </Reveal>

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <figure className="group relative overflow-hidden rounded-3xl border border-line bg-surface-2 lg:sticky lg:top-28">
            <img
              src={aboutPhoto}
              alt={copy.about.photoAlt}
              width={960}
              height={1275}
              loading="lazy"
              decoding="async"
              className="h-auto w-full transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
            />
            <figcaption className="absolute bottom-3 left-3 right-3 rounded-2xl border border-white/15 bg-black/55 px-4 py-3 text-[15px] text-white backdrop-blur-md">
              {copy.about.photoCaption}
            </figcaption>
          </figure>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal as="h2" id="about-title" className="t-label !text-brand-ink">
            {first.title}
          </Reveal>
          <Reveal
            as="p"
            delay={60}
            className="mt-6 text-[clamp(28px,3.2vw,44px)] font-medium leading-[1.15] tracking-[-0.03em]"
          >
            {first.body}
          </Reveal>

          <div className="mt-16 divide-y divide-line border-y border-line">
            {rest.map((c, i) => (
              <Reveal
                key={c.title}
                delay={i * 60}
                className="grid gap-3 py-8 sm:grid-cols-[200px_1fr] sm:gap-8"
              >
                <h3 className="font-mono text-[13px] uppercase tracking-[0.06em] text-subtle">
                  <span className="mr-3 text-brand-ink">{String(i + 2).padStart(2, "0")}</span>
                  {c.title}
                </h3>
                <p className="text-lg leading-relaxed">{c.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
