import claimwiseImg from "@/assets/work-claimwise.jpg";
import spotifyImg from "@/assets/work-spotify.jpg";
import sportskeedaImg from "@/assets/work-sportskeeda.jpg";
import uberImg from "@/assets/work-uber.jpg";
import refermintImg from "@/assets/work-refermint.jpg";

export type Solution = { title: string; desc: string };

export type Stat = { value: string; label: string };

export type TableBlock = {
  title?: string;
  headers: string[];
  rows: string[][];
  note?: string;
};

export type ExtraSection = {
  title: string;
  paras?: string[];
  bullets?: string[];
  quote?: string;
  table?: TableBlock;
  stats?: Stat[];
  steps?: string[];
};

export type Work = {
  slug: string;
  title: string;
  desc: string;
  tag: string;
  sub: string;
  img: string;
  status?: string;
  href?: string;
  ctaLabel?: string;
  prototype?: string;
  prototypeLabel?: string;
  duration: string;
  role: string;
  stack: string[];
  overview?: string[];
  problem?: string;
  painPoints?: string[];
  research?: string[];
  keyInsight?: string;
  opportunity?: string;
  successVision?: string;
  solutions?: Solution[];
  keyChallenges?: string;
  outcomes?: string[];
  keyLearnings?: string[];
  stats?: Stat[];
  table?: TableBlock;
  extraSections?: ExtraSection[];
};

export const works: Work[] = [
  {
    slug: "refermint",
    title: "ReferMint",
    desc: "Making employee referrals accessible beyond your personal network — a two-sided referral marketplace I'm building 0→1.",
    tag: "Marketplace",
    sub: "0→1 · MVP & Validation",
    img: refermintImg,
    status: "Currently building",
    duration: "Ongoing",
    role: "Product Manager / 0→1",
    stack: ["Product Discovery", "Surveys", "Figma", "Community"],
    stats: [
      { value: "450+", label: "survey responses" },
      { value: "10 days", label: "to validate the problem" },
      { value: "38", label: "successful referrals" },
      { value: "9", label: "candidates who got jobs" },
    ],
    overview: [
      "Stage: MVP development & validation. Current focus: community-led growth and marketplace validation.",
      "Getting a job is easy. Getting the right person to refer you isn't. Job seekers already have plenty of places to discover jobs — LinkedIn, Naukri, Wellfound, company career pages and others. But once they find a role they want, they face a completely different problem: how do I get someone inside the company to refer me?",
      "The conventional referral journey looks like this: find a job → search employees on LinkedIn → find a relevant employee → send connection request → wait → get accepted → start a conversation → explain your background → ask for referral → share resume/job link → follow up → wait. And if the person doesn't respond? Start again. The candidate effectively becomes their own outbound salesperson.",
    ],
    problem:
      "I didn't see the problem as simply “candidates need referrals.” The deeper problem was the amount of friction between wanting a referral and actually getting one.",
    painPoints: [
      "Discovery friction — candidates must manually identify employees who work at the target company, are relevant to the role, are willing to help and are approachable. LinkedIn makes employee discovery possible, but doesn't solve the referral transaction itself.",
      "Social friction — the candidate has to approach a stranger and essentially say: “Hi, we don't know each other, but could you refer me?” That creates hesitation on both sides.",
      "Response friction — connection requests may not be accepted, and even after acceptance the referral request may get no response. There is no structured workflow telling either party what happens next.",
      "Follow-up friction — candidates have no visibility into whether the employee saw the request, agreed to help, submitted the referral, whether the application was viewed, or whether an interview was scheduled. The process becomes a series of LinkedIn messages and WhatsApp conversations.",
      "Network inequality — referrals are inherently dependent on who you know. Someone with 500 relevant connections has a fundamentally different ability to access referrals than someone equally qualified with 50.",
    ],
    keyInsight:
      "Can we make access to employee referrals less dependent on someone's existing network?",
    extraSections: [
      {
        title: "Why Referrals?",
        paras: [
          "Before building anything, I wanted to establish whether this was actually a meaningful problem. The hypothesis wasn't simply “referrals are useful.” It was: if referrals materially improve movement through the hiring funnel, reducing the friction to obtain them could create meaningful value for candidates.",
          "Ashby's analysis of 38 million applications across 93,000 jobs from 2021–2024 provides a strong indication of the difference.",
        ],
        table: {
          headers: ["Funnel stage", "Inbound applications", "Referred applications"],
          rows: [
            ["Application → Interview", "3%", "40%"],
            ["Interview → Offer", "6%", "16%"],
          ],
          note: "Source: Ashby — Referrals & Hiring Funnel Analysis",
        },
        quote:
          "Referrals represented only around 1% of applications, compared with approximately 93.8% inbound applications, yet referred applications moved through the funnel at significantly higher rates. The opportunity wasn't to create another job board — it was to make a high-signal hiring channel more accessible.",
      },
      {
        title: "Discovery",
        paras: [
          "Instead of immediately building the solution, I wanted to understand whether candidates actually experienced the problem I had identified. I distributed a structured survey and collected 450+ responses in 10 days.",
          "I analyzed the responses around how candidates currently search for referrals, how they identify employees, whether they use LinkedIn to approach them, where they experience drop-offs, how comfortable they are asking strangers, how they follow up, what makes someone trustworthy enough to refer them, and what they expect from a referral platform.",
        ],
        quote:
          "The research helped me move from a broad assumption — “people want referrals” — to a much sharper problem: candidates don't have an efficient, structured way to access and coordinate referrals outside their existing network.",
      },
      {
        title: "The Product Hypothesis",
        paras: [
          "If the major friction is the connection and coordination layer, the solution should not try to replace the job-search ecosystem. Instead, ReferMint sits after job discovery.",
        ],
        bullets: [
          "Existing journey — Job discovered → Direct application",
          "Referral journey today — Job discovered → Search employee → LinkedIn connection → Conversation → Referral request → Follow-up → Referral",
          "ReferMint's intended journey — Job discovered → Find relevant referrer → Request referral → Referrer reviews → Referral → Track outcome",
        ],
        quote:
          "The goal is to turn an informal social interaction into a structured product workflow.",
      },
      {
        title: "A Key Product Decision: Shared Status Ownership",
        paras: [
          "One problem became obvious while designing the workflow: who actually knows what happened after a referral? The referrer knows whether they submitted the referral. The candidate knows whether they received an assessment, an interview, a rejection or an offer. So instead of making one person responsible for maintaining the entire hiring funnel, I designed the status model around information ownership.",
        ],
        bullets: [
          "Referrer owns: Request → Accepted/Declined → Referred",
          "Candidate owns: Interview → Assessment → Offer → Rejection",
          "System owns: Timeouts → Nudges → Auto-closure",
        ],
        quote:
          "This creates a more reliable status model while reducing unnecessary dependency on either side.",
      },
      {
        title: "Early Validation",
        paras: [
          "I wanted to move beyond surveys. The strongest validation would be whether strangers would actually use the workflow to generate real referrals. So far, 38 candidates have been successfully referred and 9 candidates secured jobs — an observed 23.7% referral-to-job conversion in the current cohort.",
          "I treat this as an early product signal, not an industry benchmark. The sample is still small and isn't statistically representative. But it validates something much more important at this stage: people are willing to participate in the referral exchange, and the exchange can produce real hiring outcomes. The product is still being built and validated.",
        ],
      },
      {
        title: "What I Am Building Now",
        paras: [
          "The current challenge has shifted. Initially the question was “is this a real problem?” — the research answered that. Then, “will people actually use a referral marketplace?” — the 38 referrals provided an early signal. Now the question is: can ReferMint create enough trust and marketplace liquidity to scale the referral loop?",
          "That means my current focus is community building and marketplace development. The objective isn't simply to accumulate users; it is to create the right balance between candidates needing referrals and employees willing to provide them. Without enough supply of relevant referrers, candidate demand alone doesn't create a functioning marketplace.",
        ],
      },
      {
        title: "The Growth Loop",
        steps: [
          "Candidate joins",
          "Requests referral",
          "Referrer provides referral",
          "Candidate progresses in hiring funnel",
          "Successful placement",
          "Trust & credibility increase",
          "More candidates join",
          "More employees participate",
          "Marketplace becomes more useful",
        ],
        quote:
          "The long-term product challenge is therefore not just acquisition. It is marketplace liquidity + trust + successful outcomes.",
      },
      {
        title: "Success Metrics",
        paras: [
          "I don't want ReferMint's success to be measured by registrations or referral requests alone. The core funnel I'm tracking is: Candidate → Referral Request → Accepted → Referred → Interview → Offer → Hired.",
          "North Star: successful placements generated through ReferMint.",
        ],
        bullets: [
          "Referral request → accepted rate",
          "Accepted → referred rate",
          "Referral → interview rate",
          "Interview → offer rate",
          "Offer → placement rate",
          "Time to successful referral",
          "Candidate repeat referral requests",
          "Referrer repeat participation",
          "Marketplace liquidity",
        ],
        quote:
          "Ultimately, the product should be judged by one question: are we helping more people convert opportunities into actual employment?",
      },
      {
        title: "Where ReferMint Stands Today",
        paras: [
          "ReferMint is not a finished product. It is an ongoing 0→1 product experiment. The next phase is about turning these early signals into a repeatable marketplace — one where getting a referral doesn't require an existing professional network, dozens of LinkedIn connection requests, or uncomfortable cold messages.",
        ],
        quote:
          "The bigger vision: make employee referrals accessible as a product, not a privilege of your network.",
      },
    ],
    solutions: [
      {
        title: "For candidates",
        desc: "Create a professional profile, find referral opportunities, request a referral for a specific role, provide relevant context to the referrer, track the referral journey and receive updates as the process progresses.",
      },
      {
        title: "For referrers",
        desc: "Receive referral requests, review candidate information, decide whether to refer, manage pending requests, mark a request as referred, and participate without maintaining a long back-and-forth conversation.",
      },
    ],
    keyChallenges:
      "Building the product has revealed a much larger set of PM problems: trust (why would an employee refer someone they don't know?), incentives (what motivates employees to spend their time helping candidates?), marketplace liquidity (how do you ensure candidates can find relevant referrers when they need them?), quality (how do you prevent candidates from requesting referrals indiscriminately?), conversion (request → referral → interview → offer → job) and retention (what makes a successful candidate or referrer return?). These are now more important product questions than simply adding features.",
  },
  {
    slug: "claimwise",
    title: "ClaimWise",
    desc: "A POC dashboard for hospital revenue analytics on cashless insurance claims under Rajasthan's MAA and RGHS schemes.",
    tag: "Healthcare",
    sub: "UX Research · Prototyping",
    img: claimwiseImg,
    href: "https://delicate-cendol-1f9f8c.netlify.app/",
    ctaLabel: "View Live Prototype",
    prototype: "https://delicate-cendol-1f9f8c.netlify.app/",
    prototypeLabel: "View Prototype",
    duration: "POC",
    role: "Product Manager",
    stack: ["React", "Figma", "Notion", "Claude"],
    overview: [
      "In Rajasthan, nearly 70% of the population is covered under government-backed cashless health insurance schemes — primarily Mukhyamantri Ayushman Aarogya (MAA) Yojana (65%) and Rajasthan Government Health Scheme (RGHS) (5%), with 1,700+ empanelled hospitals.",
      "Currently, hospitals rely on government portals for claims data, which only export cluttered, unorganized Excel reports. This creates operational bottlenecks, lack of financial transparency, and delayed tracking of pending reimbursements for hospital finance administrators.",
    ],
    problem:
      "Hospital finance teams lack a real-time, actionable dashboard to monitor cashless insurance claims, identify revenue leakage, and track dispute resolutions.",
    painPoints: [
      "High dependence on static, cluttered Excel exports with no automated visualization.",
      "Lack of visibility into revenue leakage, pending queries, and outstanding collections.",
      "Delayed dispute resolution and manual tracking causing cash flow bottlenecks for hospital management.",
    ],
    research: [
      "Conducted qualitative interviews with hospital finance executives to map claims workflows.",
      "Defined MVP scope focusing on key financial metrics, query impact, and risk identification.",
      "Designed clean data architecture and dashboard UI in Figma.",
      "Built an interactive React-based prototype (ClaimWise) to demonstrate real-time revenue analytics.",
    ],
    solutions: [
      {
        title: "Financial Impact Metrics",
        desc: "Real-time visibility into revenue leakage, total claim values, and outstanding collections.",
      },
      {
        title: "Core Claim KPIs",
        desc: "Real-time tracking of claim volume, average claim size, approval rates, and denial rates.",
      },
      {
        title: "Query Impact Breakdown",
        desc: "Granular breakdown of claims stuck in queries and denial trends by query count.",
      },
      {
        title: "Specialty & District Performance",
        desc: "Risk analysis across medical specialties and geographical claim distributions across Rajasthan.",
      },
    ],
    extraSections: [
      {
        title: "Prototype & Core Modules",
        bullets: [
          "Dashboard Overview: Real-time financial KPIs, claim status distributions, and revenue impact.",
          "Insights Module: Actionable recommendations for claim recovery, query resolution, and specialty risk profiling.",
          "Detailed Claim Journeys: Patient-level tracking from admission to final settlement.",
        ],
      },
      {
        title: "Future Scope",
        bullets: [
          "Direct API integration with government portals for live data synchronization.",
          "Machine learning models for predictive claim approval & denial forecasting.",
          "Mobile dashboard tailored for hospital C-suite executives.",
        ],
      },
    ],
    outcomes: [
      "Real-time operational transparency replacing manual Excel workflows.",
      "Faster decision-making and early detection of denial patterns.",
      "Clear roadmap for hospital administrators to recover lost revenue under MAA & RGHS schemes.",
    ],
  },
  {
    slug: "sportskeeda",
    title: "Sportskeeda Proposal",
    desc: "A comprehensive product proposal introducing Sporu (AI Sports Assistant) and a full Match Center experience for Sportskeeda.",
    tag: "Media",
    sub: "Product Proposal · APM",
    img: sportskeedaImg,
    href: "https://drive.google.com/file/d/1cKsCZt-g3hCkGKWd2hS0tzYure0UZ5QR/view?usp=sharing",
    ctaLabel: "Open Proposal Deck (PDF)",
    duration: "Case Study",
    role: "Product Manager (Proposal)",
    stack: ["Pitch", "Figma", "Notion", "Product Strategy"],
    overview: [
      "An end-to-end AI-powered sports platform proposal for Sportskeeda, designed to elevate fan engagement, deliver real-time match analytics, and personalize content delivery for modern sports fans.",
      "The proposal spans four key areas: Global Sports Tech Market Overview, Competitive Benchmarking, Core Innovations (Sporu AI Assistant & Match Center), and Go-To-Market Execution with Key Performance Metrics.",
    ],
    problem:
      "While sports tech is expanding rapidly ($13.2B market projected by 2034 with 67% NBA teams adopting AI), current sports platforms suffer from generic content delivery, lack of deep AI personalization, and fragmented match-day fan engagement.",
    stats: [
      { value: "$13.2B", label: "Projected Sports Tech Market by 2034" },
      { value: "67%", label: "NBA Teams Using AI Assistants" },
    ],
    table: {
      title: "Competitive Landscape Analysis",
      headers: ["Platform", "UI/UX", "AI Integration", "Fan Engagement", "Key Gap"],
      rows: [
        ["ESPN", "Professional", "Limited", "Fantasy Sports", "Generic non-personalized content"],
        ["Bleacher Report", "Mobile-first", "Basic", "Social Sharing", "Lacks statistical depth"],
        ["The Athletic", "Minimalist", "None", "Subscription/Articles", "No real-time stats or AI"],
        ["Cricbuzz", "Clean", "Predictive", "High (Cricket)", "Sport-specific restriction"],
        ["Dexerto", "Gaming-focused", "Trending", "Community", "Niche gaming focus"],
      ],
    },
    research: [
      "Primary Persona (Active Sports Fans, Age 20–35): Heavy fantasy sports participation, statistical depth required, active during match hours.",
      "Secondary Persona (Casual Viewers, Age 25–60): Focused on key highlights, major finals, mobile-first snackable content.",
    ],
    solutions: [
      {
        title: "Sporu AI Assistant",
        desc: "Sportskeeda's intelligent AI companion (Sport + Guru) providing instant player stats, game summaries, and contextual sports answers.",
      },
      {
        title: "Smart Redirection",
        desc: "Intelligent deep-linking redirecting complex user queries directly to full articles, match centers, or video highlights.",
      },
      {
        title: "Live Match Center",
        desc: "Real-time play-by-play commentary, live scoreboards, drive summaries, and key match event highlights.",
      },
      {
        title: "Pre & Post-Game Hub",
        desc: "Comprehensive pre-game lineups and predictions alongside post-game MVP selection, media interviews, and community reactions.",
      },
    ],
    extraSections: [
      {
        title: "Success Metrics & Growth Framework",
        bullets: [
          "User Engagement: DAU/MAU ratio, average session duration, page views per session.",
          "Performance Reliability: Packet drop rates, live score latency, page load speed optimization.",
          "Monetization Impact: Ad Click-Through Rates (CTR), community engagement depth, and sponsored AI query placements.",
        ],
      },
      {
        title: "Go-To-Market Strategy",
        bullets: [
          "Pre-Launch: Influencer sports partnerships, beta access for top fantasy players, targeted SEO campaigns.",
          "Launch: Exclusive sports personality interactive sessions, multi-channel social campaigns across X, Instagram, and YouTube.",
          "Post-Launch: Continuous feature iterations (P1/P2), user feedback loops, and analytics-driven optimization.",
        ],
      },
    ],
    outcomes: [
      "Structured product proposal for Sportskeeda APM role.",
      "Clear feature prioritization combining generative AI with real-time sports telemetry.",
      "Comprehensive metric framework balancing fan retention with advertising revenue.",
    ],
  },
  {
    slug: "spotify-india",
    title: "Spotify — India Market",
    desc: "Milestone 1: Product discovery, user research, and North Star metric framework for Spotify in India.",
    tag: "Entertainment",
    sub: "Product Discovery · Research",
    img: spotifyImg,
    href: "https://drive.google.com/file/d/1VGEFyib_GCnz8g2EkEq3UTu5pgaSPLxz/view?usp=sharing",
    ctaLabel: "Open Presentation Deck (PDF)",
    duration: "Milestone 1",
    role: "Product Manager (NextLeap)",
    stack: ["Product Discovery", "User Research", "Market Strategy", "Notion"],
    overview: [
      "Spotify is the global leader in digital audio streaming with 246 million premium subscribers and a 32.9% global market share (Q3 2024). In India, Spotify holds a 26% market share, competing alongside regional and global players such as JioSaavn (24%), YouTube Music (15%), and Apple Music (10%).",
      "This Milestone 1 study conducts a thorough market landscape analysis, maps industry actors, benchmarks competitive feature sets, and formulates why 'Time Spent Listening' serves as the ultimate North Star metric for Spotify's sustainable growth in India.",
    ],
    problem:
      "Understanding Spotify's growth levers in the price-sensitive Indian streaming market requires analyzing competitive friction points (ad frequency, pricing, regional catalog depth) and establishing a metric framework aligned with retention and revenue.",
    stats: [
      { value: "32.9%", label: "Global Market Share (Q3 2024)" },
      { value: "246M", label: "Global Premium Subscribers" },
      { value: "26%", label: "India Market Share" },
    ],
    table: {
      title: "India Streaming Competitive Benchmark",
      headers: ["Feature", "Spotify", "JioSaavn", "YouTube Music", "Apple Music"],
      rows: [
        ["Market Position", "Global Leader (32.9%)", "Strong Regional Focus (24%)", "Video Dominance (15%)", "Premium Base (10%)"],
        ["Freemium Tier", "Yes (Ad-supported)", "Yes (Ad-supported)", "Yes (Ad-supported)", "No Free Tier (Trial only)"],
        ["AI Recommendations", "Strong (Discover Weekly)", "Moderate", "Good (Watch history)", "Strong (Curated)"],
        ["Exclusive Content", "Podcasts & Audiobooks", "Limited", "YouTube Originals", "Exclusive Artist Deals"],
        ["Regional Music Focus", "Expanding", "Strong (Indian Languages)", "Good (Bollywood/Indie)", "Limited"],
        ["Social Features", "Collaborative Playlists", "Limited", "Comments & Sharing", "Minimal"],
        ["India Pricing (Individual)", "₹119 / month", "₹99 / month", "₹109 / month", "₹99 / month"],
      ],
    },
    research: [
      "Industry Actors: Platform Provider (Spotify), Rights Holders (T-Series, Sony, Universal), Artists/Creators, Free & Premium Users, Advertisers, and Licensing Bodies (IPRS, PPL).",
      "Teens (13–19): Free-tier users who love trending hits and viral playlist sharing.",
      "Young Adults (20–29): Core target segment; value ad-free premium listening and podcast content.",
      "Adults (30–45): Premium users preferring curated playlists and high-fidelity audio.",
      "Mature Listeners (45+): Classic hits, regional music focus, and popular podcasts.",
    ],
    keyInsight:
      "North Star Metric: 'Time Spent Listening'. This metric directly influences both ad revenue on the free tier and conversion/retention on the premium tier.",
    extraSections: [
      {
        title: "North Star Metric Breakdown — Time Spent Listening",
        bullets: [
          "MAU Growth: New users, retained users, and churned user reduction across free & premium tiers.",
          "Average Session Duration: Session length × percentage of active listening time.",
          "Session Frequency: Number of sessions initiated per user per day/week.",
        ],
      },
      {
        title: "Strategic Impact of Time Spent Listening",
        bullets: [
          "Drives Revenue: Increases ad impression inventory for free users and boosts paid conversions.",
          "Enhances Retention: Deepens user habit formation and lowers subscription churn.",
          "Improves AI Personalization: Greater listening data sharpens recommendation algorithms, creating a defensible moat.",
        ],
      },
    ],
    outcomes: [
      "Structured product discovery case study completed for NextLeap APM fellowship.",
      "Comprehensive breakdown of Indian music streaming competitive dynamics.",
      "Clear metric tree linking engagement metrics directly to core business outcomes.",
    ],
  },
  {
    slug: "uber-ux-revamp",
    title: "Uber UX Revamp",
    desc: "Business Requirements Document (BRD) for revamping the Uber user experience to minimize ride cancellations.",
    tag: "Logistics",
    sub: "BRD · UX Strategy",
    img: uberImg,
    href: "https://www.figma.com/board/QZiaBZZFrqg9W7kDrPvGHN/Uber-User-Experience-Revamp---Minimize-Ride-Cancellation----Business-Requirements-Document--BRD-?node-id=7-218&t=plTNV3drvnaGjiSb-1",
    ctaLabel: "Open FigJam BRD Board",
    duration: "Case Study",
    role: "Product Manager",
    stack: ["FigJam", "Figma", "BRD", "User Research"],
    overview: [
      "A comprehensive Business Requirements Document (BRD) and UX revamp strategy created in FigJam to address and minimize ride cancellations across the Uber ecosystem.",
      "The document establishes functional requirements, user journey maps, driver pain points, and product interventions designed to increase ride fulfillment rates and improve marketplace reliability.",
    ],
    problem:
      "High ride cancellation rates harm both sides of the Uber marketplace: riders face long wait times and unfulfilled trips, while drivers waste time and fuel, leading to reduced trust and revenue loss.",
    painPoints: [
      "Lack of destination & earnings transparency for drivers prior to accepting a trip leads to post-acceptance dropouts.",
      "Uncalibrated ETA expectations and long matching delays prompt riders to cancel and switch platforms.",
      "Communication gaps between driver and rider during peak surge and high-traffic pickup scenarios.",
    ],
    research: [
      "Mapped end-to-end user journeys for both drivers and riders during pickup, matching, and cancellation states.",
      "Identified primary drivers for cancellations: payment mode preferences, traffic route hesitation, and destination uncertainty.",
    ],
    solutions: [
      {
        title: "Upfront Destination & Fare Transparency",
        desc: "Provide drivers with upfront trip direction and estimated earnings to prevent dropouts after booking acceptance.",
      },
      {
        title: "Calibrated Dispatch & ETA Accuracy",
        desc: "Refine matching algorithms to prioritize nearby drivers and display realistic pickup timelines to riders.",
      },
      {
        title: "In-App Communication & Emergency Tools",
        desc: "Streamlined 1-tap quick chats for pickup location clarification to minimize misunderstandings.",
      },
      {
        title: "Fair Cancellation Policy Framework",
        desc: "Incentivize completed trips while establishing balanced, transparent cancellation fee structures.",
      },
    ],
    outcomes: [
      "Complete BRD covering business goals, functional specifications, and user flow diagrams.",
      "Actionable product roadmap aiming to decrease overall ride cancellation rate and raise rider CSAT.",
    ],
  },
];

export function getWork(slug: string) {
  return works.find((w) => w.slug === slug);
}

export type Tool = { name: string; logo: string };

const si = (s: string) => `https://cdn.simpleicons.org/${s}`;
const fav = (d: string) => `https://www.google.com/s2/favicons?domain=${d}&sz=128`;

export const tools: Tool[] = [
  { name: "Figma", logo: si("figma") },
  { name: "Framer", logo: si("framer") },
  { name: "Canva", logo: fav("canva.com") },
  { name: "Mixpanel", logo: si("mixpanel") },
  { name: "PostHog", logo: si("posthog") },
  { name: "MySQL", logo: si("mysql") },
  { name: "Claude", logo: si("claude") },
  { name: "ChatGPT", logo: fav("chatgpt.com") },
  { name: "Cursor", logo: si("cursor") },
  { name: "Vercel", logo: si("vercel") },
  { name: "v0", logo: si("v0") },
  { name: "Notion", logo: si("notion") },
  { name: "Lovable", logo: fav("lovable.dev") },
];
