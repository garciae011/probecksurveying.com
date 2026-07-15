# Probeck Land Surveyors Static Website

Modern static rebuild for **Probeck Land Surveyors** in Dallas, Texas. The site uses plain HTML, CSS, and vanilla JavaScript only — no frameworks, no npm, no build step.

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
└── images/
    ├── hero-placeholder.svg
    └── topographic-pattern.svg
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

## Placeholder Images to Replace

The current images are locally generated SVG placeholders, not hotlinked assets:

- `images/hero-placeholder.svg` — abstract surveying/job-site hero artwork.
- `images/topographic-pattern.svg` — contour-line/topographic placeholder graphic.

Suggested real photos for the owner to provide:

- A job-site photo with surveying equipment.
- A close-up of a survey tripod, total station, GPS rover, or field crew setup.
- A Dallas skyline, aerial land shot, or property/development image.

If replacing images, keep file sizes small for performance. Recommended targets:

- Hero image: 1600px wide, compressed JPEG/WebP, ideally under 250 KB.
- Supporting image: 1000px wide or smaller, ideally under 150 KB.
- Preserve descriptive `alt` text in the HTML.

## Cloudflare Pages Deployment

1. Create a GitHub repository and push these files to the repository root.
2. In Cloudflare, go to **Workers & Pages** → **Create** → **Pages**.
3. Connect the GitHub repository.
4. Use these build settings:
   - Framework preset: **None**
   - Build command: leave blank
   - Build output directory: `/` or leave as repository root depending on Cloudflare UI
5. Deploy.
6. Add the custom domain in Cloudflare Pages and update DNS as prompted.
7. The production domain is already set to `https://www.probecksurveying.com` in `sitemap.xml`, Open Graph tags, and the JSON-LD block in `index.html`. If the domain changes later, update those locations.

## SEO Notes

- Each page has a unique title and meta description.
- Each page includes Open Graph tags.
- `index.html` includes JSON-LD `ProfessionalService` structured data.
- `sitemap.xml` and `robots.txt` are included with placeholder domain values.

## QA Checklist

- Verify desktop navigation on `index.html`, `services.html`, `contact.html`, and `privacy-policy.html`.
- At mobile widths, open and close the hamburger menu and test each link.
- Confirm layouts at 360px, 768px, 1024px, and 1440px widths.
- Test form validation: empty required fields should show inline messages.
- Test form submission with the placeholder Web3Forms key: expect an inline error with the direct email fallback.
- After installing the real access key, submit a real test message and confirm email delivery.
- Check browser console for errors before launch.
