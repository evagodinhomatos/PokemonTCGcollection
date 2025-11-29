# Project Summary
The Pokémon TCG Collection Manager is a web application designed for Pokémon Trading Card Game enthusiasts to manage their card collections efficiently. It features a comprehensive Pokédex, customizable wishlists, and an engaging interface with 3D card effects. The platform streamlines the collection process, enabling users to track, showcase, and manage their Pokémon cards while integrating with external APIs.

# Project Module Description
The project comprises several key modules:
- **Card Browser**: Search and view Pokémon TCG cards with real-time API integration and filtering options.
- **Wishlist Management**: Save favorite cards to a locally stored wishlist and track cards owned.
- **Pokédex**: Display all Pokémon with sprites and filtering capabilities.
- **Responsive Design**: Ensures usability across desktop and mobile devices.
- **Detailed Card View**: Show full details of any card in an elegant modal.
- **Progressive Card Loading**: Cards are loaded in a grid layout, enhancing performance and user experience.
- **Error Handling**: Enhanced messaging for API failures, including user-friendly alerts and retry options.
- **Grouped Card Display**: Cards on the home page are organized by set and expansion, providing clear section headers for better navigation.

# Directory Tree
```
shadcn-ui/
├── README.md                  # Project documentation
├── index.html                 # Main HTML file
├── package.json               # Project metadata and dependencies
├── public/                    # Public assets
│   ├── favicon.svg            # Favicon for the application
├── src/                       # Source files
│   ├── App.tsx                # Main application component
│   ├── components/            # UI components
│   ├── lib/                   # Utility functions and data management
│   ├── pages/                 # Application pages
│   ├── Pokedex.tsx            # Page displaying the Pokédex
│   ├── PokemonCards.tsx       # Page displaying cards for a specific Pokémon
│   └── index.css              # Global styles
├── vite.config.ts             # Vite configuration
```

# File Description Inventory
- **src/App.tsx**: Main application component that sets up routing and context providers.
- **src/components/CardModal.tsx**: Modal dialog component displaying enlarged card details.
- **src/components/Navbar.tsx**: Navigation bar component with a refined design.
- **src/components/PokemonCard.tsx**: Interactive card component with visual effects and ownership tracking.
- **src/pages/Index.tsx**: Home page for browsing Pokémon cards, featuring grouped cards by set and enhanced loading states.
- **src/pages/Wishlist.tsx**: Page displaying the user's wishlist and owned cards.
- **src/pages/Pokedex.tsx**: Page displaying all Pokémon with search functionality.
- **src/pages/PokemonCards.tsx**: Page displaying all TCG cards for a selected Pokémon with sorting options.
- **src/lib/pokemon.ts**: Functions for fetching Pokémon card data from the API, featuring caching and optimized loading.
- **src/lib/store.ts**: Manages the wishlist and collection state using local storage.

# Technology Stack
- **Frontend**: React, Vite, Tailwind CSS, shadcn/ui
- **State Management**: Zustand for state management and LocalStorage for wishlist and collection persistence
- **API**: Pokémon TCG API for card data

# Usage
To set up the project, follow these steps:
1. Install dependencies:
   ```
   pnpm install
   ```
2. Run linting:
   ```
   pnpm run lint
   ```
3. Build the project:
   ```
   pnpm run build
   ```
