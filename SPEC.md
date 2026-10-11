# SPEC — Marina Moura Link-in-Bio Site

## 1. Overview

Single-page "link in bio" site for **Marina Moura**, content creator (bastidores, conteúdo, eventos). The design is fully defined by the reference image at `design/reference.png` — **replicate it faithfully**. This is not a creative brief; it's a reproduction brief. All UI copy is in **Brazilian Portuguese**.

- Stack: Astro + Tailwind CSS, static output, deployed on Cloudflare Pages.
- CMS: Sveltia CMS (Git-based), admin at `/admin`, config in `public/admin/config.yml`.
- All editable content lives in JSON files under `src/content/` so the client edits everything without touching code.
- JS budget: minimal. Smooth-scroll for the hero chevron; no framework runtime on the page.

## 2. Design tokens (extracted from reference)

Use these as Tailwind theme extensions. Verify against `design/reference.png` before finalizing.

| Token | Value | Usage |
|---|---|---|
| `bg` | `#F5F2ED` | Page background (warm cream) |
| `surface` | `#FCFBF8` | Cards, pill bars |
| `sage` | `#8FA081` | Icon circles, section-label dots, accents |
| `sage-dark` | `#76866A` | Footer CTA bar, download buttons |
| `ink` | `#2E2E2C` | Headings, primary text |
| `muted` | `#6E6E6A` | Body/secondary text |
| `line` | `#E4E0D7` | Card borders (1px) |

Typography (Google Fonts, self-host via Fontsource to keep it fast):
- **Display serif**: elegant high-contrast serif for "Marina" and section headings — e.g. `Cormorant Garamond` (500/600). Large, tight tracking.
- **Script accent**: signature-style script for "Moura", "Escolha por onde começar", "um pouco sobre mim", "Vamos criar algo incrível juntos?" — e.g. `Allura` or similar. Sage color.
- **Sans body**: `Poppins` or `Inter` — body text, card titles (600, letterspaced uppercase for titles), labels.

Other visual rules:
- Section labels: uppercase, letterspaced, small, flanked by `·` dots (e.g. `· COMO POSSO TE AJUDAR ·`).
- Cards: radius ~18px, 1px `line` border, very soft shadow, `surface` bg.
- Hero photo: large rounded blob/asymmetric radius (top-right heavily rounded), left side of hero.
- Social pill bar in hero: single `surface` pill containing 4 circular outlined icon buttons.
- Footer CTA: full-width rounded bar in `sage-dark`, script text left, white pill button right.
- Icons: use `lucide` static SVGs (inline at build time, no icon-font).

## 3. Page structure (top → bottom)

1. **Hero** — two columns (stacks on mobile: photo first, then text).
   - Left: portrait photo (blob radius).
   - Right: monogram badge (circle, "M/M"), display name (serif "Marina" + script "Moura" + thin rule), keywords line (`BASTIDORES · CONTEÚDO · EVENTOS`), short bio paragraph, script line "Escolha por onde começar" + chevron (smooth-scrolls to services), social pill bar (Instagram, TikTok, LinkedIn, WhatsApp).
2. **Services** (`· COMO POSSO TE AJUDAR ·`) — vertical list of 5 cards, each: sage icon circle, uppercase title, 2-line description, right chevron. Whole card is a link.
3. **About** — one large rounded card, 3 zones: small photo (left, rounded), middle column with script heading "um pouco sobre mim ♡" + checklist bullets (sage check icons), right column (divided by vertical rule) with ♡ icon + short text about what the audience will find.
4. **Connect** (`· VAMOS NOS CONECTAR ·`) — row of 5 square outlined cards (icon + uppercase label): Instagram, TikTok, Portfólio, WhatsApp, E-mail. Grid 5-up desktop, 2–3-up mobile.
5. **Free materials** (`· MATERIAIS GRATUITOS ·`) — 3 cards: image top, bold title + 2-line subtitle, sage circular download button. Links to a file (PDF in repo `/public/materials/` or external URL).
6. **Footer CTA** — sage-dark rounded bar: script "Vamos criar algo incrível juntos?" + white pill button "VAMOS CONVERSAR →" (WhatsApp link).

## 4. Content model (drives both Astro and Sveltia)

All content in JSON, one file per singleton/collection, under `src/content/`:

```
src/content/
  page.json         # singleton — sections: (section, visible)[] order + visibility of the 4 middle sections
  profile.json      # singleton — hero + monogram + bio + keywords
  social.json       # singleton — hero pill links (label, icon, url)[]
  services.json     # singleton — items: (icon, title, description, url)[]
  about.json        # singleton — photo, heading, bullets[], sideNote
  connect.json      # singleton — items: (icon, label, url)[]
  materials.json    # singleton — items: (image, title, subtitle, fileUrl)[]
  cta.json          # singleton — text, buttonLabel, buttonUrl
```

Notes:
- `icon` fields are a **select** from a fixed list of lucide icon names (video, smartphone, ticket, handshake, lightbulb, instagram, music-2, folder, phone, mail) — render via a small `<Icon name=... />` Astro component that inlines the SVG. Never let the client type arbitrary icon names.
- Images uploaded via CMS go to `public/uploads/` (`media_folder`). Optimize at build with `astro:assets` where possible; hero/about photos may be referenced as public paths if CMS-managed.
- WhatsApp links use `https://wa.me/55XXXXXXXXXXX?text=...` (placeholder number; flag as `TODO` for Leo).

## 5. Non-functional requirements

- Lighthouse ≥ 95 in all categories on mobile.
- Fully responsive: 360px → 1280px. Reference layout is mobile-first by nature (single column ~760px max width, centered).
- Semantic HTML: `<main>`, `<section aria-label>`, real `<a>` for cards, `alt` text fields in CMS for all images.
- Visible keyboard focus; respect `prefers-reduced-motion` (disable smooth scroll).
- SEO: title, meta description, OG image (hero photo), `lang="pt-BR"`, favicon from monogram.
- No analytics by default; leave a commented slot for a script tag (Cloudflare Web Analytics) in the layout.
