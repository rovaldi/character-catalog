# Rick and Morty Character Explorer

A React application that consumes the [Rick and Morty GraphQL API](https://rickandmortyapi.com/graphql) to display and explore characters from the show.

## Live Demo

🚀 **[View the app](https://your-app-name.vercel.app)**

## Getting Started

### Prerequisites

- **Node.js** 20.x (recommended: use [nvm](https://github.com/nvm-sh/nvm))
- **Yarn** 3.8.5 (managed via Corepack)

## Setup

```bash
# Install and use the correct Node version
nvm install
nvm use

# Enable Corepack for Yarn 3
corepack enable

# Install dependencies
yarn install
```

### Development

```sh
yarn dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Running Tests

```sh
yarn test
```

### Build for Production

```sh
yarn build
```

## Features

- **Character listing** with pagination
- **Filtering** by status (Alive, Dead, Unknown) and gender
- **Sorting** by name, status, or species
- **Character detail view** with episode list
- **Responsive design** that works on mobile, tablet, and desktop
- **Lazy loading images** for better performance
- **Accessible** with proper ARIA labels and semantic HTML

## Tech Stack

- **React 19** with TypeScript
- **Vite** for fast development and builds
- **Apollo Client** for GraphQL data fetching
- **React Router** for navigation
- **SCSS Modules** with BEM methodology for styling
- **Jest** + **Testing Library** for unit and integration tests

## Project Structure

```
src/
├── api/                 # Apollo client, GraphQL queries, types
│   ├── constants/       # API-related constants
│   ├── queries/         # GraphQL queries and hooks
│   └── types/           # TypeScript interfaces
├── components/          # Reusable UI components
│   ├── CharacterCard/
│   ├── Filters/
│   ├── Pagination/
│   └── SortControls/
├── layouts/             # Page layouts
├── pages/               # Route pages
│   ├── ListingPage/
│   └── DetailPage/
├── router/              # React Router configuration
└── styles/              # Global styles, tokens, mixins
```

## Design Decisions

### Why Apollo Client?

The Rick and Morty API is GraphQL-based, so Apollo Client was the natural choice. It provides built-in caching, which improves performance when navigating between pages and reduces unnecessary network requests.

### Why SCSS Modules?

- **Scoped styles** prevent naming collisions
- **BEM methodology** keeps the CSS organized and predictable
- **Design tokens** (CSS custom properties) make theming consistent
- No runtime CSS-in-JS overhead

### Testing approach

Tests focus on user behavior rather than implementation details. I use `data-testid` attributes for element selection to make tests resilient to markup changes. Each component has its own test file, and integration tests cover the full page flows.

### Performance considerations

- **Image lazy loading** with `loading="lazy"` attribute
- **Apollo cache** with `cache-first` policy to avoid redundant requests
- **React.memo** only where it makes sense (CharacterCard in lists)
- **No premature optimization** – I measured first and only added optimizations where needed

## Potential Improvements

If I had more time, here's what I'd add:

### UX Improvements

- **Skeleton loaders** instead of "Loading..." text for a more polished feel
- **Search input** to filter characters by name directly
- **Items per page selector** to let users choose how many characters to display (10, 20, 50)

### Accessibility

- **Full keyboard navigation** support for all interactive elements
- **Skip to content** link for screen reader users
- **Focus management** when navigating between pages

### Technical

- **E2E tests** with Playwright or Cypress
- **Storybook** for component documentation

## Continuous Integration

The project uses GitHub Actions to run linting and tests on every push. The workflow configuration can be found in `.github/workflows/ci.yml`.

## Additional Questions

Answers to the technical and soft-skill questions can be found in [QUESTIONS.md](QUESTIONS.md).

## License

This project is licensed for **non-commercial use only**. See the [LICENSE](LICENSE) file for details.

---

Built by [Roberto Valcárcel](https://github.com/rvaledez)