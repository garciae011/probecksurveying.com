# Probeck Land Surveyors Static Website

Modern static website for **Probeck Land Surveyors** in Dallas, Texas. The site uses plain HTML, CSS, and vanilla JavaScript only — no frameworks, no npm, and no build step required.

## Current Theme

The site now uses a dark cinematic visual direction inspired by premium engineering/space/aerospace sites: near-black backgrounds, full-bleed image sections, restrained amber accents, large technical typography, a translucent header, mobile full-screen overlay navigation, and subtle scroll reveal motion that respects `prefers-reduced-motion`.

## Files

```text
/
├── index.html
├── services.html
├── contact.html
├── privacy-policy.html
├── sitemap.xml
├── robots.txt
├── css/style.css
├── js/main.js
├── .github/workflows/static.yml
└── images/
    ├── logo.png
    ├── logo-site.png
    ├── favicon-32x32.png
    ├── apple-touch-icon.png
    ├── hero-home.svg
    ├── hero-services.svg
    ├── section-topo.svg
    ├── section-construction.svg
    ├── section-residential.svg
    ├── og-image.svg
    └── og-image.png
```

## Local Preview

Open `index.html` directly in a browser, or serve the folder with any static server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Web3Forms Contact Form Setup

The contact form is wired to submit to `https://api.web3forms.com/submit` and has been configured with the provided Web3Forms access key in `contact.html`:

```html
<input type="hidden" name="access_key" value="6d266eff-7ae9-4b81-be35-848640937caf">
```

To manage form delivery:

1. Log in at <https://web3forms.com> using the account tied to the access key.
2. Confirm the receiving email address for form submissions.
3. To change or add recipient emails later, use the Web3Forms dashboard for the account tied to the access key.

Before launch, submit one real test message from the deployed site and confirm email delivery.

## Imagery

Image generation was not available in the local Hermes environment during the redesign, so the site currently uses refined dark SVG placeholder art in the requested slots. These files are lightweight and safe to replace later with compressed WebP/JPEG imagery using the same filenames or by updating the HTML/CSS references.

Current visual assets:

- `images/hero-home.svg` — dark aerial land parcel / survey-grid hero placeholder.
- `images/hero-services.svg` — dark total-station / tripod hero placeholder.
- `images/section-topo.svg` — near-black topographic contour background.
- `images/section-construction.svg` — construction survey-stake section placeholder.
- `images/section-residential.svg` — residential parcel-boundary section placeholder.
- `images/og-image.png` — 1200×630 social share image generated from `images/og-image.svg`.
- `images/logo-site.png`, `favicon-32x32.png`, and `apple-touch-icon.png` are derived from the official `images/logo.png`.

Recommended replacement targets:

- Hero image: 1600–1920px wide, compressed WebP/JPEG, ideally under 350 KB.
- Section images: 1200–1600px wide, compressed WebP/JPEG, ideally under 200 KB each.
- Social image: 1200×630 PNG/JPEG/WebP, ideally under 300 KB.
- Preserve descriptive `alt` text for any `<img>` placements.

### Future image-generation prompts

Use these prompts if replacing the SVG placeholders with generated photorealistic imagery:

1. **hero-home** — Dramatic photorealistic aerial view of North Texas-style terrain at dusk, open land parcels, subtle property-line light traces or survey grid overlaid, cinematic dark tones, premium engineering firm aesthetic, no people, no faces, no readable text, no logos, no recognizable landmarks.
2. **hero-services** — Surveying total station on tripod silhouetted against a dusk sky on open land, cinematic, shallow depth of field, dark and moody, no people, no faces, no text, no logos or equipment branding.
3. **section-topo** — Elegant dark background texture of glowing topographic contour lines, near-black with faint restrained amber contours, minimal and subtle enough for white text overlay, no text, no logos, no map labels.
4. **section-construction** — Construction site at golden hour from a distance with survey stakes or markers in the foreground, cinematic dark grade, no people, no readable signage, no logos, no recognizable landmarks.
5. **section-residential** — Aerial straight-down view of a residential neighborhood with subtle parcel-boundary line overlays, dusk lighting, cinematic dark palette, no people, no readable text, no landmarks.
6. **og-image** — 1200×630 social share image using the dark topographic contour style with the headline text “Professional Land Surveying Services in Dallas, Texas” set in Space Grotesk or the site font.

## GitHub Pages Deployment

This repository includes `.github/workflows/static.yml` for GitHub Pages static deployment.

Temporary GitHub Pages URL format:

```text
https://garciae011.github.io/probecksurveying.com/
```

If Pages is not enabled yet, go to the repository settings and enable Pages for the `main` branch / root folder, or use the included workflow depending on your GitHub Pages settings.

## Cloudflare Pages Deployment

1. In Cloudflare, go to **Workers & Pages** → **Create** → **Pages**.
2. Connect the GitHub repository.
3. Use these build settings:
   - Framework preset: **None**
   - Build command: leave blank
   - Build output directory: `/` or leave as repository root depending on Cloudflare UI
4. Deploy.
5. Add the custom domain in Cloudflare Pages and update DNS where the domain is managed.
6. The production domain is already set to `https://www.probecksurveying.com` in `sitemap.xml`, Open Graph tags, and the JSON-LD block in `index.html`. If the domain changes later, update those locations.

## SEO Notes

- Each page has a unique title and meta description.
- Each page includes Open Graph tags pointing to `https://www.probecksurveying.com/images/og-image.png`.
- `index.html` includes JSON-LD `ProfessionalService` structured data.
- `sitemap.xml` and `robots.txt` are included and should remain aligned with the production domain.

## QA Checklist

- Verify desktop navigation on `index.html`, `services.html`, `contact.html`, and `privacy-policy.html`.
- At mobile widths, open and close the full-screen overlay menu and test each link.
- Confirm layouts at 360px, 768px, 1024px, and 1440px widths.
- Test form validation: empty required fields should show inline messages.
- Submit a real test message after deployment and confirm Web3Forms email delivery.
- Check browser console for errors before launch.
