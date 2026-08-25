import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getWork, works, type Work } from "@/lib/works";

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
    <div className="min-h-screen flex items-center justify-center bg-[#faf7fd]">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[#2e1065]">Project not found</h1>
        <Link to="/" className="mt-4 inline-block text-[#7c3aed] underline font-medium">
          Back home
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="min-h-screen flex items-center justify-center bg-[#faf7fd]">
      <div className="text-center">
        <p className="text-[#2e1065]">{error.message}</p>
        <button onClick={reset} className="mt-4 text-[#7c3aed] underline font-medium">
          Retry
        </button>
      </div>
    </div>
  ),
  component: WorkDetail,
});

function WorkDetail() {
  const { work: w } = Route.useLoaderData() as { work: Work };
  const nextIdx = (works.findIndex((x) => x.slug === w.slug) + 1) % works.length;
  const next = works[nextIdx];

  return (
    <div className="min-h-screen bg-[#faf7fd] text-[#2e1065]">
      {/* Nav */}
      <nav className="sticky top-0 z-30 bg-[#faf7fd]/80 backdrop-blur border-b border-[#7c3aed]/10">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link to="/" className="font-semibold tracking-tight text-[#2e1065] hover:text-[#7c3aed] transition">
            ← Priyanshu Vaidya
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <Link to="/" hash="work" className="hover:text-[#7c3aed] font-medium">
              Work
            </Link>
            <a
              href="https://drive.google.com/file/d/1Rmc_A1Dk5Ii5ILP0XCpduIw_kiPYCNif/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#7c3aed] font-medium flex items-center gap-1"
            >
              Resume ↗
            </a>
            <a
              href={w.prototype || w.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#3b0764] text-white px-4 py-2 hover:bg-[#581c87] transition font-medium shadow-sm"
            >
              View Prototype ↗
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-10">
        <div className="flex items-center gap-2 text-xs mb-6">
          <span className="rounded-full bg-[#7c3aed]/10 text-[#7c3aed] px-3 py-1 font-medium">
            {w.tag}
          </span>
          <span className="rounded-full bg-[#c084fc]/15 text-[#6d28d9] px-3 py-1 font-medium">
            {w.sub}
          </span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-[#2e1065]">
          {w.title}
        </h1>
        <p className="mt-4 text-lg text-[#2e1065]/75 max-w-3xl leading-relaxed">{w.desc}</p>
        <div className="mt-10 rounded-3xl overflow-hidden aspect-[16/8] bg-[#f5f0ff] border border-[#7c3aed]/10 shadow-sm">
          <img src={w.img} alt={w.title} className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Body with sidebar */}
      <section className="mx-auto max-w-6xl px-6 pb-24 grid md:grid-cols-[280px_1fr] gap-10">
        {/* Sidebar */}
        <aside className="space-y-4 md:sticky md:top-24 self-start">
          <SidebarCard label="Duration" value={w.duration} />
          <SidebarCard label="Role" value={w.role} />
          <div className="rounded-2xl bg-white border border-[#7c3aed]/10 p-6 shadow-sm">
            <div className="text-lg font-semibold mb-4 text-[#2e1065]">Tech Stack</div>
            <div className="flex flex-wrap gap-2">
              {w.stack.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-[#f5f0ff] text-[#6d28d9] px-3 py-1 text-sm font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <a
            href={w.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-2xl bg-[#3b0764] text-white p-5 text-center font-semibold hover:bg-[#581c87] transition shadow-sm"
          >
            View Full Document ↗
          </a>
        </aside>

        {/* Content */}
        <article className="space-y-14">
          {w.overview && w.overview.length > 0 && (
            <Section title="Project Overview">
              {w.overview.map((p, i) => (
                <p key={i} className="text-[#2e1065]/80 leading-relaxed text-lg mb-4 last:mb-0">
                  {p}
                </p>
              ))}
            </Section>
          )}

          {w.stats && w.stats.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {w.stats.map((st, i) => (
                <div key={i} className="rounded-2xl bg-white border border-[#7c3aed]/10 p-5 text-center shadow-sm">
                  <div className="text-3xl font-bold text-[#7c3aed]">{st.value}</div>
                  <div className="text-sm text-[#2e1065]/70 mt-1">{st.label}</div>
                </div>
              ))}
            </div>
          )}

          {(w.problem || (w.painPoints && w.painPoints.length > 0)) && (
            <Section title="The Problem">
              {w.problem && <p className="text-[#2e1065]/80 leading-relaxed text-lg">{w.problem}</p>}
              {w.painPoints && w.painPoints.length > 0 && (
                <div className="mt-6">
                  <div className="font-semibold mb-3 text-[#2e1065]">Key Pain Points</div>
                  <ul className="list-disc pl-5 space-y-2 text-[#2e1065]/80">
                    {w.painPoints.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}
            </Section>
          )}

          {(w.research || w.keyInsight || w.opportunity || w.successVision) && (
            <Section title="Research & Discovery">
              {w.research && w.research.length > 0 && (
                <ul className="list-disc pl-5 space-y-2 text-[#2e1065]/80">
                  {w.research.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              )}
              {w.keyInsight && (
                <div className="mt-6 rounded-2xl bg-[#faf5ff] border border-[#7c3aed]/20 p-6 shadow-sm">
                  <div className="text-xs uppercase tracking-wider text-[#7c3aed] font-semibold">
                    Key Insight
                  </div>
                  <p className="mt-2 text-[#2e1065]/85 leading-relaxed">
                    {w.keyInsight}
                  </p>
                </div>
              )}
              {w.opportunity && (
                <div className="mt-4 rounded-2xl bg-white border border-[#7c3aed]/10 p-6 shadow-sm">
                  <div className="text-xs uppercase tracking-wider text-[#6d28d9] font-semibold">
                    Opportunity
                  </div>
                  <p className="mt-2 text-[#2e1065]/85 leading-relaxed italic">
                    {w.opportunity}
                  </p>
                </div>
              )}
              {w.successVision && (
                <div className="mt-4 rounded-2xl bg-white border border-[#7c3aed]/10 p-6 shadow-sm">
                  <div className="text-xs uppercase tracking-wider text-[#6d28d9] font-semibold">
                    Success Vision
                  </div>
                  <p className="mt-2 text-[#2e1065]/85 leading-relaxed">
                    {w.successVision}
                  </p>
                </div>
              )}
            </Section>
          )}

          {w.table && (
            <Section title={w.table.title || "Data & Analysis"}>
              <div className="overflow-x-auto rounded-2xl border border-[#7c3aed]/15 bg-white shadow-sm">
                <table className="w-full text-left text-sm text-[#2e1065]">
                  <thead className="bg-[#f5f0ff] border-b border-[#7c3aed]/15">
                    <tr>
                      {w.table.headers.map((h, i) => (
                        <th key={i} className="px-4 py-3 font-semibold text-[#2e1065]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#7c3aed]/10">
                    {w.table.rows.map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) => (
                          <td key={j} className="px-4 py-3">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {w.table.note && (
                <p className="text-xs text-[#2e1065]/60 mt-2 italic">{w.table.note}</p>
              )}
            </Section>
          )}

          {w.solutions && w.solutions.length > 0 && (
            <Section title="Solutions">
              <div className="grid sm:grid-cols-2 gap-4">
                {w.solutions.map((s, i) => (
                  <div
                    key={i}
                    className="rounded-2xl bg-white border border-[#7c3aed]/10 p-6 hover:shadow-md transition"
                  >
                    <div className="font-semibold text-[#2e1065]">{s.title}</div>
                    <p className="mt-2 text-[#2e1065]/75 text-sm leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {w.keyChallenges && (
            <Section title="Key Challenges">
              <p className="text-[#2e1065]/80 leading-relaxed text-lg">
                {w.keyChallenges}
              </p>
            </Section>
          )}

          {w.extraSections && w.extraSections.length > 0 && (
            <>
              {w.extraSections.map((sec, i) => (
                <Section key={i} title={sec.title}>
                  {sec.paras && sec.paras.map((p, j) => (
                    <p key={j} className="text-[#2e1065]/80 leading-relaxed text-lg mb-4 last:mb-0">
                      {p}
                    </p>
                  ))}
                  {sec.bullets && sec.bullets.length > 0 && (
                    <ul className="list-disc pl-5 space-y-2 text-[#2e1065]/80 mt-3">
                      {sec.bullets.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                  )}
                  {sec.steps && sec.steps.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {sec.steps.map((st, j) => (
                        <span key={j} className="rounded-xl bg-white border border-[#7c3aed]/15 px-3 py-1.5 text-sm text-[#2e1065] flex items-center gap-1.5 shadow-sm">
                          <span className="font-bold text-[#7c3aed]">{j + 1}.</span> {st}
                        </span>
                      ))}
                    </div>
                  )}
                  {sec.table && (
                    <div className="mt-4 overflow-x-auto rounded-2xl border border-[#7c3aed]/15 bg-white shadow-sm">
                      <table className="w-full text-left text-sm text-[#2e1065]">
                        <thead className="bg-[#f5f0ff] border-b border-[#7c3aed]/15">
                          <tr>
                            {sec.table.headers.map((h, k) => (
                              <th key={k} className="px-4 py-3 font-semibold">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#7c3aed]/10">
                          {sec.table.rows.map((row, k) => (
                            <tr key={k}>
                              {row.map((cell, l) => (
                                <td key={l} className="px-4 py-3">{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {sec.table.note && (
                        <p className="text-xs text-[#2e1065]/60 p-2 italic">{sec.table.note}</p>
                      )}
                    </div>
                  )}
                  {sec.quote && (
                    <blockquote className="mt-4 border-l-4 border-[#7c3aed] pl-4 italic text-[#2e1065]/85">
                      "{sec.quote}"
                    </blockquote>
                  )}
                </Section>
              ))}
            </>
          )}

          {w.outcomes && w.outcomes.length > 0 && (
            <Section title="Outcomes & Impact">
              <ul className="list-disc pl-5 space-y-2 text-[#2e1065]/80">
                {w.outcomes.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </Section>
          )}

          {w.keyLearnings && w.keyLearnings.length > 0 && (
            <Section title="Key Learnings">
              <ul className="space-y-3">
                {w.keyLearnings.map((p, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-[#2e1065]/80 leading-relaxed"
                  >
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#7c3aed] flex-shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {w.href && (
            <div className="rounded-3xl bg-gradient-to-br from-[#3b0764] via-[#581c87] to-[#7e22ce] text-white p-8 md:p-10 shadow-xl">
              <div className="text-sm uppercase tracking-wider opacity-80">
                Explore the full project documentation
              </div>
              <div className="mt-2 text-2xl font-semibold">
                Read the complete case study, deck & design files
              </div>
              <a
                href={w.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-5 rounded-full bg-white text-[#3b0764] px-6 py-3 font-bold hover:bg-[#faf5ff] transition shadow-md"
              >
                {w.ctaLabel || "Open Full Document ↗"}
              </a>
            </div>
          )}
        </article>
      </section>

      {/* Next project */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <Link
          to="/work/$slug"
          params={{ slug: next.slug }}
          className="group block rounded-3xl overflow-hidden bg-white border border-[#7c3aed]/10 hover:shadow-xl transition"
        >
          <div className="grid md:grid-cols-2">
            <div className="aspect-[16/10] overflow-hidden bg-[#f5f0ff]">
              <img
                src={next.img}
                alt={next.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <div className="text-sm text-[#2e1065]/50 font-medium">Next Project</div>
              <div className="text-3xl font-semibold mt-2 text-[#2e1065]">{next.title}</div>
              <div className="mt-2 text-[#2e1065]/75">{next.desc}</div>
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
}

function SidebarCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white border border-[#7c3aed]/10 p-6 text-center shadow-sm">
      <div className="text-lg font-semibold text-[#2e1065]">{label}</div>
      <div className="mt-2 text-[#2e1065]/75">{value}</div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5 text-[#2e1065]">
        {title}
      </h2>
      {children}
    </div>
  );
}
