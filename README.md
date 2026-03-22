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
├── public/                 # Static assets
│   └── oorah-logo.svg     # Logo/favicon
├── src/
│   ├── assets/            # Images, icons, fonts
│   │   ├── images/
│   │   └── icons/
│   ├── components/        # Reusable components
│   │   ├── layout/        # Layout components (Header, Footer, Layout)
│   │   ├── ui/            # UI components (Button, Card, etc.)
│   │   └── index.ts       # Component exports
│   ├── hooks/             # Custom React hooks
│   │   ├── useLocalStorage.ts
│   │   ├── useMediaQuery.ts
│   │   └── index.ts
│   ├── pages/             # Page components
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Products.tsx
│   │   ├── Contact.tsx
│   │   ├── NotFound.tsx
│   │   └── index.ts
│   ├── services/          # API services
│   │   ├── api.ts
│   │   └── index.ts
│   ├── styles/            # Global styles
│   │   └── index.css
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/             # Utility functions
│   │   ├── helpers.ts
│   │   ├── constants.ts
│   │   └── index.ts
│   ├── App.tsx            # Main App component with routes
│   ├── main.tsx           # Application entry point
│   └── vite-env.d.ts      # Vite type definitions
├── .gitignore
├── eslint.config.js       # ESLint configuration
├── index.html             # HTML entry point
├── package.json           # Dependencies & scripts
├── tsconfig.json          # TypeScript configuration
├── tsconfig.node.json     # TypeScript config for Node
└── vite.config.ts         # Vite configuration
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
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Path Aliases


## Testing

Jest and React Testing Library are set up for unit and integration tests. See `src/components/ui/Button.test.tsx` for an example.

## State Management

See `src/store/exampleStore.ts` for a simple custom hook. For larger apps, consider Zustand or Redux.

## Environment Variables

Use `.env.example` as a template for your own `.env` file. Vite exposes variables prefixed with `VITE_`.

## Formatting & Linting

Prettier and ESLint are configured for code consistency.

## Documentation

See the `docs/` folder for extended documentation and onboarding guides.
The project uses path aliases for cleaner imports:

- `@/*` → `src/*`
- `@components/*` → `src/components/*`
- `@pages/*` → `src/pages/*`
- `@hooks/*` → `src/hooks/*`
- `@utils/*` → `src/utils/*`
- `@assets/*` → `src/assets/*`
- `@services/*` → `src/services/*`
- `@types/*` → `src/types/*`

## Pages

- **Home** (`/`) - Landing page with hero, features, and CTA sections
- **About** (`/about`) - Company story, stats, values, and mission
- **Products** (`/products`) - Product catalog with cards
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
- [ ] Add animations (Framer Motion)
- [ ] Integrate CMS for content
- [ ] Add blog section
- [ ] Implement authentication
- [ ] Add i18n support

## License

Proprietary - OORAH
