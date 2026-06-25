# Aryan Chaudhary — Software Developer Portfolio

A minimal, premium, Vercel-inspired software developer portfolio website. Built for speed, responsiveness, and clean aesthetics.

🌐 **Live Demo:** [https://aryan-portfolio-f1w.pages.dev/](https://aryan-portfolio-f1w.pages.dev/)

---

## ✨ Features

- **🚀 Live Engineering Dashboard**: Integrates with the GitHub REST & GraphQL APIs to display live repository stats, contribution heatmap, languages, pinned repos, and recent commit activity feed.
- **🛡️ API Resiliency**: Features a robust caching & fallback data layer that prevents broken UI elements and rates limits by serving accurate static data when GitHub's API rate limits are exceeded or credentials are not configured.
- **✨ Premium UI/UX**: Designed with sleek dark aesthetics, smooth Framer Motion micro-animations, glassmorphic card patterns, and a dynamic interactive custom cursor.
- **📈 Complete SEO Suite**: Complete search engine optimization including JSON-LD schema markup, Open Graph tags, canonical headers, robots configurations, and an XML sitemap.
- **♿ Accessibility**: Optimized semantic HTML headings, focus rings, skip links, and ARIA labels.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vite.dev/)
- **Languages**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Data Fetching**: [TanStack React Query](https://tanstack.com/query/latest)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 💻 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Aryan7878/MyPortfolio.git
   ```
2. Navigate to the project directory:
   ```bash
   cd MyPortfolio
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

To start the local development server:
```bash
npm run dev
```

### Environment Variables

To activate the real-time GitHub GraphQL data for pinned repositories, copy `.env.example` to `.env` and configure your token:
```bash
cp .env.example .env
```
Inside `.env`:
```env
VITE_GITHUB_TOKEN=your_personal_access_token
```

### Production Build

To build the static assets for deployment:
```bash
npm run build
```
The output will be generated inside the `dist` directory.

---

## 📄 License

This project is licensed under the MIT License.
