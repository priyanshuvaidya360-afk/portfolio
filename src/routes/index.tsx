import { createFileRoute, Link } from "@tanstack/react-router";
import { works } from "@/lib/works";
import heroPmIllustration from "@/assets/hero-pm-illustration.jpg";
import { PostHogIcon, ChurnkeyIcon } from "@/components/ToolIcons";
import {
  RoadmapDoodle,
  KanbanDoodle,
  NorthStarDoodle,
  WireframeDoodle,
  AnalyticsDoodle,
  IdeaDoodle,
  OKRDoodle,
} from "@/components/PMDoodles";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Priyanshu Vaidya — Product Manager" },
      {
        name: "description",
        content:
          "Priyanshu Vaidya — Product Manager blending user research, AI, and business strategy to solve complex B2B and consumer challenges.",
      },
      { property: "og:title", content: "Priyanshu Vaidya — Product Manager" },
      {
        property: "og:description",
        content:
          "Product Manager blending user research, AI, and business strategy.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const IMG = "https://framerusercontent.com/images";

interface ProductTool {
  name: string;
  icon?: string;
  component?: React.ReactNode;
}

const tools: ProductTool[] = [
  {
    name: "Figma",
    icon: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
  },
  {
    name: "ChatGPT",
    icon: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
  },
  {
    name: "Framer",
    icon: `${IMG}/JMH2Clnl4mQx7hrDfSXujXDNPBY.png?width=1024&height=1024`,
  },
  {
    name: "Mixpanel",
    icon: `${IMG}/c8wZzCEYqTQqDEWpDlhRaBHWNE.webp?width=1280&height=1280`,
  },
  {
    name: "PostHog",
    component: <PostHogIcon className="w-8 h-8" />,
  },
  {
    name: "Churnkey",
    component: <ChurnkeyIcon className="w-8 h-8" />,
  },
  {
    name: "Canva",
    icon: `${IMG}/fpL2tfKhUIMrjaiJxqcRfeqiBM4.png?width=1000&height=1000`,
  },
  {
    name: "Microsoft Copilot",
    icon: `${IMG}/BK8qMrtDynrYUprPzGeC7AZdJY.png?width=600&height=600`,
  },
  {
    name: "Claude AI",
    icon: `${IMG}/jIQ9aYsNwbinLNzcfutfqVaDSdk.webp?width=512&height=512`,
  },
  {
    name: "v0 by Vercel",
    icon: `${IMG}/8w05iauOZHD1uBrq4agHIOKabU.png?width=1200&height=630`,
  },
  {
    name: "Google Gemini",
    icon: `${IMG}/refNMfyJekgKNpxwR4HMRj0ZNXw.png?width=2826&height=2624`,
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-[#faf7fd] text-[#2e1065] font-sans">
      {/* Nav */}
      <header className="sticky top-0 z-40 backdrop-blur bg-[#faf7fd]/80 border-b border-[#7c3aed]/10">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-semibold text-lg text-[#2e1065]">
            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#a855f7] to-[#7c3aed] flex items-center justify-center text-white text-sm font-bold shadow-sm">
              P
            </span>
            Priyanshu
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <a href="#work" className="hover:text-[#7c3aed] transition font-medium">Work</a>
            <a href="#about" className="hover:text-[#7c3aed] transition font-medium">About</a>
            <a
              href="https://drive.google.com/file/d/1Rmc_A1Dk5Ii5ILP0XCpduIw_kiPYCNif/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#7c3aed] transition font-medium flex items-center gap-1"
            >
              Resume ↗
            </a>
            <a
              href="#contact"
              className="rounded-full bg-[#3b0764] text-white px-5 py-2 hover:bg-[#581c87] transition font-medium shadow-sm"
            >
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#7c3aed]/10 text-[#7c3aed] px-4 py-1.5 text-sm font-medium mb-6">
              <span className="animate-pulse">👋</span>
              <span>Hello there!</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-[#2e1065]/40">I'm</span>{" "}
              <span className="bg-gradient-to-r from-[#7c3aed] via-[#9333ea] to-[#c084fc] bg-clip-text text-transparent">
                Priyanshu
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#7c3aed] via-[#9333ea] to-[#c084fc] bg-clip-text text-transparent">
                Vaidya
              </span>
            </h1>
            <p className="mt-6 md:mt-8 max-w-xl text-lg md:text-xl text-[#2e1065]/75 leading-relaxed">
              I'm a{" "}
              <span className="font-semibold text-[#2e1065]">Product Manager</span>{" "}
              building AI-driven solutions across{" "}
              <span className="font-semibold text-[#2e1065]">health insurtech</span>,{" "}
              <span className="font-semibold text-[#2e1065]">automation</span> and{" "}
              <span className="font-semibold text-[#2e1065]">SaaS</span> — turning research and data into products that scale.
            </p>
            <div className="mt-8 md:mt-10 flex flex-wrap gap-4 items-center">
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-6 py-3 font-medium transition shadow-lg shadow-[#7c3aed]/25"
              >
                View My Works
              </a>
              <a
                href="https://drive.google.com/file/d/1Rmc_A1Dk5Ii5ILP0XCpduIw_kiPYCNif/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white hover:bg-[#faf5ff] text-[#7c3aed] border border-[#7c3aed]/30 px-6 py-3 font-medium transition shadow-sm"
              >
                View Resume ↗
              </a>
            </div>
          </div>

          {/* Problem Solver PM Illustration */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#c084fc]/25 to-[#7c3aed]/25 rounded-[2.5rem] blur-2xl scale-95" />
            <div className="relative rounded-3xl overflow-hidden border border-[#7c3aed]/20 bg-white shadow-2xl hover:shadow-[#7c3aed]/15 transition duration-500">
              <img
                src={heroPmIllustration}
                alt="Priyanshu Vaidya - Product Manager & Problem Solver"
                className="w-full h-auto object-cover transform hover:scale-102 transition duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Marquee-ish work strip */}
      <section className="overflow-hidden py-6 border-y border-[#7c3aed]/10 bg-[#f5f0ff]">
        <div className="flex gap-6 animate-[scroll_40s_linear_infinite] w-max">
          {[...works, ...works, ...works].map((w, i) => (
            <img
              key={i}
              src={w.img}
              alt={w.title}
              className="h-40 md:h-56 rounded-2xl object-cover shadow-sm border border-[#7c3aed]/10"
            />
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              doodle: <IdeaDoodle className="w-12 h-12 text-[#7c3aed] mb-4" />,
              title: "Who am I?",
              body: "I'm someone who enjoys breaking down complex problems and finding simple, practical ways to solve them.",
              accent: "from-[#c084fc]/15 to-transparent",
            },
            {
              doodle: <OKRDoodle className="w-12 h-12 text-[#9333ea] mb-4" />,
              title: "My Philosophy",
              body: "The best solutions come from curiosity, continuous learning, and a willingness to challenge assumptions.",
              accent: "from-[#a855f7]/15 to-transparent",
            },
            {
              doodle: <AnalyticsDoodle className="w-12 h-12 text-[#7c3aed] mb-4" />,
              title: "My Distinct Edge",
              body: "I combine strategic thinking with hands-on execution, allowing me to move from ideas to outcomes quickly.",
              accent: "from-[#7c3aed]/15 to-transparent",
            },
          ].map((c) => (
            <div
              key={c.title}
              className="relative rounded-3xl bg-white p-8 border border-[#7c3aed]/10 shadow-sm hover:shadow-md hover:-translate-y-1 transition overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${c.accent} pointer-events-none`} />
              <div className="relative">
                {c.doodle}
                <h3 className="text-xl font-semibold mb-2 text-[#2e1065]">{c.title}</h3>
                <p className="text-[#2e1065]/75 leading-relaxed">{c.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Skills strip */}
        <div className="mt-16 text-center">
          <p className="text-sm uppercase tracking-widest text-[#2e1065]/50 mb-6 font-medium">
            Skilled in modern Product tools
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            {tools.map((t) => (
              <div
                key={t.name}
                title={t.name}
                className="group relative w-14 h-14 rounded-2xl bg-white border border-[#7c3aed]/10 shadow-sm p-2.5 flex items-center justify-center hover:scale-110 hover:border-[#7c3aed]/40 hover:shadow-md transition duration-200 cursor-pointer"
              >
                {t.icon ? (
                  <img src={t.icon} alt={t.name} className="max-w-full max-h-full object-contain" />
                ) : (
                  t.component
                )}

                {/* Floating Tooltip on Hover */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition duration-200 pointer-events-none z-30">
                  <div className="bg-[#2e1065] text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg shadow-lg whitespace-nowrap">
                    {t.name}
                  </div>
                  <div className="w-2 h-2 bg-[#2e1065] rotate-45 mx-auto -mt-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Works */}
      <section id="work" className="mx-auto max-w-6xl px-6 py-24">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Selected <span className="italic text-[#7c3aed]">Work</span>
          </h2>
          <span className="text-sm text-[#2e1065]/60 font-medium">1+ year experience</span>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {works.map((w) => (
            <Link
              key={w.title}
              to="/work/$slug"
              params={{ slug: w.slug }}
              className="group rounded-3xl overflow-hidden bg-white border border-[#7c3aed]/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[#f5f0ff]">
                <img
                  src={w.img}
                  alt={w.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-[#2e1065]">{w.title}</h3>
                <p className="mt-2 text-[#2e1065]/75">{w.desc}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex gap-2 text-xs">
                    <span className="rounded-full bg-[#7c3aed]/10 text-[#7c3aed] px-3 py-1 font-medium">
                      {w.tag}
                    </span>
                    <span className="rounded-full bg-[#c084fc]/15 text-[#6d28d9] px-3 py-1 font-medium">
                      {w.sub}
                    </span>
                  </div>
                  <span className="text-sm text-[#7c3aed] font-medium opacity-0 group-hover:opacity-100 transition">
                    View case study →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-6 py-24">
        <div className="relative rounded-[2rem] bg-gradient-to-br from-[#3b0764] via-[#581c87] to-[#7e22ce] text-white p-12 md:p-20 text-center overflow-hidden shadow-2xl">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#c084fc]/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#a855f7]/20 blur-3xl" />
          <div className="relative max-w-xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              Let's <span className="italic text-[#e9d5ff]">Connect</span>
            </h2>
            <p className="mt-4 text-white/85 text-lg leading-relaxed">
              I'm open to new opportunities, product discussions, or just a good conversation.
            </p>
            <div className="mt-8 font-mono text-lg md:text-xl text-[#e9d5ff] flex flex-wrap justify-center items-center gap-4">
              <a href="mailto:priyanshuvaidya360@gmail.com" className="hover:underline hover:text-white transition">
                priyanshuvaidya360@gmail.com
              </a>
              <span className="opacity-50">•</span>
              <a href="tel:+917805026022" className="hover:underline hover:text-white transition">
                +91 7805026022
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-6 py-10 text-sm text-[#2e1065]/60 flex flex-wrap justify-between items-center gap-4 border-t border-[#7c3aed]/10 font-medium">
        <span>© {new Date().getFullYear()} Priyanshu Vaidya</span>
        <div className="flex flex-wrap items-center gap-6">
          <a href="mailto:priyanshuvaidya360@gmail.com" className="hover:text-[#7c3aed] transition">
            priyanshuvaidya360@gmail.com
          </a>
          <a href="tel:+917805026022" className="hover:text-[#7c3aed] transition">
            +91 7805026022
          </a>
          <a
            href="https://drive.google.com/file/d/1Rmc_A1Dk5Ii5ILP0XCpduIw_kiPYCNif/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#7c3aed] transition font-semibold"
          >
            Resume ↗
          </a>
        </div>
      </footer>

      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}

