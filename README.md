# OORAH - Company Website

A modern, responsive company website built with React, TypeScript, and Vite.

## Tech Stack

- **React 18** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool & Dev Server
- **React Router v6** - Client-side Routing
- **CSS Variables** - Theming & Design Tokens

## Project Structure

```
OORAH/
├── public/                # Static assets (favicon, 404 page)
├── src/
│   ├── assets/            # Images, icons
│   │   ├── images/
│   │   └── icons/
│   ├── components/        # Reusable components
│   │   ├── common/        # ErrorBoundary, LoadingSpinner
│   │   ├── layout/        # Header, Footer, Layout
│   │   ├── ui/             # Button, Card, HeroCarousel, CoderScene
│   │   └── index.ts       # Component exports
│   ├── data/                # Static content (products, team, home copy)
│   ├── pages/              # Page components
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Products.tsx
│   │   ├── Contact.tsx
│   │   ├── TeamMember.tsx
│   │   ├── NotFound.tsx
│   │   └── index.ts
│   ├── services/          # Data-fetching layer (currently reads static data from src/data)
│   ├── styles/            # Global styles
│   │   └── index.css
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/             # Utility functions
│   │   ├── constants.ts
│   │   └── strings.ts
│   ├── App.tsx            # Main App component with routes
│   ├── App.test.tsx       # Routing/rendering smoke tests
│   ├── main.tsx           # Application entry point
│   ├── setupTests.ts      # Vitest + Testing Library setup
│   └── vite-env.d.ts      # Vite type definitions
├── docs/                  # Extended documentation
├── .github/workflows/     # CI (lint/test/build) + branch promotion automation
├── .gitignore
├── .prettierignore
├── eslint.config.js       # ESLint configuration (extends Prettier's rule set)
├── index.html             # HTML entry point
├── package.json           # Dependencies & scripts
├── prettier.config.js     # Prettier configuration
├── tsconfig.json          # TypeScript configuration
├── tsconfig.node.json     # TypeScript config for Node
├── vercel.json            # Vercel build + SPA routing config
└── vite.config.ts         # Vite configuration (build + Vitest config)
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Type-check and build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format the codebase with Prettier
- `npm run format:check` - Check formatting without writing changes
- `npm test` - Run the test suite once (Vitest)
- `npm run test:watch` - Run the test suite in watch mode

## Path Aliases

The project uses path aliases for cleaner imports:

- `@/*` → `src/*`
- `@components/*` → `src/components/*`
- `@pages/*` → `src/pages/*`
- `@utils/*` → `src/utils/*`
- `@assets/*` → `src/assets/*`
- `@services/*` → `src/services/*`
- `@types/*` → `src/types/*`

## Data & Services

Product and team content lives in `src/data/` (`products.ts`, `team.ts`). `src/services/` wraps that data behind async functions (`fetchProducts`, `fetchTeamMembers`, `fetchTeamMemberBySlug`) so pages can keep their existing loading/error/retry UI. There is no backend today — if a real API or CMS is introduced later, only `src/services/` needs to change; pages don't.

## Testing

Vitest + React Testing Library are configured (`vite.config.ts`'s `test` block, `src/setupTests.ts`). Test files live next to the code they cover (`*.test.ts` / `*.test.tsx`). Run with `npm test`.

## Formatting & Linting

Prettier (`prettier.config.js`) and ESLint (`eslint.config.js`, with `eslint-config-prettier` disabling any conflicting stylistic rules) are configured. Run `npm run format` before committing, `npm run lint` to catch issues.

## Environment Variables

Vite exposes variables prefixed with `VITE_`. None are currently required — add a `.env` file if you introduce env-dependent config.

## Documentation

See the `docs/` folder for extended documentation and onboarding guides.

## Branching & Deployment

Three long-lived branches map to three environments, each deployed independently by Vercel:

| Branch    | Environment | Who pushes here                                  |
| --------- | ----------- | ------------------------------------------------ |
| `dev`     | Development | Developers push/merge feature work directly      |
| `staging` | Staging     | Auto-promoted from `dev` via PR, on approval     |
| `main`    | Production  | Auto-promoted from `staging` via PR, on approval |

Promotion is automated by `.github/workflows/promote.yml`: every push to `dev` or `staging` opens (or reuses) a PR into the next environment and enables auto-merge, so it merges itself as soon as the required review is approved and CI (`.github/workflows/ci.yml`) is green. `staging` and `main` are branch-protected — no direct pushes, PR + approval required. `dev` is left open for direct pushes.

This requires a couple of one-time settings that live outside the repo (GitHub branch protection rules, the "Allow auto-merge" repo setting, and the Vercel project's branch→domain mapping) — see the project's setup notes for the exact steps.

## Pages

- **Home** (`/`) - Landing page with hero, features, and CTA sections
- **About** (`/about`) - Company story, stats, values, and mission
- **Products** (`/products`) - Product catalog with cards
- **Team member** (`/team/:slug`) - Individual team member profile
- **Contact** (`/contact`) - Contact form and company information
- **404** - Not found page

## Customization

### Colors

Edit CSS variables in `src/styles/index.css`:

```css
:root {
  --color-primary: #1a365d;
  --color-secondary: #ed8936;
  /* ... */
}
```

### Adding New Pages

1. Create component in `src/pages/`
2. Add route in `src/App.tsx`
3. Add navigation link in `src/components/layout/Header.tsx`

### Adding New Components

1. Create component in appropriate folder under `src/components/`
2. Export from the folder's `index.ts`

## Future Enhancements

- [ ] Add state management (Zustand/Redux)
- [ ] Implement dark mode
- [ ] Integrate CMS for content
- [ ] Add blog section
- [ ] Implement authentication
- [ ] Add i18n support

## License

Proprietary - OORAH
