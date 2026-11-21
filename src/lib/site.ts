import type { ComponentType } from "react";
import { PostHogIcon, ChurnkeyIcon } from "@/components/ToolIcons";

/** Home-page content and UX copy. All visible words live here; components only handle layout. */

export const person = {
  name: "Priyanshu Vaidya",
  firstName: "Priyanshu",
  lastName: "Vaidya",
  role: "Product Manager",
  email: "priyanshuvaidya360@gmail.com",
  phone: "+91 7805026022",
  phoneHref: "tel:+917805026022",
  resume: "https://drive.google.com/file/d/1xtQErI3UaJ3VZ7v4UHF0sckhOJAXiPYe/view?usp=sharing",
  experience: "2 Years in product",
  // TODO: add location (not present in current content) — shown in hero label when set.
  location: "",
  // TODO: add LinkedIn / X / GitHub URLs (not present in current content).
  socials: [] as { label: string; href: string }[],
  // Local-time widget. Inferred from the +91 phone number; change if needed.
  timeZone: "Asia/Kolkata",
  timeZoneLabel: "IST",
};

export const hero = {
  greeting: "Hey there!",
  status: "B2B SaaS",
  // Emphasised words are kept as separate parts.
  intro: [
    { text: "I'm a " },
    { text: "Product Manager", strong: true },
    {
      text: " who keeps asking “why?” until the real problem shows up. Then I ship the fix, sometimes with my own hands. I work across ",
    },
    { text: "MarTech", strong: true },
    { text: ", " },
    { text: "GTM", strong: true },
    { text: " and " },
    { text: "B2B SaaS", strong: true },
    { text: ", and I've also built for " },
    { text: "health insurtech", secondary: true },
    { text: "." },
  ] as { text: string; strong?: boolean; secondary?: boolean }[],
  primaryCta: "See what I've built",
  secondaryCta: "Grab my resume ↗",
  photoCaption: "Headphones on. Problem loading…",
  domains: ["MarTech", "GTM", "B2B SaaS"],
  secondaryDomains: ["health insurtech"],
};

/** Section labels, bento copy and CTAs used on the home page. */
export const copy = {
  glance: {
    eyebrow: "The quick version",
    role: "What I do",
    experience: "Time in product",
    discovery: "Homework done",
    buildingCta: "Peek inside →",
    shippedCta: "See how I built it →",
    contact: "Say hi",
  },
  work: {
    eyebrow: "Work",
    title: ["Proof, not", "promises."],
    cardCta: "Read the story",
    role: "My role",
    duration: "Timeline",
  },
  about: {
    eyebrow: "About",
    photoAlt: "Priyanshu Vaidya at his desk with headphones on, working across two screens",
    photoCaption: "Two screens, one problem, zero distractions.",
  },
};

export const aboutCards = [
  {
    title: "The short story",
    body: "I like messy problems. I break them into small, simple pieces until the answer looks obvious.",
  },
  {
    title: "How I think",
    body: "Stay curious, keep learning, and question every “we’ve always done it this way.”",
  },
  {
    title: "What makes me different",
    body: "I don't stop at the doc. I take ideas all the way to a working product, like the AI agent and the live MCP page you can see in my work.",
  },
];

export const toolsHeading = "My everyday toolkit";

const IMG = "https://framerusercontent.com/images";

export type ProductTool = {
  name: string;
  icon?: string;
  Icon?: ComponentType<{ className?: string }>;
};

export const tools: ProductTool[] = [
  { name: "Figma", icon: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" },
  { name: "ChatGPT", icon: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" },
  { name: "Framer", icon: `${IMG}/JMH2Clnl4mQx7hrDfSXujXDNPBY.png?width=1024&height=1024` },
  { name: "Mixpanel", icon: `${IMG}/c8wZzCEYqTQqDEWpDlhRaBHWNE.webp?width=1280&height=1280` },
  { name: "PostHog", Icon: PostHogIcon },
  { name: "Churnkey", Icon: ChurnkeyIcon },
  { name: "Canva", icon: `${IMG}/fpL2tfKhUIMrjaiJxqcRfeqiBM4.png?width=1000&height=1000` },
  { name: "Microsoft Copilot", icon: `${IMG}/BK8qMrtDynrYUprPzGeC7AZdJY.png?width=600&height=600` },
  { name: "Claude AI", icon: `${IMG}/jIQ9aYsNwbinLNzcfutfqVaDSdk.webp?width=512&height=512` },
  { name: "v0 by Vercel", icon: `${IMG}/8w05iauOZHD1uBrq4agHIOKabU.png?width=1200&height=630` },
  { name: "Google Gemini", icon: `${IMG}/refNMfyJekgKNpxwR4HMRj0ZNXw.png?width=2826&height=2624` },
];

export const contact = {
  eyebrow: "Contact",
  heading: ["Got a hard problem?", "Let's talk."],
  body: "Hiring a PM, building something new, or just want to talk products? Drop me a line. A short note is enough.",
  emailCta: "Write to me",
  copyCta: "Copy my email",
  copied: "Copied. Talk soon!",
  resumeCta: "Grab my resume ↗",
  navCta: "Let's talk",
  localTime: "My clock",
  backToTop: "Take me up ↑",
};
