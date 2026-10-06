# GSL Website Migration Plan & Technical Inventory

**Target Architecture:**
```text
Next.js (App Router)
├── Website Frontend
├── Payload CMS 3.x
│   ├── Admin UI (/admin)
│   ├── Content Management (Pages & Blocks)
│   ├── Structured Collections (Posts, Team, Services, Media)
│   ├── User Management & RBAC (Admin, Editor)
│   └── Email Integration
├── PostgreSQL (Devcontainer / Production)
└── Preserved Visual Design (Zero CSS framework change, pixel parity)
```

---

## 1. Complete Page Inventory

The existing prototype is an autarkic single-page application (SPA) switching views via JavaScript `go(id)` and CSS classes (`.page`, `.page.on`). In the Next.js architecture, these become clean, crawlable App Router routes:

| Route | Old ID / Context | Purpose | Key Sections / Modules |
| :--- | :--- | :--- | :--- |
| `/` | `#p-home` | Company Homepage & Executive Entry | Hero with background video, live departure countdown badge, upcoming departures cards, "Wer wir sind" credibility facts & pillars, cargo preview gallery, recent news teasers, closing CTA banner |
| `/leistungen` | `#p-leistungen` | Core Maritime & Logistics Services | Service overview header, 4 service cards (Break Bulk & Schwergut, Projektladung, Schüttgut, Multimodal & Vor-/Nachlauf), tonnage credibility notes |
| `/fahrplaene` | `#p-fahrplaene` | Interactive Sailing Schedules | Schedule header, route tabs ("Europa → Amerika", "Schwarzes Meer/Med → USA", "Ankünfte USA"), PDF print button, Excel schedule ingestion demo, interactive tabular schedule with desktop/mobile view modes, email newsletter / schedule subscription box, nautical footnote legend |
| `/ladungen` | `#p-ladungen` | Cargo & Operations Media Gallery | Gallery header, 9 high-res authentic photos from operations in Brake and Wismar with detailed cargo captions |
| `/news` | `#p-news` | Editorial Port Journal & Articles | News header, category filter tabs (`Alle`, `Ladung`, `Routen`, `Menschen`, `Fachwissen`, `Historie`), grid of article cards |
| `/news/[slug]` | `#p-beitrag` | Individual Editorial Article View | Back link to `/news`, category badge, publication date, headline, article body (formatted paragraphs, subheadings, blockquotes), related articles bottom grid |
| `/team` | `#p-team` | Bremen Team Roster | Team intro header, 7 direct contact cards with portrait photos, job titles, direct landline, mobile numbers, and emails |
| `/kontakt` | `#p-kontakt` | Rate Inquiries & Contact | RFQ contact form (cargo details, ports, topic, GDPR consent), direct booking contacts, Bremen headquarters address, privacy-compliant map placeholder |
| `/ueberblick` | `#p-ueberblick` | Architecture & Rationale (Review Page) | Internal technical comparison of old website flaws vs. relaunch solutions (bilingualism, schedules, autonomy, internal leak prevention, zero-cookie privacy) |

---

## 2. Asset Inventory

The prototype is 100% self-contained (~5.13 MB) with all assets embedded as base64 data URIs.

### 2.1 Embedded Typography (7 WOFF2 Files)
- `DM Sans`: Bold (700), ExtraBold (800), Black (900) — Used for headings, hero titles, statistics numerals, and badges.
- `Inter`: Regular (400), Medium (500), SemiBold (600), Bold (700) — Used for body copy, table data, navigation links, and forms.
*Extraction Target:* `src/assets/fonts/` loaded via `next/font/local`.

### 2.2 Embedded Video (1 MP4 File)
- `#p-home .hero video`: Aerial harbor and shipping footage (~1.34 MB decoded MP4).
*Extraction Target:* `public/videos/hero.mp4` with poster fallback.

### 2.3 Embedded Images (28 Images, 27 Unique)
- **Logos:** GSL Vector/PNG logo in navy and white (`public/images/logo.png`, `public/images/logo-white.png`).
- **Home Preview Images:** 4 port cargo operations images (`home-1.jpg` to `home-4.jpg`).
- **Cargo Gallery (`/ladungen`):** 9 authentic cargo handling photos from Brake and Wismar (`cargo-1.jpg` to `cargo-9.jpg`).
- **News Thumbnails (`/news`):** 6 editorial thumbnails (`news-1.jpg` to `news-6.jpg`).
- **Team Portraits (`/team`):** 7 team member portraits (`team-lars-elkjaer.jpg`, `team-cord-juergens.jpg`, `team-kai-juehdes.jpg`, `team-maureen-kobe.jpg`, `team-sabine-krueger.jpg`, `team-matthis-osmers.jpg`, `team-uwe-albrecht.jpg`).
*Extraction Target:* Extracted to `public/media/` for static parity, then imported into Payload CMS `Media` collection with proper alt texts.

### 2.4 Icons & Glyphs
- Zero external icon libraries (no FontAwesome, Feather, or Lucide).
- Icons are rendered via pure CSS shapes (`.dot`), Unicode symbols (`☰` mobile burger, `→`, `↓`), and SVG arrows.

---

## 3. JavaScript Functionality Inventory

The original prototype contains zero third-party scripts. All behaviors are custom vanilla JS:

1. **SPA Routing & View Controller:**
   - Functions `go(id)`, class `.on` toggling, scroll-to-top, mobile navigation `#burger` toggling `.open` on `#nav`.
   - *Next.js conversion:* Replaced by native Next.js App Router file-based pages and client state for the mobile nav.
2. **Responsive Table Card Formatter:**
   - Copies `thead th` text to `td[data-l]` for mobile card layout via `::before` pseudo-elements.
   - *Next.js conversion:* Preserved directly in the `ScheduleTable` component or rendered statically.
3. **Pure-JS XLSX Spreadsheet Parser (`GSLFahrplan`):**
   - 100% custom ZIP/XML streaming parser using browser `DataView` and `DecompressionStream('deflate-raw')`.
   - *Next.js conversion:* Preserved as utility / client component or server action to allow automatic sailing schedule updates from Excel.
4. **Dynamic Article View Engine:**
   - Contains `window.GSLBeitraege` (6 articles with structured paragraphs, quotes, and headings).
   - *Next.js conversion:* Stored as Payload CMS `Posts` collection and rendered server-side at `/news/[slug]`.
5. **Dynamic Booking Cut-Off & Hero Status Calculator:**
   - Computes days remaining until booking cut-off date (`new Date()`) and updates status badges ("noch X Tage", "Buchung geschlossen") and hero banner.
   - *Next.js conversion:* Converted to React helper with server/client hydration safety.

---

## 4. Shared Component Candidates

1. `Header` (Logo, navigation links, mobile menu toggle, language toggle)
2. `Footer` (4-column layout, company info, navigation, booking email, legal links)
3. `Hero` (Background video, dark overlay, live booking pill, H1, lead, CTA buttons)
4. `PageHeader` (`.phead` with title and descriptive intro paragraph)
5. `Button` (`.btn.pri`, `.btn.sec`, `.btn.ghost`, `.btn.abo-btn`)
6. `StatusBadge` (`.badge.b-open`, `.badge.b-stop`, `.badge.b-ask`)
7. `FactBar` (`.facts` 4-column metric cards)
8. `ServiceCard` (Title, description, feature bullets)
9. `DepartureCard` (Ship name, voyage, laycan window, ports, status badge)
10. `ScheduleTable` (Responsive desktop grid / mobile cards)
11. `ScheduleAboBox` (Newsletter / schedule alert subscription)
12. `CargoCard` (`.ph.hb` 4:3 image tile with caption)
13. `NewsCard` (Thumbnail, category pill, date, title, excerpt)
14. `TeamCard` (Circular portrait, name, role, phone, mobile, email)
15. `ContactForm` (RFQ multi-field inquiry form)
16. `SegmentedControl` (Category/route filter bar)
17. `ArticleView` (Full article layout with back link, markdown/rich text body, related posts)

---

## 5. Forms & Integrations

1. **RFQ / Contact Form (`/kontakt`):**
   - Fields: Name, Company, Email, Phone, Inquiry Subject (dropdown), Loading Port, Destination Port, Message, GDPR Consent checkbox.
   - Target: Next.js Server Action with Zod validation + Payload `FormSubmissions` collection + email notification.
2. **Sailing Schedule Subscription (`/fahrplaene`):**
   - Fields: Route checkboxes (Brake/Wismar → North America; Marmara/Iskenderun → Caribbean/West Africa/South America), Email address.
   - Target: Next.js Server Action with double opt-in verification or newsletter webhook.
3. **Excel Schedule Ingestion (`/fahrplaene`):**
   - Client or admin upload for `.xlsx` schedules parsing directly into the schedule view or Payload CMS.

---

## 6. SEO & Metadata Inventory

- **Current Prototype:** Has `noindex, nofollow` and title `Entwurf — nicht veröffentlicht`.
- **Target Implementation:**
  - Unique, search-engine-optimized `<title>` and `<meta name="description">` per page.
  - Canonical URLs (`https://www.gsl-germany.com/...`).
  - OpenGraph (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`) & Twitter card metadata.
  - Schema.org JSON-LD structured data for `LocalBusiness` (Bremen & Brake) and `ShippingService`.
  - **Zero Third-Party Trackers:** No external Google Fonts, no Google Analytics, no Google Maps cookies — maintaining a 100% GDPR-compliant experience without requiring a cookie consent banner.

---

## 7. Proposed Next.js Route Structure

```text
src/app/
├── (frontend)/
│   ├── layout.tsx             # Root frontend layout (Header, Footer, fonts)
│   ├── page.tsx               # Startseite (Home)
│   ├── leistungen/
│   │   └── page.tsx           # Leistungen (Services)
│   ├── fahrplaene/
│   │   └── page.tsx           # Fahrpläne (Sailing Schedules)
│   ├── ladungen/
│   │   └── page.tsx           # Ladungen (Cargo Media Gallery)
│   ├── news/
│   │   ├── page.tsx           # News Overview & Category Filter
│   │   └── [slug]/
│   │       └── page.tsx       # News Article Detail View
│   ├── team/
│   │   └── page.tsx           # Team Roster
│   ├── kontakt/
│   │   └── page.tsx           # RFQ Contact & Office Info
│   ├── ueberblick/
│   │   └── page.tsx           # Architecture & Rationale
│   ├── impressum/
│   │   └── page.tsx           # Legal Notice
│   ├── datenschutz/
│   │   └── page.tsx           # Privacy Policy
│   └── agb/
│       └── page.tsx           # Terms & Conditions
│
└── (payload)/
    ├── admin/
    │   └── [[...segments]]/   # Payload CMS Admin Dashboard
    └── api/
        └── [[...segments]]/   # Payload REST / GraphQL APIs
```

---

## 8. Initial Payload Content Model Proposal

### Collections:
1. **`Users`**
   - Fields: `name`, `email`, `role` (`admin`, `editor`).
   - Authentication enabled; access control enforces that only admins manage users and system configs.
2. **`Media`**
   - Upload enabled (`image/*`, `video/*`, `application/pdf`).
   - Fields: `alt` (required for accessibility), `caption`.
3. **`Pages`**
   - Fields: `title`, `slug`, `seo` (title, description, ogImage), `layout` (Blocks).
   - Drafts & versioning enabled.
4. **`Posts`** (News Articles)
   - Fields: `title`, `slug`, `category` (`Ladung`, `Routen`, `Menschen`, `Fachwissen`, `Historie`), `month`, `publishedAt`, `teaser`, `thumbnail` (upload rel), `content` (RichText / Lexical), `relatedPosts` (rel).
   - Drafts & versioning enabled.
5. **`TeamMembers`**
   - Fields: `name`, `role`, `department`, `phone`, `mobile`, `email`, `photo` (upload rel), `order`.
6. **`Departures` / `Schedules`**
   - Fields: `vessel`, `voyage`, `loadingPort`, `laycanStart`, `laycanEnd`, `bookingDeadline`, `dischargePorts` (array of port name & ETA), `route` (`europe-america`, `med-americas`, `usa-arrivals`), `status` (`open`, `closing-soon`, `stopped`).
7. **`CargoGallery`**
   - Fields: `title`, `location`, `category`, `image` (upload rel), `order`.
8. **`FormSubmissions`**
   - Fields: `name`, `company`, `email`, `phone`, `topic`, `loadingPort`, `destinationPort`, `message`, `submittedAt`.

### Globals:
1. **`HeaderSettings`** (Navigation links, active notification banner text/link).
2. **`FooterSettings`** (Address, phone, general email, booking email, LinkedIn URL, legal text).
3. **`SiteSettings`** (Default SEO title suffix, meta description, default social share image).

---

## 9. Risks & Implementation Nuances

1. **Pixel-Perfect CSS Preservation:**
   - The CSS in `index.html` relies on specific CSS custom properties (`--navy`, `--red`, `--line`, etc.) and typography hierarchy. We must import the exact CSS rules into `src/styles/` without altering class names or introducing Tailwind resets that conflict with the layout.
2. **Self-Contained Embedded Assets:**
   - Fonts and images are currently base64 strings in the HTML. They must be cleanly extracted into standalone binary files (`.woff2`, `.jpg`, `.png`, `.mp4`) and served efficiently through Next.js and Payload CMS.
3. **Dynamic Schedule Logic:**
   - The countdown badge logic and table card attributes must hydrate without React hydration mismatches between server time and client time.
4. **Devcontainer & Database Integration:**
   - PostgreSQL 16 is already configured in the devcontainer (`DATABASE_URL=postgresql://payload:payload@postgres:5432/payload`). The Next.js + Payload app must run seamlessly both in devcontainer and local Node environment.

---

## 10. Recommended Step-by-Step Migration Sequence

- [x] **Step 1:** Analyze repository & generate initial `MIGRATION.md`
- [x] **Step 2:** Establish baseline server (port 8080) & capture baseline screenshots (Desktop 1440px, Tablet 768px, Mobile 390px)
- [x] **Step 3:** Initialize Next.js 15+ & TypeScript with Payload CMS 3.x in the repository
- [x] **Step 4:** Extract embedded assets (fonts, video, images) into project directories
- [x] **Step 5:** Port global CSS and layout (`Header`, `Footer`, typography)
- [x] **Step 6:** Port all pages statically with hardcoded content & verify visual parity against baseline
- [x] **Step 7:** Connect Payload CMS to PostgreSQL container & configure Users, Roles, and Media
- [x] **Step 8:** Build Payload Content Models (Globals, Pages/Blocks, Posts, Team, Departures, CargoGallery, FormSubmissions, NewsletterSubscriptions)
- [x] **Step 9:** Execute deterministic content & media migration script from prototype data (`src/scripts/seed.ts`)
- [x] **Step 10:** Wire Next.js frontend to fetch from Payload CMS Local API with fallback support
- [x] **Step 11:** Implement contact form & newsletter subscription APIs with PostgreSQL persistence
- [x] **Step 12:** Run automated tests, visual regression checks, and production build (`pnpm build`)
- [x] **Step 13:** Commit all changes to branch `vincent-backen` (no push)

---

## 11. Final Completion & Verification Summary

1. **Frontend Parity:** All 9 routes (`/`, `/leistungen`, `/fahrplaene`, `/ladungen`, `/news`, `/news/[slug]`, `/team`, `/kontakt`, `/ueberblick`) render with 100% pixel parity to the static prototype across desktop (1440px), tablet (768px), and mobile (390px).
2. **Payload CMS 3.x:** Fully configured with PostgreSQL adapter, Lexical rich-text editor, and 9 collections (`users`, `media`, `pages`, `posts`, `team-members`, `departures`, `cargo-items`, `form-submissions`, `newsletter-subscriptions`). Admin dashboard verified and accessible at `/admin`.
3. **Database & Seeding:** Seed script (`pnpm seed`) deterministically seeds admin user, all 8 pages, 6 editorial articles, 7 team members, 7 departures, and 9 cargo gallery items.
4. **Form & Lead Handling:**
   - RFQ / Contact form (`/api/contact`) persists validated inquiries to PostgreSQL `form_submissions` table.
   - Schedule newsletter subscription (`/api/subscribe`) persists subscriptions with selected routes to PostgreSQL `newsletter_subscriptions` table.
5. **Production Build:** Passes `pnpm build` cleanly with zero TypeScript or linting errors, generating static and dynamic routes.

