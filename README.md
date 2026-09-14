# Dhanush — Full Stack Developer Portfolio

A premium, dark, 3D-animated personal portfolio built with plain HTML, CSS and JavaScript (no build step, no framework required).

## Running it

No installation needed. Just open `index.html` in a browser, or serve the folder with any static server, e.g.:

```bash
npx serve .
```

## Folder structure

```
portfolio/
├── index.html
├── style.css
├── script.js
├── images/
│   ├── profile.jpg            ← replace with your photo
│   ├── project-buildora.jpg   ← replace with a Buildora screenshot
│   ├── project-2.jpg          ← replace with your 2nd project's screenshot
│   └── project-3.jpg          ← replace with your 3rd project's screenshot
└── README.md
```

The images currently in `images/` are auto-generated placeholders so the page looks complete out of the box — swap them for your real photo and project screenshots (same filenames, or update the `src` attributes in `index.html`).

## Personalizing the site

Almost everything you need to change lives in **one place**: the `portfolioConfig` object at the top of `script.js`.

```js
const portfolioConfig = {
  name: "Dhanush",
  role: "Full Stack Developer",
  email: "YOUR_EMAIL@example.com",
  whatsapp: "YOUR_WHATSAPP_NUMBER",   // digits only, with country code, e.g. 919876543210
  github: "https://github.com/YOUR_USERNAME",
  linkedin: "https://www.linkedin.com/in/YOUR_USERNAME",
  resume: "#",                        // point this at your resume PDF, e.g. "resume.pdf"
  projectsCompleted: 3
};
```

Update those values and every email link, WhatsApp link, GitHub/LinkedIn link, contact card and the Resume button will update automatically.

### Other things you may want to edit directly in `index.html`

- Project cards in the **Projects** section (name, description, tags, GitHub/Live Demo links).
- The Buildora GitHub/Live Demo `href` values (currently `#` placeholders).
- Skill descriptions/levels in the **Skills** section (`data-level` is a 0–100 value used for the progress bar).
- Hero introduction paragraph and About paragraphs.

## Features

- Premium loading screen with animated name reveal and progress bar
- Sticky glassmorphism navbar with scroll-spy active states and a mobile hamburger menu
- Full-screen hero with animated background (blobs, grid, particles, floating shapes), mouse-reactive 3D profile photo, and a glowing hover effect on the name
- About section with an animated statistics row and a tilting glass card
- A continuously looping half-circle skill orbit (hover/focus an icon to pause it and see its name), plus skill cards with animated progress bars
- Project grid with a larger featured card for "The Buildora," an animated project counter, and category filters
- Contact section with clickable contact cards and a validated contact form (uses `mailto:` since no backend is connected — swap in a real endpoint later if you add one)
- Custom cursor on desktop (auto-disabled on touch devices)
- Scroll-reveal animations via Intersection Observer
- Respects `prefers-reduced-motion`, uses semantic HTML, visible focus states and alt text throughout

## Notes

- Replace all `YOUR_EMAIL@example.com`, `YOUR_WHATSAPP_NUMBER`, `YOUR_USERNAME` placeholders — no real contact information is included by default.
- The contact form does not have a backend attached. It currently opens the visitor's email client via `mailto:` with the message pre-filled. If you'd like actual form submissions (e.g. via Formspree, EmailJS, or your own API), replace the `fetch`/`mailto` block in `initContactForm()` inside `script.js`.
- Font Awesome and Google Fonts are loaded from a CDN, so an internet connection is needed for icons/fonts to render (everything else works offline).
