# Pokémon TCG Collection Manager

A modern web application for browsing and managing your Pokémon Trading Card collection with elegant 3D card interactions.

## Features

- **Card Browser**: Search and browse Pokémon TCG cards with real-time API integration
- **3D Card Effects**: Interactive holographic effects with mouse tracking
- **Personal Collection**: Save your favorite cards to a wishlist
- **Detailed Card View**: Click any card to view full details in an elegant modal
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technology Stack

- **React 19** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Zustand** - Lightweight state management
- **React Router** - Client-side routing
- **Pokémon TCG API** - Card data source

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm 8+

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

## Project Structure

```
src/
├── components/       # React components
│   ├── ui/          # shadcn/ui components
│   ├── CardModal.tsx
│   ├── Navbar.tsx
│   └── PokemonCard.tsx
├── lib/             # Utilities and helpers
│   ├── pokemon.ts   # API integration
│   ├── store.ts     # State management
│   └── utils.ts     # Helper functions
├── pages/           # Route pages
│   ├── Index.tsx
│   └── Wishlist.tsx
├── App.tsx          # Root component
├── main.tsx         # Entry point
└── index.css        # Global styles
```

## Development

The project uses:
- ESLint for code linting
- TypeScript for type checking
- Tailwind CSS for styling
- Local storage for wishlist persistence

## License

MIT