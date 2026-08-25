# Portfolio content + tools fixes

## 1. Tools strip ("Skilled in modern product tools")

- Remove the duplicate Figma tile and remove Copilot.
- Final tool set: Figma, Framer, Spline, Canva, Mixpanel, PostHog, MySQL, Claude, Cursor, Vercel, ChatGPT, v0, Lovable.
- Each tile stores `{ name, logo }` instead of a bare URL, and shows the tool name on hover (tooltip label appearing under/over the tile, same rounded-white card style).

## 2. Project CTAs — direct links, no Notion detour

Replace the "Open on Notion ↗" wording and the generic Notion `href` with the real source per project:

| Project | Primary CTA target |
|---|---|
| ClaimWise | Netlify prototype (existing) + Notion case study |
| Spotify India | the Product Discovery & User Research deck |
| Sportskeeda | https://drive.google.com/file/d/1cKsCZt-g3hCkGKWd2hS0tzYure0UZ5QR/view |
| Uber UX Revamp | https://www.figma.com/board/QZiaBZZFrqg9W7kDrPvGHN/... (BRD board) |
| ReferMint | no external doc — case study lives on the site |

CTA label becomes contextual ("View Prototype", "View Document", "Open BRD Board") instead of "Open on Notion". Projects without a link simply don't render the CTA block.

## 3. Rewrite case studies from the real sources

Currently the case-study copy is written by me, not by you. I will replace it with your own wording, pulled from:
- the Notion portfolio pages (fetched page by page),
- the Sportskeeda Drive document,
- the Uber Figma BRD board,
- the uploaded Spotify "Milestone-1 — Product Discovery & User Research" PDF (market landscape, Spotify vs JioSaavn/YouTube Music/Apple Music comparison, user segments, "Time Spent Listening" metric tree).

Rules I'll follow: keep the existing section format (Overview → Problem → Pain Points → Research → Key Insight → Opportunity → Success Vision → Solutions → Key Challenges → Outcomes → Learnings), but only fill sections that the source actually supports. No invented metrics, no filler. If a source has nothing for a section, that section is dropped for that project rather than padded — this means the section list becomes optional per project in the data model.

## 4. New project: ReferMint

Added as a new case study (and a card on the home page) using your text verbatim in structure:
- Tagline: "Making employee referrals accessible beyond your personal network"
- Role: Product Manager / 0→1 · Stage: MVP development & validation
- Sections mapped: The Problem, The Candidate Friction (5 friction types), Why Referrals? (Ashby funnel table: 3% → 40% application-to-interview, 6% → 16% interview-to-offer), Discovery (450+ responses in 10 days), Product Hypothesis (journey comparison), The Solution (candidate side / referrer side), Shared Status Ownership decision, Early Validation (38 referred, 9 hired, 23.7%), What I'm Building Now, Growth Loop, What I've Learned, Success Metrics, Where It Stands Today.
- Marked as "Currently building" with a status badge on the card.
- New cover image generated in the site's mint/green style.

## Technical notes

- `src/lib/works.ts`: tools list moves to its own export or stays in `index.tsx`; `Work` type gains optional fields (`status`, `ctaLabel`, `stats`, custom section blocks) and most existing string/array fields become optional so a project can omit sections.
- `src/routes/work.$slug.tsx`: render sections conditionally; support a stat-grid block (for ReferMint numbers) and a simple table block (Ashby funnel, Spotify competitor matrix).
- `src/routes/index.tsx`: tools grid gets names + hover labels; ReferMint card added to the works grid and marquee.
- New asset for the ReferMint cover via the asset CDN.
