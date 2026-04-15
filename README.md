# GovAid Frontend

A production-grade frontend for GovAid, built with Astro, Tailwind CSS, and Qwik islands.

## 🚀 Features

- **Performance:** Static-first approach using Astro.
- **Styling:** Mobile-first, responsive design using Tailwind CSS.
- **Interactivity:** Qwik islands for high-performance interactivity (ready for development).
- **Accessibility:** Semantic HTML and accessible components.
- **Zero JS Landing Page:** The landing page is built entirely in Astro/Tailwind with zero client-side JavaScript for maximum performance.

## 📁 Structure

```text
/
├── src/
│   ├── components/  # Atomic Astro/Qwik components
│   ├── layouts/     # Base layout for all pages
│   ├── pages/       # Route-based pages
│   └── styles/      # Global CSS and Tailwind base
└── astro.config.mjs # Integration and build configuration
```

## 🧞 Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Installs dependencies                        |
| `npm run dev`     | Starts local dev server at `localhost:4321`  |
| `npm run build`   | Build your production site to `./dist/`      |
| `npm run preview` | Preview your build locally, before deploying |

## 🛠 Tech Stack

- **Astro:** Static site generation and component orchestration.
- **Tailwind CSS:** Utility-first styling with `@tailwindcss/vite`.
- **Qwik:** (Ready for integration) Progressive hydration for interactive islands.
