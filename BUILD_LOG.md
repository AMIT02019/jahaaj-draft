# Build Log

## 2026-08-13 — Extended scroll-reveal animation across Our Team page

**Files changed:** `team.html`

Card grids and hero text already had scroll-reveal (`data-jr`/`data-jr-stagger`); added `data-jr` to the 7 zone labels (e.g. "Zone 01 · Leadership") and the hero stats row so every section fades/rises in on scroll, not just the card grids. Verified in-browser: 18 total reveal-tracked elements, no console errors, `jr-in` class applies correctly on scroll.

## 2026-08-13 — Added photo placeholders to Our Team cards

**Files changed:** `team.html`

Added an image placeholder slot (`.tm-photo`, 16:11 grey gradient box with a generic person-silhouette SVG icon) to the top of all 18 team cards, since no real staff photos exist yet. Moved the orange initials badge to overlap the bottom-left corner of the placeholder and the tag chip to the top-right corner, both absolutely positioned over `.tm-photo`. When real photos are added, swap the placeholder `<div class="tm-photo">...</div>` contents for an `<img>` — the badge/tag positioning will still work since they're positioned relative to `.tm-photo`. Verified in-browser: no console errors, all 18 placeholders render at correct aspect ratio.

## 2026-08-13 — New "Our Team" page (team.html)

**Files added:** `team.html`
**Files changed:** all 11 pages with the shared nav (Our Team link retargeted), `sitemap.html`, `sitemap.xml`

Built a new team directory page from a reference design the user supplied (`our-team.html`, a kraft-paper/serif aesthetic with 7 department "zones" and 18 team members as monogram cards), restyled entirely to match this site's design system instead of copying its palette/typography:
- Reused this site's exact tokens (`--ink`, `--yellow`/orange accent, `--card`, Outfit font), nav/mobile-nav markup and CSS, footer, and the site's standard nav-dropdown/mobile-menu/scroll-reveal JS (single `onScroll`, no duplicate declarations — checked against the two prior script-crash bugs fixed today).
- Kept the reference's structure (masthead with eyebrow badge + stats, 7 zone sections each with a code/name/count label and a card grid) but reskinned cards with the site's existing orange-gradient monogram style (same treatment as the "Why Jahaaj" numbered cards) and the site's rgba(255,131,0,.12) eyebrow-badge pattern instead of the reference's mono/serif tagging.
- Added full SEO head (title/description/canonical/OG/Twitter) consistent with the rest of the site.
- Retargeted the existing "Our Team" nav link (previously `about.html#team`, a 3-person highlight) to `team.html` in both the desktop dropdown and mobile nav across all 11 pages that carry the shared nav; left the small `about.html#team` highlight section itself in place as an on-page teaser.
- Added `team.html` to `sitemap.html` (new card) and `sitemap.xml`.

Verified in-browser: no console errors, 7 zones / 18 cards render, 3-column crew grid at desktop width, nav dropdown items present, scroll-reveal fires correctly.

## 2026-08-13 — Hotfix: duplicate scroll-loop declaration crashing index.html (PR #2)

**Files changed:** `index.html`

After PR #1 merged, a further commit (`9c1a8fb`, pushed straight to `main`, not through this session) added a new `initScrollAppear`/`onScroll` block to fix reveal animations, but left the old duplicate block (`let ticking`, `function onScroll`, old scroll-appear IIFE) in place lower in the same `<script>` tag. Redeclaring `let ticking` is a `SyntaxError` — crashed the whole inline script again on load, breaking nav dropdowns, FAQ, and all scroll animations sitewide (same failure class as the original bug fixed in PR #1). Removed the obsolete duplicate block. Verified: no console errors, scroll-reveal fires (`jr-in` added on scroll), nav dropdown items present. Pushed as [PR #2](https://github.com/AMIT02019/jahaaj-draft/pull/2), flagged as an urgent hotfix since it's live-breaking.

**Lesson:** future direct edits to `main` outside this session should be pulled into the worktree and diffed before assuming reported "not working" issues are new — check `git log origin/main` first.

## 2026-08-10 — Homepage hero background video

**Files changed:** `index.html`
**File added:** `assets/hero-cows.mp4`

Downloaded `5827_Cows_Cow_1280x720.mp4` (~13.4MB, cows grazing) from a Google Drive link the user shared, with explicit confirmation before downloading. Replaced the static `.hero__bg` image with an autoplay/muted/loop/playsinline `<video>` (poster falls back to `assets/hero.jpg` on slow connections), keeping the existing dark gradient overlay for text contrast. Verified in-browser: video plays, no console errors.

## 2026-08-10 — Carousel prev/next buttons

**Files changed:** `index.html`

Added prev/next arrow buttons flanking the dot indicators on both dot-based carousels ("Production & Packaging Capabilities" and the dark "Why Choose Jahaaj" core-values carousel). Extended the generic `carousel()` JS helper to accept optional `prevId`/`nextId` args and wire click handlers that call the existing `go(index ± 1)`, reusing all existing wrap-around/resize/swipe logic. Verified both carousels advance correctly on click.

## 2026-08-10 — RTM section background video + centered nav pill

**Files changed:** `index.html` (video), 10 pages with the shared nav (nav centering)
**File added:** `assets/rtm-farm-cows.mp4`

- Downloaded `0_Farm_Cows_1280x720.mp4` (~17MB) from a Google Drive link the user shared, with explicit confirmation. Replaced the static `.rtm__bg` image with an autoplay/muted/loop/playsinline `<video>` (poster falls back to `assets/rtm.jpg`), same pattern as the homepage hero video.
- Centered the floating nav pill: `.nav__menu` changed from `margin-left:auto` (flush right) to `position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)`, so it's centered in the fixed nav bar regardless of logo/CTA width; moved `margin-left:auto` onto `.nav__cta` so the Contact button still sits flush right. Applied identically across all 10 pages that carry the header (`index`, `about`, `contact`, `products-catalog`, all 5 category pages, `why-jahaaj`). Verified via DOM measurement: pill center = nav bar center, logo left, CTA right.

## 2026-08-10 — Wider nav pill, tighter gaps

**Files changed:** all 10 pages with the shared nav

Increased `.nav__link` padding (7px 11px → 9px 16px) and `.nav__menu` gap/padding (2px/7px 10px → 6px/8px 16px) to widen the centered pill and close the gap to the logo/Contact button — confirmed tight (~25-30px) at common laptop widths (~1536px, matching the reference screenshot). Added a `1025–1500px` fallback breakpoint reverting to tighter spacing, since the wider pill would otherwise overlap the logo/CTA on narrower desktop windows (verified: no overlap at 1400px, positive gaps restored).

## 2026-08-10 — Fixed low-contrast carousel arrows on dark Core Values section

**Files changed:** `index.html`

The Core Values carousel (`.core`) already had prev/next arrow buttons (added earlier), but `.core .car-arrow` only had a 25%-opacity white border and no fill — against the bright parts of the rotating background photo, the buttons were effectively invisible, which is what the user's screenshot showed (no visible arrows). Gave `.core .car-arrow` a frosted dark-glass treatment (`background:rgba(0,0,0,.35)` + `backdrop-filter:blur(4px)`, hover `rgba(0,0,0,.55)`) so the arrows stay legible regardless of what's behind them. Verified via computed style.


## 2026-08-10 — New species category pages, site header/footer, Why Jahaaj page

**Files added:** `ruminants-category-elementor.html`, `pet-category-elementor.html`, `aquaculture-category-elementor.html`, `swine-category-elementor.html`, `why-jahaaj.html`
**Files changed:** `products-catalog-elementor.html`, `poultry-category-elementor.html`, `index.html`, `about.html`, `contact.html`, `sitemap.html`

- Extracted the full species/challenge/actives table from `Jahaaj Product profile (1).pdf` via `pdftotext -layout` (170-page PDF, mostly one condensed table per species) and built four new category pages — Ruminants (8 formulations), Pet (7), Aquaculture (5), Swine (2) — matching the poultry category page's exact structure: hero, capability band, about section, subcategory product grids, custom formulation combo-builder, spec-sheet table, and CTA.
- Converted `products-catalog-elementor.html` and `poultry-category-elementor.html` from Elementor HTML-widget fragments into full standalone pages by wrapping them with the site's real `<nav>`/mobile-menu header and `<footer>` (previously they had neither).
- Fixed a footer responsive bug (present on the original homepage too): the newsletter form's `max-width:290px` forced a lopsided 2-column split on narrow phones, crushing the second column's text. Added a `max-width:480px` single-column override site-wide.
- Nav "Explore our Products" dropdown (desktop + mobile) now links every species page instead of `#` placeholders, on all 10 pages that carry the nav.
- Footer restructured: "Inner Pages" (dead placeholder links) replaced with a "Categories" column linking all five species pages, on every page with a footer.
- Built `why-jahaaj.html` ("Why Jahaaj Healthcare") per a supplied reference screenshot: full-bleed hero, image collage + numbered feature pairs (quality, private label), a 3-item numbered row (transparent partner-first, ethics, infrastructure) with an "Explore Capabilities" CTA, a dark capability band with format chips (Powders/Tablets/Boluses/Granules/Paste), a people-driven section with "The Jahaaj Promise", a 3-column value-props row, a full-width image band, and the site's standard closing CTA + footer.
- Animation: reused the home page's scroll-linked word-reveal (`data-reveal`/`.reveal`) for the intro paragraph, and added a general-purpose `data-jr` (fade+rise) / `data-jr-stagger` (staggered children) `IntersectionObserver` scroll-appear effect — applied to the collage, feature rows, dark band, people section, value props, and image band. Same effect used across the four new category pages (capability band, product grids, combo builder, spec table, CTA).
- Wired "Why Jahaaj" nav links (previously `#`) to the new page across all 9 other pages with a nav; added Why Jahaaj + all 4 new category pages as cards on `sitemap.html`.
- All 11 pages now interlink completely (verified via href audit).

## 2026-08-10 — Restyle product catalog & category pages to match home/about

**Files changed:** `products-catalog-elementor.html`, `poultry-category-elementor.html`

**Problem:** Both pages used a separate design system (`.jhc-cat` scope) with green/teal/gold colors and Plus Jakarta Sans font — mismatched with `index.html`/`about.html`'s ink/grey/yellow/blue palette and Outfit font.

**Change:** Remapped `.jhc-cat` CSS tokens to site tokens:
- `--jhc-dark-green` → `#111214` (site `--ink`)
- `--jhc-teal` / `--jhc-bright-teal` → `#2b7fb8` (site focus-blue, reused as accent)
- `--jhc-gold` → `#f5ea00` (site `--yellow`)
- Added `--jhc-blue` / `--jhc-blue-2` (`#d3e9f7` / `#c3e1f4`, site CTA button colors)
- `--jhc-text`/`--jhc-muted`/`--jhc-border`/`--jhc-subtle` → site `--ink-soft`/`--grey`/`--line`/`--card` values
- Font: `'Plus Jakarta Sans'` → `'Outfit'`; added matching Google Fonts import (weights 200–700)
- Primary buttons (pill-cta, jhc-btn) now use blue bg + dark text (matches home `.btn`), active tabs/cap-icons use yellow bg + dark text (matches home `.pill.is-active`)
- Replaced all hardcoded green/gold hex and rgba shadows/overlays with ink-based equivalents

No header/footer markup in these files — they're Elementor HTML-widget content fragments, not full pages.

## 2026-08-10 — Added standalone site directory page

**File added:** `sitemap.html`

Standalone page (own `<head>`/tokens, not an Elementor fragment) linking all four site pages: `index.html`, `about.html`, `products-catalog-elementor.html`, `poultry-category-elementor.html`. Uses the same ink/grey/yellow/blue tokens and Outfit font as the rest of the site.

## 2026-08-10 — Interlinked all pages

**Files changed:** `index.html`, `about.html`, `products-catalog-elementor.html`, `poultry-category-elementor.html`

Replaced placeholder `#` hrefs with real cross-links so every page reaches every other page:
- `index.html`/`about.html` nav dropdown ("Explore our Products") and mobile menu: added "All Products" → catalog, "Poultry" → category page
- `index.html`/`about.html` footer "Main Pages": Home/About/Products/Poultry Solutions now link to their real pages; "Utility Pages" now includes Site Map → `sitemap.html`
- `poultry-category-elementor.html` breadcrumb: fixed `/` and `/products` placeholder hrefs to `index.html` and `products-catalog-elementor.html`
- `products-catalog-elementor.html`: added a matching Home/All Products breadcrumb, and a note linking to the dedicated Poultry Solutions page

Result: `sitemap.html` ↔ all four pages, and all four pages ↔ each other via nav/footer/breadcrumb.

## 2026-08-10 — Animation, scroll effects, and full-viewport hero alignment

**Files changed:** `products-catalog-elementor.html`, `poultry-category-elementor.html`

- Typography: base `.jhc-cat h1/h2/h3` was inheriting browser bold (700); set to `font-weight:400` with `h1` at `font-weight:300, letter-spacing:-.01em` to match home/about's light, airy headline weight.
- Fixed a browser auto-dark-mode bug: `.jhc-cat` had no explicit background, so sections with no explicit bg (e.g. "About" on the poultry page) rendered black with unreadable dark-on-dark text in dark-mode browsers. Added `background:#fff;color-scheme:light` to the `.jhc-cat` root.
- Full-viewport hero sections (matching home's `.hero{height:100vh;max-height:860px}` pattern):
  - Catalog hero: `min-height:100vh;max-height:860px`, centered content, with a `max-width:640px` mobile override.
  - Poultry hero: `min-height:100vh;max-height:900px`, bottom-aligned content (mirrors home hero's `align-items:flex-end`), with a mobile override.
- Scroll-triggered section-appear effect: added `[data-jr]` (fade+rise) and `[data-jr-stagger]` (staggered children via `--i` delay) utility classes, driven by an `IntersectionObserver` per page (`threshold:0`, since some sections — e.g. the 28-card grid — are taller than the viewport and never reach higher thresholds). Applied to hero-adjacent sections, tab/toolbar, product grids, capability band, intro, combo builder, spec table, and CTA blocks on both pages. Respects `prefers-reduced-motion`.
- Verified visually in-browser: hero sizing, reveal-on-scroll, card grid, combo builder, spec table, and CTA all render correctly with proper alignment.

## 2026-08-10 — Added Contact page

**File added:** `contact.html`
**Files changed:** `index.html`, `about.html`, `sitemap.html`

Built a full Contact page matching the user-supplied reference design: two-column hero (contact info + email/phone/address on the left, a full contact form on the right — Full Name, Email, Company, Phone, Job Title, Country, Animal, Product, Message, yellow "Send Message" submit), reusing the site's nav, the existing FAQ accordion and closing CTA band, and the shared footer verbatim from `index.html` for visual/behavioral consistency (same tokens, same JS patterns for dropdowns/mobile menu/FAQ toggle/parallax).

Rewired all "Contact" entry points site-wide to the new page instead of dead `#contact` anchors: nav CTA + mobile nav CTA, "Connect → Contact Details" dropdown item, and footer "Contact" link on `index.html` and `about.html`; added a Contact card to `sitemap.html`. All six pages (`index`, `about`, `products-catalog-elementor`, `poultry-category-elementor`, `sitemap`, `contact`) are now fully interlinked.

## 2026-08-10 — Carousel arrow contrast + click-through fix

**Files changed:** `index.html`

- Gave `.core .car-arrow` (dark Core Values carousel) a frosted dark-glass background (`rgba(0,0,0,.35)` + `backdrop-filter:blur(4px)`, hover `rgba(0,0,0,.55)`) — the previous 25%-opacity white border was invisible against the bright parts of the rotating background photo.
- Fixed the arrows not responding to clicks: `.core::after`'s dark overlay had no `z-index`, so it painted (and captured clicks) on top of `.car-nav`. Added `.car-nav` to the section's `z-index:2` stacking rule. Verified via `elementFromPoint` and a real click that the dot indicator now advances.

## 2026-08-10 — QC/QA Systems page

**File added:** `qc-qa-systems.html`
**Files changed:** all 10 pages with the shared nav, `sitemap.html`

Pulled full copy from the "QC QA Systems at Jahaaj" Google Doc the user shared (via `docs.google.com/.../export?format=txt`) — quality philosophy (4 pillars: Materials, Machines, People, Procedures), 7 numbered process-control sections (ingredient management, process control, batch/mixing validation, equipment cleanliness, finished-product QA, microbiological control, continuous improvement), commitment outcomes, partner benefits, and the closing "Quality Is Not a Department" statement. Built as a full standalone page (same nav/footer/tokens/scroll-reveal pattern as `why-jahaaj.html`), reusing the site's closing CTA and footer.

Wired the "QC / QA Systems" nav dropdown item (previously `#`) to this page across all 10 pages with a nav, and added it to `sitemap.html`. Verified in-browser: correct heading/step counts (7 steps, 4 pillars, 3 outcomes, 4 partner points), no console errors, hero/steps/statement sections render correctly.

## 2026-08-10 — Image placeholders on QC/QA Systems page

**Files changed:** `qc-qa-systems.html`

The source doc had explicit "(Insert: ... photos/videos)" notes under each of the 7 process-control headings that were dropped when the page was first built. Added a dashed-border `.qc-step__media` placeholder (image icon + caption) right below each step's intro paragraph, using the doc's own suggested captions (e.g. "Raw material inspection photos / sampling videos", "Shop floor workflow videos / SOP visuals"). Verified 7 placeholders render correctly, including inside the two-column People/Machinery block in step 2.

## 2026-08-10 — Section-appear effect on "Why Choose Jahaaj" timeline

**Files changed:** `index.html`

Added the `[data-jr]`/`[data-jr-stagger]` fade+rise scroll-appear utility (already used on the newer pages) to `index.html` itself, and applied `data-jr-stagger` to `#tlItems` so the five "Why Choose Jahaaj" timeline entries (pill + photo + copy) animate in one after another as the section scrolls into view, instead of appearing instantly. Wired via the same `IntersectionObserver` pattern as the other pages; respects `prefers-reduced-motion`. Verified: items start at `opacity:0`, `jr-in` fires once the section enters the viewport.

## 2026-08-10 — QC/QA page redesigned to match reference dark/pink template

**Files changed:** `qc-qa-systems.html` (full body redesign)

Rebuilt the page's visual design per a user-supplied reference screenshot (dark consulting-template layout with blurred pink/magenta glow blobs), while keeping only genuine QC/QA content — no fabricated testimonials, team bios, pricing, or blog content, since none of that exists for this page's source material.

New section mapping (all wrapped in a `.qx` dark container with several blurred radial-gradient `.qx-glow` blobs positioned through the page):
- **Hero** — headline with pink accent word, intro paragraph (still word-scroll-revealed), a "FAMI-QS Certified · Since 2023" pill badge, pink CTA button, two overlapping circular photos with a glow behind them (mirrors the template's avatar-circle hero art).
- **Stats + work areas** — a stat card (4 pillars: Materials/Machines/People/Procedures + certifications line) beside a work-areas card listing all 7 process systems as pills (mirrors the "86% satisfaction" + "Our work areas" pairing).
- **Tailored systems** — 3 image-placeholder cards (Ingredient Quality, Batch Validation, Finished Product QA) with numbered pink badges, linking down to the full detail.
- **Full process steps** (`id="steps"`) — the existing 7-step detailed breakdown, restyled dark with pink accents (bullet dots, step-number badges, dashed media placeholders).
- **Reasons** — numbered checklist (partner benefits + commitment outcomes merged) beside a photo, mirroring the "Reasons why we are best" section.
- **2×2 grid** — four representative image cards for the remaining process areas (Process Control, Equipment Cleanliness, Microbiological Control, Continuous Improvement), mirroring the "global projects" grid.
- **CTA card** — dark gradient card, "Ready to move forward on a supply agreement?", small icon badges instead of fabricated people avatars.
- Kept the closing "Quality Is Not a Department" statement (already dark, now pink-accented to match), the site's standard `.close` conversion CTA, and the shared footer unchanged for site-wide consistency.

Verified in-browser section by section: no console errors, hero/stats/tailored/steps/reasons/CTA/footer all render correctly with the pink glow aesthetic and scroll-reveal animations intact.

## 2026-08-10 — Recolored QC/QA page to match the site's palette

**Files changed:** `qc-qa-systems.html`

Kept the new layout (hero, stat/work-area cards, tailored cards, detailed steps, reasons, 2×2 grid, CTA card) but replaced the pink/dark theme with the site's actual ink/grey/yellow/blue/card palette, since the dark aesthetic didn't match the rest of the site:
- `--qx-bg`/`--qx-bg-2`/`--qx-line`/`--qx-text`/`--qx-text-soft` tokens repointed from dark-theme rgba(255,255,255,x) values to the site's light `--card`/`--line`/`--grey`/`--ink-soft` values.
- Replaced the pink accent (`--qx-pink`) with two site-consistent roles: `#2b7fb8` (the site's existing focus-blue) for accent text/links/headline emphasis, and `var(--yellow)` for badge/number-circle fills — matching how the rest of the site uses yellow for badges and blue for interactive text.
- Buttons (`.btn.pink`) now use `var(--blue)`/`var(--blue-2)` with dark text, matching every other CTA button on the site.
- Card gradients changed from dark maroon (`#5c1830→#2a0f1c`, `#3a1224→#1c0d16`) to the same light blue gradient (`#eef6fb→#d3e9f7`) already used for card visuals on the category pages.
- Glow blobs recolored from pink/orange to soft blue/yellow at much lower opacity.
- Kept the closing "Quality Is Not a Department" statement dark (`var(--dark)`), matching the site's convention of using a dark band for closing statements (e.g. `.close`, `.why`, `.core`).
- Verified every section in-browser: hero, stat card, tailored cards, detailed steps, reasons, and CTA card all render with light backgrounds and dark text, no console errors.

## 2026-08-10 — Increased description text size site-wide

**Files changed:** `index.html`, `about.html`, `contact.html`, `why-jahaaj.html`, `qc-qa-systems.html`, `sitemap.html`, `products-catalog-elementor.html`, and all 5 category pages (12 files total)

Bumped the font-size of body/description paragraph text (hero intros, section descriptions, card/step descriptions, FAQ answers, etc.) by roughly 1–1.5px (or ~0.06–0.08rem on the `.jhc-cat` rem-based pages) across every page. Deliberately left labels, badges, breadcrumbs, nav links, and other small-caps UI chrome untouched — only text that reads as descriptive body copy was bumped, e.g.:
- `.hero p`, `.rtm p`, `.tl__item p`, `.vm p`, `.value p` (home) and their `about.html` equivalents (`.ab-hero p`, `.wwd__strip p`, `.apart__card p/li`, `.mfg__list li`, `.abmv__card p`, `.partner p`)
- `.chero__info>p` (contact), `.wjh-*` description classes (Why Jahaaj), `.qx-*`/`.qc-statement p` (QC/QA), `.card p`/`.hero p` (sitemap)
- `.jhc-hero-desc`, `.jhc-intro-text p`, `.jhc-desc`, `.jhc-section-sub`, `.jhc-combo-empty`, `.jhc-catalog-hero p` (shared across all 6 `.jhc-cat` pages)

Verified via computed style (e.g. poultry page's `.jhc-intro-text p` now 17.28px, up from 16px) and confirmed no console errors on every page spot-checked (home, about, poultry category).

## 2026-08-10 — New hero images/video from user-supplied files

**Files changed:** `why-jahaaj.html`, `about.html`
**Files added:** `assets/why-hero-farmhouse.webp`, `assets/mfg-facility.mp4`, `assets/ab-hero-turbine.png`

- Why Jahaaj hero background swapped to the user-supplied windmill/farmhouse photo (`why-hero-farmhouse.webp`, located via filesystem search after the user saved it locally).
- About page's Manufacturing Strength `.mfg__video` block: replaced the static poster image + play-button with an actual autoplay/muted/loop/playsinline `<video>` (`1476407_People_Animal_1280x720.mp4` from a Drive link, ~7.4MB, downloaded with confirmation). Increased `.mfg__video` height from 150px to 720px per request, with a 360px mobile override (max-width:640px) so it doesn't dominate small screens.
- About page's "Who We Are" hero (`.ab-hero`) background swapped to a user-supplied aerial wind-turbine/farmland photo (`ab-hero-turbine.png`), keeping the existing blur/darken treatment; `min-height` increased from 600px to 720px.
- Verified all three in-browser: correct background images/video applied, `.ab-hero` and `.mfg__video` both measure exactly 720px at desktop width, video plays with no console errors.

## 2026-08-10 — Removed blur from "Who We Are" hero background

**Files changed:** `about.html`

Dropped `filter:blur(20px) brightness(.85)` and the compensating `transform:scale(1.18)` from `.ab-hero__bg` so the turbine/farmland photo renders sharp. Kept the existing dark gradient overlay (`.ab-hero::after`) for text legibility. Verified in-browser: image is crisp, no console errors.

## 2026-08-10 — Capped all ~800px+ section heights to 720px

**Files changed:** `index.html`, `about.html`, `why-jahaaj.html`, `products-catalog-elementor.html`, and all 5 category pages (9 files)

Lowered `max-height` from 860px/760px/900px to 720px on every hero-style section that had one:
- `index.html`/`about.html` shared `.hero` (home hero): `max-height:860px` → `720px`
- `why-jahaaj.html` `.wjh-hero`: `max-height:760px` → `720px`
- `products-catalog-elementor.html` `.jhc-catalog-hero` and all 5 category pages' `.jhc-hero`: `max-height:860px`/`900px` → `720px`

**Bug caught during verification:** the `.jhc-cat` heroes also had `min-height:100vh`, and per the CSS spec `min-height` always wins over `max-height` in a conflict — so the new 720px cap was being silently ignored on any viewport taller than 720px (measured 786-789px actual height instead of 720). Fixed by lowering `min-height` to `640px` (matching the pattern already used on the home hero and `why-jahaaj.html`), so the sections now genuinely range 640–720px instead of stretching to the viewport height. `.ab-hero`/`.mfg__video` (already 720px from a prior request) were left unchanged.

Verified via `getBoundingClientRect()` at 1280×900: home hero, Why Jahaaj hero, product catalog hero, and poultry category hero all measure exactly 720px; `about.html`'s `.ab-hero` also confirmed at 720px. No console errors on any page checked.

## 2026-08-10 — Video on Why Jahaaj image band; hero heights reverted to 800px

**Files changed:** `why-jahaaj.html`, `index.html`, `about.html`, `products-catalog-elementor.html`, and all 5 category pages

- `why-jahaaj.html`'s full-width image band (`.wjh-imgband`, between the value-props row and closing CTA) was a static `assets/rtm.jpg` image at 360px. Replaced with an autoplay/muted/loop/playsinline `<video>` (reusing the existing `assets/rtm-farm-cows.mp4`, poster falls back to `rtm.jpg`) and raised the section to 720px. Verified in-browser: video plays, height=720, no console errors.
- User asked to revert the site-wide hero height cap from the previous 720px pass back to 800px. Changed `min-height:640px`→`720px` and `max-height:720px`→`800px` on the shared home hero (`index.html`/`about.html` `.hero`), `why-jahaaj.html` `.wjh-hero`, `products-catalog-elementor.html` `.jhc-catalog-hero`, and all 5 category pages' `.jhc-hero`. Also raised `about.html`'s `.ab-hero` (Who We Are hero) `min-height` from 720px→800px to match. `about.html`'s `.mfg__video` (720px, not a hero) and the new `.wjh-imgband` (720px, not a hero) were left unchanged.
- Verified via `getBoundingClientRect()` at 1280×900: home hero and `.ab-hero` both measure 800px; poultry category `.jhc-hero` floors at 720px (short content, under the 800px cap, as expected). No console errors.

## 2026-08-10 — Why Jahaaj hero fixed at exact 800px

**Files changed:** `why-jahaaj.html`

`.wjh-hero` used `height:92vh` clamped between `min-height:720px`/`max-height:800px`, so actual height varied with viewport and only hit 800px on tall screens. Changed to a fixed `height:800px` (mobile override at `height:auto;min-height:560px` untouched). Verified via `getBoundingClientRect()` at 1280×900: height=800.

## 2026-08-10 — Ready-to-Market section content moved to bottom corner

**Files changed:** `index.html`, `about.html` (shared `.rtm` section)

The "Ready-to-Market Products" copy/CTA was vertically centered, right-aligned. Changed `.rtm{align-items:center}`→`flex-end` and added `padding-bottom:64px` to `.rtm .container` so the paragraph + "Let's explore" button sit in the bottom-right corner instead (heading stays top-left via its existing absolute positioning). Verified in-browser on `index.html`, no console errors.

## 2026-08-10 — Footer redesigned with legal bar + logo wordmark signature

**Files changed:** all 11 pages with the shared footer (`index.html`, `about.html`, `why-jahaaj.html`, `contact.html`, `qc-qa-systems.html`, `products-catalog-elementor.html`, and all 5 category pages)

Per a reference screenshot, added two new elements below the existing footer column grid, applied identically across every page:
- `.foot__bottom` — a thin divider bar with "Privacy policy" (left), a copyright line (center), and "Terms of Use" (right).
- `.foot__wordmark` — a large logo + "JAHAAJ Healthcare" lockup as a decorative brand signature, height-clamped with `overflow:hidden` so it reads as a bold closing mark rather than a full illustration.

Existing footer columns (newsletter, Main Pages, Categories, Utility Pages, Social Media) were left untouched. Verified on `index.html` and `about.html`: both new blocks render at the expected size, no console errors.

## 2026-08-10 — Removed footer logo wordmark

**Files changed:** all 11 pages with the shared footer

Removed the `.foot__wordmark` logo + "JAHAAJ Healthcare" signature block added in the previous footer redesign (both CSS and markup) from all 11 pages. The bottom legal bar (Privacy policy / copyright / Terms of Use) stays. Verified on `index.html`: element gone, no console errors.

## 2026-08-10 — Tap effect on About "sustainability chips" cards

**Files changed:** `about.html`

The 3 chip cards (CircularTech Platform / EcoData Intelligence / Earthon Cloud) had no interactive feedback. Added `cursor:pointer`, a hover lift (`translateY(-3px)` + shadow), and a press/tap effect (`scale(.96)` on `:active`, with a JS-driven `.is-tapped` class on `touchstart`/`touchend` for reliable feedback on mobile browsers where `:active` doesn't always render). Verified in-browser: transition wired, cursor is pointer, no console errors.

## 2026-08-10 — Scroll-appear effect added across the homepage

**Files changed:** `index.html`

The homepage already had `data-jr`/`data-jr-stagger` scroll-reveal infrastructure (CSS + IntersectionObserver) but it was only wired to the "Why Choose Jahaaj" timeline and two reveal paragraphs — every other section rendered static. Added `data-jr` (fade+rise) or `data-jr-stagger` (staggered children) to: the intro pillars row, the "Start a Custom Formula" heading, the Ready-to-Market heading/copy block, the Capabilities heading and carousel track (`#capsTrack`), the "Why Choose" heading, both Vision/Mission rows, the Core Values heading and carousel track (`#coreTrack`), the "Start Your Own Brand" heading/button/note and the FAQ list, and the closing CTA block.

Carousel tracks already apply their own `translateX` via JS on the track element itself, while the scroll-reveal transform applies to the track's children — confirmed no conflict. Verified in-browser: `#capsTrack` and `#faq` both gain `.jr-in` and animate in on scroll, no console errors.

## 2026-08-10 — Scroll-appear effect added to the About ("Who We Are") page

**Files changed:** `about.html`

`about.html` had no `data-jr` scroll-reveal infrastructure at all (only the word-by-word `data-reveal` effect on two paragraphs). Ported the same system used on the homepage:
- Added the `[data-jr]`/`[data-jr-stagger]` CSS rules (fade+rise, staggered children).
- Added the same IntersectionObserver script (sets `--i` on staggered children, toggles `.jr-in` on intersect, falls back to instantly visible if `IntersectionObserver` is unsupported).
- Wired it to every section: "What We Do" heading/copy + its 4-step strip, "What Sets Jahaaj Apart" heading + both card/image columns, the Manufacturing Strength card, "Our Mission & Vision" heading + both cards, the "Not Just a Vendor" paragraph + 3 chip cards, the Team kicker/title + photo grid, and the closing CTA.

Verified in-browser: `.abmv__grid` and `.team__grid` both gain `.jr-in` on scroll with visible children, no console errors.

## 2026-08-10 — Hid "Start a Custom Formula" section on homepage

**Files changed:** `index.html`

Commented out the `.formula` section (heading + reveal paragraph, between the intro pillars and Ready-to-Market) per request. Left as an HTML comment rather than deleted, for easy restoration. Verified in-browser: section no longer in the DOM, no console errors.

## 2026-08-10 — New logo artwork; larger footer logo

**Files changed:** `assets/logo.png` (replaced), all 11 pages (`.foot__logo img` height)

Replaced `assets/logo.png` with the user-supplied logo image (`Aug 10, 2026, 04_25_57 PM.png`), auto-cropped to its content bounding box (alpha-threshold crop, removing the surrounding transparent canvas) via Pillow, saved at 1229×629 keeping transparency. Since every page references this single file for both nav and footer, it updates the logo site-wide with no markup changes needed.

Increased `.foot__logo img` height from 38px → 60px on all 11 pages with a footer, so the footer logo reads larger relative to the nav logo (still 42px). Verified in-browser: both nav and footer load the new artwork, footer logo measures 60px tall, no console errors.

## 2026-08-10 — Enlarged "Why Choose Jahaaj" timeline items + real per-item copy

**Files changed:** `index.html`

The 5-item timeline (Assured quality / R&D specialists / Confidential private label / Scalable supply / Navi Mumbai logistics) had an undersized pill badge and 4 of 5 paragraphs reused the same generic mission/vision blurb unrelated to their own heading. Increased `.pill` font/padding and `.pill__n` circle size (26px→34px), raised `.tl__item img` height 360px→420px, and widened the grid's side columns (300/280px → 320/300px, mobile 250/240px → 270/260px) to match. Replaced all 5 paragraphs with copy specific to that item's topic (quality checks, in-house R&D, confidentiality/NDA manufacturing, batch scalability, Navi Mumbai port/logistics access).

Verified in-browser: pill height ~60px, image height 420px, no console errors.

## 2026-08-10 — Matched timeline images to their topic

**Files changed:** `index.html`

Re-checked all 5 timeline images against their pill headings and swapped mismatches: "Assured quality" now uses `t4.jpg` (gloved-hands raw material inspection, was generic livestock `t1.jpg`), "Formulated by R&D specialists" now uses `vision.jpg` (lab microscope + petri-dish formulation testing, was a person feeding chickens), and "Scalable supply" now uses `t1.jpg` (multi-species livestock composite, was the raw-material shot now used by item 1). "Confidential private label" (`t3.jpg`, CONFIDENTIAL stamp) and "Navi Mumbai logistics" (`t5.jpg`, aerial highway) already matched and were left unchanged. Verified in-browser, all images load, no console errors.

## 2026-08-10 — Rewrote FAQ section with relevant content

**Files changed:** `index.html`

The homepage FAQ (`#faq`, under "Start Your Own Brand") was leftover template copy about solar panel installation ("How does the solar development process work?", land/agriculture questions, etc.) — entirely unrelated to the business. Replaced all 6 questions with content relevant to Jahaaj's private-label/contract manufacturing service: the manufacturing process, upfront costs, minimum order quantity, bringing your own formulation vs. using in-house R&D, order-to-delivery timeline, and quality certifications (FAMI-QS/ISO/HACCP). Verified in-browser: accordion toggle still works, no console errors.

## 2026-08-10 — "Start Your Own Brand" heading forced to one line

**Files changed:** `index.html`

`.brand h2` had `max-width:430px`, forcing "Start Your Own Brand" to wrap onto two lines. Removed the max-width and added `white-space:nowrap`, lowering the clamp's minimum font size (34px→28px) so it still fits without overflow on narrow screens. Verified in-browser: single line at both 1280px and 375px widths, no horizontal overflow, no console errors.

## 2026-08-10 — "Start a Custom Formula" label enlarged + relevant icons + logo mark

**Files changed:** `index.html`, `assets/logo-icon.png` (new)

The intro section's 3-icon row was leftover solar-template content (sun/CO2/lightbulb icons labelled "The Sun Offers", "Clean power Cuts", "Keeps Powered") — unrelated to feed formulation. Replaced with 3 relevant icons/labels: a flask ("Custom Formulation"), a certificate/checkmark shield ("Certified Quality"), and a shipping box ("Private Label Ready"). Enlarged `.intro__label` ("Start a Custom Formula") from 15px to a clamp(26px,3vw,38px) heading size, and prefixed it with a small standalone flame mark — cropped from the main logo into a new transparent `assets/logo-icon.png` — for a branded accent.

## 2026-08-10 — Tightened nav pill spacing

**Files changed:** all 11 pages with the shared nav

Per follow-up feedback that the nav pill's link spacing was too wide, reduced `.nav__link` horizontal padding (16px→11px) and `.nav__menu` gap (6px→1px) on all 11 pages. Verified in-browser on `index.html`: gap between adjacent nav links is ~1px, no console errors.

## 2026-08-10 — Replaced yellow accent with logo orange + highlight tone

**Files changed:** all 12 HTML pages

Sampled the actual orange from the logo artwork (`assets/logo-icon.png` → rgb(255,131,0) / `#ff8300`) and swapped every `--yellow` token value and hardcoded `#f5ea00` reference to it, site-wide. Also added a lighter highlight token (`--yellow-2:#ffb347`) and wired it as a hover state on the Capabilities carousel's format chips (`.cap:hover .cap__chip`). Kept the CSS variable name `--yellow` unchanged internally to avoid touching every `var(--yellow)` call site — only its value changed, so risk of missed references is eliminated.

Verified in-browser on `index.html`: chip background computes to `rgb(255,131,0)`, `--yellow`/`--yellow-2` tokens resolve correctly, no leftover `#f5ea00` in any file, no console errors.

## 2026-08-10 — Stronger orange badge tint to match reference

**Files changed:** all 5 category pages + `products-catalog-elementor.html` (`.jhc-badge`)

Per a reference screenshot of a peach-toned "Custom Formulation Builder" badge, increased `.jhc-badge`'s background tint from a 14% orange-on-transparent mix (rendered almost white) to 28% orange-on-white, and the border from 35%→50% opacity, so the badge reads as a clear warm peach with a defined orange outline instead of a barely-visible tint. This class is shared by every `.jhc-badge` instance (hero eyebrow, combo-builder badge, etc.) across the 6 `jhc-cat`-scoped pages. Verified in-browser on `poultry-category-elementor.html` and `aquaculture-category-elementor.html`: background computes to rgb(255,220,184), no console errors.

## 2026-08-13 — SEO audit (no code changes)

**Files analyzed:** all 12 HTML pages

Ran a full SEO audit (crawlability, meta tags, headings, images, structured data, internal links, mobile). Score: 61/100. Critical: no robots.txt/sitemap.xml at root, no meta descriptions, no canonical tags, no JSON-LD anywhere. Warnings: unseparated/duplicated title tags, no OG/Twitter tags, dead `href="#"` footer links in `index.html`, render-blocking Font Awesome/Google Fonts CSS. Passing: single H1 per page, 100% image alt coverage, correct viewport meta, no broken internal links. Findings saved to memory for follow-up.

## 2026-08-13 — Fixed site-breaking JS bug + full SEO remediation

**Root cause found:** commit `e0e075e` (removing the word-reveal effect) left `document.querySelectorAll('[]')` — an invalid selector — in the main `<script>` block on `index.html`, `about.html`, `why-jahaaj.html`, and `qc-qa-systems.html`. This threw a `SyntaxError` on page load that silently killed the *entire* inline script on those pages, breaking the nav dropdown menus, mobile burger menu, FAQ accordion, and timeline/parallax scroll effects — the "site not working" the user reported. Removed the dead word-reveal block and its `paintReveal()` call on all 4 pages; verified zero console errors afterward on `index.html`.

**Files changed:** `index.html`, `about.html`, `why-jahaaj.html`, `qc-qa-systems.html` (JS fix); all 12 HTML pages (SEO); new `robots.txt`, `sitemap.xml`.

SEO remediation per the 2026-08-13 audit:
- Added unique `<title>` (with `|` separator, fixed duplicated brand on why-jahaaj.html), meta description (150-160 chars), canonical URL, OG tags, and Twitter Card tags to all 12 pages, using domain `https://jahaaj-homepage.vercel.app` (confirmed by user).
- Added `Organization` JSON-LD to `index.html` and `LocalBusiness` JSON-LD (with real address/phone/email from contact.html) to `contact.html`.
- Created `robots.txt` (allow all, points to sitemap.xml) and `sitemap.xml` (all 12 pages) at repo root.
- Removed dead `href="#"` "License"/"Change Log" footer links (leftover template boilerplate with no real destination) from all 11 pages that had them.

Not yet done: self-hosting/deferring Font Awesome + Google Fonts to remove render-blocking CSS (flagged as a warning, not critical — left for a future pass).

## 2026-08-13 — Restored scroll-reveal animations (all 12 pages)

**Files changed:** all 12 HTML pages

User reported animations/effects still not working after the JS-syntax-error fix above. Root cause: commit `563cdb7` (Aug 12) added a blanket CSS override `[data-jr], [data-jr-stagger]>* { opacity:1 !important; transform:none !important; }` to every page, as a band-aid for a "blank page" bug. That blank-page bug was actually caused by the `querySelectorAll('[]')` syntax error (fixed earlier the same day) killing the IntersectionObserver-based reveal script before it could ever add the `jr-in` class — so the real fix made this override obsolete, but it was still suppressing the intended fade+rise scroll animation on every page (forcing content to always-visible, never-animated).

Removed the override block from all 12 pages. Verified on `index.html`: elements start at `opacity:0` and gain the `jr-in` class (revealing with fade+rise) once scrolled into view, confirmed via JS-driven scroll + class check — no blank-page regression, no console errors.

## 2026-08-13 — Stronger hover effect on "Why Jahaaj" numbered cards

**Files changed:** `why-jahaaj.html`

The 5-card numbered feature grid (`.wjh-feat-item`, e.g. "Quality That Is Built into Every Step") already had a subtle lift+shadow hover. Per user request to make it more noticeable: increased lift to -10px, added an orange border glow and warm-tinted shadow on hover, lightened the glass background, and made the orange number badge (`.wjh-feat-num`) scale up 1.14x with a -6deg rotation and stronger shadow on hover. Verified in-browser, no console errors.

## 2026-08-13 — Fixed Contact page 2-column alignment

**Files changed:** `contact.html`

Found a stray extra `</div>` right after the info column's markup (closing `.chero__meta`+`.chero__info` correctly, then one more unmatched `</div>`) that prematurely closed `.chero__grid` before the `<form class="cform">`. That pushed the form out to be a sibling of the grid instead of its second child, so it rendered full-width below the info column instead of beside it as a 2-column layout. Removed the stray tag. Verified at 1440px viewport: info column and form now sit side-by-side at the same `y` offset (form: x=705, info: x=144), matching the intended `1fr 1.15fr` grid; narrow-viewport (<900px) stacked layout still works correctly. No console errors.
